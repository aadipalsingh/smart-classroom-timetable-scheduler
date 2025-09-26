/**
 * Faculty API service
 * Handles all faculty-related API operations
 */
import { apiService, ApiResponse } from '@/shared/services/api'

export interface Faculty {
  id: string
  name: string
  email: string
  department: string
  subjects: string[]
  maxHoursPerWeek: number
  preferredTimeSlots: string[]
  unavailableSlots: string[]
  createdAt: string
  updatedAt: string
}

export interface CreateFacultyRequest {
  name: string
  email: string
  department: string
  subjects: string[]
  maxHoursPerWeek: number
  preferredTimeSlots?: string[]
  unavailableSlots?: string[]
}

export interface UpdateFacultyRequest extends Partial<CreateFacultyRequest> {
  id: string
}

class FacultyService {
  private endpoint = '/faculty'

  async getAllFaculty(): Promise<ApiResponse<Faculty[]>> {
    return apiService.get<Faculty[]>(this.endpoint)
  }

  async getFacultyById(id: string): Promise<ApiResponse<Faculty>> {
    return apiService.get<Faculty>(`${this.endpoint}/${id}`)
  }

  async createFaculty(facultyData: CreateFacultyRequest): Promise<ApiResponse<Faculty>> {
    return apiService.post<Faculty>(this.endpoint, facultyData)
  }

  async updateFaculty(facultyData: UpdateFacultyRequest): Promise<ApiResponse<Faculty>> {
    const { id, ...updateData } = facultyData
    return apiService.put<Faculty>(`${this.endpoint}/${id}`, updateData)
  }

  async deleteFaculty(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`${this.endpoint}/${id}`)
  }

  async getFacultyByDepartment(department: string): Promise<ApiResponse<Faculty[]>> {
    return apiService.get<Faculty[]>(`${this.endpoint}/department/${department}`)
  }
}

export const facultyService = new FacultyService()