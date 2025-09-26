import { useState } from "react"
import { User, Camera, Mail, Phone, MapPin, Calendar, Save, Edit } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { useToast } from "@/shared/hooks/use-toast"
import { useAuth } from "@/shared/contexts/AuthContext"

export default function Profile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "Dr. Admin",
    email: user?.email || "admin@college.edu",
    phone: "+1 (555) 123-4567",
    department: "Administration",
    address: "123 University Ave, Education City",
    joinDate: "January 2020",
    employeeId: "EMP001",
    designation: "System Administrator",
    bio: "Experienced administrator managing academic scheduling and timetable coordination for the institution."
  })

  const handleSave = () => {
    // Here you would typically save to backend
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  return (
    <div className="p-6 space-y-6 bg-white min-h-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your personal information and preferences.</p>
        </div>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          className={isEditing ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"}
        >
          <Edit className="h-4 w-4 mr-2" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                {profileData.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              {isEditing && (
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  onClick={() => toast({ title: "Feature Coming Soon", description: "Profile picture upload will be available soon." })}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-1">{profileData.name}</h2>
            <p className="text-gray-600 mb-2">{profileData.designation}</p>
            <p className="text-sm text-gray-500">{profileData.department}</p>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Calendar className="h-4 w-4" />
                Joined {profileData.joinDate}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                ID: {profileData.employeeId}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
            </div>
            
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={profileData.department}
                    onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={profileData.designation}
                    onChange={(e) => setProfileData({...profileData, designation: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    value={profileData.employeeId}
                    onChange={(e) => setProfileData({...profileData, employeeId: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
              </div>
              
              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    disabled={!isEditing}
                    className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
              </div>
              
              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? "bg-gray-50" : ""}`}
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              {/* Save Button */}
              {isEditing && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex gap-3">
                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}