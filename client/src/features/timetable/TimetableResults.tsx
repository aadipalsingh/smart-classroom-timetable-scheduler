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
  RefreshCw
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
import { useToast } from "@/shared/hooks/use-toast"
import { GeneratedTimetable, TimetableConfig } from "@/shared/services/timetableGenerator"
import { TimetablePDFService, saveTimetableToStorage } from "@/shared/services/pdfService"

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
  console.log("🔄 TimetableResults component rendering...");
  
  const location = useLocation()
  const { toast } = useToast()
  console.log("📍 Location state:", location.state);
  
  const [activeTab, setActiveTab] = useState("0")
  console.log("📋 Active tab:", activeTab);

  const { 
    timetableName, 
    department, 
    semester, 
    subjects, 
    generatedTimetables,
    config 
  } = location.state || {}
  
  console.log("📝 Props:", { timetableName, department, semester, subjects });
  console.log("🤖 Generated timetables:", generatedTimetables);
  console.log("⚙️ Config:", config);

  // Use the generated timetables or fallback to empty array
  const timetableOptions: GeneratedTimetable[] = generatedTimetables || []
  console.log("📊 Timetable options:", timetableOptions.length);
  console.log("🔍 First option schedule:", timetableOptions[0]?.schedule?.length || "No schedule");
  
  // Debug: Log the first few schedule items
  if (timetableOptions.length > 0 && timetableOptions[0].schedule) {
    console.log("📋 Sample schedule items:", timetableOptions[0].schedule.slice(0, 3))
  }

  if (!generatedTimetables || timetableOptions.length === 0) {
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
    
    const selectedTimetable = timetableOptions.find(option => option.id === optionId)
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
    
    const selectedTimetable = timetableOptions.find(option => option.id === optionId)
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

  console.log("✅ TimetableResults render complete");

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Generated Timetables</h1>
            <p className="text-gray-600 mt-1">
              {timetableName && `"${timetableName}" - `}
              {department && `${department} - `}
              {semester && `Semester ${semester}`}
              {subjects && ` (${subjects} subjects)`}
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Options Generated</p>
                  <p className="text-2xl font-bold">{timetableOptions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Avg Efficiency</p>
                  <p className="text-2xl font-bold">
                    {Math.round(timetableOptions.reduce((sum, opt) => sum + opt.efficiency, 0) / timetableOptions.length)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Generation Time</p>
                  <p className="text-2xl font-bold">4.2s</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Conflicts</p>
                  <p className="text-2xl font-bold text-green-600">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Timetable Options */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          {timetableOptions.map((option, index) => (
            <TabsTrigger key={option.id} value={index.toString()} className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {option.efficiency}%
              </Badge>
              Option {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>

        {timetableOptions.map((option, index) => (
          <TabsContent key={option.id} value={index.toString()} className="space-y-6">
            {/* Option Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      {option.name}
                      <Badge variant={option.efficiency >= 90 ? "default" : option.efficiency >= 80 ? "secondary" : "outline"}>
                        {option.efficiency}% Efficiency
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      AI-optimized schedule with {option.conflicts} conflicts and {Math.round(option.utilization)}% room utilization
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleDownload(option.id)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
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
                  </div>
                  <Progress value={option.efficiency} className="h-2" />
                </div>
              </CardHeader>
            </Card>

            {/* Timetable View */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Weekly Schedule
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
                            return (
                              <TableCell key={`${day}-${timeSlot}`} className="p-1">
                                {classInfo ? (
                                  <div className="bg-blue-50 border border-blue-200 rounded p-2 text-xs">
                                    <div className="font-medium text-blue-900">{classInfo.subject}</div>
                                    <div className="text-blue-700">{classInfo.faculty}</div>
                                    <div className="text-blue-600">{classInfo.room}</div>
                                  </div>
                                ) : (
                                  <div className="h-16"></div>
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

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Schedule Analysis</CardTitle>
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
                    <span className="text-sm text-gray-600">Peak Day</span>
                    <span className="font-medium">Monday (6 classes)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Conflicts</span>
                    <span className="font-medium text-green-600">None</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quality Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Faculty Workload</span>
                      <span className="text-green-600">Balanced</span>
                    </div>
                    <Progress value={85} className="h-1" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Room Utilization</span>
                      <span className="text-blue-600">Optimal</span>
                    </div>
                    <Progress value={92} className="h-1" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Student Satisfaction</span>
                      <span className="text-purple-600">High</span>
                    </div>
                    <Progress value={88} className="h-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}