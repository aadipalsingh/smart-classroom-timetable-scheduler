/**
 * Environment configuration hook
 * Provides centralized access to environment variables and feature flags
 */

interface EnvironmentConfig {
  appTitle: string
  appVersion: string
  apiBaseUrl: string
  environment: 'development' | 'production' | 'test'
  features: {
    notifications: boolean
    exportPdf: boolean
    analytics: boolean
  }
  defaults: {
    collegeName: string
    academicYear: string
  }
}

export const useEnvironment = (): EnvironmentConfig => {
  return {
    appTitle: import.meta.env.VITE_APP_TITLE || "Smart Classroom & Timetable Scheduler",
    appVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "/api",
    environment: (import.meta.env.VITE_ENVIRONMENT as EnvironmentConfig['environment']) || 'development',
    features: {
      notifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
      exportPdf: import.meta.env.VITE_ENABLE_EXPORT_PDF === 'true',
      analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    },
    defaults: {
      collegeName: import.meta.env.VITE_DEFAULT_COLLEGE_NAME || "Your College Name",
      academicYear: import.meta.env.VITE_DEFAULT_ACADEMIC_YEAR || "2024-25",
    }
  }
}

// Helper functions for common environment checks
export const isDevelopment = () => import.meta.env.DEV
export const isProduction = () => import.meta.env.PROD
export const getApiUrl = (endpoint: string) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api"
  return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
}