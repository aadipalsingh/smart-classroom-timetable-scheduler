import { useState } from "react"
import { 
  LayoutDashboard, 
  CalendarPlus, 
  Users, 
  Building, 
  Lightbulb, 
  Settings, 
  LogOut
} from "lucide-react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Logo } from "./Logo"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/dashboard", 
    icon: LayoutDashboard,
    description: "Overview and analytics",
    badge: null
  },
  { 
    title: "Create Timetable", 
    url: "/create-timetable", 
    icon: CalendarPlus,
    description: "Generate schedules",
    badge: "New"
  },
  { 
    title: "Faculties", 
    url: "/faculties", 
    icon: Users,
    description: "Manage professors",
    badge: null
  },
  { 
    title: "Classrooms", 
    url: "/classrooms", 
    icon: Building,
    description: "Room management",
    badge: null
  },
  { 
    title: "Suggestions", 
    url: "/suggestions", 
    icon: Lightbulb,
    description: "AI insights",
    badge: "AI"
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const currentPath = location.pathname

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const isActive = (path: string) => currentPath === path

  return (
    <Sidebar
      className="bg-gradient-to-br from-primary via-primary/95 to-primary/80 border-r border-white/10"
      collapsible="icon"
    >
      {/* Logo Area */}
      <div className={`${state === "collapsed" ? "p-3" : "p-6"} border-b border-white/10 transition-all duration-200`}>
        <div className={`${state === "collapsed" ? "flex justify-center" : ""}`}>
          <Logo size="md" variant="light" showText={state !== "collapsed"} />
        </div>
      </div>

      <SidebarContent className={`${state === "collapsed" ? "p-2" : "p-4"} transition-all duration-200`}>
        <SidebarGroup>
          {state !== "collapsed" && (
            <SidebarGroupLabel className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-6 px-2">
              Navigation
            </SidebarGroupLabel>
          )}
          
          <SidebarGroupContent>
            <SidebarMenu className={`${state === "collapsed" ? "space-y-1" : "space-y-3"}`}>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        state === "collapsed" 
                          ? `flex items-center justify-center w-full py-3 px-1 rounded-lg transition-all duration-200 ${
                              isActive 
                                ? "bg-white/25 text-white shadow-sm" 
                                : "text-white/80 hover:bg-white/15 hover:text-white"
                            }`
                          : `flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 ${
                              isActive 
                                ? "bg-white/20 text-white shadow-sm" 
                                : "text-white/80 hover:bg-white/10 hover:text-white"
                            }`
                      }
                      title={state === "collapsed" ? item.title : undefined}
                    >
                      {state === "collapsed" ? (
                        <item.icon className="h-5 w-5 text-white" />
                      ) : (
                        <>
                          <div className="flex-shrink-0 p-2 rounded-lg bg-white/10 transition-all duration-200">
                            <item.icon className="h-5 w-5" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-white truncate">
                                  {item.title}
                                </div>
                                <div className="text-xs text-white/60 mt-1 truncate">
                                  {item.description}
                                </div>
                              </div>
                              {item.badge && (
                                <div className="ml-3 flex-shrink-0">
                                  <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                                    item.badge === "AI" 
                                      ? "bg-gradient-to-r from-accent to-accent/80 text-white"
                                      : item.badge === "New"
                                      ? "bg-success text-success-foreground"
                                      : "bg-white/20 text-white"
                                  }`}>
                                    {item.badge}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Section */}
        <SidebarGroup className={`${state === "collapsed" ? "mt-6" : "mt-10"}`}>
          {state !== "collapsed" && (
            <SidebarGroupLabel className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-6 px-2">
              System
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/settings" 
                    className={({ isActive }) =>
                      state === "collapsed" 
                        ? `flex items-center justify-center w-full py-3 px-1 rounded-lg transition-all duration-200 ${
                            isActive 
                              ? "bg-white/25 text-white shadow-sm" 
                              : "text-white/80 hover:bg-white/15 hover:text-white"
                          }`
                        : `flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 ${
                            isActive 
                              ? "bg-white/20 text-white shadow-sm" 
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`
                    }
                    title={state === "collapsed" ? "Settings" : undefined}
                  >
                    {state === "collapsed" ? (
                      <Settings className="h-5 w-5 text-white" />
                    ) : (
                      <>
                        <div className="flex-shrink-0 p-2 rounded-lg bg-white/10 transition-all duration-200">
                          <Settings className="h-5 w-5" />
                        </div>
                        
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white truncate">
                            Settings
                          </div>
                          <div className="text-xs text-white/60 mt-1 truncate">
                            Preferences & config
                          </div>
                        </div>
                      </>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className={`${state === "collapsed" ? "p-2" : "p-4"} border-t border-white/10 transition-all duration-200`}>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`w-full text-white/80 hover:bg-red-500/20 hover:text-white transition-all duration-200 h-auto ${
            state === "collapsed" 
              ? "justify-center px-2 py-3" 
              : "justify-start px-4 py-4"
          }`}
          onClick={handleLogout}
          title={state === "collapsed" ? "Sign Out" : undefined}
        >
          <div className={`flex-shrink-0 rounded-lg transition-all duration-200 ${
            state === "collapsed" 
              ? "p-1.5 bg-transparent hover:bg-red-500/20" 
              : "p-2 bg-red-500/10"
          }`}>
            <LogOut className="h-5 w-5" />
          </div>
          {state !== "collapsed" && (
            <div className="ml-3 min-w-0">
              <div className="text-sm font-semibold text-white">Sign Out</div>
              <div className="text-xs text-white/60 mt-1">Logout securely</div>
            </div>
          )}
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}