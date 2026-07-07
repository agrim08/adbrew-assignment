# Adbrew Todo App

A full-stack todo application built with React, Django REST Framework, and MongoDB, containerised with Docker.

## Stack

- **Frontend** — React 17 (hooks only, no class components)
- **Backend** — Django 3.1 + Django REST Framework
- **Database** — MongoDB via PyMongo
- **Infrastructure** — Docker + Docker Compose

## Architecture

The codebase is structured around SOLID principles throughout both the backend and frontend.

### Backend (`src/rest/rest/`)

| File | Responsibility |
|---|---|
| `repository.py` | Data access — abstract `BaseTodoRepository` + concrete `MongoTodoRepository` |
| `service.py` | Business logic — validation and orchestration via `TodoService` |
| `views.py` | HTTP layer — thin `APIView` that delegates everything to the service |

The view depends on the abstract repository interface, not on PyMongo directly (Dependency Inversion). Swapping MongoDB for another store requires only a new `BaseTodoRepository` subclass.

### Frontend (`src/app/src/`)

| File | Responsibility |
|---|---|
| `api/todoApi.js` | Centralised HTTP client — the only place `fetch` is called |
| `hooks/useTodos.js` | Read-side hook — fetches the list, exposes `{ todos, loading, error, refresh }` |
| `hooks/useAddTodo.js` | Write-side hook — handles creation, exposes `{ addTodo, submitting, error }` |
| `components/TodoList.js` | Pure presentational component — renders list states |
| `components/TodoForm.js` | Controlled form component — delegates submission to the hook |
| `App.js` | Composition root — wires hooks and passes props to components |

The two hooks are intentionally separate (Interface Segregation): components that only need to read are not forced to take on the write concern.

## Setup

### Prerequisites

- Docker and Docker Compose

### Run

```bash
git clone https://github.com/agrim08/adbrew-assignment.git
cd adbrew-assignment
```

Set the codebase path environment variable. Replace the path with the absolute path to the cloned `src/` directory:

```bash
# macOS / Linux
export ADBREW_CODEBASE_PATH="/path/to/adbrew-assignment/src"

# Windows PowerShell
$env:ADBREW_CODEBASE_PATH="C:\path\to\adbrew-assignment\src"
```

Build and start the containers:

```bash
docker-compose build
docker-compose up -d
```

Once running:
- React app → [http://localhost:3000](http://localhost:3000)
- Django API → [http://localhost:8000/todos/](http://localhost:8000/todos/)

## API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/todos/` | Returns all todo items |
| `POST` | `/todos/` | Creates a new todo — body: `{ "description": "..." }` |

### Error responses

- `400` — description is empty or not a string
- `500` — unexpected server or database error

## Features

- Create todos via form with client-side and server-side validation
- Live list that refreshes automatically after each successful submission
- Loading, empty, and error states handled throughout
- Accessible markup — `aria-label`, `aria-describedby`, `role="alert"`
- Responsive, dark-mode-aware UI
