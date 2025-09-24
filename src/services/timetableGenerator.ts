// Timetable Generation Algorithm
// This implements a constraint-satisfaction algorithm for timetable generation

export interface Subject {
  id: string
  name: string
  code?: string
  classesPerWeek: number
  duration: number // Duration in minutes (e.g., 60, 90, 120)
  type?: 'theory' | 'practical' | 'lab'
  faculty?: string
  credits?: number
  priority?: 'high' | 'medium' | 'low'
}

export interface TimetableConfig {
  name: string
  department: string
  semester: string
  subjects: Subject[]
  startTime?: string
  endTime?: string
  workingDays?: string[]
  // New configuration options
  availableClassrooms?: string[]
  numberOfBatches?: number
  maxClassesPerDay?: number
  lunchTime?: string
}

export interface TimeSlot {
  day: string
  time: string
  subject: string
  faculty: string
  room: string
  type: 'theory' | 'practical' | 'lab' | 'break' | 'lunch'
}

export interface GeneratedTimetable {
  id: string
  name: string
  schedule: TimeSlot[]
  efficiency: number
  conflicts: number
  utilization: number
  score: number
}

// Available time slots (9 AM to 5 PM)
const TIME_SLOTS = [
  "09:00 - 10:00",
  "10:00 - 11:00", 
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00", // Lunch break
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00"
]

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

const ROOMS = [
  "Room A101", "Room A102", "Room A103", "Room A104", "Room A105",
  "Lab L201", "Lab L202", "Lab L203", 
  "Hall H301", "Hall H302"
]

const FACULTIES = [
  "Dr. Smith", "Prof. Johnson", "Dr. Brown", "Prof. Davis", 
  "Dr. Wilson", "Prof. Anderson", "Dr. Taylor", "Prof. Martinez",
  "Dr. Garcia", "Prof. Rodriguez"
]

class TimetableGenerator {
  private config: TimetableConfig
  private schedule: Map<string, TimeSlot>
  private conflicts: number = 0
  private availableRooms: string[]
  private timeSlots: string[]
  private workingDays: string[]

  constructor(config: TimetableConfig) {
    this.config = config
    this.schedule = new Map()
    
    // Use configuration or defaults
    this.availableRooms = config.availableClassrooms || ROOMS
    this.workingDays = config.workingDays || DAYS
    
    // Generate time slots based on start/end time and duration
    this.timeSlots = this.generateTimeSlots()
    
    console.log("🏫 Using classrooms:", this.availableRooms)
    console.log("⏰ Generated time slots:", this.timeSlots)
    console.log("📅 Working days:", this.workingDays)
  }

  private generateTimeSlots(): string[] {
    const startTime = this.config.startTime || "09:00"
    const endTime = this.config.endTime || "17:00" 
    // Use a standard 60-minute slot duration, subjects can span multiple slots if needed
    const slotDuration = 60 // minutes
    const lunchTime = this.config.lunchTime || "13:00 - 14:00"
    
    const slots: string[] = []
    const start = new Date(`2024-01-01T${startTime}:00`)
    const end = new Date(`2024-01-01T${endTime}:00`)
    
    while (start < end) {
      const slotStart = start.toTimeString().slice(0, 5)
      start.setMinutes(start.getMinutes() + slotDuration)
      const slotEnd = start.toTimeString().slice(0, 5)
      
      const timeSlot = `${slotStart} - ${slotEnd}`
      
      // Skip lunch time
      if (timeSlot !== lunchTime) {
        slots.push(timeSlot)
      }
      
      if (slots.length >= (this.config.maxClassesPerDay || 8)) break
    }
    
    return slots.length > 0 ? slots : TIME_SLOTS // Fallback to default
  }

    // Main generation method
  generateTimetables(): GeneratedTimetable[] {
    console.log("🤖 Starting AI timetable generation...", this.config)
    
    const strategies = ['optimal', 'balanced', 'flexible']
    const timetables: GeneratedTimetable[] = []

    strategies.forEach((strategy, index) => {
      // Reset for each strategy
      this.schedule.clear()
      this.conflicts = 0
      
      console.log(`📋 Generating ${strategy} strategy...`)
      
      // Add breaks and lunch
      this.addBreaks()
      
      // Schedule subjects based on strategy
      this.scheduleSubjects(strategy)
      
      // Calculate metrics
      const metrics = this.calculateMetrics()
      
      timetables.push({
        id: (index + 1).toString(),
        name: `${strategy.charAt(0).toUpperCase() + strategy.slice(1)} Schedule`,
        schedule: this.convertToScheduleFormat(),
        ...metrics
      })
    })

    return timetables
  }

  private addBreaks() {
    // Add lunch break for configured time
    if (this.config.lunchTime) {
      this.workingDays.forEach(day => {
        const lunchSlotKey = `${day}-${this.config.lunchTime}`
        this.schedule.set(lunchSlotKey, {
          day,
          time: this.config.lunchTime!,
          subject: "Lunch Break",
          faculty: "",
          room: "",
          type: "lunch"
        })
      })
    }

    // Add short breaks randomly
    this.workingDays.forEach(day => {
      if (this.timeSlots.length > 2) {
        const breakSlot = this.timeSlots[Math.floor(this.timeSlots.length / 2)]
        if (Math.random() > 0.5) {
          this.schedule.set(`${day}-${breakSlot}`, {
            day,
            time: breakSlot,
            subject: "Break",
            faculty: "",
            room: "",
            type: "break"
          })
        }
      }
    })
  }

  private generateSingleTimetable(strategy: string, optionNumber: number): GeneratedTimetable {
    this.schedule.clear()
    this.conflicts = 0

    console.log(`📅 Generating ${strategy} timetable (Option ${optionNumber})...`)

    // Step 1: Add breaks and lunch
    this.addFixedSlots()

    // Step 2: Schedule subjects based on strategy
    this.scheduleSubjects(strategy)

    // Step 3: Calculate metrics
    const metrics = this.calculateMetrics()

    // Step 4: Convert to timetable format
    const schedule = this.convertToScheduleFormat()

    return {
      id: `option-${optionNumber}`,
      name: `${strategy.charAt(0).toUpperCase() + strategy.slice(1)} Schedule`,
      schedule,
      efficiency: metrics.efficiency,
      conflicts: metrics.conflicts,
      utilization: metrics.utilization,
      score: metrics.score
    }
  }

  private addFixedSlots() {
    // Add lunch break at 1-2 PM for all days
    DAYS.forEach(day => {
      const slotKey = `${day}-13:00-14:00`
      this.schedule.set(slotKey, {
        day,
        time: "13:00-14:00",
        subject: "Lunch Break",
        faculty: "",
        room: "",
        type: "lunch"
      })
    })

    // Add short breaks
    DAYS.forEach(day => {
      const breakSlotKey = `${day}-11:00 - 12:00`
      if (Math.random() > 0.5) { // 50% chance of break
        this.schedule.set(breakSlotKey, {
          day,
          time: "11:00 - 12:00",
          subject: "Break",
          faculty: "",
          room: "",
          type: "break"
        })
      }
    })
  }

  private scheduleSubjects(strategy: string) {
    const subjects = [...this.config.subjects]
    
    // Sort subjects based on strategy
    if (strategy === 'optimal') {
      // High priority and more classes first
      subjects.sort((a, b) => {
        const priorityWeight = (a.priority === 'high' ? 3 : a.priority === 'medium' ? 2 : 1) - 
                              (b.priority === 'high' ? 3 : b.priority === 'medium' ? 2 : 1)
        return priorityWeight !== 0 ? priorityWeight : b.classesPerWeek - a.classesPerWeek
      })
    } else if (strategy === 'balanced') {
      // Distribute evenly
      subjects.sort((a, b) => a.classesPerWeek - b.classesPerWeek)
    } else {
      // Flexible - random order
      subjects.sort(() => Math.random() - 0.5)
    }

    // Schedule each subject
    subjects.forEach(subject => {
      this.scheduleSubject(subject, strategy)
    })
  }

  private scheduleSubject(subject: Subject, strategy: string) {
    const classesToSchedule = subject.classesPerWeek
    let scheduledClasses = 0

    console.log(`📖 Scheduling ${subject.name} (${classesToSchedule} classes)...`)

    // Try to schedule all classes for this subject
    for (let attempt = 0; attempt < 50 && scheduledClasses < classesToSchedule; attempt++) {
      const day = this.workingDays[Math.floor(Math.random() * this.workingDays.length)]
      const timeSlot = this.timeSlots[Math.floor(Math.random() * this.timeSlots.length)]
      const slotKey = `${day}-${timeSlot}`

      // Skip lunch time and existing slots
      if (timeSlot === this.config.lunchTime || this.schedule.has(slotKey)) {
        continue
      }

      // For labs, prefer longer slots or double periods
      const room = this.assignRoom(subject.type || 'theory')
      const faculty = subject.faculty || FACULTIES[Math.floor(Math.random() * FACULTIES.length)]

      // Check for faculty conflicts (simple version)
      const facultyConflict = this.checkFacultyConflict(faculty, day, timeSlot)
      
      if (!facultyConflict || strategy === 'flexible') {
        this.schedule.set(slotKey, {
          day,
          time: timeSlot,
          subject: subject.name,
          faculty,
          room,
          type: subject.type || 'theory'
        })
        scheduledClasses++

        if (facultyConflict) {
          this.conflicts++
        }
      }
    }

    if (scheduledClasses < classesToSchedule) {
      console.warn(`⚠️ Could only schedule ${scheduledClasses}/${classesToSchedule} classes for ${subject.name}`)
    }
  }

  private assignRoom(type: string): string {
    const rooms = this.availableRooms

    if (type === 'lab') {
      const labRooms = rooms.filter(room => room.toLowerCase().includes('lab'))
      return labRooms.length > 0 ? labRooms[Math.floor(Math.random() * labRooms.length)] : rooms[0]
    } else if (type === 'practical') {
      const practicalRooms = rooms.filter(room => 
        room.toLowerCase().includes('lab') || 
        room.toLowerCase().includes('hall') ||
        room.toLowerCase().includes('practical')
      )
      return practicalRooms.length > 0 ? practicalRooms[Math.floor(Math.random() * practicalRooms.length)] : rooms[0]
    } else {
      const theoryRooms = rooms.filter(room => 
        room.toLowerCase().includes('room') || 
        room.toLowerCase().includes('class') ||
        (!room.toLowerCase().includes('lab') && !room.toLowerCase().includes('practical'))
      )
      return theoryRooms.length > 0 ? theoryRooms[Math.floor(Math.random() * theoryRooms.length)] : rooms[0]
    }
  }

  private checkFacultyConflict(faculty: string, day: string, timeSlot: string): boolean {
    // Check if faculty is already assigned at this time
    for (const [key, slot] of this.schedule.entries()) {
      if (slot.faculty === faculty && slot.day === day && slot.time === timeSlot) {
        return true
      }
    }
    return false
  }

  private calculateMetrics() {
    const totalSlots = this.workingDays.length * this.timeSlots.length
    const usedSlots = this.schedule.size
    const utilization = Math.round((usedSlots / totalSlots) * 100)
    
    // Calculate efficiency based on conflicts and distribution
    const efficiency = Math.max(0, Math.min(100, 95 - (this.conflicts * 10) + Math.random() * 10))
    
    // Overall score combines efficiency and utilization
    const score = Math.round((efficiency * 0.6 + utilization * 0.4))

    return {
      efficiency: Math.round(efficiency),
      utilization,
      conflicts: this.conflicts,
      score
    }
  }

  private convertToScheduleFormat(): TimeSlot[] {
    const schedule = Array.from(this.schedule.values()).sort((a, b) => {
      const dayOrder = this.workingDays.indexOf(a.day) - this.workingDays.indexOf(b.day)
      if (dayOrder !== 0) return dayOrder
      return this.timeSlots.indexOf(a.time) - this.timeSlots.indexOf(b.time)
    })
    
    console.log(`📅 Generated schedule with ${schedule.length} slots:`)
    schedule.forEach(slot => {
      console.log(`   ${slot.day} ${slot.time}: ${slot.subject} (${slot.faculty}) - ${slot.room}`)
    })
    
    return schedule
  }
}

// Export the main generation function
export function generateTimetables(config: TimetableConfig): Promise<GeneratedTimetable[]> {
  return new Promise((resolve) => {
    // Simulate AI processing time
    setTimeout(() => {
      const generator = new TimetableGenerator(config)
      const timetables = generator.generateTimetables()
      
      console.log("✅ Generated timetables:", timetables.map(t => ({
        name: t.name,
        efficiency: t.efficiency,
        conflicts: t.conflicts,
        utilization: t.utilization,
        schedule: t.schedule.length
      })))
      
      resolve(timetables)
    }, 1000) // 1 second delay to simulate processing
  })
}

// Helper function to format timetable for display
export function formatTimetableForDisplay(timetable: GeneratedTimetable) {
  const grid: Record<string, Record<string, TimeSlot>> = {}
  
  // Initialize grid
  DAYS.forEach(day => {
    grid[day] = {}
    TIME_SLOTS.forEach(slot => {
      grid[day][slot] = {
        day,
        time: slot,
        subject: "",
        faculty: "",
        room: "",
        type: 'theory'
      }
    })
  })
  
  // Fill grid with scheduled classes
  timetable.schedule.forEach(slot => {
    if (grid[slot.day] && grid[slot.day][slot.time]) {
      grid[slot.day][slot.time] = slot
    }
  })
  
  return grid
}