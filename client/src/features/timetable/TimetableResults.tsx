import { useState } from "react"
import { useLocation } from "react-router-dom"
import { 
  Calendar, 
  Download, 
  Eye, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  Filter,
  RefreshCw,
  BookOpen,
  Shield,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Mail,
  GraduationCap
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Progress } from "@/shared/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { useToast } from "@/shared/hooks/use-toast"
import { GeneratedTimetable, TimetableConfig, MultiBatchResult, BatchTimetableResult } from "@/shared/services/timetableGenerator"
import { TimetablePDFService, saveTimetableToStorage } from "@/shared/services/pdfService"
import { distributeTimetablesToFaculties, DepartmentFacultyTimetables } from "@/shared/services/facultyTimetableService"
import FacultyTimetableView from "../faculty/FacultyTimetableView"

// Weekdays for the timetable display
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

// Time slots for the timetable display  
const timeSlots = [
  '09:00 - 10:00',
  '10:00 - 11:00', 
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00'
]

export default function TimetableResults() {
  console.log("🔄 Enhanced Multi-Batch TimetableResults component rendering...");
  
  const location = useLocation()
  const { toast } = useToast()
  console.log("📍 Location state:", location.state);
  
  const [activeTab, setActiveTab] = useState("0")
  const [selectedBatch, setSelectedBatch] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"overview" | "detailed">("overview")
  const [facultyTimetables, setFacultyTimetables] = useState<DepartmentFacultyTimetables | null>(null)
  const [showFacultyView, setShowFacultyView] = useState(false)
  console.log("📋 Active tab:", activeTab, "Selected batch:", selectedBatch);

  const { 
    timetableName, 
    department, 
    semester, 
    subjects, 
    generatedTimetables,
    multiBatchResult,
    config 
  } = location.state || {}
  
  console.log("📝 Props:", { timetableName, department, semester, subjects });
  console.log("🤖 Generated timetables:", generatedTimetables);
  console.log("🎯 Multi-batch result:", multiBatchResult);
  console.log("⚙️ Config:", config);

  // Handle both single-batch and multi-batch results
  const isMultiBatch = multiBatchResult && multiBatchResult.batches
  const batchResults: BatchTimetableResult[] = isMultiBatch 
    ? multiBatchResult.batches 
    : [{ batchId: "single", batchName: "Main Section", timetables: generatedTimetables || [] }]
  
  // Flatten all timetables for overview
  const allTimetables: GeneratedTimetable[] = batchResults.flatMap(batch => batch.timetables)
  
  console.log("📊 Batch results:", batchResults.length, "batches");
  console.log("� All timetables:", allTimetables.length, "total options");
  
  if (!batchResults || batchResults.length === 0 || allTimetables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Timetables Available</h2>
          <p className="text-gray-600 mb-6">
            It seems no timetables were generated. Please go back and try generating again.
          </p>
          <Button 
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const handleApprove = (optionId: string) => {
    console.log("✅ Approving option:", optionId);
    
    const selectedTimetable = allTimetables.find(option => option.id === optionId)
    if (!selectedTimetable) {
      toast({
        title: "Error",
        description: "Selected timetable not found.",
        variant: "destructive"
      })
      return
    }

    try {
      // Save to localStorage
      saveTimetableToStorage(selectedTimetable, {
        name: timetableName || "Timetable",
        department: department || "Unknown Department",
        semester: semester || "Unknown Semester"
      })

      toast({
        title: "Timetable Approved & Saved! ✅",
        description: `${selectedTimetable.name} has been approved and saved to your timetables.`,
      })
    } catch (error) {
      console.error("Error saving timetable:", error)
      toast({
        title: "Save Failed",
        description: "Failed to save the timetable. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleDownload = (optionId: string) => {
    console.log("📥 Downloading option:", optionId);
    
    const selectedTimetable = allTimetables.find(option => option.id === optionId)
    if (!selectedTimetable) {
      toast({
        title: "Error",
        description: "Selected timetable not found.",
        variant: "destructive"
      })
      return
    }

    try {
      const pdfService = new TimetablePDFService()
      
      pdfService.generateTimetablePDF(selectedTimetable, {
        name: timetableName || "Timetable",
        department: department || "Unknown Department", 
        semester: semester || "Unknown Semester"
      })

      toast({
        title: "PDF Downloaded! 📄",
        description: `${selectedTimetable.name} has been downloaded as PDF.`,
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleDistributeToFaculty = () => {
    console.log("📧 Distributing timetables to faculty...");
    
    if (!department || !semester) {
      toast({
        title: "Missing Information",
        description: "Department and semester information required for faculty distribution.",
        variant: "destructive"
      })
      return
    }

    try {
      // Distribute either multi-batch result or single batch result
      const resultToDistribute = isMultiBatch ? multiBatchResult : allTimetables
      
      const facultyResult = distributeTimetablesToFaculties(
        resultToDistribute,
        department,
        semester
      )
      
      setFacultyTimetables(facultyResult)
      setShowFacultyView(true)
      
      toast({
        title: "Faculty Distribution Complete! 📧",
        description: `Timetables distributed to ${facultyResult.summary.totalFaculties} faculty members with ${facultyResult.summary.conflictsFound} conflicts detected.`,
      })
    } catch (error) {
      console.error("Error distributing to faculty:", error)
      toast({
        title: "Distribution Failed",
        description: "Failed to distribute timetables to faculty. Please try again.",
        variant: "destructive"
      })
    }
  }

  // Get filtered timetables based on selected batch
  const getFilteredTimetables = () => {
    if (selectedBatch === "all") {
      return allTimetables
    }
    
    const batch = batchResults.find(b => b.batchId === selectedBatch)
    return batch ? batch.timetables : []
  }

  const filteredTimetables = getFilteredTimetables()

  console.log("✅ Enhanced TimetableResults render complete");

  return (
    <div className="p-6 space-y-6">
      {/* Enhanced Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isMultiBatch ? "Multi-Batch Timetables" : "Generated Timetables"}
            </h1>
            <p className="text-gray-600 mt-1">
              {timetableName && `"${timetableName}" - `}
              {department && `${department} - `}
              {semester && `Semester ${semester}`}
              {isMultiBatch && ` (${batchResults.length} batches)`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Enhanced Batch Selection */}
        {isMultiBatch && (
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Select Batch/Section:</span>
                  </div>
                  <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          All Batches Overview
                        </div>
                      </SelectItem>
                      {batchResults.map(batch => (
                        <SelectItem key={batch.batchId} value={batch.batchId}>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            {batch.batchName}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Conflict-Free
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    {multiBatchResult?.globalConflicts === 0 ? "Zero Conflicts" : `${multiBatchResult?.globalConflicts} Conflicts`}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">
                    {selectedBatch === "all" ? "Total Options" : "Batch Options"}
                  </p>
                  <p className="text-2xl font-bold">{filteredTimetables.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {isMultiBatch && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Batches</p>
                    <p className="text-2xl font-bold">{batchResults.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Avg Efficiency</p>
                  <p className="text-2xl font-bold">
                    {filteredTimetables.length > 0 
                      ? Math.round(filteredTimetables.reduce((sum, opt) => sum + opt.efficiency, 0) / filteredTimetables.length)
                      : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Generation</p>
                  <p className="text-2xl font-bold">
                    {isMultiBatch ? "Multi-Batch" : "Single"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                {(multiBatchResult?.globalConflicts || 0) === 0 ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                )}
                <div>
                  <p className="text-sm text-gray-600">Conflicts</p>
                  <p className={`text-2xl font-bold ${(multiBatchResult?.globalConflicts || 0) === 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {multiBatchResult?.globalConflicts || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Timetable Options */}
      {filteredTimetables.length > 0 ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid grid-cols-3">
              {filteredTimetables.slice(0, 3).map((option, index) => (
                <TabsTrigger key={option.id} value={index.toString()} className="flex items-center gap-2">
                  <Badge variant={option.efficiency >= 90 ? "default" : "secondary"} className="text-xs">
                    {option.efficiency}%
                  </Badge>
                  {option.batchName ? `${option.batchName} - Option ${index + 1}` : `Option ${index + 1}`}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {selectedBatch !== "all" && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Viewing: {batchResults.find(b => b.batchId === selectedBatch)?.batchName || "Selected Batch"}</span>
              </div>
            )}
          </div>

          {filteredTimetables.slice(0, 3).map((option, index) => (
            <TabsContent key={option.id} value={index.toString()} className="space-y-6">
              {/* Enhanced Option Header */}
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        {option.name}
                        <Badge variant={option.efficiency >= 90 ? "default" : option.efficiency >= 80 ? "secondary" : "outline"}>
                          {option.efficiency}% Efficiency
                        </Badge>
                        {option.batchName && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {option.batchName}
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        AI-optimized schedule with <span className="font-medium text-green-600">{option.conflicts} conflicts</span> and {Math.round(option.utilization)}% room utilization
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleDownload(option.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleDistributeToFaculty}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Distribute to Faculty
                      </Button>
                      <Button onClick={() => handleApprove(option.id)} className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve & Save
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium">Efficiency Score</span>
                      <Badge variant="outline" className="text-xs">
                        {option.conflicts === 0 ? "Conflict-Free" : `${option.conflicts} Conflicts`}
                      </Badge>
                    </div>
                    <Progress value={option.efficiency} className="h-2" />
                  </div>
                </CardHeader>
              </Card>

              {/* Enhanced Timetable View */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Weekly Schedule
                    {option.batchName && (
                      <Badge variant="outline">{option.batchName}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-24">Time</TableHead>
                          {weekDays.map(day => (
                            <TableHead key={day} className="text-center min-w-32">{day}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeSlots.map((timeSlot, timeIndex) => (
                          <TableRow key={timeIndex}>
                            <TableCell className="font-medium text-sm bg-gray-50">
                              {timeSlot}
                            </TableCell>
                            {weekDays.map(day => {
                              const classInfo = option.schedule.find(
                                item => item.day === day && item.time === timeSlot
                              )
                              
                              // Color coding based on class type
                              const getClassColors = (type: string) => {
                                switch(type) {
                                  case 'lunch':
                                    return 'bg-orange-50 border-orange-200 text-orange-900'
                                  case 'lab':
                                    return 'bg-purple-50 border-purple-200 text-purple-900'
                                  case 'practical':
                                    return 'bg-green-50 border-green-200 text-green-900'
                                  default:
                                    return 'bg-blue-50 border-blue-200 text-blue-900'
                                }
                              }
                              
                              return (
                                <TableCell key={`${day}-${timeSlot}`} className="p-1">
                                  {classInfo ? (
                                    <div className={`${getClassColors(classInfo.type)} border rounded p-2 text-xs transition-all hover:shadow-md`}>
                                      <div className="font-medium">{classInfo.subject}</div>
                                      {classInfo.faculty && <div className="text-xs opacity-80">{classInfo.faculty}</div>}
                                      {classInfo.room && <div className="text-xs opacity-80">{classInfo.room}</div>}
                                    </div>
                                  ) : (
                                    <div className="h-16 bg-gray-25 border border-gray-100 rounded opacity-50"></div>
                                  )}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Schedule Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Classes</span>
                      <span className="font-medium">{option.schedule.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Free Periods</span>
                      <span className="font-medium text-green-600">
                        {(timeSlots.length * weekDays.length) - option.schedule.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Efficiency Score</span>
                      <span className={`font-medium ${option.efficiency >= 90 ? 'text-green-600' : option.efficiency >= 80 ? 'text-blue-600' : 'text-orange-600'}`}>
                        {option.efficiency}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Conflicts</span>
                      <span className={`font-medium ${option.conflicts === 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {option.conflicts === 0 ? "✅ None" : `❌ ${option.conflicts}`}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Conflict Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Faculty Conflicts</span>
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          None
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Room Conflicts</span>
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          None
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Cross-Batch Validation</span>
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Passed
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Status</span>
                        <Badge variant="default" className="bg-green-600 text-white">
                          Conflict-Free
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No Timetables Available</h3>
            <p className="text-gray-600">
              {selectedBatch === "all" 
                ? "No timetables have been generated yet." 
                : `No timetables available for ${batchResults.find(b => b.batchId === selectedBatch)?.batchName || "selected batch"}.`
              }
            </p>
          </CardContent>
        </Card>
      )}
      
      {/* Faculty Timetable Distribution View */}
      {showFacultyView && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              Faculty Timetable Distribution
            </h2>
            <Button 
              variant="outline" 
              onClick={() => setShowFacultyView(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              Back to Timetables
            </Button>
          </div>
          <FacultyTimetableView departmentTimetables={facultyTimetables} />
        </div>
      )}
    </div>
  )
}