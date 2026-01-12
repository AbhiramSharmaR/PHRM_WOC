import apiClient from './client';
import { Prescription, CreatePrescription } from '@/types';

export const prescriptionsApi = {
  /**
   * Create prescription (doctor only)
   * POST /prescriptions/
   */
  create: async (prescription: CreatePrescription): Promise<Prescription> => {
    const response = await apiClient.post<Prescription>('/prescriptions/', prescription);
    return response.data;
  },

  /**
   * Get prescriptions for a patient
   * GET /prescriptions/patient/{patient_user_id}
   */
  getByPatient: async (patientUserId: string): Promise<Prescription[]> => {
    const response = await apiClient.get<Prescription[]>(`/prescriptions/patient/${patientUserId}`);
    return response.data;
  },

  /**
   * Update prescription
   * PUT /prescriptions/{prescription_id}
   */
  update: async (prescriptionId: string, data: Partial<CreatePrescription>): Promise<Prescription> => {
    const response = await apiClient.put<Prescription>(`/prescriptions/${prescriptionId}`, data);
    return response.data;
  },

  /**
   * Delete prescription
   * DELETE /prescriptions/{prescription_id}
   */
  delete: async (prescriptionId: string): Promise<void> => {
    await apiClient.delete(`/prescriptions/${prescriptionId}`);
  },
};
