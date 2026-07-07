import { useState, useCallback } from "react";
import { createTodo } from "../api/todoApi";

function useAddTodo(onSuccess) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const addTodo = useCallback(
    async (description) => {
      if (!description || !description.trim()) {
        setError("Description cannot be empty.");
        return;
      }

      setSubmitting(true);
      setError(null);
      try {
        await createTodo(description.trim());
        if (typeof onSuccess === "function") {
          onSuccess();
        }
      } catch (err) {
        setError(err.message || "Failed to add todo. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [onSuccess]
  );

  return { addTodo, submitting, error };
}

export default useAddTodo;
