import { useState } from "react"
import { Plus, Minus, Wand2, Settings, BookOpen, Users, Building } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Textarea } from "@/shared/components/ui/textarea"
import { Progress } from "@/shared/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { useToast } from "@/shared/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { generateTimetables, type Subject, type TimetableConfig, type BatchConfig } from "@/shared/services/timetableGenerator"

// Enhanced faculty list with subjects they teach
const FACULTY_LIST = [
  { name: "Mr. Nikhil Tyagi", subjects: "Web Technology, Cyber Security" },
  { name: "Ms. Navya Sharma", subjects: "Database Management Systems" },
  { name: "Dr. Neha Gupta", subjects: "Computer Graphics" },
  { name: "Ms. Archana Rajora", subjects: "Design and Analysis of Algorithms" },
  { name: "Ms. Aditi Gautam", subjects: "Machine Learning Techniques" },
  { name: "Mr. Ashwani Sharma", subjects: "Constitution of India" },
  { name: "Ms. Aparna Nivoria", subjects: "Internship Assessment/Mini Project" }
]

export default function CreateTimetable() {
  const [timetableName, setTimetableName] = useState("")
  const [department, setDepartment] = useState("")
  const [semester, setSemester] = useState("")
  const [subjects, setSubjects] = useState<Subject[]>([])
  
  // Enhanced batch/section management
  const [batches, setBatches] = useState<BatchConfig[]>([
    {
      id: "1",
      name: "Section A",
      strength: 60,
      subjects: [],
      preferredRooms: []
    }
  ])
  
  // Configuration fields
  const [availableClassrooms, setAvailableClassrooms] = useState<string[]>([
    "Room A101", "Room A102", "Room A103", "Lab L201", "Lab L202"
  ])
  const [maxClassesPerDay, setMaxClassesPerDay] = useState(6)
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("17:00")
  const [lunchStartTime, setLunchStartTime] = useState("13:00")
  const [lunchEndTime, setLunchEndTime] = useState("14:00")
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState("")
  const { toast } = useToast()
  const navigate = useNavigate()

  // Batch management functions
  const addBatch = () => {
    const batchNumber = batches.length + 1
    const batchLetter = String.fromCharCode(64 + batchNumber) // A, B, C, etc.
    const newBatch: BatchConfig = {
      id: Date.now().toString(),
      name: `Section ${batchLetter}`,
      strength: 60,
      subjects: [],
      preferredRooms: []
    }
    setBatches([...batches, newBatch])
    toast({
      title: "Batch Added",
      description: `Added ${newBatch.name} to the timetable configuration`,
    })
  }

  const removeBatch = (id: string) => {
    if (batches.length <= 1) {
      toast({
        title: "Cannot Remove",
        description: "At least one batch/section is required",
        variant: "destructive"
      })
      return
    }
    setBatches(batches.filter(batch => batch.id !== id))
    toast({
      title: "Batch Removed",
      description: "Batch removed from timetable configuration",
    })
  }

  const updateBatch = (id: string, field: keyof BatchConfig, value: any) => {
    setBatches(batches.map(batch => 
      batch.id === id ? { ...batch, [field]: value } : batch
    ))
  }

  const toggleSubjectForBatch = (batchId: string, subjectId: string) => {
    setBatches(batches.map(batch => {
      if (batch.id === batchId) {
        const subjects = batch.subjects.includes(subjectId)
          ? batch.subjects.filter(id => id !== subjectId)
          : [...batch.subjects, subjectId]
        return { ...batch, subjects }
      }
      return batch
    }))
  }

  const addSubject = () => {
    console.log("🔍 Add Subject button clicked - starting...")
    
    try {
      const newId = Date.now().toString()
      console.log("🆔 Generated ID:", newId)
      
      const newSubject: Subject = {
        id: newId,
        name: "",
        classesPerWeek: 3,
        duration: 60
      }
      
      console.log("📝 New subject object:", newSubject)
      console.log("📊 Current subjects count:", subjects.length)
      
      setSubjects(prevSubjects => {
        console.log("🔄 Updating subjects state...")
        const updated = [...prevSubjects, newSubject]
        console.log("✅ New subjects array:", updated)
        return updated
      })
      
      console.log("🎉 Subject added successfully!")
      
    } catch (error) {
      console.error("❌ Error in addSubject:", error)
      console.error("Stack trace:", error instanceof Error ? error.stack : 'No stack trace')
    }
  }

  const addSampleSubjects = () => {
    const sampleSubjects: Subject[] = [
      { 
        id: "1", 
        name: "Web Technology", 
        classesPerWeek: 3, 
        duration: 60, 
        faculty: "Mr. Nikhil Tyagi", 
        type: "theory" 
      },
      { 
        id: "2", 
        name: "Database Management Systems", 
        classesPerWeek: 4, 
        duration: 60, 
        faculty: "Ms. Navya Sharma", 
        type: "theory" 
      },
      { 
        id: "3", 
        name: "Database Lab", 
        classesPerWeek: 2, 
        duration: 120, 
        faculty: "Ms. Navya Sharma", 
        type: "lab" 
      },
      { 
        id: "4", 
        name: "Design and Analysis of Algorithms", 
        classesPerWeek: 4, 
        duration: 60, 
        faculty: "Ms. Archana Rajora", 
        type: "theory" 
      },
      { 
        id: "5", 
        name: "Computer Graphics", 
        classesPerWeek: 3, 
        duration: 90, 
        faculty: "Dr. Neha Gupta", 
        type: "practical" 
      },
      { 
        id: "6", 
        name: "Machine Learning Techniques", 
        classesPerWeek: 3, 
        duration: 90, 
        faculty: "Ms. Aditi Gautam", 
        type: "theory" 
      }
    ]
    setSubjects(sampleSubjects)
    toast({
      title: "Sample Subjects Added",
      description: `Added ${sampleSubjects.length} subjects with faculty assignments`,
    })
  }

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id))
  }

  const addClassroom = () => {
    const newClassroom = `Room ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 900) + 100}`
    setAvailableClassrooms([...availableClassrooms, newClassroom])
  }

  const removeClassroom = (index: number) => {
    setAvailableClassrooms(availableClassrooms.filter((_, i) => i !== index))
  }

  const updateClassroom = (index: number, value: string) => {
    const updated = [...availableClassrooms]
    updated[index] = value
    setAvailableClassrooms(updated)
  }

  const updateSubject = (id: string, field: keyof Subject, value: string | number) => {
    try {
      console.log(`Updating subject ${id}, field: ${field}, value:`, value)
      setSubjects(prevSubjects => prevSubjects.map(subject => 
        subject.id === id ? { ...subject, [field]: value } : subject
      ))
    } catch (error) {
      console.error("Error updating subject:", error)
    }
  }

    const handleGenerate = async () => {
    console.log("🚀 Generate button clicked!")
    console.log("📝 Form data:", { timetableName, department, semester, subjects })
    
    // Validation
    if (!timetableName || !department || !semester) {
      console.log("❌ Validation failed: missing basic info")
      toast({
        title: "Missing Information",
        description: "Please fill in timetable name, department, and semester.",
        variant: "destructive"
      })
      return
    }

    if (subjects.length === 0) {
      console.log("❌ Validation failed: no subjects")
      toast({
        title: "No Subjects Added", 
        description: "Please add at least one subject to generate a timetable.",
        variant: "destructive"
      })
      return
    }

    // Check if all subjects have names
    const incompleteSubjects = subjects.filter(s => !s.name.trim())
    if (incompleteSubjects.length > 0) {
      console.log("❌ Validation failed: incomplete subjects")
      toast({
        title: "Incomplete Subjects",
        description: "Please provide names for all subjects.",
        variant: "destructive"
      })
      return
    }

    console.log("✅ Validation passed, starting generation...")
    setIsGenerating(true)
    setGenerationStep("")
    
    toast({
      title: "Starting AI Generation",
      description: "TimeNest AI is analyzing your requirements...",
    })

    try {
      // Create configuration for the generator
      const config: TimetableConfig = {
        name: timetableName,
        department,
        semester,
        subjects: subjects.map(s => ({
          ...s,
          type: s.type || 'theory',
          faculty: s.faculty || `Faculty ${s.id}`,
          credits: s.credits || 3,
          priority: s.priority || 'medium'
        })),
        // Add new configuration options
        availableClassrooms,
        batches,
        maxClassesPerDay,
        startTime,
        endTime,
        lunchTime: `${lunchStartTime} - ${lunchEndTime}`
      }

      // Simulate generation steps
      const steps = [
        "Parsing configuration...",
        "Analyzing subject constraints...", 
        "Optimizing faculty assignments...",
        "Resolving room conflicts...",
        "Calculating efficiency scores...",
        "Generating alternative schedules...",
        "Finalizing optimal solutions..."
      ]

      // Show progress steps
      for (let i = 0; i < steps.length; i++) {
        setGenerationStep(steps[i])
        await new Promise(resolve => setTimeout(resolve, 800))
      }

      console.log("🤖 Calling AI generation service...")
      
      // Generate actual timetables using the enhanced algorithm
      const generatedResult = await generateTimetables(config)
      
      console.log("📊 Generated result:", generatedResult)
      
      // Check if it's a multi-batch result by checking if it has batches property
      const isMultiBatch = generatedResult && typeof generatedResult === 'object' && 'batches' in generatedResult
      const multiBatchResult = isMultiBatch ? generatedResult as any : null
      const singleBatchResult = !isMultiBatch ? generatedResult as any[] : null
      
      setGenerationStep("Complete!")
      
      toast({
        title: "Timetable Generated Successfully!",
        description: isMultiBatch 
          ? `Generated timetables for ${multiBatchResult?.batches?.length || 0} batches with ${multiBatchResult?.globalConflicts || 0} conflicts`
          : `Generated ${singleBatchResult?.length || 0} optimized options for ${department} - Semester ${semester}`,
      })

      // Wait a moment then navigate to results with generated data
      setTimeout(() => {
        setIsGenerating(false)
        setGenerationStep("")
        
        console.log("🧭 Navigating to enhanced results with data...")
        navigate("/timetable-results", { 
          state: { 
            timetableName, 
            department, 
            semester, 
            subjects: subjects.length,
            // Pass both old and new format for compatibility
            generatedTimetables: singleBatchResult,
            multiBatchResult: multiBatchResult,
            batches: batches.length > 1 ? batches : null,
            config // Also pass the config for reference
          } 
        })
        console.log("✅ Navigation triggered!")
      }, 1000)
      
    } catch (error) {
      console.error("❌ Generation failed:", error)
      setIsGenerating(false)
      setGenerationStep("")
      
      toast({
        title: "Generation Failed",
        description: "There was an error generating the timetable. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="p-6 space-y-6 bg-white min-h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Timetable</h1>
        <p className="text-gray-600">
          Generate an optimized timetable for your institution with AI-powered scheduling.
        </p>
      </div>

      {/* Configuration Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Basic Configuration Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Basic Configuration</h2>
            </div>
            <p className="text-gray-600">Set up the basic parameters for your timetable.</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timetableName" className="text-sm font-medium text-gray-700">Timetable Name</Label>
              <Input
                id="timetableName"
                placeholder="e.g. CS Semester 3 - Fall 2024"
                value={timetableName}
                onChange={(e) => setTimetableName(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="electronics">Electronics Engineering</SelectItem>
                    <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                    <SelectItem value="civil">Civil Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Semester</Label>
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <SelectItem key={sem} value={sem.toString()}>
                        Semester {sem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Notes (Optional)</Label>
              <Textarea
                placeholder="Add any special requirements..."
                className="min-h-[80px]"
              />
            </div>
          </div>
        </div>

        {/* Advanced Configuration Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">Advanced Configuration</h2>
            </div>
            <p className="text-gray-600">Fine-tune your timetable parameters.</p>
          </div>
          
          <div className="space-y-4">
            {/* Time Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Start Time</Label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">End Time</Label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Lunch Timing */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Lunch Start</Label>
                <Input
                  type="time"
                  value={lunchStartTime}
                  onChange={(e) => setLunchStartTime(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Lunch End</Label>
                <Input
                  type="time"
                  value={lunchEndTime}
                  onChange={(e) => setLunchEndTime(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Class Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Total Batches</Label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-blue-600">{batches.length}</span>
                  <Button onClick={addBatch} size="sm" variant="outline">
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Max Classes/Day</Label>
                <Input
                  type="number"
                  min="4"
                  max="8"
                  value={maxClassesPerDay}
                  onChange={(e) => setMaxClassesPerDay(parseInt(e.target.value) || 6)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Available Classrooms */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">Available Classrooms</Label>
                <Button onClick={addClassroom} size="sm" variant="outline" className="text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Room
                </Button>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {availableClassrooms.map((classroom, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={classroom}
                      onChange={(e) => updateClassroom(index, e.target.value)}
                      className="flex-1 text-sm"
                      placeholder="Room name..."
                    />
                    <Button
                      onClick={() => removeClassroom(index)}
                      size="sm"
                      variant="outline"
                      className="px-2"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Section - Full Width */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Subjects Configuration</h2>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={addSampleSubjects} 
                size="sm" 
                variant="outline"
                className="text-blue-600 hover:bg-blue-50"
              >
                Add Sample
              </Button>
              <Button onClick={addSubject} size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-1" />
                Add Subject
              </Button>
            </div>
          </div>
          <p className="text-gray-600">Add and configure subjects for this timetable. Each subject can have different class frequencies and durations.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {subjects.map((subject, idx) => (
            <div key={subject.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-blue-600">Subject {idx + 1}</span>
                <Button
                  onClick={() => removeSubject(subject.id)}
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:bg-red-50"
                >
                  <Minus className="h-3 w-3" />
                </Button>
              </div>

              <div className="space-y-3">
                {/* Subject Name */}
                <div className="space-y-1">
                  <Label className="text-xs text-gray-600">Subject Name</Label>
                  <Input
                    placeholder="Enter subject name"
                    value={subject.name || ""}
                    onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                  />
                </div>

                {/* Simple text inputs only for now */}
                <div className="space-y-1">
                  <Label className="text-xs text-gray-600">Faculty</Label>
                  <Input
                    placeholder="Enter faculty name"
                    value={subject.faculty || ""}
                    onChange={(e) => updateSubject(subject.id, 'faculty', e.target.value)}
                  />
                </div>

                {/* Classes per Week and Duration */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-gray-600">Classes/Week</Label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={subject.classesPerWeek || 3}
                      onChange={(e) => updateSubject(subject.id, 'classesPerWeek', parseInt(e.target.value) || 3)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Duration (min)</Label>
                    <Input
                      type="number"
                      min="30"
                      max="180"
                      value={subject.duration || 60}
                      onChange={(e) => updateSubject(subject.id, 'duration', parseInt(e.target.value) || 60)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {subjects.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No subjects added yet</p>
              <p className="text-sm">Click "Add Subject" or "Add Sample" to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Batches/Sections Configuration */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">Batches/Sections Configuration</h2>
            </div>
            <Button onClick={addBatch} size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-1" />
              Add Batch
            </Button>
          </div>
          <p className="text-gray-600">Configure multiple batches/sections for the same department. Each batch can have different subjects and room preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {batches.map((batch, idx) => (
            <Card key={batch.id} className="border-2 border-purple-100">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge variant="secondary">{idx + 1}</Badge>
                    <span>{batch.name}</span>
                  </CardTitle>
                  <Button
                    onClick={() => removeBatch(batch.id)}
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                    disabled={batches.length <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Batch Name and Strength */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Batch Name</Label>
                    <Input
                      value={batch.name}
                      onChange={(e) => updateBatch(batch.id, 'name', e.target.value)}
                      placeholder="e.g., Section A"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Student Strength</Label>
                    <Input
                      type="number"
                      value={batch.strength}
                      onChange={(e) => updateBatch(batch.id, 'strength', parseInt(e.target.value) || 60)}
                      placeholder="60"
                    />
                  </div>
                </div>

                {/* Subject Selection */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Subjects for this Batch</Label>
                  {subjects.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto bg-gray-50 p-3 rounded-md">
                      {subjects.map((subject) => (
                        <div key={subject.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${batch.id}-${subject.id}`}
                            checked={batch.subjects.includes(subject.id)}
                            onCheckedChange={() => toggleSubjectForBatch(batch.id, subject.id)}
                          />
                          <Label 
                            htmlFor={`${batch.id}-${subject.id}`}
                            className="text-sm cursor-pointer flex-1"
                          >
                            {subject.name || `Subject ${subject.id}`}
                          </Label>
                          <Badge variant="outline" className="text-xs">
                            {subject.classesPerWeek} classes/week
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
                      Add subjects first to assign them to batches
                    </p>
                  )}
                </div>

                {/* Preferred Rooms */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Preferred Rooms</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-24 overflow-y-auto bg-gray-50 p-2 rounded-md">
                    {availableClassrooms.map((room, roomIdx) => (
                      <div key={roomIdx} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${batch.id}-room-${roomIdx}`}
                          checked={batch.preferredRooms.includes(room)}
                          onCheckedChange={(checked) => {
                            const preferredRooms = checked
                              ? [...batch.preferredRooms, room]
                              : batch.preferredRooms.filter(r => r !== room)
                            updateBatch(batch.id, 'preferredRooms', preferredRooms)
                          }}
                        />
                        <Label 
                          htmlFor={`${batch.id}-room-${roomIdx}`}
                          className="text-xs cursor-pointer"
                        >
                          {room}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Batch Summary */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {batch.subjects.length} subjects assigned
                    </span>
                    <span className="text-gray-600">
                      {batch.preferredRooms.length} preferred rooms
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-6 bg-blue-600 hover:bg-blue-700"
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
              {generationStep || "Generating..."}
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Timetable
            </>
          )}
        </Button>
      </div>
    </div>
  )
}