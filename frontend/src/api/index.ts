// API Module Exports
// Clean, modular API functions for easy backend integration

export { authApi } from './auth';
export { patientsApi } from './patients';
export { doctorsApi } from './doctors';
export { familyApi } from './family';
export { prescriptionsApi } from './prescriptions';
export { default as apiClient } from './client';

// Re-export types for convenience
export type {
  User,
  UserRole,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  PatientProfile,
  DoctorProfile,
  FamilyLink,
  LinkedPatient,
  Prescription,
  CreatePrescription,
} from '@/types';
