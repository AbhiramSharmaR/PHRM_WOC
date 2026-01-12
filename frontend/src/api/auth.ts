import apiClient from './client';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '@/types';

export const authApi = {

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', credentials);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');   // ✅ FIXED HERE
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem('auth-storage');
  },
};
