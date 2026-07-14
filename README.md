# 🎯 Advanced Kanban Board

A modern, production-ready kanban board application built with React 18 and Vite. Features drag-and-drop task management, team assignments, time tracking, and advanced filtering.

## ✨ Features

### Core Functionality
- **Drag & Drop**: Move tasks smoothly between columns
- **Task Management**: Create, edit, and delete tasks  
- **4 Column Layout**: To Do, In Progress, In Review, Completed

### Advanced Features
- 🔍 **Search**: Real-time task search by title or description
- 🎯 **Priority Filter**: Filter tasks by High, Medium, or Low priority
- 👥 **Team Assignments**: Assign tasks to team members
- ⏱️ **Time Tracking**: Log hours spent on tasks (0.5 hour increments)
- 🏷️ **Tags/Labels**: Organize tasks with custom labels
- 📝 **Task Details**: Full task editing modal with all metadata
- 📊 **Statistics**: Real-time stats showing total, in-progress, and completed
- 🎨 **Modern UI**: Dark gradient design with glassmorphism effects
- 📱 **Responsive**: Fully responsive from mobile to desktop

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm 7+

### Installation

```bash
# 1. Extract the project
unzip kanban-project.zip
cd kanban-project

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The app will open at `http://localhost:5173`

## 📖 Usage

### Creating Tasks
1. Type in the "Add task..." input at the bottom of any column
2. Press Enter or click the "+" button
3. Task appears in that column

### Editing Tasks
1. Click on any task title to open the edit modal
2. Update: title, description, priority, assignee, hours, due date, tags
3. Click "Save Changes"

### Moving Tasks
1. Click and hold a task card
2. Drag it to another column
3. Release to drop

### Time Tracking
1. Click the ⏱️ button to add 30 minutes
2. Or manually set hours in the task modal
3. Time displays as "⏱️ 2h" on the card

### Filtering
- **Search**: Type to filter by title or description
- **Priority**: Select High, Medium, Low, or All
- Stats show both filtered and total counts

## 🎨 Customization

### Change Colors
Edit `src/components/KanbanBoard.css`:
```css
.kanban-app {
  background: linear-gradient(135deg, #yourColor1 0%, #yourColor2 100%);
}
```

### Add Team Members
Edit `src/components/KanbanBoard.jsx`:
```javascript
const TEAM_MEMBERS = ['Alice', 'Bob', 'Carol', 'David', 'Emma'];
// Add more names here
```

### Modify Initial Tasks
Edit `src/components/KanbanBoard.jsx` in the useState section

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

## 📂 Project Structure

```
kanban-project/
├── src/
│   ├── components/
│   │   ├── KanbanBoard.jsx        (Main component - 500+ lines)
│   │   └── KanbanBoard.css        (Styling - 400+ lines)
│   ├── App.jsx                    (Root component)
│   ├── App.css                    (Global styles)
│   └── main.jsx                   (React entry point)
├── index.html                     (HTML template)
├── package.json                   (Dependencies)
├── vite.config.js                 (Vite config)
└── .gitignore
```

## 🔐 Data Management

Currently, tasks are stored in React state (in-memory). To add persistence:

### LocalStorage (Simple)
```javascript
// In KanbanBoard.jsx
useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);

useEffect(() => {
  const saved = localStorage.getItem('tasks');
  if (saved) setTasks(JSON.parse(saved));
}, []);
```

### Backend (Advanced)
Connect to your backend API with:
- Node.js + Express
- MongoDB
- PostgreSQL
- Firebase

## 📦 Dependencies

**Production**:
- react@18.2.0 - UI library
- react-dom@18.2.0 - DOM rendering

**Development**:
- vite@5.0.7 - Build tool
- @vitejs/plugin-react@4.2.0 - React support
- oxlint@0.2.14 - Linter

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

## 📊 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS 12+, Android 6+)

## 🎓 What You'll Learn

- React hooks (useState, useEffect)
- Component composition
- Drag & Drop API
- CSS gradients & animations
- Responsive design
- State management patterns
- Form handling
- Modal components
- Vite & modern build tools
- Deployment strategies

## 📞 Troubleshooting

### "Cannot find module 'react'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Port 5173 already in use"
```bash
npm run dev -- --port 3000
```

### CSS not loading
Check imports in `src/App.jsx`:
```javascript
import './App.css'
import './components/KanbanBoard.css'
```

## 📚 Documentation

- `QUICKSTART.md` - 2-minute quick start
- `INSTALLATION_GUIDE.md` - Detailed setup
- `PROJECT_SUMMARY.md` - Complete overview
- `SETUP.md` - Advanced configuration

## 🎉 Features Roadmap

- ✅ Drag & drop (Complete)
- ✅ Task editing (Complete)
- ✅ Time tracking (Complete)
- ✅ Team assignments (Complete)
- 📋 LocalStorage persistence
- 🔐 User authentication
- 💬 Task comments
- 🔔 Notifications
- 📈 Analytics dashboard
- 🎨 Custom themes
- 📱 Mobile app

## 📄 License

MIT License - Feel free to use this project for personal or commercial use.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Created with ❤️ for developers**

Happy coding! 🚀
