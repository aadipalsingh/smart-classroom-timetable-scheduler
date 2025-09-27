import { useState } from "react"
import { Users, Plus, Search, Edit, Trash2, Mail, Phone, X, Save } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { useToast } from "@/shared/hooks/use-toast"

interface Faculty {
  id: string
  name: string
  email: string
  phone: string
  department: string
  subjects: string[]
  status: 'active' | 'inactive'
}

export default function Faculties() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null)
  const { toast } = useToast()
  
  const [faculties, setFaculties] = useState<Faculty[]>([
    {
      id: "1",
      name: "Mr. Nikhil Tyagi",
      email: "nikhil.tyagi@college.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      subjects: ["Web Technology", "Cyber Security","Web Technology Lab(WTL)"],
      status: "active"
    },
    {
      id: "2",
      name: "Ms. Navya Sharma",
      email: "navya.sharma@college.edu",
      phone: "+1 (555) 234-5678",
      department: "Computer Science",
      subjects: ["Database Management Systems(DBMS)","Database Management Systems Lab(DBMSL)"],
      status: "active"
    },
    {
      id: "3",
      name: "Dr. Neha Gupta",
      email: "neha.gupta@college.edu",
      phone: "+1 (555) 345-6789",
      department: "Computer Science",
      subjects: ["Computer Graphics"],
      status: "active"
    },
    {
      id: "4",
      name: "Ms. Archana Rajora",
      email: "archana.rajora@college.edu",
      phone: "+1 (555) 456-7890",
      department: "Computer Science",
      subjects: ["Design and Analysis of Algorithms(DAA)","Design and Analysis of Algorithms Lab(DAAL)"],
      status: "active"
    },
    {
      id: "5",
      name: "Ms. Aditi Gautam",
      email: "aditi.gautam@college.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      subjects: ["Machine Learning Techniques(MLT)"],
      status: "active"
    },
    {
      id: "6",
      name: "Mr. Ashwani Sharma",
      email: "ashwani.sharma@college.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      subjects: ["Constitution of India(COI)"],
      status: "active"
    },
    {
      id: "7",
      name: "Ms. Aparna Nivoria",
      email: "aparna.nivoria@college.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      subjects: ["Internship Assessment/Mini Project"],
      status: "active"
    },
  ])

  // Form state for adding new faculty
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    subjects: '',
    status: 'active' as 'active' | 'inactive'
  })

  const filteredFaculties = faculties.filter(faculty =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddFaculty = () => {
    // Basic validation
    if (!newFaculty.name || !newFaculty.email || !newFaculty.department) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Email, Department).",
        variant: "destructive"
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newFaculty.email)) {
      toast({
        title: "Validation Error", 
        description: "Please enter a valid email address.",
        variant: "destructive"
      })
      return
    }

    const faculty: Faculty = {
      id: (Date.now()).toString(),
      name: newFaculty.name,
      email: newFaculty.email,
      phone: newFaculty.phone,
      department: newFaculty.department,
      subjects: newFaculty.subjects ? newFaculty.subjects.split(',').map(s => s.trim()).filter(s => s) : [],
      status: newFaculty.status
    }

    setFaculties(prev => [...prev, faculty])
    setNewFaculty({
      name: '',
      email: '',
      phone: '',
      department: '',
      subjects: '',
      status: 'active'
    })
    setShowAddModal(false)
    
    toast({
      title: "Faculty Added",
      description: `${faculty.name} has been added successfully.`,
    })
  }

  const resetForm = () => {
    setNewFaculty({
      name: '',
      email: '',
      phone: '',
      department: '',
      subjects: '',
      status: 'active'
    })
  }

  const handleEditFaculty = (faculty: Faculty) => {
    setEditingFaculty(faculty)
    setNewFaculty({
      name: faculty.name,
      email: faculty.email,
      phone: faculty.phone,
      department: faculty.department,
      subjects: faculty.subjects.join(', '),
      status: faculty.status
    })
    setShowEditModal(true)
  }

  const handleUpdateFaculty = () => {
    if (!editingFaculty) return

    // Basic validation
    if (!newFaculty.name || !newFaculty.email || !newFaculty.department) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Email, Department).",
        variant: "destructive"
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newFaculty.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      })
      return
    }

    const updatedFaculty: Faculty = {
      ...editingFaculty,
      name: newFaculty.name,
      email: newFaculty.email,
      phone: newFaculty.phone,
      department: newFaculty.department,
      subjects: newFaculty.subjects ? newFaculty.subjects.split(',').map(s => s.trim()).filter(s => s) : [],
      status: newFaculty.status
    }

    setFaculties(prev => prev.map(f => f.id === editingFaculty.id ? updatedFaculty : f))
    setEditingFaculty(null)
    resetForm()
    setShowEditModal(false)
    
    toast({
      title: "Faculty Updated",
      description: `${updatedFaculty.name} has been updated successfully.`,
    })
  }

  const handleDeleteFaculty = (faculty: Faculty) => {
    if (window.confirm(`Are you sure you want to delete ${faculty.name}?`)) {
      setFaculties(prev => prev.filter(f => f.id !== faculty.id))
      toast({
        title: "Faculty Deleted",
        description: `${faculty.name} has been removed successfully.`,
      })
    }
  }

  return (
    <div className="p-6 space-y-6 bg-white min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Faculty Management</h1>
          <p className="text-gray-600">Manage faculty members and their schedules.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Faculty
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search faculty members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-700">
              {faculties.filter(f => f.status === 'active').length}
            </div>
            <div className="text-sm text-green-600">Active Faculty</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-700">{faculties.length}</div>
            <div className="text-sm text-blue-600">Total Faculty</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-700">4</div>
            <div className="text-sm text-purple-600">Departments</div>
          </div>
        </div>
      </div>

      {/* Faculty Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Faculty Directory</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Subjects</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFaculties.map((faculty) => (
                  <tr key={faculty.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{faculty.name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-700">{faculty.department}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-3 w-3" />
                          {faculty.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {faculty.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {faculty.subjects.slice(0, 2).map((subject, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {subject}
                          </span>
                        ))}
                        {faculty.subjects.length > 2 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{faculty.subjects.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        faculty.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {faculty.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-blue-600 hover:bg-blue-50"
                          onClick={() => handleEditFaculty(faculty)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteFaculty(faculty)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredFaculties.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No faculty members found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Faculty Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Add New Faculty</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setShowAddModal(false)
                  resetForm()
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={newFaculty.name}
                    onChange={(e) => setNewFaculty({...newFaculty, name: e.target.value})}
                    placeholder="Dr. John Smith"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newFaculty.email}
                    onChange={(e) => setNewFaculty({...newFaculty, email: e.target.value})}
                    placeholder="john.smith@college.edu"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newFaculty.phone}
                    onChange={(e) => setNewFaculty({...newFaculty, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">
                    Department <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="department"
                    value={newFaculty.department}
                    onChange={(e) => setNewFaculty({...newFaculty, department: e.target.value})}
                    placeholder="Computer Science"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subjects">Subjects (comma-separated)</Label>
                <Input
                  id="subjects"
                  value={newFaculty.subjects}
                  onChange={(e) => setNewFaculty({...newFaculty, subjects: e.target.value})}
                  placeholder="Data Structures, Algorithms, Database Systems"
                />
                <p className="text-sm text-gray-500">
                  Enter multiple subjects separated by commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={newFaculty.status}
                  onChange={(e) => setNewFaculty({...newFaculty, status: e.target.value as 'active' | 'inactive'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button 
                variant="outline"
                onClick={() => {
                  setShowAddModal(false)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddFaculty}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Add Faculty
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Faculty Modal */}
      {showEditModal && editingFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Edit Faculty</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setShowEditModal(false)
                  setEditingFaculty(null)
                  resetForm()
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="edit-name"
                    value={newFaculty.name}
                    onChange={(e) => setNewFaculty({...newFaculty, name: e.target.value})}
                    placeholder="Dr. John Smith"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={newFaculty.email}
                    onChange={(e) => setNewFaculty({...newFaculty, email: e.target.value})}
                    placeholder="john.smith@college.edu"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={newFaculty.phone}
                    onChange={(e) => setNewFaculty({...newFaculty, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-department">
                    Department <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="edit-department"
                    value={newFaculty.department}
                    onChange={(e) => setNewFaculty({...newFaculty, department: e.target.value})}
                    placeholder="Computer Science"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-subjects">Subjects (comma-separated)</Label>
                <Input
                  id="edit-subjects"
                  value={newFaculty.subjects}
                  onChange={(e) => setNewFaculty({...newFaculty, subjects: e.target.value})}
                  placeholder="Data Structures, Algorithms, Database Systems"
                />
                <p className="text-sm text-gray-500">
                  Enter multiple subjects separated by commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  value={newFaculty.status}
                  onChange={(e) => setNewFaculty({...newFaculty, status: e.target.value as 'active' | 'inactive'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button 
                variant="outline"
                onClick={() => {
                  setShowEditModal(false)
                  setEditingFaculty(null)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateFaculty}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Update Faculty
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}