import { useState } from "react"
import { Building, Plus, Search, Edit, Trash2, MapPin, Users, X } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { Badge } from "@/shared/components/ui/badge"
import { useToast } from "@/shared/hooks/use-toast"

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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null)
  const { toast } = useToast()
  
  const [classrooms, setClassrooms] = useState<Classroom[]>([
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

  // Form state for adding new classroom
  const [newClassroom, setNewClassroom] = useState({
    name: "",
    capacity: "",
    type: "",
    building: "",
    floor: "",
    equipment: [] as string[],
    status: "available" as const
  })

  const [currentEquipment, setCurrentEquipment] = useState("")

  // Edit classroom state
  const [editClassroom, setEditClassroom] = useState({
    name: "",
    capacity: "",
    type: "",
    building: "",
    floor: "",
    equipment: [] as string[],
    status: "available" as Classroom['status']
  })

  const [editCurrentEquipment, setEditCurrentEquipment] = useState("")

  const availableEquipment = [
    "Projector", "Whiteboard", "Audio System", "Air Conditioning", 
    "Computers", "Smart Board", "Microphones", "Stage Lighting", 
    "Video Camera", "Sound System", "Chairs", "Tables"
  ]

  const addEquipment = (equipment: string) => {
    if (equipment && !newClassroom.equipment.includes(equipment)) {
      setNewClassroom(prev => ({
        ...prev,
        equipment: [...prev.equipment, equipment]
      }))
      setCurrentEquipment("")
    }
  }

  const removeEquipment = (equipment: string) => {
    setNewClassroom(prev => ({
      ...prev,
      equipment: prev.equipment.filter(item => item !== equipment)
    }))
  }

  const handleAddClassroom = () => {
    // Validation
    if (!newClassroom.name || !newClassroom.capacity || !newClassroom.type || !newClassroom.building || !newClassroom.floor) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    const classroom: Classroom = {
      id: (classrooms.length + 1).toString(),
      name: newClassroom.name,
      capacity: parseInt(newClassroom.capacity),
      type: newClassroom.type,
      building: newClassroom.building,
      floor: parseInt(newClassroom.floor),
      equipment: newClassroom.equipment,
      status: newClassroom.status
    }

    setClassrooms(prev => [...prev, classroom])
    
    // Reset form
    setNewClassroom({
      name: "",
      capacity: "",
      type: "",
      building: "",
      floor: "",
      equipment: [],
      status: "available"
    })
    
    setIsAddDialogOpen(false)
    
    toast({
      title: "Success",
      description: `Classroom "${classroom.name}" has been added successfully`,
    })
  }

  // Edit classroom functions
  const openEditDialog = (classroom: Classroom) => {
    setSelectedClassroom(classroom)
    setEditClassroom({
      name: classroom.name,
      capacity: classroom.capacity.toString(),
      type: classroom.type,
      building: classroom.building,
      floor: classroom.floor.toString(),
      equipment: [...classroom.equipment],
      status: classroom.status
    })
    setIsEditDialogOpen(true)
  }

  const addEditEquipment = (equipment: string) => {
    if (equipment && !editClassroom.equipment.includes(equipment)) {
      setEditClassroom(prev => ({
        ...prev,
        equipment: [...prev.equipment, equipment]
      }))
      setEditCurrentEquipment("")
    }
  }

  const removeEditEquipment = (equipment: string) => {
    setEditClassroom(prev => ({
      ...prev,
      equipment: prev.equipment.filter(item => item !== equipment)
    }))
  }

  const handleEditClassroom = () => {
    if (!selectedClassroom) return

    // Validation
    if (!editClassroom.name || !editClassroom.capacity || !editClassroom.type || !editClassroom.building || !editClassroom.floor) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    const updatedClassroom: Classroom = {
      ...selectedClassroom,
      name: editClassroom.name,
      capacity: parseInt(editClassroom.capacity),
      type: editClassroom.type,
      building: editClassroom.building,
      floor: parseInt(editClassroom.floor),
      equipment: editClassroom.equipment,
      status: editClassroom.status
    }

    setClassrooms(prev => 
      prev.map(classroom => 
        classroom.id === selectedClassroom.id ? updatedClassroom : classroom
      )
    )
    
    setIsEditDialogOpen(false)
    setSelectedClassroom(null)
    
    toast({
      title: "Success",
      description: `Classroom "${updatedClassroom.name}" has been updated successfully`,
    })
  }

  // Delete classroom functions
  const openDeleteDialog = (classroom: Classroom) => {
    setSelectedClassroom(classroom)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteClassroom = () => {
    if (!selectedClassroom) return

    setClassrooms(prev => 
      prev.filter(classroom => classroom.id !== selectedClassroom.id)
    )
    
    setIsDeleteDialogOpen(false)
    
    toast({
      title: "Success",
      description: `Classroom "${selectedClassroom.name}" has been deleted successfully`,
    })
    
    setSelectedClassroom(null)
  }

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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              <Plus className="h-4 w-4 mr-2" />
              Add Classroom
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Classroom</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new classroom to the system.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Room Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Room 101"
                    value={newClassroom.name}
                    onChange={(e) => setNewClassroom(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="e.g., 40"
                    value={newClassroom.capacity}
                    onChange={(e) => setNewClassroom(prev => ({ ...prev, capacity: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Room Type *</Label>
                  <Select onValueChange={(value) => setNewClassroom(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lecture Hall">Lecture Hall</SelectItem>
                      <SelectItem value="Computer Lab">Computer Lab</SelectItem>
                      <SelectItem value="Auditorium">Auditorium</SelectItem>
                      <SelectItem value="Laboratory">Laboratory</SelectItem>
                      <SelectItem value="Seminar Room">Seminar Room</SelectItem>
                      <SelectItem value="Conference Room">Conference Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={(value) => setNewClassroom(prev => ({ ...prev, status: value as any }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="available" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="occupied">Occupied</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="building">Building *</Label>
                  <Select onValueChange={(value) => setNewClassroom(prev => ({ ...prev, building: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select building" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Academic Block A">Academic Block A</SelectItem>
                      <SelectItem value="Academic Block B">Academic Block B</SelectItem>
                      <SelectItem value="Academic Block C">Academic Block C</SelectItem>
                      <SelectItem value="Laboratory Block">Laboratory Block</SelectItem>
                      <SelectItem value="Administrative Block">Administrative Block</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floor">Floor *</Label>
                  <Select onValueChange={(value) => setNewClassroom(prev => ({ ...prev, floor: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select floor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Ground Floor</SelectItem>
                      <SelectItem value="2">First Floor</SelectItem>
                      <SelectItem value="3">Second Floor</SelectItem>
                      <SelectItem value="4">Third Floor</SelectItem>
                      <SelectItem value="5">Fourth Floor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Equipment</Label>
                <div className="flex gap-2">
                  <Select onValueChange={setCurrentEquipment}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select equipment to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableEquipment.map((equipment) => (
                        <SelectItem key={equipment} value={equipment}>
                          {equipment}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => addEquipment(currentEquipment)}
                  >
                    Add
                  </Button>
                </div>
                
                {newClassroom.equipment.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newClassroom.equipment.map((equipment) => (
                      <Badge key={equipment} variant="secondary" className="flex items-center gap-1">
                        {equipment}
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-red-500" 
                          onClick={() => removeEquipment(equipment)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddClassroom}>
                  Add Classroom
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
              <Button 
                size="sm" 
                variant="outline" 
                className="text-blue-600 hover:bg-blue-50"
                onClick={() => openEditDialog(classroom)}
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-red-600 hover:bg-red-50"
                onClick={() => openDeleteDialog(classroom)}
              >
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

      {/* Edit Classroom Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Classroom</DialogTitle>
            <DialogDescription>
              Update the classroom details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Room Name *</Label>
                <Input
                  id="edit-name"
                  placeholder="e.g., Room 101"
                  value={editClassroom.name}
                  onChange={(e) => setEditClassroom(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-capacity">Capacity *</Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  placeholder="e.g., 40"
                  value={editClassroom.capacity}
                  onChange={(e) => setEditClassroom(prev => ({ ...prev, capacity: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-type">Room Type *</Label>
                <Select value={editClassroom.type} onValueChange={(value) => setEditClassroom(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lecture Hall">Lecture Hall</SelectItem>
                    <SelectItem value="Computer Lab">Computer Lab</SelectItem>
                    <SelectItem value="Auditorium">Auditorium</SelectItem>
                    <SelectItem value="Laboratory">Laboratory</SelectItem>
                    <SelectItem value="Seminar Room">Seminar Room</SelectItem>
                    <SelectItem value="Conference Room">Conference Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={editClassroom.status} onValueChange={(value) => setEditClassroom(prev => ({ ...prev, status: value as Classroom['status'] }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-building">Building *</Label>
                <Select value={editClassroom.building} onValueChange={(value) => setEditClassroom(prev => ({ ...prev, building: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select building" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Academic Block A">Academic Block A</SelectItem>
                    <SelectItem value="Academic Block B">Academic Block B</SelectItem>
                    <SelectItem value="Academic Block C">Academic Block C</SelectItem>
                    <SelectItem value="Laboratory Block">Laboratory Block</SelectItem>
                    <SelectItem value="Administrative Block">Administrative Block</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-floor">Floor *</Label>
                <Select value={editClassroom.floor} onValueChange={(value) => setEditClassroom(prev => ({ ...prev, floor: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ground Floor</SelectItem>
                    <SelectItem value="2">First Floor</SelectItem>
                    <SelectItem value="3">Second Floor</SelectItem>
                    <SelectItem value="4">Third Floor</SelectItem>
                    <SelectItem value="5">Fourth Floor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Equipment</Label>
              <div className="flex gap-2">
                <Select onValueChange={setEditCurrentEquipment}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select equipment to add" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableEquipment.map((equipment) => (
                      <SelectItem key={equipment} value={equipment}>
                        {equipment}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => addEditEquipment(editCurrentEquipment)}
                >
                  Add
                </Button>
              </div>
              
              {editClassroom.equipment.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {editClassroom.equipment.map((equipment) => (
                    <Badge key={equipment} variant="secondary" className="flex items-center gap-1">
                      {equipment}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-red-500" 
                        onClick={() => removeEditEquipment(equipment)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditClassroom}>
                Update Classroom
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Classroom</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this classroom? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedClassroom && (
            <div className="py-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-red-900">{selectedClassroom.name}</span>
                </div>
                <p className="text-sm text-red-700">
                  {selectedClassroom.type} • {selectedClassroom.building} • Floor {selectedClassroom.floor}
                </p>
                <p className="text-sm text-red-600 mt-1">
                  Capacity: {selectedClassroom.capacity} students
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteClassroom}>
              Delete Classroom
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}