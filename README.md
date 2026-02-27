# Todo List App

A project-based todo list web app built with React, Vite, and an Express backend.

**Live demo:** [todo-list-six-blond-20.vercel.app](https://todo-list-six-blond-20.vercel.app)

## Features

- Create and manage multiple **projects**
- Add tasks to each project with:
  - Task name
  - Description
  - Deadline
  - Priority (Low, Normal, High)
- Tasks are sorted by priority then deadline
- Color-coded priority badges and task cards
- Overdue deadline detection
- Edit and delete tasks
- Delete projects (removes all associated tasks)
- Dark mode with system preference detection
- Backend connectivity check with loading and offline screens

## Tech Stack

**Frontend**
- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router v7](https://reactrouter.com/)

**Backend**
- [Express](https://expressjs.com/)
- In-memory storage (no database required)

## Getting Started

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Configure environment

Create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:3001
```

### 4. Run both servers

```bash
# Terminal 1 — backend (from project root)
cd server
node index.js

# Terminal 2 — frontend (from project root)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
todo-list/
├── src/
│   ├── services/
│   │   └── storage.js            # API fetch calls (swap BASE_URL for any backend)
│   ├── pages/
│   │   ├── ProjectsPage.jsx      # Home — list and create projects
│   │   └── ProjectDetailPage.jsx # Tasks view for a project
│   ├── components/
│   │   ├── ProjectCard.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskModal.jsx         # Add/edit task form
│   │   └── ServerCheck.jsx       # Backend connectivity guard
│   ├── App.jsx                   # Route definitions + dark mode
│   └── main.jsx                  # App entry point
└── server/
    ├── index.js                  # Express app entry point
    ├── store.js                  # In-memory data store
    └── routes/
        ├── projects.js           # /api/projects routes
        └── tasks.js              # /api/tasks routes
```

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Server health check |
| `GET` | `/api/projects` | Get all projects |
| `POST` | `/api/projects` | Create a project |
| `DELETE` | `/api/projects/:id` | Delete a project and its tasks |
| `GET` | `/api/projects/:id/tasks` | Get tasks for a project |
| `POST` | `/api/tasks` | Create a task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

## Frontend Routes

| Path | Page |
|------|------|
| `/` | Projects list |
| `/projects/:id` | Task list for a project |

## Deployment

- **Frontend** — hosted on [Vercel](https://vercel.com). Set `VITE_API_URL` in Vercel's environment variables.
- **Backend** — hosted on [Render](https://render.com). Set `CLIENT_ORIGIN` to the Vercel frontend URL (no trailing slash).
