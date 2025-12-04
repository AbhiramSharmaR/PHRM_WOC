from pydantic import BaseModel, EmailStr, Field
from typing import List, Dict, Optional
from datetime import datetime


class ConfigBase(BaseModel):
    model_config = {"from_attributes": True}


# USER BASE
class UserBase(ConfigBase):
    email: EmailStr
    full_name: str
    password: str
    role: str


# PATIENT
class Patient(ConfigBase):
    user_id: str
    patient_id: str
    age: int
    gender: str
    contact_number: str
    family_members: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.utcnow)


# DOCTOR
class Doctor(ConfigBase):
    user_id: str
    specialization: str
    registration_number: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


# FAMILY MEMBER
class FamilyMember(ConfigBase):
    user_id: str
    linked_patient_id: str
    relationship: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


# SYMPTOMS
class SymptomRecord(ConfigBase):
    patient_id: str
    symptoms: List[Dict]
    note: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)


# VITALS
class VitalsRecord(ConfigBase):
    patient_id: str
    type: str
    value: float
    timestamp: datetime = Field(default_factory=datetime.utcnow)


# PRESCRIPTIONS
class Prescription(ConfigBase):
    patient_id: str
    doctor_id: str
    medications: List[Dict]
    notes: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)


# GAMIFICATION
class TaskHistory(ConfigBase):
    patient_id: str
    task_name: str
    completed: bool
    points_earned: int
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class PointsWallet(ConfigBase):
    patient_id: str
    total_points: int = 0
