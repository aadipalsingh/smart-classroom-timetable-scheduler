# 🎓 TimeNest - Smart Classroom and Timetable Scheduler

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
- **Classroom Management**: Room capacity and equipment tracking with full CRUD operations
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
- **Purple Gradient Theme**: Consistent TimeNest branding throughout
- **Interactive Elements**: Full featured landing page and authentication flow

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/aadipalsingh/smart-classroom-timetable-scheduler.git
   cd smart-classroom-timetable-scheduler
   ```

2. **Navigate to client directory**

   ```bash
   cd client
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080` (or the port shown in terminal) to view the application

### Build for Production

```bash
npm run build
```

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

## 📁 Project Structure

```
smart-classroom-timetable-scheduler/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── app/                    # App routing and layout
│   │   ├── features/               # Feature-based modules
│   │   │   ├── auth/              # Authentication (Login/SignUp)
│   │   │   ├── dashboard/         # Analytics dashboard
│   │   │   ├── classrooms/        # Classroom management (CRUD)
│   │   │   ├── faculty/           # Faculty management
│   │   │   ├── timetable/         # Timetable generation
│   │   │   ├── landing/           # Landing page
│   │   │   └── settings/          # Application settings
│   │   ├── shared/                # Shared components and utilities
│   │   │   ├── components/        # Reusable UI components
│   │   │   │   ├── ui/           # shadcn/ui components
│   │   │   │   └── Logo.tsx      # TimeNest logo component
│   │   │   ├── hooks/            # Custom React hooks
│   │   │   ├── lib/              # Utility functions
│   │   │   ├── contexts/         # React contexts
│   │   │   └── services/         # Business logic services
│   │   └── data/                 # Mock data and configurations
│   ├── package.json
│   └── vite.config.ts
├── server/                        # Backend API (structure ready)
│   ├── package.json
│   └── README.md
├── docs/                         # Documentation
│   ├── NEW-STRUCTURE-README.md
│   ├── QUICK-START.md
│   └── README.md
└── scripts/                      # Utility scripts
    ├── build-prod.sh
    ├── dev-setup.sh
    └── update-imports.sh
```

## 🎯 Key Features Implemented

### Authentication System

- Professional login/signup pages with split-screen design
- Purple gradient theme consistent with TimeNest branding
- Demo credentials for quick testing
- Form validation and toast notifications

### Classroom Management (Full CRUD)

- ✅ **Add Classroom**: Complete form with validation
- ✅ **Edit Classroom**: Update existing classroom details
- ✅ **Delete Classroom**: Safe deletion with confirmation
- ✅ **View/Search**: Grid view with search and filtering
- Equipment management with dynamic add/remove
- Status tracking (Available/Occupied/Maintenance)

### Landing Page

- Professional marketing page with hero section
- Features showcase and testimonials
- Smooth navigation to authentication
- Responsive design with consistent branding

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the client directory:

```env
VITE_APP_NAME="TimeNest"
VITE_API_BASE_URL="http://localhost:3000"
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Repository**: [GitHub](https://github.com/aadipalsingh/smart-classroom-timetable-scheduler)
- **Live Demo**: Coming soon...
- **Documentation**: See `/docs` directory

---

Built with ❤️ using React, TypeScript, and modern web technologies.
