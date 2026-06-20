"""
POC-AMS AI Satellite
FRD Section 4.5: Python FastAPI + LangChain + Ollama + pgvector

AI Study Assistant Service:
- Local RAG (Retrieval-Augmented Generation) engine
- Course material embeddings via pgvector
- Zero internet access — all AI processing is local (Data Sovereignty)
- Answers student questions based ONLY on official syllabus content
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

load_dotenv()

# --- Application Lifespan ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize resources on startup, clean up on shutdown."""
    # Startup: Initialize Ollama connection, pgvector pool, etc.
    print("[AI Satellite] Starting up...")
    print(f"[AI Satellite] Ollama host: {os.getenv('OLLAMA_HOST', 'http://localhost:11434')}")
    print(f"[AI Satellite] Model: {os.getenv('OLLAMA_MODEL', 'llama3:8b')}")
    yield
    # Shutdown
    print("[AI Satellite] Shutting down...")


app = FastAPI(
    title="POC-AMS AI Study Assistant",
    description="Local RAG/LLM service for Power Online College (FRD Section 4.5 & Section 18)",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — only allow requests from the Academic Core backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("ACADEMIC_CORE_URL", "http://localhost:8000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Request/Response Models ---
class StudyQuestion(BaseModel):
    """Student question payload."""
    question: str
    course_id: str
    student_id: str


class StudyAnswer(BaseModel):
    """AI-generated answer payload."""
    answer: str
    sources: list[str]
    course_id: str
    confidence: float


class EmbeddingRequest(BaseModel):
    """Request to index course material."""
    course_id: str
    document_path: str
    document_type: str  # 'pdf', 'transcript', 'syllabus'


# --- Health Check ---
@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "ai-satellite",
        "model": os.getenv("OLLAMA_MODEL", "llama3:8b"),
    }


# --- AI Study Assistant Endpoints ---
@app.post("/api/ai/ask", response_model=StudyAnswer)
async def ask_study_question(request: StudyQuestion):
    """
    Answer a student's question using RAG.
    
    1. Retrieve relevant document chunks from pgvector for the given course_id.
    2. Pass the chunks + question to the local Ollama LLM.
    3. Return the answer with source references.
    
    The LLM ONLY answers based on official syllabus content (no hallucination).
    """
    # TODO: Implement RAG pipeline with LangChain + pgvector + Ollama
    raise HTTPException(status_code=501, detail="RAG pipeline not yet implemented")


@app.post("/api/ai/embed")
async def embed_course_material(request: EmbeddingRequest):
    """
    Index course material into pgvector.
    
    1. Extract text from the document (PDF, transcript).
    2. Chunk the text into overlapping segments.
    3. Generate embeddings via Ollama.
    4. Store embeddings in pgvector (schema_ai).
    """
    # TODO: Implement document embedding pipeline
    raise HTTPException(status_code=501, detail="Embedding pipeline not yet implemented")


@app.get("/api/ai/courses/{course_id}/status")
async def get_course_embedding_status(course_id: str):
    """
    Check the embedding status for a course.
    Returns how many documents and chunks are indexed.
    """
    # TODO: Query pgvector for embedding stats
    raise HTTPException(status_code=501, detail="Status endpoint not yet implemented")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("AI_PORT", "8001")),
        reload=True,
    )
