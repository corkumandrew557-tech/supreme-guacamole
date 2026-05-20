/**
 * Socket.io Configuration for Real-Time Features
 */

import { Server } from 'socket.io';
import { NextApiRequest } from 'next';

let io: Server;

export const initializeSocket = (server: any): Server => {
  io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      io.emit('user:offline', { userId: socket.id });
    });

    socket.on('user:online', (data) => {
      io.emit('user:online', { userId: socket.id, ...data });
    });

    socket.on('task:create', (data) => {
      io.emit('task:created', data);
    });

    socket.on('task:update', (data) => {
      io.emit('task:updated', data);
    });

    socket.on('task:delete', (data) => {
      io.emit('task:deleted', data);
    });
  });

  return io;
};

export const getIO = (): Server => io;
