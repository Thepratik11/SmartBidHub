import { z } from 'zod';
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Validation schemas
export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const buyerRegisterSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  organizationName: z.string().trim().min(2, { message: "Organization name is required" }).max(200),
  department: z.string().trim().min(2, { message: "Department is required" }).max(100),
  organizationType: z.enum(["GOVERNMENT", "PRIVATE", "PSU"], { message: "Select organization type" }),
  contactPhone: z.string().regex(/^[0-9]{10}$/, { message: "Enter a valid 10-digit phone number" }),
});

export const vendorRegisterSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  companyName: z.string().trim().min(2, { message: "Company name is required" }).max(200),
  gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, { 
    message: "Enter a valid GST number (e.g., 27ABCDE1234F5Z7)" 
  }),
  address: z.string().trim().min(1, { message: "Address must be at least 10 characters" }).max(500),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type BuyerRegisterInput = z.infer<typeof buyerRegisterSchema>;
export type VendorRegisterInput = z.infer<typeof vendorRegisterSchema>;

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  async login(credentials: LoginInput): Promise<ApiResponse> {
    try {
    const response = await api.post('/auth/login', credentials);
    const data = response.data;

    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userRole', data.role);
      // STORE THE PROFILE ID
      if (data.profileId) {
        localStorage.setItem('profileId', data.profileId.toString());
      }
    }

    return { success: true, data };
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Login failed. Please check your credentials.',
      };
    }
  },

  async registerBuyer(data: BuyerRegisterInput): Promise<ApiResponse> {
    try {
      // We send 'data' as the body and the raw password as a param if your service expects it,
      // but based on your BuyerRegistrationRequest DTO, 'data' contains everything.
      const response = await api.post('/buyers/register', data);
      return { success: true, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Registration failed.',
      };
    }
  },

  async registerVendor(data: VendorRegisterInput): Promise<ApiResponse> {
    try {
      const response = await api.post('/vendors/register', data);
      return { success: true, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Registration failed.',
      };
    }
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  },
};