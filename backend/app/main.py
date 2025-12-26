from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .ai_generator import generate_landing_page_content

app = FastAPI(
    title="AI Landing Page Builder API",
    description="Generates landing page content using Gemini",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    description: str

class LandingPageContent(BaseModel):
    heroTitle: str
    heroSubtitle: str
    features: list[str]
    ctaText: str

@app.post("/generate", response_model=LandingPageContent)
async def generate_content(request: GenerateRequest):
    if not request.description.strip():
        raise HTTPException(status_code=400, detail="Description cannot be empty")

    try:
        content = generate_landing_page_content(request.description)
        return content
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "AI Landing Page Builder Backend is running!"}