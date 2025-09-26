import { 
  CalendarPlus, 
  Users, 
  Building, 
  Lightbulb, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  BookOpen,
  MapPin,
  UserCheck,
  CalendarDays,
  GraduationCap,
  MapPin as Location
} from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const navigate = useNavigate()

  const quickActions = [
    {
      title: "Create Timetable",
      description: "Generate new optimized schedule",
      icon: CalendarPlus,
      color: "bg-primary",
      action: () => navigate("/create-timetable")
    },
    {
      title: "Manage Faculties", 
      description: "View and edit faculty information",
      icon: Users,
      color: "bg-accent",
      action: () => navigate("/faculties")
    },
    {
      title: "Manage Classrooms",
      description: "Configure rooms and capacity",
      icon: Building,
      color: "bg-success",
      action: () => navigate("/classrooms")
    },
    {
      title: "View Suggestions",
      description: "AI-powered schedule improvements",
      icon: Lightbulb,
      color: "bg-warning",
      action: () => navigate("/suggestions")
    }
  ]

  const stats = [
    {
      title: "Active Timetables",
      value: "12",
      change: "+2 this week",
      icon: Calendar,
      trend: "up"
    },
    {
      title: "Total Faculties",
      value: "48",
      change: "+3 new hires",
      icon: UserCheck,
      trend: "up"
    },
    {
      title: "Classrooms",
      value: "24",
      change: "2 under maintenance", 
      icon: MapPin,
      trend: "stable"
    },
    {
      title: "Subjects",
      value: "156",
      change: "+8 this semester",
      icon: BookOpen,
      trend: "up"
    }
  ]

  const recentActivity = [
    {
      action: "Timetable Generated",
      details: "Computer Science - Semester 3",
      time: "2 hours ago",
      status: "success"
    },
    {
      action: "Faculty Leave Request",
      details: "Dr. Smith - March 15-20",
      time: "4 hours ago", 
      status: "pending"
    },
    {
      action: "Room Conflict Resolved",
      details: "Lab 201 - Morning slot",
      time: "6 hours ago",
      status: "success"
    },
    {
      action: "Schedule Update Required",
      details: "Electronics Dept - Room change",
      time: "1 day ago",
      status: "warning"
    }
  ]

  const upcomingEvents = [
    {
      title: "Semester Final Exams",
      date: "Dec 15, 2025",
      time: "9:00 AM",
      location: "Main Hall",
      type: "exam",
      priority: "high"
    },
    
    {
      title: "New Student Orientation",
      date: "Jan 8, 2026",
      time: "10:00 AM", 
      location: "Auditorium",
      type: "orientation",
      priority: "high"
    }
  ]

  return (
    <div className="p-6 space-y-6 bg-white min-h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to TimeNest. Manage schedules efficiently with AI-powered optimization.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">
                {stat.title}
              </h3>
              <stat.icon className="h-5 w-5 text-gray-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          <p className="text-gray-600">
            Frequently used features for schedule management
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => (
            <div 
              key={idx} 
              className="p-6 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all duration-200 hover:scale-105"
              onClick={action.action}
            >
              <div className="text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-lg ${action.color} flex items-center justify-center`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            </div>
            <p className="text-gray-600">
              Latest updates and system notifications
            </p>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex items-center gap-3">
                  {activity.status === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {activity.status === "pending" && <Clock className="h-4 w-4 text-yellow-500" />}
                  {activity.status === "warning" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  
                  <div>
                    <p className="font-medium text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.details}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    activity.status === "success" ? "bg-green-100 text-green-800" :
                    activity.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                    "bg-red-100 text-red-800"
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
            </div>
            <p className="text-gray-600">
              Important academic events and deadlines
            </p>
          </div>
          
          <div className="space-y-4">
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      event.type === 'exam' ? 'bg-red-100' :
                      event.type === 'meeting' ? 'bg-blue-100' :
                      event.type === 'orientation' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      {event.type === 'exam' && <GraduationCap className="h-4 w-4 text-red-600" />}
                      {event.type === 'meeting' && <Users className="h-4 w-4 text-blue-600" />}
                      {event.type === 'orientation' && <UserCheck className="h-4 w-4 text-green-600" />}
                      {event.type === 'workshop' && <Building className="h-4 w-4 text-purple-600" />}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Location className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.priority === 'high' ? 'bg-red-100 text-red-700' :
                    event.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {event.priority}
                  </span>
                </div>
              </div>
            ))}
            
            <div className="pt-2 text-center">
              <button className="text-primary hover:text-primary/80 text-sm font-medium">
                View All Events →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}