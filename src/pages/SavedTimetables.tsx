import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Download, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Clock,
  Trash2,
  Eye
} from "lucide-react"
import { getApprovedTimetables, TimetablePDFService } from "@/services/pdfService"
import { useToast } from "@/hooks/use-toast"

export default function SavedTimetables() {
  const [savedTimetables, setSavedTimetables] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    loadSavedTimetables()
  }, [])

  const loadSavedTimetables = () => {
    const timetables = getApprovedTimetables()
    setSavedTimetables(timetables)
  }

  const handleDownload = (timetable: any) => {
    try {
      const pdfService = new TimetablePDFService()
      pdfService.generateTimetablePDF(timetable, timetable.config)

      toast({
        title: "PDF Downloaded! 📄",
        description: `${timetable.name} has been downloaded as PDF.`,
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleDelete = (timetableId: string) => {
    const updatedTimetables = savedTimetables.filter(t => t.id !== timetableId)
    setSavedTimetables(updatedTimetables)
    localStorage.setItem('approved_timetables', JSON.stringify(updatedTimetables))
    
    toast({
      title: "Timetable Deleted",
      description: "The timetable has been removed from your saved timetables.",
    })
  }

  if (savedTimetables.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Saved Timetables</h2>
          <p className="text-gray-600 mb-6">
            You haven't approved any timetables yet. Generate and approve some timetables to see them here.
          </p>
          <Button onClick={() => window.location.href = '/create-timetable'} className="bg-blue-600 hover:bg-blue-700">
            Create Timetable
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Timetables</h1>
        <p className="text-gray-600">
          View and manage your approved timetables. Download PDFs or remove old schedules.
        </p>
      </div>

      {/* Timetables Grid */}
      <div className="grid gap-6">
        {savedTimetables.map((timetable, index) => (
          <Card key={timetable.id} className="border border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-gray-900">
                    {timetable.config.name}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>{timetable.config.department}</span>
                    <span>•</span>
                    <span>{timetable.config.semester}</span>
                    <span>•</span>
                    <Badge variant="secondary">{timetable.name}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDownload(timetable)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(timetable.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Metrics */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm text-gray-600">Efficiency</span>
                  </div>
                  <div className="text-xl font-bold text-blue-600">{timetable.efficiency}%</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-gray-600">Utilization</span>
                  </div>
                  <div className="text-xl font-bold text-green-600">{timetable.utilization}%</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="h-4 w-4 text-orange-600 mr-1" />
                    <span className="text-sm text-gray-600">Conflicts</span>
                  </div>
                  <div className="text-xl font-bold text-orange-600">{timetable.conflicts}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <CheckCircle className="h-4 w-4 text-purple-600 mr-1" />
                    <span className="text-sm text-gray-600">Score</span>
                  </div>
                  <div className="text-xl font-bold text-purple-600">{timetable.score}/100</div>
                </div>
              </div>

              {/* Quick Schedule Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-gray-900">Schedule Overview</h4>
                <div className="text-sm text-gray-600">
                  <p>Total Classes: {timetable.schedule.length}</p>
                  <p>Approved: {new Date(timetable.approvedAt).toLocaleDateString()}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✅ Approved & Saved
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}