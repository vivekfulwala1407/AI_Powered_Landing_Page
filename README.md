```markdown
# AI Landing Page Builder

## Project Overview

A simple, clean AI-powered landing page generator that fulfills all requirements from the technical task.

Users enter a short product/business description, click "Generate", and receive a fully structured landing page with:
- Hero section (title + subtitle)
- Features section (3–5 bullet points)
- Call-to-Action button

All generated text is **fully editable** after generation — a key requirement, as real users rarely accept AI output on the first try.

The project demonstrates:
- Clear thinking and structured implementation
- Real AI integration with proper understanding
- Clean, maintainable code execution
- Strict adherence to instructions (no extras, no heavy libraries, no animations)

## Features

- Single textarea input with exact placeholder: `"AI-based fitness app for busy professionals"`
- "Generate" button with loading state and basic error handling
- Clean sectioned layout: hero → features → CTA
- Proper spacing and responsive design using Tailwind CSS
- Full manual editing of all generated text (click any text to edit inline)
- Real AI content generation (no mocking)

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS v4
- **Backend**: FastAPI (Python)
- **AI Integration**: Google Gemini API (`gemini-2.5-flash`) via official `google-genai` SDK
  - Real API usage (not simulated)
  - Structured JSON output enforced via prompt engineering and `response_mime_type="application/json"`

## How to Run the Project

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` folder:
```
GEMINI_API_KEY=your_actual_api_key_here
```

Start the server:
```bash
uvicorn app.main:app --reload --port=8000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### 3. Usage
- Enter a description (e.g., "Eco-friendly coffee subscription for home brewers")
- Click "Generate"
- View the generated landing page
- Click any text (title, subtitle, features, CTA) to edit it directly

## AI Approach Explanation

Real integration with Google Gemini API using the current official `google-genai` Python SDK.

The prompt is carefully engineered to return **strict JSON** with exactly the required keys:
```json
{
  "heroTitle": "...",
  "heroSubtitle": "...",
  "features": ["...", "...", "..."],
  "ctaText": "..."
}
```

This is achieved using:
- Clear system-level instructions
- Explicit JSON example in the prompt
- `response_mime_type="application/json"` in generation config
- Temperature set to 0.7 (balanced creativity) — can be increased to 1.0 for more variation

No mocking or fake responses — honest real API usage as emphasized in the task.

## Project Structure

```
AI_Powered_Landing_Page/
├── backend/
│   ├── app/
│   │   ├── ai_generator.py    # Gemini API logic
│   │   └── main.py            # FastAPI endpoints
│   ├── requirements.txt
│   └── .env                   # (git ignored)
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Full UI + editing logic
│   │   └── index.css
│   ├── vite.config.js         # Proxy + Tailwind plugin
│   └── package.json
└── README.md
```

- Clean separation of concerns
- Meaningful variable/function names
- No copied templates or heavy UI kits
- No unnecessary dependencies or animations
