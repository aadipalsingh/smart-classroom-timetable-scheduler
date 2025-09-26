/**
 * Classroom API service
 * Handles all classroom-related API operations
 */
import { apiService, ApiResponse } from '@/shared/services/api'

export interface Classroom {
  id: string
  name: string
  capacity: number
  type: 'lecture' | 'lab' | 'seminar' | 'auditorium'
  building: string
  floor: number
  equipment: string[]
  availability: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateClassroomRequest {
  name: string
  capacity: number
  type: 'lecture' | 'lab' | 'seminar' | 'auditorium'
  building: string
  floor: number
  equipment?: string[]
}

export interface UpdateClassroomRequest extends Partial<CreateClassroomRequest> {
  id: string
  availability?: boolean
}

class ClassroomService {
  private endpoint = '/classrooms'

  async getAllClassrooms(): Promise<ApiResponse<Classroom[]>> {
    return apiService.get<Classroom[]>(this.endpoint)
  }

  async getClassroomById(id: string): Promise<ApiResponse<Classroom>> {
    return apiService.get<Classroom>(`${this.endpoint}/${id}`)
  }

  async createClassroom(classroomData: CreateClassroomRequest): Promise<ApiResponse<Classroom>> {
    return apiService.post<Classroom>(this.endpoint, classroomData)
  }

  async updateClassroom(classroomData: UpdateClassroomRequest): Promise<ApiResponse<Classroom>> {
    const { id, ...updateData } = classroomData
    return apiService.put<Classroom>(`${this.endpoint}/${id}`, updateData)
  }

  async deleteClassroom(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`${this.endpoint}/${id}`)
  }

  async getClassroomsByType(type: Classroom['type']): Promise<ApiResponse<Classroom[]>> {
    return apiService.get<Classroom[]>(`${this.endpoint}/type/${type}`)
  }

  async getAvailableClassrooms(): Promise<ApiResponse<Classroom[]>> {
    return apiService.get<Classroom[]>(`${this.endpoint}/available`)
  }
}

export const classroomService = new ClassroomService()