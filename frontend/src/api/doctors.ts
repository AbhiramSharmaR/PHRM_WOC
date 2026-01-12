import apiClient from './client';
import { DoctorProfile } from '@/types';

export const doctorsApi = {
  /**
   * Create doctor profile
   * POST /doctors/profile
   */
  createProfile: async (profile: DoctorProfile): Promise<DoctorProfile> => {
    const response = await apiClient.post<DoctorProfile>('/doctors/profile', profile);
    return response.data;
  },

  /**
   * Get current doctor profile
   * GET /doctors/me
   */
  getProfile: async (): Promise<DoctorProfile> => {
    const response = await apiClient.get<DoctorProfile>('/doctors/me');
    return response.data;
  },

  /**
   * Update doctor profile
   * PUT /doctors/profile
   */
  updateProfile: async (profile: Partial<DoctorProfile>): Promise<DoctorProfile> => {
    const response = await apiClient.put<DoctorProfile>('/doctors/profile', profile);
    return response.data;
  },

  /**
   * Delete doctor profile
   * DELETE /doctors/profile
   */
  deleteProfile: async (): Promise<void> => {
    await apiClient.delete('/doctors/profile');
  },
};
