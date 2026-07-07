import React from "react";

function TodoList({ todos, loading, error }) {
  if (loading) {
    return (
      <div className="todo-list__state">
        <div className="spinner" aria-label="Loading todos…" />
        <p>Loading todos…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="todo-list__state todo-list__state--error" role="alert">
        <p>⚠️ {error}</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="todo-list__state todo-list__state--empty">
        <p>No todos yet. Add one above! ✨</p>
      </div>
    );
  }

  return (
    <ul className="todo-list" aria-label="Todo list">
      {todos.map((todo) => (
        <li key={todo._id} className="todo-list__item">
          <span className="todo-list__item-dot" />
          {todo.description}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
