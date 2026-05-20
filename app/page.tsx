'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: { name: string; email: string };
  createdBy: { name: string; email: string };
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);

  useEffect(() => {
    // Initialize Socket.io
    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000');

    socketInstance.on('connect', () => {
      console.log('Connected to server');
      socketInstance.emit('user:online', { timestamp: new Date() });
    });

    socketInstance.on('task:created', (data: Task) => {
      setTasks((prev) => [...prev, data]);
    });

    socketInstance.on('task:updated', (data: Task) => {
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
    });

    socketInstance.on('task:deleted', (data: { id: string }) => {
      setTasks((prev) => prev.filter((t) => t._id !== data.id));
    });

    socketInstance.on('user:online', () => {
      setOnlineUsers((prev) => prev + 1);
    });

    socketInstance.on('user:offline', () => {
      setOnlineUsers((prev) => Math.max(0, prev - 1));
    });

    setSocket(socketInstance);

    // Fetch initial tasks
    fetchTasks();

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const task = tasks.find((t) => t._id === taskId);
      if (!task) return;

      const response = await axios.patch(`/api/tasks/${taskId}`, { ...task, status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      socket?.emit('task:update', response.data.task);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Manager</h1>
          <p className="text-gray-600">Real-time team collaboration 🚀</p>
          <p className="text-sm text-gray-500 mt-2">👥 {onlineUsers} users online</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading tasks...</p>
          </div>
        )}

        {/* Task Board */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['todo', 'in-progress', 'completed'].map((status) => (
              <div key={status} className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 capitalize">
                  {status.replace('-', ' ')}
                </h2>
                <div className="space-y-4">
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task) => (
                      <div
                        key={task._id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition"
                      >
                        <h3 className="font-semibold text-gray-800">{task.title}</h3>
                        <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                        <div className="flex items-center justify-between mt-4">
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                              task.priority === 'high'
                                ? 'bg-red-100 text-red-700'
                                : task.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500">{task.assignedTo.name}</span>
                        </div>
                        {status !== 'completed' && (
                          <button
                            onClick={() =>
                              updateTaskStatus(
                                task._id,
                                status === 'todo' ? 'in-progress' : 'completed'
                              )
                            }
                            className="mt-3 w-full bg-indigo-600 text-white text-sm py-2 rounded hover:bg-indigo-700 transition"
                          >
                            Move →
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && tasks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <p className="text-gray-600 text-lg">No tasks yet. Create one to get started! 🎯</p>
          </div>
        )}
      </div>
    </div>
  );
}
