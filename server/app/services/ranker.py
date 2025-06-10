import json
from typing import Any, Dict, List

from openai import OpenAI


class RankerService:
    """Service for generating rankings using OpenAI."""

    model = "gpt-4o"
    temperature = 0

    def __init__(self) -> None:
        """Initialize OpenAI client using environment variables."""
        # The OpenAI library automatically reads the API key from
        # the `OPENAI_API_KEY` environment variable.
        self.client = OpenAI()

    def _call_openai(self, prompt: str) -> List[Dict[str, Any]]:
        """Call OpenAI API and return parsed JSON response.

        Retries once on JSON parse error.
        """
        messages = [
            {
                "role": "system",
                "content": (
                    "Strictly return a pure JSON array where each element has "
                    "the fields: name, score, rank, and reasons mapping criterion to reason."
                ),
            },
            {"role": "user", "content": prompt},
        ]

        for _ in range(2):
            response = self.client.chat.completions.create(
                model=self.model,
                temperature=self.temperature,
                messages=messages,
            )
            content = response.choices[0].message.content
            try:
                return json.loads(content)
            except json.JSONDecodeError:
                # Retry once
                continue
        raise ValueError("Failed to parse JSON from OpenAI response")

    def rank(self, prompt: str) -> List[Dict[str, Any]]:
        """Public method to generate ranking from a prompt."""
        return self._call_openai(prompt)
