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
        """Initialize the OpenAI client without extra parameters."""
        # openai v1.x automatically reads settings such as
        # `OPENAI_API_KEY` from environment variables. Passing
        # unsupported arguments like ``proxies`` or ``api_key`` will
        # raise ``TypeError`` in recent versions, so we simply
        # instantiate ``OpenAI()``.
        self.client = OpenAI()

    def _cleanup_json(self, text: str) -> str:
        """Try to extract a JSON array from a text blob."""
        match = re.search(r"\[.*\]", text, re.DOTALL)
        return match.group(0) if match else text

    def _call_openai(self, prompt: str) -> List[Dict[str, Any]]:
        """Call OpenAI API and return parsed JSON response.

        Retries once on JSON parse error.
        """
        messages = [
            {
                "role": "system",
                # Ask the model to respond ONLY with a JSON array. If only a single
                # result exists, it should still be wrapped in an array. No
                # markdown or explanatory text is allowed.
                "content": (
                    "You are a JSON API. Always respond with a pure JSON array where each "
                    "element has the fields name, score, rank and reasons mapping criterion "
                    "to reason. Do not include code fences or additional text."
                ),
            },
            {
                "role": "user",
                "content": f"{prompt}\n\nすべて日本語で回答してください。",
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
                    parsed = [parsed]
                return parsed
            except json.JSONDecodeError:
                logger.error("OpenAI response not valid JSON: %s", content)
                cleaned = self._cleanup_json(content)
                try:
                    parsed = json.loads(cleaned)
                    logger.info("Parsed cleaned response: %s", parsed)
                    if isinstance(parsed, dict):
                        parsed = [parsed]
                    return parsed
                except json.JSONDecodeError:
                    # Retry once more with cleaned content
                    continue
        raise ValueError("Failed to parse JSON from OpenAI response")

    def rank(self, prompt: str) -> List[Dict[str, Any]]:
        """Public method to generate ranking from a prompt.

        If the environment variable ``USE_DUMMY_DATA`` is set, return a static
        ranking response.  This is helpful for local development when no
        OpenAI API key is available.
        """
        if os.getenv("USE_DUMMY_DATA"):
            data = [
                {
                    "name": "Sample A",
                    "score": 10,
                    "rank": 1,
                    "reasons": {"taste": 5, "price": 3},
                },
                {
                    "name": "Sample B",
                    "score": 8,
                    "rank": 2,
                    "reasons": {"taste": 4, "price": 2},
                },
                {
                    "name": "Sample C",
                    "score": 6,
                    "rank": 3,
                    "reasons": {"taste": 3, "price": 1},
                },
            ]
            logger.info("Returning dummy data: %s", data)
            return data
        data = self._call_openai(prompt)
        if isinstance(data, dict):
            data = [data]
        logger.info("Returning OpenAI data: %s", data)
        return data
