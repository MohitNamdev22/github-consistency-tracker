"use client"

import { useState } from "react"
import { Link } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/cards"
import { Input } from "../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Bell, Plus, Check, X } from "lucide-react"

// Modal Component
function Modal({ show, onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('Not Started')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = () => {
    onSave({ title, status, dueDate })
    setTitle('')
    setStatus('Not Started')
    setDueDate('')
    onClose()
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">New Task</h2>
        <div className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
          />
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Due Date"
          />
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Task
          </Button>
        </div>
      </div>
    </div>
  )
}

const initialTasks = [
  { id: 1, title: "Implement user authentication", status: "In Progress", dueDate: "2023-10-15" },
  { id: 2, title: "Design landing page", status: "Completed", dueDate: "2023-10-10" },
  { id: 3, title: "Set up CI/CD pipeline", status: "Not Started", dueDate: "2023-10-20" },
  { id: 4, title: "Write API documentation", status: "In Progress", dueDate: "2023-10-18" },
]

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("All")
  const [isModalOpen, setModalOpen] = useState(false)

  // Mark task as completed
  const handleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task
      )
    )
  }

  // Delete task
  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  // Add new task
  const handleSaveTask = (newTask) => {
    const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1
    setTasks([...tasks, { ...newTask, id: newId }])
  }

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true
    return task.status === filter
  })

  // Search tasks by title
  const searchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <nav className="flex-1 flex items-center space-x-4 sm:space-x-6">
          <Link className="flex items-center space-x-2 font-semibold" to="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span>Hekors Work Tracker</span>
          </Link>
          <Link className="font-medium" to="#">Dashboard</Link>
          <Link className="font-medium" to="#">Tasks</Link>
          <Link className="font-medium" to="#">Leaderboard</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage alt="User avatar" src="/placeholder-user.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Title and Add New Task Button */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex justify-between items-center">
          <Input
            className="max-w-sm"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setFilter("All")}>All</Button>
            <Button variant="outline" onClick={() => setFilter("In Progress")}>In Progress</Button>
            <Button variant="outline" onClick={() => setFilter("Completed")}>Completed</Button>
          </div>
        </div>

        {/* Task Cards */}
        <div className="grid gap-4">
          {searchedTasks.length ? (
            searchedTasks.map((task) => (
              <Card key={task.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => handleComplete(task.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(task.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No tasks found</p>
          )}
        </div>
      </main>

      {/* Modal for adding new task */}
      <Modal
        show={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTask}
      />
    </div>
  )
}
