import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { 
  Clock, 
  Users, 
  BookOpen, 
  Mail, 
  Download, 
  AlertTriangle,
  Calendar,
  GraduationCap
} from 'lucide-react';
import { 
  FacultyTimetable, 
  DepartmentFacultyTimetables, 
  facultyTimetableService 
} from '../../shared/services/facultyTimetableService';

interface FacultyTimetableViewProps {
  departmentTimetables?: DepartmentFacultyTimetables;
}

const FacultyTimetableView: React.FC<FacultyTimetableViewProps> = ({ 
  departmentTimetables 
}) => {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [viewMode, setViewMode] = useState<'overview' | 'individual' | 'export'>('overview');
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'email'>('json');

  if (!departmentTimetables) {
    return (
      <Card className="w-full max-w-4xl mx-auto mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Faculty Timetable Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              No faculty timetables available. Please generate a timetable first to distribute schedules to faculty members.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const handleExport = () => {
    try {
      const exportData = facultyTimetableService.exportFacultyTimetables(exportFormat);
      
      if (exportFormat === 'csv' || exportFormat === 'email') {
        // Create downloadable file
        const blob = new Blob([exportData as string], { 
          type: exportFormat === 'csv' ? 'text/csv' : 'text/plain' 
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `faculty_timetables_${departmentTimetables.department}_${departmentTimetables.semester}.${exportFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // JSON - copy to clipboard
        navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
        alert('Faculty timetables copied to clipboard!');
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  const renderDepartmentOverview = () => (
    <div className="space-y-6">
      {/* Department Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Department Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {departmentTimetables.summary.totalFaculties}
              </div>
              <div className="text-sm text-gray-600">Total Faculty</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {departmentTimetables.summary.totalClasses}
              </div>
              <div className="text-sm text-gray-600">Total Classes</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {departmentTimetables.summary.averageWorkload}
              </div>
              <div className="text-sm text-gray-600">Avg. Workload</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {departmentTimetables.summary.conflictsFound}
              </div>
              <div className="text-sm text-gray-600">Conflicts</div>
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            Generated on {new Date(departmentTimetables.generatedAt).toLocaleString()}
          </div>
        </CardContent>
      </Card>

      {/* Faculty List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Faculty Schedules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {departmentTimetables.facultyTimetables.map((faculty) => (
              <div 
                key={faculty.facultyId}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedFaculty(faculty.facultyName);
                  setViewMode('individual');
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{faculty.facultyName}</div>
                    <div className="text-sm text-gray-500">{faculty.facultyEmail}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{faculty.totalClasses} classes/week</div>
                    <div className="text-xs text-gray-500">{faculty.workload.dailyAverage} avg/day</div>
                  </div>
                  
                  {faculty.conflicts.length > 0 && (
                    <Badge variant="destructive">{faculty.conflicts.length} conflicts</Badge>
                  )}
                  
                  <Button variant="outline" size="sm">
                    View Schedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIndividualFaculty = () => {
    const faculty = departmentTimetables.facultyTimetables.find(
      f => f.facultyName === selectedFaculty
    );
    
    if (!faculty) {
      return <div>Faculty not found</div>;
    }

    // Group schedule by days
    const scheduleByDay = faculty.schedule.reduce((acc, slot) => {
      if (!acc[slot.day]) acc[slot.day] = [];
      acc[slot.day].push(slot);
      return acc;
    }, {} as Record<string, typeof faculty.schedule>);

    // Sort each day's schedule by time
    Object.keys(scheduleByDay).forEach(day => {
      scheduleByDay[day].sort((a, b) => a.time.localeCompare(b.time));
    });

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
      <div className="space-y-6">
        {/* Faculty Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  {faculty.facultyName}
                </CardTitle>
                <div className="text-sm text-gray-500 mt-1">
                  {faculty.facultyEmail} • {faculty.department}
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setViewMode('overview')}
              >
                Back to Overview
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="text-lg font-bold text-blue-600">{faculty.totalClasses}</div>
                <div className="text-xs text-gray-600">Classes/Week</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded">
                <div className="text-lg font-bold text-green-600">{faculty.workload.dailyAverage}</div>
                <div className="text-xs text-gray-600">Daily Average</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded">
                <div className="text-lg font-bold text-purple-600">
                  {Object.keys(faculty.workload.subjectBreakdown).length}
                </div>
                <div className="text-xs text-gray-600">Subjects</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conflicts Alert */}
        {faculty.conflicts.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              <strong>Scheduling Conflicts Found:</strong>
              <ul className="mt-2 list-disc list-inside">
                {faculty.conflicts.map((conflict, index) => (
                  <li key={index} className="text-sm">{conflict}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Weekly Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Weekly Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {days.map(day => (
                <div key={day} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">{day}</h4>
                  {scheduleByDay[day] ? (
                    <div className="space-y-2">
                      {scheduleByDay[day].map((slot, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded"
                        >
                          <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">{slot.time}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="font-medium">{slot.subject}</div>
                              <div className="text-sm text-gray-500">
                                {slot.batchName} • Room: {slot.room}
                              </div>
                            </div>
                            <Badge variant="outline">{slot.type}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No classes scheduled
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Subject Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {Object.entries(faculty.workload.subjectBreakdown).map(([subject, count]) => (
                <div key={subject} className="flex items-center justify-between p-2 border rounded">
                  <span className="font-medium">{subject}</span>
                  <Badge variant="secondary">{count} classes</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderExportOptions = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Faculty Timetables
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Export Format:</label>
            <div className="grid grid-cols-3 gap-2">
              {(['json', 'csv', 'email'] as const).map(format => (
                <Button
                  key={format}
                  variant={exportFormat === format ? 'default' : 'outline'}
                  onClick={() => setExportFormat(format)}
                  className="capitalize"
                >
                  {format}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Export Description:</h4>
            {exportFormat === 'json' && (
              <p className="text-sm text-gray-600">
                Export as JSON format with complete timetable data. Will be copied to clipboard.
              </p>
            )}
            {exportFormat === 'csv' && (
              <p className="text-sm text-gray-600">
                Export as CSV spreadsheet for easy viewing in Excel or Google Sheets.
              </p>
            )}
            {exportFormat === 'email' && (
              <p className="text-sm text-gray-600">
                Generate email content for sending individual timetables to faculty members.
              </p>
            )}
          </div>
          
          <Button onClick={handleExport} className="w-full" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Export {exportFormat.toUpperCase()}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-6xl mx-auto mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Faculty Timetable Distribution
          </CardTitle>
          <div className="text-sm text-gray-600">
            {departmentTimetables.department} Department • {departmentTimetables.semester} Semester
          </div>
        </CardHeader>
      </Card>

      <div className="mt-6">
        <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Department Overview</TabsTrigger>
            <TabsTrigger value="individual" disabled={!selectedFaculty}>
              Individual Faculty
            </TabsTrigger>
            <TabsTrigger value="export">Export Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            {renderDepartmentOverview()}
          </TabsContent>
          
          <TabsContent value="individual" className="mt-6">
            {renderIndividualFaculty()}
          </TabsContent>
          
          <TabsContent value="export" className="mt-6">
            {renderExportOptions()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacultyTimetableView;