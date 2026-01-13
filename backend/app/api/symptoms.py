from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

from app.ai.symptoms import analyze_symptoms

router = APIRouter(
    prefix="/symptomchecker",
    tags=["Symptom Checker"]
)


# -----------------------------
# Request Schema
# -----------------------------
class SymptomCheckRequest(BaseModel):
    symptoms: List[str]
    description: str | None = None


# -----------------------------
# Response Schema
# -----------------------------
class ConditionResult(BaseModel):
    name: str
    confidence: float


class SymptomCheckResponse(BaseModel):
    conditions: List[ConditionResult]
    risk_level: str
    advice: str


# -----------------------------
# API Endpoint
# -----------------------------
@router.post("/", response_model=SymptomCheckResponse)
def check_symptoms(payload: SymptomCheckRequest):
    if not payload.symptoms:
        raise HTTPException(status_code=400, detail="No symptoms provided")

    result = analyze_symptoms(payload.symptoms)
    return result
