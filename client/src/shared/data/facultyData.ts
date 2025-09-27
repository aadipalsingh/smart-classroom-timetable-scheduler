export interface Faculty {
  id: string
  name: string
  email: string
  phone: string
  department: string
  subjects: string[]
  status: 'active' | 'inactive'
}

export const facultyData: Faculty[] = [
  {
    id: "1",
    name: "Mr. Nikhil Tyagi",
    email: "nikhil.tyagi@college.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    subjects: ["Web Technology", "Cyber Security", "Web Technology Lab(WTL)"],
    status: "active"
  },
  {
    id: "2",
    name: "Ms. Navya Sharma",
    email: "navya.sharma@college.edu",
    phone: "+1 (555) 234-5678",
    department: "Computer Science",
    subjects: ["Database Management Systems(DBMS)", "Database Management Systems Lab(DBMSL)"],
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
    subjects: ["Design and Analysis of Algorithms(DAA)", "Design and Analysis of Algorithms Lab(DAAL)"],
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
]

// Helper functions
export const getActiveFaculties = (): Faculty[] => {
  return facultyData.filter(faculty => faculty.status === 'active')
}

export const getFacultiesByDepartment = (department: string): Faculty[] => {
  return facultyData.filter(faculty => 
    faculty.status === 'active' && 
    faculty.department.toLowerCase().includes(department.toLowerCase())
  )
}

export const getFacultyBySubject = (subjectName: string): Faculty[] => {
  return facultyData.filter(faculty => 
    faculty.status === 'active' && 
    faculty.subjects.some(subject => 
      subject.toLowerCase().includes(subjectName.toLowerCase())
    )
  )
}

export const getAllSubjects = (): string[] => {
  const allSubjects = facultyData.reduce((subjects: string[], faculty) => {
    return subjects.concat(faculty.subjects)
  }, [])
  
  return [...new Set(allSubjects)].sort()
}