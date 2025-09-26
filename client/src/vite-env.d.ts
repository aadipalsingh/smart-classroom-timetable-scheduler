/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_ENVIRONMENT: string
  readonly VITE_ENABLE_NOTIFICATIONS: string
  readonly VITE_ENABLE_EXPORT_PDF: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_DEFAULT_COLLEGE_NAME: string
  readonly VITE_DEFAULT_ACADEMIC_YEAR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}