import os
import json
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load env vars (GEMINI_API_KEY auto-detected)
load_dotenv()

# Client initializes with GEMINI_API_KEY from env
client = genai.Client()

# Recommended fast model (supports JSON output reliably)
MODEL_NAME = "gemini-2.5-flash"

def generate_landing_page_content(description: str) -> dict:
    """
    Calls Gemini to generate landing page content.
    Returns dict: heroTitle, heroSubtitle, features (list[str]), ctaText.
    """
    prompt = f"""
    You are an expert landing page copywriter.
    Generate compelling, concise content for a landing page based on this product/business description:

    "{description}"

    Return strictly valid JSON with exactly these keys:
    - "heroTitle": catchy main headline (string)
    - "heroSubtitle": supporting subheadline (string)
    - "features": array of 3 to 5 short bullet points (strings)
    - "ctaText": strong call-to-action button text (string)

    Example:
    {{
      "heroTitle": "Revolutionary AI Fitness Coach",
      "heroSubtitle": "Get fit without sacrificing your busy schedule",
      "features": [
        "Personalized AI-powered workouts",
        "Automatic progress tracking",
        "Flexible scheduling for professionals",
        "Real-time form correction"
      ],
      "ctaText": "Start Your Free Trial"
    }}

    Be persuasive, professional, tailored. Only return JSON. No extra text.
    """

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=1.0,
                top_p=0.9,
            )
        )
        content = json.loads(response.text)
        return content

    except json.JSONDecodeError as e:
        raise ValueError("Failed to parse JSON from Gemini response") from e
    except Exception as e:
        raise RuntimeError(f"Gemini API error: {str(e)}") from e