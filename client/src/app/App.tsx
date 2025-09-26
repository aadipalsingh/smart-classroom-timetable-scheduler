import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { AppSidebar } from "@/shared/components/layout/AppSidebar";
import { TopNavbar } from "@/shared/components/layout/TopNavbar";
import { AuthProvider } from "@/shared/contexts/AuthContext";
import { SettingsProvider } from "@/shared/contexts/SettingsContext";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute";

// Landing Page
import { LandingPage } from "../features/landing";

// Auth Pages
import Login from "../features/auth/Login.tsx";
import SignUp from "../features/auth/SignUp.tsx";
import ForgotPassword from "../features/auth/ForgotPassword.tsx";

// Dashboard
import Dashboard from "../features/dashboard/Dashboard";
import Notifications from "../features/dashboard/Notifications";

// Timetable Feature
import CreateTimetable from "../features/timetable/CreateTimetable";
import TimetableResults from "../features/timetable/TimetableResults";
import Suggestions from "../features/timetable/Suggestions";

// Faculty Feature
import Faculties from "../features/faculty/Faculties";

// Classroom Feature
import Classrooms from "../features/classrooms/Classrooms";

// Settings Feature
import Settings from "../features/settings/Settings";
import Profile from "../features/settings/Profile";

// App Level Pages
import NotFound from "./NotFound";

const queryClient = new QueryClient();

// Layout component for authenticated pages
const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <TopNavbar />
        <main className="flex-1 overflow-auto p-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SettingsProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected Routes with Authentication */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Dashboard />
                </AuthenticatedLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/create-timetable" element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <CreateTimetable />
                </AuthenticatedLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/timetable-results" element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <TimetableResults />
                </AuthenticatedLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/faculties" element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Faculties />
                </AuthenticatedLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/classrooms" element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Classrooms />
                </AuthenticatedLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/suggestions" element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Suggestions />
                </AuthenticatedLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Settings />
                </AuthenticatedLayout>
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Profile />
                </AuthenticatedLayout>
              </ProtectedRoute>
            } />

            <Route path="/notifications" element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Notifications />
                </AuthenticatedLayout>
              </ProtectedRoute>
            } />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SettingsProvider>
  </AuthProvider>
</QueryClientProvider>
);

export default App;
            