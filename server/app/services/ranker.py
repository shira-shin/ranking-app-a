import json
import logging
import os
import re
from typing import Any, Dict, List

from openai import OpenAI


logger = logging.getLogger(__name__)


class RankerService:
    """Service for generating rankings using OpenAI."""

    model = "gpt-4o"
    temperature = 0

    def __init__(self) -> None:
        """Initialize the OpenAI client unless running in dummy mode.

        When ``USE_DUMMY_DATA=1`` is present in the environment the service
        skips creating an ``OpenAI`` client.  This allows the API to operate
        without an API key during local development.
        """
        self.use_dummy = os.getenv("USE_DUMMY_DATA") == "1"

        # openai v1.x automatically reads settings such as ``OPENAI_API_KEY``
        # from environment variables.  Passing unsupported arguments like
        # ``proxies`` or ``api_key`` will raise ``TypeError`` in recent
        # versions, so we simply instantiate ``OpenAI()`` when not in dummy
        # mode.
        self.client = None if self.use_dummy else OpenAI()

    def _cleanup_json(self, text: str) -> str:
        """Try to extract a JSON object or array from a text blob."""
        match = re.search(r"{.*}\s*$", text, re.DOTALL)
        if match:
            return match.group(0)
        match = re.search(r"\[.*\]", text, re.DOTALL)
        return match.group(0) if match else text

    def _expected_count(self, prompt: str) -> int:
        """Return the number of candidates found in the prompt."""
        m = re.search(r"Rank the following items:\s*(.*?)\.\s*Criteria", prompt, re.IGNORECASE)
        if not m:
            return -1
        items = [c.strip() for c in m.group(1).split(',') if c.strip()]
        return len(items)

    def _call_openai(self, prompt: str) -> List[Dict[str, Any]]:
        """Call OpenAI API and return parsed JSON response.

        Retries once on JSON parse error.
        """
        messages = [
            {
                "role": "system",
                "content": (
                    "You are a JSON API. Always respond with an object that has a "
                    "'rankings' field containing a JSON array of objects. Each object "
                    "must include name, score, rank and reasons mapping each criterion "
                    "to a Japanese sentence explaining the evaluation. Do not include "
                    "code fences or additional text."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"{prompt}\n\n"
                    "すべての候補を順位順に含む 'rankings' 配列だけを返してください。"
                    "形式例: {\"rankings\": [{\"name\":\"\",\"score\":0,\"rank\":0,\"reasons\":{\"基準\":\"理由\"}}]}"
                ),
            },
        ]

        logger.info("Calling OpenAI with prompt: %s", prompt)
        for _ in range(2):
            response = self.client.chat.completions.create(
                model=self.model,
                temperature=self.temperature,
                messages=messages,
                # Enable OpenAI's JSON mode to increase chance of valid output
                response_format={"type": "json_object"},
            )
            content = response.choices[0].message.content
            logger.info("Raw OpenAI response: %s", content)
            try:
                parsed = json.loads(content)
                logger.info("Parsed response: %s", parsed)
                if isinstance(parsed, dict):
                    parsed = parsed.get("rankings", parsed)
                if isinstance(parsed, dict):
                    parsed = [parsed]
                return parsed
            except json.JSONDecodeError:
                logger.error("OpenAI response not valid JSON: %s", content)
                cleaned = self._cleanup_json(content)
                try:
                    parsed = json.loads(cleaned)
                    logger.info("Parsed cleaned response: %s", parsed)
                    if isinstance(parsed, dict):
                        parsed = parsed.get("rankings", parsed)
                    if isinstance(parsed, dict):
                        parsed = [parsed]
                    return parsed
                except json.JSONDecodeError:
                    # Retry once more with cleaned content
                    continue
        raise ValueError("Failed to parse JSON from OpenAI response")

    def rank(self, prompt: str, expected_count: int | None = None) -> List[Dict[str, Any]]:
        """Generate ranking results from a prompt.

        When ``self.use_dummy`` is ``True`` the method returns a built-in set
        of rankings instead of calling the OpenAI API.  This behaviour is
        controlled by the ``USE_DUMMY_DATA`` environment variable and is
        intended for local development without API access.
        """
        if self.use_dummy:
            data = [
                {
                    "name": "Sample A",
                    "score": 10,
                    "rank": 1,
                    "reasons": {"味": "とても美味しい", "値段": "手頃な価格"},
                },
                {
                    "name": "Sample B",
                    "score": 8,
                    "rank": 2,
                    "reasons": {"味": "そこそこ美味しい", "値段": "少し高め"},
                },
                {
                    "name": "Sample C",
                    "score": 6,
                    "rank": 3,
                    "reasons": {"味": "普通", "値段": "高い"},
                },
            ]
            logger.info("Returning dummy data: %s", data)
            return data
        expected = expected_count if expected_count and expected_count > 0 else self._expected_count(prompt)
        for attempt in range(2):
            data = self._call_openai(prompt)
            if isinstance(data, dict):
                data = [data]
            if expected <= 1 or len(data) >= expected:
                logger.info("Returning OpenAI data: %s", data)
                return data
            logger.warning(
                "OpenAI returned %d items, expected %d. Retrying...",
                len(data),
                expected,
            )
        raise ValueError(
            f"Incomplete rankings: expected {expected}, got {len(data)}"
        )
