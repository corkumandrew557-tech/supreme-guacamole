# Real-Time Team Task Manager

A full-stack real-time task management application built with Next.js, Socket.io, and MongoDB.

## Features

- 🔄 **Real-Time Updates** - Live task updates across all connected users
- 👥 **Team Collaboration** - Assign tasks to team members
- 📊 **Task Dashboard** - View all tasks with filtering and sorting
- 🔔 **Live Notifications** - Get instant alerts on task changes
- 👤 **User Presence** - See who's online in real-time
- 💾 **Persistent Storage** - All data saved to MongoDB
- 🔐 **Authentication** - JWT-based user authentication

## Tech Stack

- **Frontend:** Next.js 14, React 18, Socket.io Client
- **Backend:** Next.js API Routes, Express, Socket.io
- **Database:** MongoDB
- **Authentication:** JWT (jsonwebtoken)
- **Deployment:** Azure Web Apps

## Setup Instructions

### Prerequisites
- Node.js 20.x or higher
- MongoDB Atlas account (free tier available)
- Azure account for deployment

### Local Development

1. Clone the repository
```bash
git clone https://github.com/corkumandrew557-tech/supreme-guacamole.git
cd supreme-guacamole
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.local` file with your configuration
```bash
cp .env.example .env.local
```

4. Configure environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A secure random string for JWT
   - `NEXT_PUBLIC_API_URL` - http://localhost:3000 (for local development)

5. Run the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Azure Web Apps

### Step 1: Create Azure Web App

1. Go to [Azure Portal](https://portal.azure.com)
2. Create a new "App Service"
3. Select:
   - **Runtime stack:** Node.js 20 LTS
   - **Operating System:** Linux
   - **App Service Plan:** Free or B1 tier

### Step 2: Configure Environment Variables

1. In Azure Portal, go to your Web App → **Configuration**
2. Add Application Settings:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret key
   - `NEXT_PUBLIC_API_URL` - Your Azure app URL (e.g., https://your-app-name.azurewebsites.net)
   - `NODE_ENV` - Set to "production"

### Step 3: Deploy with GitHub Actions

1. Download your **Publish Profile** from Azure
   - App Service → Overview → Download Publish Profile

2. Add to GitHub Secrets:
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Create secret `AZURE_WEBAPP_PUBLISH_PROFILE` with your publish profile contents

3. Update `.github/workflows/azure-webapps-node.yml`:
   ```yaml
   env:
     AZURE_WEBAPP_NAME: your-actual-app-name
     AZURE_WEBAPP_PACKAGE_PATH: '.'
     NODE_VERSION: '20.x'
   ```

4. Push to main branch - GitHub Actions will automatically deploy!

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Real-Time Events (Socket.io)

- `task:created` - New task created
- `task:updated` - Task updated
- `task:deleted` - Task deleted
- `user:online` - User came online
- `user:offline` - User went offline

## Project Structure

```
.
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication routes
│   │   ├── tasks/         # Task API routes
│   │   └── socket/        # Socket.io handler
│   ├── components/        # React components
│   ├── page.tsx          # Home page
│   └── layout.tsx        # Root layout
├── lib/
│   ├── db.ts             # MongoDB connection
│   ├── auth.ts           # JWT utilities
│   └── socket.ts         # Socket.io utilities
├── models/
│   ├── User.ts           # User schema
│   └── Task.ts           # Task schema
├── .github/workflows/    # GitHub Actions
├── .env.example          # Environment variables template
├── package.json          # Dependencies
└── README.md             # This file
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure your IP is whitelisted in MongoDB Atlas
- Check connection string format
- Verify credentials

### Socket.io Connection Issues
- Ensure CORS is properly configured
- Check browser console for errors
- Verify WebSocket support is enabled in Azure

### Azure Deployment Issues
- Check GitHub Actions logs
- Review Azure App Service logs
- Verify all environment variables are set
- Check Node.js version compatibility

## License

MIT

## Author

Andrew (corkumandrew557-tech)
