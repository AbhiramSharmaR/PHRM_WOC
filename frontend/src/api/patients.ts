import apiClient from './client';
import { PatientProfile } from '@/types';

export const patientsApi = {
  /**
   * Create patient profile
   * POST /patients/profile
   */
  createProfile: async (profile: PatientProfile): Promise<PatientProfile> => {
    const response = await apiClient.post<PatientProfile>('/patients/profile', profile);
    return response.data;
  },

  /**
   * Get current patient profile
   * GET /patients/me
   */
  getProfile: async (): Promise<PatientProfile> => {
    const response = await apiClient.get<PatientProfile>('/patients/me');
    return response.data;
  },

  /**
   * Update patient profile
   * PUT /patients/profile
   */
  updateProfile: async (profile: Partial<PatientProfile>): Promise<PatientProfile> => {
    const response = await apiClient.put<PatientProfile>('/patients/profile', profile);
    return response.data;
  },

  /**
   * Delete patient profile
   * DELETE /patients/profile
   */
  deleteProfile: async (): Promise<void> => {
    await apiClient.delete('/patients/profile');
  },
};
