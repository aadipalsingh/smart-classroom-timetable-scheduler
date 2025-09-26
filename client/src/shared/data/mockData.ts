// Mock data for TimeNest

export interface Faculty {
  id: string
  name: string
  email: string
  department: string
  subjects: string[]
  maxHoursPerWeek: number
  leaveProb: number
  unavailableSlots: string[]
  phone: string
  joiningDate: string
  status: 'active' | 'on_leave' | 'unavailable'
}

export interface Classroom {
  id: string
  name: string
  capacity: number
  type: 'lecture' | 'lab' | 'seminar' | 'workshop'
  equipment: string[]
  building: string
  floor: number
  status: 'available' | 'maintenance' | 'occupied'
  features: string[]
}

export interface Subject {
  id: string
  name: string
  code: string
  department: string
  semester: number
  classesPerWeek: number
  duration: number
  type: 'theory' | 'practical' | 'lab'
  credits: number
}

export interface TimeSlot {
  id: string
  day: string
  startTime: string
  endTime: string
  subject: string
  faculty: string
  classroom: string
  batch: string
}

export interface TimetableOption {
  id: string
  name: string
  efficiency: number
  conflicts: number
  utilization: number
  schedule: TimeSlot[]
  createdAt: string
}

export interface Suggestion {
  id: string
  type: 'conflict_resolution' | 'optimization' | 'faculty_leave' | 'room_change'
  title: string
  description: string
  impact: 'low' | 'medium' | 'high'
  affectedClasses: number
  recommendation: string
  createdAt: string
  status: 'pending' | 'applied' | 'rejected'
}

// Mock Faculties
export const mockFaculties: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@college.edu',
    department: 'Computer Science',
    subjects: ['Data Structures', 'Algorithms', 'Programming'],
    maxHoursPerWeek: 20,
    leaveProb: 5,
    unavailableSlots: ['Monday 2:00-3:00 PM'],
    phone: '+1-555-0123',
    joiningDate: '2020-08-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@college.edu',
    department: 'Electronics',
    subjects: ['Digital Electronics', 'Microprocessors', 'VLSI'],
    maxHoursPerWeek: 18,
    leaveProb: 8,
    unavailableSlots: ['Friday 4:00-5:00 PM'],
    phone: '+1-555-0124',
    joiningDate: '2019-01-10',
    status: 'active'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@college.edu',
    department: 'Mathematics',
    subjects: ['Calculus', 'Linear Algebra', 'Statistics'],
    maxHoursPerWeek: 22,
    leaveProb: 3,
    unavailableSlots: [],
    phone: '+1-555-0125',
    joiningDate: '2021-03-22',
    status: 'active'
  },
  {
    id: '4',
    name: 'Prof. David Kumar',
    email: 'david.kumar@college.edu',
    department: 'Physics',
    subjects: ['Quantum Mechanics', 'Thermodynamics', 'Optics'],
    maxHoursPerWeek: 16,
    leaveProb: 12,
    unavailableSlots: ['Wednesday 1:00-2:00 PM', 'Thursday 3:00-4:00 PM'],
    phone: '+1-555-0126',
    joiningDate: '2018-09-05',
    status: 'on_leave'
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    email: 'lisa.thompson@college.edu',
    department: 'Computer Science',
    subjects: ['Database Systems', 'Web Development', 'Software Engineering'],
    maxHoursPerWeek: 20,
    leaveProb: 6,
    unavailableSlots: ['Tuesday 11:00 AM-12:00 PM'],
    phone: '+1-555-0127',
    joiningDate: '2022-01-15',
    status: 'active'
  },
  {
    id: '6',
    name: 'Prof. James Wilson',
    email: 'james.wilson@college.edu',
    department: 'Mechanical',
    subjects: ['Fluid Mechanics', 'Heat Transfer', 'Machine Design'],
    maxHoursPerWeek: 18,
    leaveProb: 7,
    unavailableSlots: [],
    phone: '+1-555-0128',
    joiningDate: '2020-06-10',
    status: 'active'
  }
]

// Mock Classrooms
export const mockClassrooms: Classroom[] = [
  {
    id: '1',
    name: 'Room 101',
    capacity: 60,
    type: 'lecture',
    equipment: ['Projector', 'Whiteboard', 'Sound System', 'AC'],
    building: 'Main Block',
    floor: 1,
    status: 'available',
    features: ['Wi-Fi', 'Power Outlets']
  },
  {
    id: '2',
    name: 'Lab 201',
    capacity: 30,
    type: 'lab',
    equipment: ['Computers', 'Projector', 'Individual Workstations'],
    building: 'Tech Block',
    floor: 2,
    status: 'available',
    features: ['High-Speed Internet', 'Server Access', 'Software Suite']
  },
  {
    id: '3',
    name: 'Seminar Hall A',
    capacity: 120,
    type: 'seminar',
    equipment: ['Stage', 'Microphones', 'Large Screen', 'Recording Setup'],
    building: 'Academic Block',
    floor: 1,
    status: 'available',
    features: ['Auditorium Seating', 'Live Streaming', 'Conference Setup']
  },
  {
    id: '4',
    name: 'Workshop 302',
    capacity: 25,
    type: 'workshop',
    equipment: ['Tools', 'Machinery', 'Safety Equipment'],
    building: 'Engineering Block',
    floor: 3,
    status: 'maintenance',
    features: ['Heavy Duty Power', 'Ventilation', 'Safety Protocols']
  },
  {
    id: '5',
    name: 'Room 205',
    capacity: 40,
    type: 'lecture',
    equipment: ['Smart Board', 'Projector', 'Document Camera'],
    building: 'Main Block',
    floor: 2,
    status: 'available',
    features: ['Natural Lighting', 'Ergonomic Furniture']
  },
  {
    id: '6',
    name: 'Physics Lab',
    capacity: 20,
    type: 'lab',
    equipment: ['Experimental Setup', 'Measuring Instruments', 'Safety Gear'],
    building: 'Science Block',
    floor: 1,
    status: 'occupied',
    features: ['Specialized Equipment', 'Research Grade Instruments']
  }
]

// Mock Subjects
export const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Data Structures and Algorithms',
    code: 'CS301',
    department: 'Computer Science',
    semester: 3,
    classesPerWeek: 4,
    duration: 60,
    type: 'theory',
    credits: 4
  },
  {
    id: '2',
    name: 'Database Management Systems',
    code: 'CS302',
    department: 'Computer Science',
    semester: 3,
    classesPerWeek: 3,
    duration: 60,
    type: 'theory',
    credits: 3
  },
  {
    id: '3',
    name: 'Programming Lab',
    code: 'CS303L',
    department: 'Computer Science',
    semester: 3,
    classesPerWeek: 2,
    duration: 120,
    type: 'lab',
    credits: 2
  },
  {
    id: '4',
    name: 'Digital Electronics',
    code: 'EC301',
    department: 'Electronics',
    semester: 3,
    classesPerWeek: 3,
    duration: 60,
    type: 'theory',
    credits: 3
  },
  {
    id: '5',
    name: 'Calculus III',
    code: 'MA301',
    department: 'Mathematics',
    semester: 3,
    classesPerWeek: 4,
    duration: 60,
    type: 'theory',
    credits: 4
  },
  {
    id: '6',
    name: 'Physics Practical',
    code: 'PH301L',
    department: 'Physics',
    semester: 3,
    classesPerWeek: 2,
    duration: 180,
    type: 'lab',
    credits: 2
  }
]

// Mock Timetable Options
export const mockTimetableOptions: TimetableOption[] = [
  {
    id: '1',
    name: 'Optimized Schedule A',
    efficiency: 92,
    conflicts: 2,
    utilization: 85,
    schedule: [
      {
        id: '1',
        day: 'Monday',
        startTime: '09:00',
        endTime: '10:00',
        subject: 'Data Structures',
        faculty: 'Dr. Sarah Johnson',
        classroom: 'Room 101',
        batch: 'CS-3A'
      },
      {
        id: '2',
        day: 'Monday',
        startTime: '10:00',
        endTime: '11:00',
        subject: 'Database Systems',
        faculty: 'Dr. Lisa Thompson',
        classroom: 'Room 205',
        batch: 'CS-3A'
      }
    ],
    createdAt: '2024-01-15 10:30'
  },
  {
    id: '2',
    name: 'Balanced Schedule B',
    efficiency: 88,
    conflicts: 1,
    utilization: 90,
    schedule: [],
    createdAt: '2024-01-15 10:32'
  },
  {
    id: '3',
    name: 'Faculty-Optimized C',
    efficiency: 95,
    conflicts: 0,
    utilization: 82,
    schedule: [],
    createdAt: '2024-01-15 10:35'
  }
]

// Mock Suggestions
export const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    type: 'conflict_resolution',
    title: 'Room Conflict Resolution',
    description: 'Room 101 is double-booked on Monday 2:00 PM. Suggest moving CS-3B to Room 205.',
    impact: 'medium',
    affectedClasses: 2,
    recommendation: 'Move CS-3B Database class from Room 101 to Room 205 at the same time slot.',
    createdAt: '2024-01-15 09:15',
    status: 'pending'
  },
  {
    id: '2',
    type: 'faculty_leave',
    title: 'Faculty Leave Adjustment',
    description: 'Prof. David Kumar is on leave. Reassign Physics classes to available faculty.',
    impact: 'high',
    affectedClasses: 8,
    recommendation: 'Distribute Physics classes among Dr. Emily Rodriguez and visiting faculty.',
    createdAt: '2024-01-14 14:30',
    status: 'applied'
  },
  {
    id: '3',
    type: 'optimization',
    title: 'Classroom Utilization',
    description: 'Lab 201 has only 60% utilization. Consider consolidating lab sessions.',
    impact: 'low',
    affectedClasses: 4,
    recommendation: 'Combine Programming Lab sessions to improve resource utilization.',
    createdAt: '2024-01-14 11:45',
    status: 'pending'
  },
  {
    id: '4',
    type: 'room_change',
    title: 'Equipment Requirement',
    description: 'Workshop 302 needs specialized equipment for Mechanical Engineering lab.',
    impact: 'medium',
    affectedClasses: 3,
    recommendation: 'Relocate Machine Design practical to Workshop 302 after maintenance.',
    createdAt: '2024-01-13 16:20',
    status: 'rejected'
  }
]

// Time slots configuration
export const timeSlots = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00'
]

export const weekDays = [
  'Monday',
  'Tuesday', 
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

// Department and shift options
export const departments = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil Engineering',
  'Mathematics',
  'Physics'
]

export const shifts = [
  'Morning (9:00 AM - 1:00 PM)',
  'Afternoon (1:00 PM - 5:00 PM)',
  'Evening (5:00 PM - 9:00 PM)'
]