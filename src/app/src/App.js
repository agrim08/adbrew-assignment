import React from "react";
import useTodos from "./hooks/useTodos";
import useAddTodo from "./hooks/useAddTodo";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";

function App() {
  const { todos, loading, error, refresh } = useTodos();
  const { addTodo, submitting, error: addError } = useAddTodo(refresh);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">📝 Todo App</h1>
        <p className="app__subtitle">Stay organised. Get things done.</p>
      </header>

      <main className="app__main">
        <section className="app__section" aria-labelledby="create-heading">
          <h2 id="create-heading" className="app__section-title">Create a Todo</h2>
          <TodoForm addTodo={addTodo} submitting={submitting} error={addError} />
        </section>

        <section className="app__section" aria-labelledby="list-heading">
          <h2 id="list-heading" className="app__section-title">My Todos</h2>
          <TodoList todos={todos} loading={loading} error={error} />
        </section>
      </main>
    </div>
  );
}

export default App;
