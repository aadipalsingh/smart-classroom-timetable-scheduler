import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface InstitutionSettings {
  collegeName: string
  academicYear: string
  logoUrl?: string
  primaryColor: string
  address?: string
  phone?: string
  email?: string
}

interface SettingsContextType {
  settings: InstitutionSettings
  updateSettings: (newSettings: Partial<InstitutionSettings>) => void
  resetSettings: () => void
}

const defaultSettings: InstitutionSettings = {
  collegeName: "Your College Name", // Change this to your desired default
  academicYear: "Academic Year xxxx-xx",
  primaryColor: "#1e40af", // blue-700
  address: "",
  phone: "",
  email: ""
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

interface SettingsProviderProps {
  children: ReactNode
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<InstitutionSettings>(defaultSettings)

  useEffect(() => {
    // Load settings from localStorage on startup
    const savedSettings = localStorage.getItem('institutionSettings')
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsedSettings })
      } catch (error) {
        console.error('Error parsing saved settings:', error)
      }
    }
  }, [])

  const updateSettings = (newSettings: Partial<InstitutionSettings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
    localStorage.setItem('institutionSettings', JSON.stringify(updatedSettings))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    localStorage.setItem('institutionSettings', JSON.stringify(defaultSettings))
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}