// PDF Generation Service for Timetables
import jsPDF from 'jspdf'
import { GeneratedTimetable, TimeSlot } from './timetableGenerator'

export class TimetablePDFService {
  private doc: jsPDF

  constructor() {
    this.doc = new jsPDF('landscape', 'mm', 'a4')
  }

  generateTimetablePDF(
    timetable: GeneratedTimetable, 
    config: {
      name: string
      department: string
      semester: string
    }
  ): void {
    try {
      console.log("🔄 Starting PDF generation...", { timetable, config })
      
      // Set up the document
      this.setupDocument(timetable, config)
      
      // Generate the timetable table manually (without autotable)
      this.generateTimetableTableManual(timetable)
      
      // Add metrics and footer
      this.addMetricsSection(timetable)
      
      // Download the PDF
      this.downloadPDF(`${config.name.replace(/[^a-z0-9]/gi, '_')}-${timetable.name.replace(/[^a-z0-9]/gi, '_')}.pdf`)
      
      console.log("✅ PDF generated successfully")
    } catch (error) {
      console.error("❌ PDF Generation Error:", error)
      throw new Error(`PDF generation failed: ${error}`)
    }
  }

  private setupDocument(
    timetable: GeneratedTimetable, 
    config: { name: string; department: string; semester: string }
  ) {
    const pageWidth = this.doc.internal.pageSize.getWidth()
    
    // Header
    this.doc.setFontSize(20)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('TIMETABLE', pageWidth / 2, 20, { align: 'center' })
    
    // Subtitle
    this.doc.setFontSize(14)
    this.doc.setFont('helvetica', 'normal')
    this.doc.text(config.name, pageWidth / 2, 30, { align: 'center' })
    
    // Details
    this.doc.setFontSize(12)
    const details = `${config.department} - ${config.semester} | ${timetable.name}`
    this.doc.text(details, pageWidth / 2, 40, { align: 'center' })
    
    // Generation date
    this.doc.setFontSize(10)
    this.doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 50, { align: 'center' })
  }

  private generateTimetableTableManual(timetable: GeneratedTimetable) {
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const timeSlots = this.extractTimeSlots(timetable.schedule)
    
    console.log("📊 Generating table with:", { weekDays, timeSlots: timeSlots.length })
    
    const startY = 60
    const cellWidth = 45
    const cellHeight = 20
    const headerHeight = 15
    
    // Draw header
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'bold')
    
    // Header background
    this.doc.setFillColor(59, 130, 246) // Blue background
    this.doc.rect(15, startY, cellWidth * 6, headerHeight, 'F')
    
    // Header text
    this.doc.setTextColor(255, 255, 255) // White text
    this.doc.text('Time', 15 + cellWidth/2, startY + headerHeight/2 + 3, { align: 'center' })
    
    weekDays.forEach((day, index) => {
      const x = 15 + cellWidth + (index * cellWidth)
      this.doc.text(day, x + cellWidth/2, startY + headerHeight/2 + 3, { align: 'center' })
    })
    
    // Reset text color
    this.doc.setTextColor(0, 0, 0)
    this.doc.setFont('helvetica', 'normal')
    this.doc.setFontSize(8)
    
    // Draw table rows
    timeSlots.forEach((timeSlot, rowIndex) => {
      const y = startY + headerHeight + (rowIndex * cellHeight)
      
      // Time column background
      this.doc.setFillColor(243, 244, 246) // Light gray
      this.doc.rect(15, y, cellWidth, cellHeight, 'F')
      
      // Draw borders
      this.doc.setDrawColor(200, 200, 200)
      this.doc.rect(15, y, cellWidth * 6, cellHeight, 'S')
      
      // Time text
      this.doc.setFont('helvetica', 'bold')
      this.doc.text(timeSlot, 15 + cellWidth/2, y + cellHeight/2 + 3, { align: 'center' })
      this.doc.setFont('helvetica', 'normal')
      
      // Draw day columns
      weekDays.forEach((day, dayIndex) => {
        const x = 15 + cellWidth + (dayIndex * cellWidth)
        
        const classInfo = timetable.schedule.find(
          slot => slot.day === day && slot.time === timeSlot
        )
        
        if (classInfo) {
          // Set background color based on type
          if (classInfo.type === 'lab') {
            this.doc.setFillColor(254, 243, 199) // Yellow for labs
          } else if (classInfo.type === 'break') {
            this.doc.setFillColor(220, 252, 231) // Green for breaks
          } else if (classInfo.type === 'lunch') {
            this.doc.setFillColor(239, 246, 255) // Light blue for lunch
          } else {
            this.doc.setFillColor(255, 255, 255) // White for theory
          }
          
          this.doc.rect(x, y, cellWidth, cellHeight, 'F')
          
          // Add text
          const lines = [
            classInfo.subject,
            classInfo.faculty,
            classInfo.room
          ].filter(line => line && line.trim().length > 0)
          
          const lineHeight = 4
          const startTextY = y + (cellHeight - lines.length * lineHeight) / 2 + lineHeight
          
          lines.forEach((line, lineIndex) => {
            if (line.length > 12) {
              line = line.substring(0, 10) + '...'
            }
            this.doc.text(line, x + cellWidth/2, startTextY + (lineIndex * lineHeight), { align: 'center' })
          })
        } else {
          // Empty cell
          this.doc.setFillColor(255, 255, 255)
          this.doc.rect(x, y, cellWidth, cellHeight, 'F')
        }
        
        // Draw cell border
        this.doc.rect(x, y, cellWidth, cellHeight, 'S')
      })
    })
  }

  private extractTimeSlots(schedule: TimeSlot[]): string[] {
    const slots = new Set<string>()
    schedule.forEach(slot => slots.add(slot.time))
    
    // Sort time slots chronologically
    return Array.from(slots).sort((a, b) => {
      const timeA = a.split(' - ')[0]
      const timeB = b.split(' - ')[0]
      return timeA.localeCompare(timeB)
    })
  }

  private addMetricsSection(timetable: GeneratedTimetable) {
    const startY = 200 // Fixed position for metrics
    
    // Metrics section
    this.doc.setFontSize(14)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('Timetable Metrics', 15, startY)
    
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'normal')
    
    const metrics = [
      `Efficiency Score: ${timetable.efficiency}%`,
      `Utilization Rate: ${timetable.utilization}%`,
      `Conflicts: ${timetable.conflicts}`,
      `Overall Score: ${timetable.score}/100`
    ]
    
    metrics.forEach((metric, index) => {
      this.doc.text(metric, 15, startY + 15 + (index * 8))
    })
    
    // Legend
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('Legend:', 150, startY)
    
    const legend = [
      { color: [254, 243, 199], text: 'Laboratory Sessions' },
      { color: [220, 252, 231], text: 'Break Time' },
      { color: [239, 246, 255], text: 'Lunch Break' },
      { color: [255, 255, 255], text: 'Theory Classes' }
    ]
    
    this.doc.setFont('helvetica', 'normal')
    legend.forEach((item, index) => {
      // Draw color box
      this.doc.setFillColor(item.color[0], item.color[1], item.color[2])
      this.doc.rect(150, startY + 12 + (index * 8), 4, 4, 'F')
      
      // Draw text
      this.doc.text(item.text, 158, startY + 15 + (index * 8))
    })
  }

  private downloadPDF(filename: string) {
    this.doc.save(filename)
  }
}

// Utility function to save timetable data
export function saveTimetableToStorage(
  timetable: GeneratedTimetable, 
  config: { name: string; department: string; semester: string }
): void {
  const savedTimetables = JSON.parse(localStorage.getItem('approved_timetables') || '[]')
  
  const timetableData = {
    id: `approved_${Date.now()}`,
    ...timetable,
    config,
    approvedAt: new Date().toISOString(),
    status: 'approved'
  }
  
  savedTimetables.push(timetableData)
  localStorage.setItem('approved_timetables', JSON.stringify(savedTimetables))
  
  console.log('💾 Timetable saved to storage:', timetableData.id)
}

// Utility function to get approved timetables
export function getApprovedTimetables(): any[] {
  return JSON.parse(localStorage.getItem('approved_timetables') || '[]')
}