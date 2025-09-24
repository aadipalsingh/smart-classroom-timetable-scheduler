import { useState } from "react"
import { Building, Plus, Search, Edit, Trash2, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Classroom {
  id: string
  name: string
  capacity: number
  type: string
  building: string
  floor: number
  equipment: string[]
  status: 'available' | 'occupied' | 'maintenance'
}

export default function Classrooms() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const [classrooms] = useState<Classroom[]>([
    {
      id: "1",
      name: "Room 101",
      capacity: 40,
      type: "Lecture Hall",
      building: "Academic Block A",
      floor: 1,
      equipment: ["Projector", "Whiteboard", "Audio System"],
      status: "available"
    },
    {
      id: "2", 
      name: "Lab 201",
      capacity: 30,
      type: "Computer Lab",
      building: "Academic Block B",
      floor: 2,
      equipment: ["30 Computers", "Projector", "Air Conditioning"],
      status: "occupied"
    },
    {
      id: "3",
      name: "Room 305",
      capacity: 60,
      type: "Auditorium",
      building: "Academic Block C", 
      floor: 3,
      equipment: ["Sound System", "Stage Lighting", "Microphones"],
      status: "maintenance"
    }
  ])

  const filteredClassrooms = classrooms.filter(classroom =>
    classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classroom.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classroom.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'occupied': return 'bg-yellow-100 text-yellow-800'
      case 'maintenance': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6 bg-white min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Classroom Management</h1>
          <p className="text-gray-600">Manage classrooms, labs, and their availability.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Classroom
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search classrooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-700">
              {classrooms.filter(r => r.status === 'available').length}
            </div>
            <div className="text-sm text-green-600">Available</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-700">
              {classrooms.filter(r => r.status === 'occupied').length}
            </div>
            <div className="text-sm text-yellow-600">Occupied</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-700">{classrooms.length}</div>
            <div className="text-sm text-blue-600">Total Rooms</div>
          </div>
        </div>
      </div>

      {/* Classrooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClassrooms.map((classroom) => (
          <div key={classroom.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{classroom.name}</h3>
                <p className="text-sm text-gray-600">{classroom.type}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(classroom.status)}`}>
                {classroom.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{classroom.building}, Floor {classroom.floor}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>Capacity: {classroom.capacity} students</span>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Equipment:</p>
                <div className="flex flex-wrap gap-1">
                  {classroom.equipment.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item}
                    </span>
                  ))}
                  {classroom.equipment.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      +{classroom.equipment.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
              <Button size="sm" variant="outline" className="text-blue-600 hover:bg-blue-50">
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredClassrooms.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Building className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No classrooms found</h3>
          <p className="text-sm">Try adjusting your search criteria or add a new classroom</p>
        </div>
      )}
    </div>
  )
}