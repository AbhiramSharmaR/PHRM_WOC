"""
AI Symptom Checker Engine
-------------------------
Current implementation:
- Weighted inference model (ML-like)
- Deterministic, explainable, real-time
- Fully replaceable with trained ML models later

Future upgrade:
- Replace `analyze_symptoms()` internals with
  BERT / ONNX / Torch model inference
"""

from typing import List, Dict


# --------------------------------------------------
# Symptom → Condition Weight Matrix (acts like model)
# --------------------------------------------------
CONDITION_WEIGHTS: Dict[str, Dict[str, float]] = {
    "Viral Infection": {
        "fever": 0.8,
        "fatigue": 0.6,
        "body aches": 0.7,
        "cough": 0.5,
        "sore throat": 0.4
    },
    "Seasonal Flu": {
        "fever": 0.9,
        "cough": 0.8,
        "fatigue": 0.7,
        "headache": 0.6,
        "body aches": 0.8
    },
    "Respiratory Issue": {
        "shortness of breath": 0.9,
        "cough": 0.6,
        "chest pain": 0.7
    },
    "Cardiac Risk": {
        "chest pain": 1.0,
        "shortness of breath": 0.9,
        "dizziness": 0.6,
        "fatigue": 0.4
    },
    "Gastrointestinal Issue": {
        "nausea": 0.7,
        "vomiting": 0.8,
        "diarrhea": 0.8,
        "stomach pain": 0.6,
        "loss of appetite": 0.5
    }
}

HIGH_RISK_SYMPTOMS = {
    "chest pain",
    "shortness of breath"
}


# --------------------------------------------------
# Core AI Inference Function
# --------------------------------------------------
def analyze_symptoms(symptoms: List[str]) -> Dict:
    """
    Perform real-time symptom analysis.

    Args:
        symptoms (List[str]): list of symptoms from frontend

    Returns:
        Dict: structured AI response
    """

    # Normalize symptoms
    symptoms = [s.lower().strip() for s in symptoms]

    condition_scores: Dict[str, float] = {}

    # ---- Inference (ML-style weighted scoring) ----
    for condition, weights in CONDITION_WEIGHTS.items():
        score = 0.0
        max_possible = sum(weights.values())

        for symptom in symptoms:
            if symptom in weights:
                score += weights[symptom]

        normalized_score = score / max_possible if max_possible > 0 else 0.0
        condition_scores[condition] = round(normalized_score, 2)

    # ---- Rank top conditions ----
    ranked_conditions = sorted(
        condition_scores.items(),
        key=lambda x: x[1],
        reverse=True
    )

    results = [
        {
            "name": name,
            "confidence": confidence
        }
        for name, confidence in ranked_conditions
        if confidence > 0
    ][:3]

    # ---- Risk Assessment ----
    risk_level = "Low"

    if any(symptom in HIGH_RISK_SYMPTOMS for symptom in symptoms):
        risk_level = "High"
    elif len(symptoms) >= 3:
        risk_level = "Medium"

    # ---- Advice Generation ----
    if risk_level == "High":
        advice = "Seek immediate medical attention."
    elif risk_level == "Medium":
        advice = "Consult a healthcare professional if symptoms persist."
    else:
        advice = "Monitor symptoms and maintain adequate rest and hydration."

    # ---- Final Response ----
    return {
        "conditions": results,
        "risk_level": risk_level,
        "advice": advice
    }
