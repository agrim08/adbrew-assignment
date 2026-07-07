const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export async function fetchTodos() {
  const response = await fetch(`${API_BASE_URL}/todos/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch todos (HTTP ${response.status}).`);
  }
  return response.json();
}

export async function createTodo(description) {
  const response = await fetch(`${API_BASE_URL}/todos/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to create todo (HTTP ${response.status}).`);
  }
  return response.json();
}
