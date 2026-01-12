import apiClient from './client';
import { FamilyLink, LinkedPatient } from '@/types';

export const familyApi = {
  /**
   * Link family member to patient
   * POST /family/link
   */
  linkPatient: async (link: FamilyLink): Promise<void> => {
    await apiClient.post('/family/link', link);
  },

  /**
   * Get all linked patients
   * GET /family/my-patients
   */
  getLinkedPatients: async (): Promise<LinkedPatient[]> => {
    const response = await apiClient.get<LinkedPatient[]>('/family/my-patients');
    return response.data;
  },

  /**
   * Unlink patient from family
   * DELETE /family/link/{patient_user_id}
   */
  unlinkPatient: async (patientUserId: string): Promise<void> => {
    await apiClient.delete(`/family/link/${patientUserId}`);
  },
};
