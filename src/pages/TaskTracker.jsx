import React, { useState } from 'react';

const TaskTracker = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]); // State to store logged tasks

  const handleLogTask = () => {
    if (task.trim()) { // Ensure task is not empty
      setTasks([...tasks, task]); // Log the task
      setTask(''); // Clear the input
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-white">Task Tracker</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task..."
        className="border border-gray-600 p-2 rounded w-full mb-4 bg-gray-700 text-white"
      />
      <button
        onClick={handleLogTask}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Log Task
      </button>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2 text-white">Logged Tasks</h2>
        <ul className="list-disc pl-5">
          {tasks.length > 0 ? (
            tasks.map((t, index) => (
              <li key={index} className="text-gray-300">{t}</li>
            ))
          ) : (
            <li className="text-gray-400">No tasks logged yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskTracker;
