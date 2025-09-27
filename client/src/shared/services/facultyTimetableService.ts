// Faculty Timetable Distribution Service
// Automatically distributes generated timetables to individual faculty schedules

import { GeneratedTimetable, TimeSlot, MultiBatchResult, BatchTimetableResult } from './timetableGenerator'
import { Faculty, facultyData, getFacultiesByDepartment } from '../data/facultyData'

export interface FacultyTimeSlot extends TimeSlot {
  batchName: string
  batchId: string
  semester: string
  department: string
  classStrength?: number
}

export interface FacultyTimetable {
  facultyId: string
  facultyName: string
  facultyEmail: string
  department: string
  semester: string
  generatedAt: string
  schedule: FacultyTimeSlot[]
  totalClasses: number
  workload: {
    dailyAverage: number
    weeklyTotal: number
    subjectBreakdown: Record<string, number>
  }
  conflicts: string[]
}

export interface DepartmentFacultyTimetables {
  department: string
  semester: string
  generatedAt: string
  facultyTimetables: FacultyTimetable[]
  summary: {
    totalFaculties: number
    totalClasses: number
    averageWorkload: number
    conflictsFound: number
  }
}

class FacultyTimetableDistributionService {
  private facultySchedules: Map<string, FacultyTimetable> = new Map()
  
  /**
   * Main method to distribute generated timetables to all relevant faculty
   */
  distributeTimetablesToFaculties(
    timetableResult: GeneratedTimetable[] | MultiBatchResult,
    department: string,
    semester: string
  ): DepartmentFacultyTimetables {
    console.log("📧 Starting Faculty Timetable Distribution...")
    console.log(`🏫 Department: ${department}, Semester: ${semester}`)
    
    // Clear previous schedules
    this.facultySchedules.clear()
    
    // Get all active faculties for this department
    const departmentFaculties = getFacultiesByDepartment(department)
    console.log(`👨‍🏫 Found ${departmentFaculties.length} faculties in ${department}`)
    
    // Initialize empty timetables for all faculties
    this.initializeFacultyTimetables(departmentFaculties, department, semester)
    
    // Process timetable result based on type (single batch or multi-batch)
    if (Array.isArray(timetableResult)) {
      // Single batch result
      this.processSingleBatchResult(timetableResult, department, semester)
    } else {
      // Multi-batch result
      this.processMultiBatchResult(timetableResult, department, semester)
    }
    
    // Calculate workload and detect conflicts
    this.calculateFacultyWorkloads()
    const conflicts = this.detectFacultyConflicts()
    
    // Generate final department summary
    const facultyTimetables = Array.from(this.facultySchedules.values())
    const summary = this.generateDepartmentSummary(facultyTimetables, conflicts)
    
    console.log("✅ Faculty Distribution Complete!")
    console.log(`📊 Summary: ${summary.totalFaculties} faculties, ${summary.totalClasses} total classes`)
    
    return {
      department,
      semester,
      generatedAt: new Date().toISOString(),
      facultyTimetables,
      summary
    }
  }
  
  private initializeFacultyTimetables(
    faculties: Faculty[], 
    department: string, 
    semester: string
  ): void {
    console.log("🔧 Initializing faculty timetables...")
    
    faculties.forEach(faculty => {
      const facultyTimetable: FacultyTimetable = {
        facultyId: faculty.id,
        facultyName: faculty.name,
        facultyEmail: faculty.email,
        department: faculty.department,
        semester,
        generatedAt: new Date().toISOString(),
        schedule: [],
        totalClasses: 0,
        workload: {
          dailyAverage: 0,
          weeklyTotal: 0,
          subjectBreakdown: {}
        },
        conflicts: []
      }
      
      this.facultySchedules.set(faculty.name, facultyTimetable)
      console.log(`   ✅ Initialized timetable for ${faculty.name}`)
    })
  }
  
  private processSingleBatchResult(
    timetables: GeneratedTimetable[], 
    department: string, 
    semester: string
  ): void {
    console.log("📋 Processing single batch result...")
    
    // Use the first (best) timetable option
    const selectedTimetable = timetables[0]
    if (!selectedTimetable) {
      console.warn("⚠️ No timetable found in single batch result")
      return
    }
    
    console.log(`📅 Distributing schedule from: ${selectedTimetable.name}`)
    
    selectedTimetable.schedule.forEach(timeSlot => {
      if (timeSlot.faculty && timeSlot.type !== 'lunch' && timeSlot.type !== 'break') {
        this.addTimeSlotToFaculty(timeSlot, {
          batchName: selectedTimetable.batchName || 'Default Batch',
          batchId: selectedTimetable.batchId || 'default',
          department,
          semester
        })
      }
    })
  }
  
  private processMultiBatchResult(
    multiBatchResult: MultiBatchResult, 
    department: string, 
    semester: string
  ): void {
    console.log("🎯 Processing multi-batch result...")
    console.log(`📊 Processing ${multiBatchResult.batches.length} batches`)
    
    multiBatchResult.batches.forEach(batchResult => {
      console.log(`📚 Processing batch: ${batchResult.batchName}`)
      
      // Use the first (best) timetable option for each batch
      const selectedTimetable = batchResult.timetables[0]
      if (!selectedTimetable) {
        console.warn(`⚠️ No timetable found for batch ${batchResult.batchName}`)
        return
      }
      
      selectedTimetable.schedule.forEach(timeSlot => {
        if (timeSlot.faculty && timeSlot.type !== 'lunch' && timeSlot.type !== 'break') {
          this.addTimeSlotToFaculty(timeSlot, {
            batchName: batchResult.batchName,
            batchId: batchResult.batchId,
            department,
            semester
          })
        }
      })
    })
  }
  
  private addTimeSlotToFaculty(
    timeSlot: TimeSlot, 
    batchInfo: {
      batchName: string
      batchId: string
      department: string
      semester: string
    }
  ): void {
    const facultyTimetable = this.facultySchedules.get(timeSlot.faculty)
    
    if (!facultyTimetable) {
      console.warn(`⚠️ Faculty '${timeSlot.faculty}' not found in department faculty list`)
      return
    }
    
    // Create faculty time slot with batch information
    const facultyTimeSlot: FacultyTimeSlot = {
      ...timeSlot,
      batchName: batchInfo.batchName,
      batchId: batchInfo.batchId,
      semester: batchInfo.semester,
      department: batchInfo.department
    }
    
    facultyTimetable.schedule.push(facultyTimeSlot)
    facultyTimetable.totalClasses++
    
    console.log(`   📌 Added to ${timeSlot.faculty}: ${timeSlot.day} ${timeSlot.time} - ${timeSlot.subject} (${batchInfo.batchName})`)
  }
  
  private calculateFacultyWorkloads(): void {
    console.log("📊 Calculating faculty workloads...")
    
    this.facultySchedules.forEach((facultyTimetable, facultyName) => {
      const schedule = facultyTimetable.schedule
      
      // Calculate weekly total
      facultyTimetable.workload.weeklyTotal = schedule.length
      
      // Calculate daily average
      const daysWithClasses = new Set(schedule.map(slot => slot.day)).size
      facultyTimetable.workload.dailyAverage = daysWithClasses > 0 
        ? Math.round((schedule.length / daysWithClasses) * 100) / 100 
        : 0
      
      // Calculate subject breakdown
      const subjectBreakdown: Record<string, number> = {}
      schedule.forEach(slot => {
        const subject = slot.subject.replace(/\s*\((continued|extra|additional|gap-fill|final-fill|optimization|balance)\)/gi, '').trim()
        subjectBreakdown[subject] = (subjectBreakdown[subject] || 0) + 1
      })
      facultyTimetable.workload.subjectBreakdown = subjectBreakdown
      
      console.log(`   📈 ${facultyName}: ${facultyTimetable.workload.weeklyTotal} classes/week, ${facultyTimetable.workload.dailyAverage} avg/day`)
    })
  }
  
  private detectFacultyConflicts(): string[] {
    console.log("🔍 Detecting faculty scheduling conflicts...")
    
    const conflicts: string[] = []
    
    this.facultySchedules.forEach((facultyTimetable, facultyName) => {
      const timeSlotMap = new Map<string, FacultyTimeSlot[]>()
      
      // Group time slots by time key
      facultyTimetable.schedule.forEach(slot => {
        const timeKey = `${slot.day}-${slot.time}`
        if (!timeSlotMap.has(timeKey)) {
          timeSlotMap.set(timeKey, [])
        }
        timeSlotMap.get(timeKey)!.push(slot)
      })
      
      // Check for conflicts (same faculty, same time, different batches)
      timeSlotMap.forEach((slots, timeKey) => {
        if (slots.length > 1) {
          const conflictDetails = slots.map(s => `${s.subject} (${s.batchName})`).join(' vs ')
          const conflictMsg = `${facultyName} has conflict at ${timeKey}: ${conflictDetails}`
          conflicts.push(conflictMsg)
          facultyTimetable.conflicts.push(conflictMsg)
          console.log(`   ❌ CONFLICT: ${conflictMsg}`)
        }
      })
    })
    
    console.log(`🔍 Conflict detection complete: ${conflicts.length} conflicts found`)
    return conflicts
  }
  
  private generateDepartmentSummary(
    facultyTimetables: FacultyTimetable[], 
    conflicts: string[]
  ): DepartmentFacultyTimetables['summary'] {
    const totalClasses = facultyTimetables.reduce((sum, ft) => sum + ft.totalClasses, 0)
    const averageWorkload = facultyTimetables.length > 0 
      ? Math.round((totalClasses / facultyTimetables.length) * 100) / 100 
      : 0
    
    return {
      totalFaculties: facultyTimetables.length,
      totalClasses,
      averageWorkload,
      conflictsFound: conflicts.length
    }
  }
  
  /**
   * Get individual faculty timetable
   */
  getFacultyTimetable(facultyName: string): FacultyTimetable | null {
    return this.facultySchedules.get(facultyName) || null
  }
  
  /**
   * Export faculty timetables in various formats
   */
  exportFacultyTimetables(format: 'json' | 'csv' | 'email'): string | object {
    const timetables = Array.from(this.facultySchedules.values())
    
    switch (format) {
      case 'json':
        return JSON.stringify(timetables, null, 2)
        
      case 'csv':
        return this.convertToCSV(timetables)
        
      case 'email':
        return this.generateEmailContent(timetables)
        
      default:
        return timetables
    }
  }
  
  private convertToCSV(timetables: FacultyTimetable[]): string {
    const headers = ['Faculty', 'Day', 'Time', 'Subject', 'Batch', 'Room', 'Type']
    const rows = [headers.join(',')]
    
    timetables.forEach(ft => {
      ft.schedule.forEach(slot => {
        const row = [
          ft.facultyName,
          slot.day,
          slot.time,
          slot.subject,
          slot.batchName,
          slot.room,
          slot.type
        ].map(cell => `"${cell}"`).join(',')
        rows.push(row)
      })
    })
    
    return rows.join('\n')
  }
  
  private generateEmailContent(timetables: FacultyTimetable[]): string {
    return timetables.map(ft => `
📧 EMAIL FOR: ${ft.facultyName} (${ft.facultyEmail})
📋 SUBJECT: Your Weekly Timetable - ${ft.semester} Semester

Dear ${ft.facultyName},

Here is your assigned timetable for the ${ft.semester} semester:

📅 WEEKLY SCHEDULE:
${ft.schedule
  .sort((a, b) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayComparison = days.indexOf(a.day) - days.indexOf(b.day)
    if (dayComparison !== 0) return dayComparison
    return a.time.localeCompare(b.time)
  })
  .map(slot => `• ${slot.day} ${slot.time}: ${slot.subject} (${slot.batchName}) - Room: ${slot.room}`)
  .join('\n')}

📊 WORKLOAD SUMMARY:
• Total Classes per Week: ${ft.totalClasses}
• Daily Average: ${ft.workload.dailyAverage} classes
• Subject Distribution: ${Object.entries(ft.workload.subjectBreakdown)
    .map(([subject, count]) => `${subject} (${count})`)
    .join(', ')}

${ft.conflicts.length > 0 ? `⚠️ CONFLICTS FOUND:\n${ft.conflicts.map(c => `• ${c}`).join('\n')}\n` : '✅ No conflicts detected.'}

Please contact the academic office if you have any questions.

Best regards,
Academic Scheduling System
    `).join('\n' + '='.repeat(80) + '\n')
  }
}

// Singleton instance
export const facultyTimetableService = new FacultyTimetableDistributionService()

// Helper functions for external use
export const distributeTimetablesToFaculties = (
  timetableResult: GeneratedTimetable[] | MultiBatchResult,
  department: string,
  semester: string
): DepartmentFacultyTimetables => {
  return facultyTimetableService.distributeTimetablesToFaculties(timetableResult, department, semester)
}

export const getFacultyTimetable = (facultyName: string): FacultyTimetable | null => {
  return facultyTimetableService.getFacultyTimetable(facultyName)
}

export const exportFacultyTimetables = (format: 'json' | 'csv' | 'email'): string | object => {
  return facultyTimetableService.exportFacultyTimetables(format)
}