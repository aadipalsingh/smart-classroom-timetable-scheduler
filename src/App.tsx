import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { AuthProvider } from "@/contexts/AuthContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Dashboard from "./pages/Dashboard";

import CreateTimetable from "./pages/CreateTimetable";
import TimetableResults from "./pages/TimetableResults";
import Faculties from "./pages/Faculties";
import Classrooms from "./pages/Classrooms";
import Suggestions from "./pages/Suggestions";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
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
            