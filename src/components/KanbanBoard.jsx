import React, { useState } from 'react'
import './KanbanBoard.css'

const TEAM_MEMBERS = ['Alice', 'Bob', 'Carol', 'David', 'Emma', 'Unassigned']

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [
      {
        id: '1',
        title: 'Design system audit',
        description: 'Review current design patterns and update documentation',
        priority: 'high',
        tags: ['design', 'planning'],
        assignee: 'Alice',
        timeSpent: 2,
        dueDate: 'Today',
      },
      {
        id: '2',
        title: 'Create wireframes',
        description: 'Low-fi mockups for new dashboard feature',
        priority: 'high',
        tags: ['design', 'ux'],
        assignee: 'Carol',
        timeSpent: 0,
        dueDate: '2 days',
      },
      {
        id: '3',
        title: 'User research',
        description: 'Interview key customers about pain points',
        priority: 'medium',
        tags: ['research'],
        assignee: 'Emma',
        timeSpent: 1,
        dueDate: '5 days',
      },
    ],
    inProgress: [
      {
        id: '4',
        title: 'Build login flow',
        description: 'Implement OAuth integration with Google and GitHub',
        priority: 'high',
        tags: ['backend', 'auth'],
        assignee: 'Bob',
        timeSpent: 4,
        dueDate: 'Tomorrow',
      },
      {
        id: '5',
        title: 'Database optimization',
        description: 'Improve query performance on user analytics table',
        priority: 'medium',
        tags: ['backend', 'database'],
        assignee: 'David',
        timeSpent: 3,
        dueDate: '3 days',
      },
    ],
    review: [
      {
        id: '6',
        title: 'Code review',
        description: 'Review PR #234 - Authentication module',
        priority: 'medium',
        tags: ['review', 'code'],
        assignee: 'Alice',
        timeSpent: 1,
        dueDate: 'Today',
      },
      {
        id: '7',
        title: 'Design review',
        description: 'Team feedback session on new UI components',
        priority: 'low',
        tags: ['review', 'design'],
        assignee: 'Unassigned',
        timeSpent: 0,
        dueDate: 'Tomorrow',
      },
    ],
    done: [
      {
        id: '8',
        title: 'Setup CI/CD',
        description: 'GitHub Actions pipeline for automated testing',
        priority: 'high',
        tags: ['devops', 'infrastructure'],
        assignee: 'David',
        timeSpent: 5,
        dueDate: 'Completed',
      },
      {
        id: '9',
        title: 'API documentation',
        description: 'Complete API endpoint documentation',
        priority: 'medium',
        tags: ['documentation'],
        assignee: 'Bob',
        timeSpent: 3,
        dueDate: 'Completed',
      },
    ],
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [draggedTask, setDraggedTask] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTaskInputs, setNewTaskInputs] = useState({
    todo: '',
    inProgress: '',
    review: '',
    done: '',
  })

  const columns = [
    { id: 'todo', title: 'To Do', icon: '01' },
    { id: 'inProgress', title: 'In Progress', icon: '02' },
    { id: 'review', title: 'In Review', icon: '03' },
    { id: 'done', title: 'Completed', icon: '04' },
  ]

  // Filter tasks based on search and priority
  const filterTasks = (columnTasks) => {
    return columnTasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
      return matchesSearch && matchesPriority
    })
  }

  // Drag handlers
  const handleDragStart = (e, task, sourceColumn) => {
    setDraggedTask({ task, sourceColumn })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetColumn) => {
    e.preventDefault()
    if (!draggedTask) return

    const { task, sourceColumn } = draggedTask

    if (sourceColumn !== targetColumn) {
      setTasks((prev) => ({
        ...prev,
        [sourceColumn]: prev[sourceColumn].filter((t) => t.id !== task.id),
        [targetColumn]: [...prev[targetColumn], task],
      }))
    }
    setDraggedTask(null)
  }

  // Task management
  const addTask = (columnId) => {
    const title = newTaskInputs[columnId].trim()
    if (!title) return

    const newTask = {
      id: Date.now().toString(),
      title,
      description: '',
      priority: 'medium',
      tags: [],
      assignee: 'Unassigned',
      timeSpent: 0,
      dueDate: '3 days',
    }

    setTasks((prev) => ({
      ...prev,
      [columnId]: [...prev[columnId], newTask],
    }))

    setNewTaskInputs((prev) => ({
      ...prev,
      [columnId]: '',
    }))
  }

  const deleteTask = (columnId, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((t) => t.id !== taskId),
    }))
  }

  const updateTask = (columnId, updatedTask) => {
    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      ),
    }))
    setIsModalOpen(false)
    setSelectedTask(null)
  }

  const addTimeToTask = (columnId, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].map((t) =>
        t.id === taskId ? { ...t, timeSpent: t.timeSpent + 0.5 } : t
      ),
    }))
  }

  const openTaskModal = (task, columnId) => {
    setSelectedTask({ ...task, columnId })
    setIsModalOpen(true)
  }

  const totalTasks = Object.values(tasks).reduce((sum, col) => sum + col.length, 0)
  const completedTasks = tasks.done.length
  const inProgressTasks = tasks.inProgress.length

  return (
    <div className="kanban-app">
      <div className="kanban-wrapper">
        {/* Header */}
        <div className="top-bar">
          <div className="header-section">
            <p>Work Order Board</p>
            <h1>Task Ledger</h1>
          </div>
          <div className="controls">
            <input
              type="text"
              className="search-box"
              placeholder="Search tickets…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="priority-filter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-label">Total Tasks</div>
            <div className="stat-value">{totalTasks}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">In Progress</div>
            <div className="stat-value">{inProgressTasks}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Completed</div>
            <div className="stat-value">{completedTasks}</div>
          </div>
        </div>

        {/* Board */}
        <div className="board">
          {columns.map((column) => {
            const filteredTasks = filterTasks(tasks[column.id])

            return (
              <div key={column.id} className="column">
                <div className="column-header">
                  <div className="column-title-row">
                    <span className="column-icon">{column.icon}</span>
                    <span className="column-title">{column.title}</span>
                  </div>
                  <div className="column-stats">
                    <span className="stat-item">
                      <span className="stat-badge">{filteredTasks.length}</span>
                      <span>visible</span>
                    </span>
                    <span className="stat-item">
                      (Total: {tasks[column.id].length})
                    </span>
                  </div>
                </div>

                <div
                  className="drop-zone"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column.id)}
                  onDragEnter={(e) =>
                    e.currentTarget.classList.add('drag-over')
                  }
                  onDragLeave={(e) =>
                    e.currentTarget.classList.remove('drag-over')
                  }
                >
                  {filteredTasks.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">— empty lane —</div>
                      <div className="empty-text">No tickets match filters</div>
                    </div>
                  ) : (
                    filteredTasks.map((task) => (
                      <div
                        key={task.id}
                        className="task-card"
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, task, column.id)
                        }
                      >
                        <div className="task-top">
                          <div
                            className="task-title"
                            onClick={() => openTaskModal(task, column.id)}
                          >
                            <span className="ticket-id">
                              #{String(task.id).slice(-4).padStart(4, '0')}
                            </span>
                            {task.title}
                          </div>
                          <div className="task-actions">
                            <button
                              className="task-btn"
                              onClick={() => addTimeToTask(column.id, task.id)}
                              title="Add 30min"
                            >
                              +30M
                            </button>
                            <button
                              className="task-btn"
                              onClick={() => deleteTask(column.id, task.id)}
                              title="Delete"
                            >
                              DEL
                            </button>
                          </div>
                        </div>

                        {task.description && (
                          <div className="task-desc">{task.description}</div>
                        )}

                        {task.tags.length > 0 && (
                          <div className="task-tags">
                            {task.tags.map((tag, idx) => (
                              <span key={idx} className="tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="task-meta">
                          <div className="meta-item">
                            <div className="assignee-avatar">
                              {task.assignee.charAt(0)}
                            </div>
                            <span>{task.assignee}</span>
                          </div>
                          <div className="meta-item time-log">
                            ⏱ {task.timeSpent}h
                          </div>
                          <div className="meta-item"> {task.dueDate}</div>
                        </div>

                        <div className={`priority-badge priority-${task.priority}`}>
                          {task.priority}
                        </div>
                      </div>
                    ))
                  )}

                  <div className="add-task-section">
                    <input
                      type="text"
                      className="add-input"
                      placeholder="Add task..."
                      value={newTaskInputs[column.id]}
                      onChange={(e) =>
                        setNewTaskInputs((prev) => ({
                          ...prev,
                          [column.id]: e.target.value,
                        }))
                      }
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') addTask(column.id)
                      }}
                    />
                    <button
                      className="add-btn"
                      onClick={() => addTask(column.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedTask && (
        <div
          className="modal"
          onClick={(e) =>
            e.target === e.currentTarget && setIsModalOpen(false)
          }
        >
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">Edit Task</div>
              <button
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Task Title</label>
              <input
                type="text"
                className="form-input"
                value={selectedTask.title}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, title: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                value={selectedTask.description}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={selectedTask.priority}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Assignee</label>
              <select
                className="form-select"
                value={selectedTask.assignee}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, assignee: e.target.value })
                }
              >
                {TEAM_MEMBERS.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Time Spent (hours)</label>
              <input
                type="number"
                className="form-input"
                value={selectedTask.timeSpent}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    timeSpent: parseFloat(e.target.value),
                  })
                }
                min="0"
                step="0.5"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="text"
                className="form-input"
                value={selectedTask.dueDate}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    dueDate: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tags (comma separated)</label>
              <input
                type="text"
                className="form-input"
                value={selectedTask.tags.join(', ')}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    tags: e.target.value
                      .split(',')
                      .map((tag) => tag.trim())
                      .filter((tag) => tag),
                  })
                }
              />
            </div>

            <div className="modal-buttons">
              <button
                className="modal-btn modal-btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="modal-btn modal-btn-primary"
                onClick={() =>
                  updateTask(selectedTask.columnId, selectedTask)
                }
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default KanbanBoard
