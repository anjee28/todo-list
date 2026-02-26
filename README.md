# Todo List App

A project-based todo list web app built with React and Vite.

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
- Data persists in `localStorage`

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router v7](https://reactrouter.com/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── services/
│   └── storage.js          # localStorage CRUD (swap this for a backend later)
├── pages/
│   ├── ProjectsPage.jsx     # Home — list and create projects
│   └── ProjectDetailPage.jsx # Tasks view for a project
├── components/
│   ├── ProjectCard.jsx
│   ├── TaskCard.jsx
│   └── TaskModal.jsx        # Add/edit task form
├── App.jsx                  # Route definitions
└── main.jsx                 # App entry point
```

## Routes

| Path | Page |
|------|------|
| `/` | Projects list |
| `/projects/:id` | Task list for a project |
