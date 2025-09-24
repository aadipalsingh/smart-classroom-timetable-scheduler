import { useState } from "react"
import { Bell, Check, X, Calendar, Users, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface NotificationItem {
  id: string
  type: 'info' | 'warning' | 'success' | 'error'
  title: string
  message: string
  time: string
  read: boolean
  category: 'schedule' | 'faculty' | 'classroom' | 'system'
}

interface NotificationDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  const navigate = useNavigate()
  
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'info',
      title: 'New Timetable Generated',
      message: 'Computer Science Department timetable is ready for review.',
      time: '2h ago',
      read: false,
      category: 'schedule'
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="h-4 w-4 text-orange-500" />
      case 'error': return <X className="h-4 w-4 text-red-500" />
      case 'success': return <Check className="h-4 w-4 text-green-500" />
      default: return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const handleViewAll = () => {
    navigate('/notifications')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900">Notifications</h3>
          <span className="text-sm text-gray-500">{unreadCount} unread</span>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto">
        {notifications.slice(0, 5).map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
              !notification.read ? 'bg-blue-50/30' : ''
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm text-gray-900 truncate">
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-1 line-clamp-2">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-blue-600 hover:bg-blue-50"
          onClick={handleViewAll}
        >
          View All Notifications
        </Button>
      </div>
    </div>
  )
}