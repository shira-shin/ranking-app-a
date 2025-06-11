import json
import logging
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
                # Instruct the model to return ONLY a JSON array without markdown or explanations.
                "content": (
                    "You are a JSON API. Respond with a pure JSON array where each element "
                    "has the fields name, score, rank and reasons mapping criterion to reason. "
                    "Do not include code fences or additional text."
                ),
            },
            {"role": "user", "content": prompt},
        ]

        for _ in range(2):
            response = self.client.chat.completions.create(
                model=self.model,
                temperature=self.temperature,
                messages=messages,
                # Enable OpenAI's JSON mode to increase chance of valid output
                response_format={"type": "json_object"},
            )
            content = response.choices[0].message.content
            try:
                return json.loads(content)
            except json.JSONDecodeError:
                logger.error("OpenAI response not valid JSON: %s", content)
                cleaned = self._cleanup_json(content)
                try:
                    return json.loads(cleaned)
                except json.JSONDecodeError:
                    # Retry once more with cleaned content
                    continue
        raise ValueError("Failed to parse JSON from OpenAI response")

    def rank(self, prompt: str) -> List[Dict[str, Any]]:
        """Public method to generate ranking from a prompt."""
        return self._call_openai(prompt)
