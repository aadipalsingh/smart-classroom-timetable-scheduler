# 🎓 Smart Classroom and Timetable Scheduler

A modern, AI-powered timetable generation system built with React, TypeScript, and advanced scheduling algorithms. This application helps educational institutions create optimized schedules while managing faculty, classrooms, and academic resources efficiently.

![Application Preview](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)

## ✨ Features

### 🤖 Intelligent Timetable Generation

- **AI-Powered Algorithms**: Advanced constraint satisfaction algorithms
- **Multi-Strategy Generation**: Optimal, balanced, and flexible scheduling strategies
- **Conflict Resolution**: Automatic detection and resolution of scheduling conflicts
- **Resource Optimization**: Smart allocation of classrooms and faculty

### 📊 Comprehensive Management

- **Faculty Management**: Complete faculty profiles with availability tracking
- **Classroom Management**: Room capacity and equipment tracking
- **Subject Configuration**: Flexible subject setup with duration and frequency control
- **Advanced Configuration**: Customizable time slots, lunch breaks, and batch settings

### 📈 Analytics & Reporting

- **Performance Metrics**: Efficiency scores, utilization rates, and conflict analysis
- **PDF Export**: Professional timetable PDFs with comprehensive layouts
- **Data Persistence**: Local storage for approved timetables and configurations
- **Dashboard Analytics**: Real-time insights and upcoming events

### 🎨 Modern User Interface

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Clean UI/UX**: Built with shadcn/ui components and Tailwind CSS
- **Dark/Light Themes**: Customizable appearance settings
- **Interactive Elements**: Drag-and-drop functionality and real-time updates

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/smart-classroom-timetable-scheduler.git
   cd smart-classroom-timetable-scheduler
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be available in the `dist` directory.

## 🛠️ Technology Stack

### Frontend

- **React 18.3.1** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components

### Libraries & Tools

- **React Router** - Client-side routing
- **jsPDF** - PDF generation capabilities
- **Lucide React** - Beautiful SVG icons
- **React Hook Form** - Form validation and handling
- **Sonner** - Toast notifications

### Development Tools

- **ESLint** - Code linting and quality
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing
- **Vite** - Lightning-fast HMR

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── AppSidebar.tsx  # Navigation sidebar
│   └── TopNavbar.tsx   # Header navigation
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Analytics dashboard
│   ├── CreateTimetable.tsx  # Timetable generation
│   ├── TimetableResults.tsx # Generated results
│   ├── Faculties.tsx   # Faculty management
│   └── Classrooms.tsx  # Classroom management
├── services/           # Business logic services
│   ├── timetableGenerator.ts  # AI scheduling algorithms
│   └── pdfService.ts   # PDF generation service
├── data/              # Mock data and configurations
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── types/             # TypeScript type definitions
```

## 🎯 Core Algorithms

### Constraint Satisfaction Problem (CSP)

The timetable generator uses advanced CSP techniques to solve complex scheduling problems:

- **Variable Assignment**: Time slots, rooms, and faculty assignments
- **Constraint Checking**: Hard constraints (conflicts) and soft constraints (preferences)
- **Backtracking Algorithm**: Intelligent search with conflict resolution
- **Optimization Strategies**: Multiple generation strategies for different use cases

### Scheduling Strategies

1. **Optimal Strategy**: Maximum efficiency with minimal conflicts
2. **Balanced Strategy**: Even distribution of workload
3. **Flexible Strategy**: Adaptable scheduling with preference consideration

## 📸 Screenshots

### Dashboard

![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Preview)

### Timetable Generation

![Timetable Generation](https://via.placeholder.com/800x400?text=Timetable+Generation)

### Results View

![Results](https://via.placeholder.com/800x400?text=Results+View)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_NAME="TimeNest"
VITE_API_BASE_URL="http://localhost:3000"
```

### Advanced Configuration

The application supports various configuration options:

- **Time Slots**: Customizable start/end times
- **Lunch Breaks**: Configurable break periods
- **Classroom Capacity**: Room-specific settings
- **Faculty Availability**: Individual schedules
- **Subject Duration**: Flexible class lengths

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Acknowledgments

- **shadcn/ui** - For the beautiful component library
- **Lucide** - For the comprehensive icon set
- **Tailwind CSS** - For the utility-first CSS framework
- **React Community** - For the amazing ecosystem

## 📞 Support

- 📧 Email: support@timenest.com
- 💬 Issues: [GitHub Issues](https://github.com/yourusername/smart-classroom-timetable-scheduler/issues)
- 📖 Documentation: [Wiki](https://github.com/yourusername/smart-classroom-timetable-scheduler/wiki)

## 🔮 Roadmap

- [ ] Database integration (PostgreSQL/MySQL)
- [ ] Real-time collaboration features
- [ ] Mobile application (React Native)
- [ ] Advanced analytics and reporting
- [ ] Integration with academic management systems
- [ ] Machine learning-based optimization
- [ ] Multi-language support
- [ ] Cloud deployment options

---

**Built with ❤️ by [Your Name](https://github.com/yourusername)**

_Making timetable management intelligent and efficient!_
