/**
 * Services index - Central export point for all services
 */

// API Services
export { apiService } from './api'
export type { ApiResponse } from './api'

// Feature Services
export { facultyService } from './facultyService'
export type { Faculty, CreateFacultyRequest, UpdateFacultyRequest } from './facultyService'

export { classroomService } from './classroomService'
export type { Classroom, CreateClassroomRequest, UpdateClassroomRequest } from './classroomService'

// Existing Services
export * from './timetableGenerator'
export * from './pdfService'