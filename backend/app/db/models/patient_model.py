from pydantic import BaseModel
from typing import Optional

class PatientCreate(BaseModel):
    age: int
    gender: str
    blood_group: Optional[str] = None
    allergies: Optional[str] = None
    medical_history: Optional[str] = None
