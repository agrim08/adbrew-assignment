import React, { useState } from "react";

function TodoForm({ addTodo, submitting, error }) {
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDescription = description;
    await addTodo(currentDescription);
    if (!error) {
      setDescription("");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} noValidate>
      <div className="todo-form__field">
        <label htmlFor="todo-description" className="todo-form__label">
          What needs to be done?
        </label>
        <input
          id="todo-description"
          type="text"
          className={`todo-form__input${error ? " todo-form__input--error" : ""}`}
          placeholder="Enter a todo description…"
          value={description}
          onChange={handleChange}
          disabled={submitting}
          aria-describedby={error ? "todo-error" : undefined}
        />
        {error && (
          <p id="todo-error" className="todo-form__error" role="alert">
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="todo-form__submit"
        disabled={submitting}
      >
        {submitting ? "Adding…" : "Add Todo"}
      </button>
    </form>
  );
}

export default TodoForm;
