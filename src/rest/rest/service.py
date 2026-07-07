import logging
from typing import List, Dict

from .repository import BaseTodoRepository

logger = logging.getLogger(__name__)


class TodoService:

    def __init__(self, repository: BaseTodoRepository):
        self._repository = repository

    def get_all_todos(self) -> List[Dict]:
        logger.info("TodoService: fetching all todos")
        return self._repository.get_all()

    def create_todo(self, description: str) -> Dict:
        if not isinstance(description, str) or not description.strip():
            raise ValueError("'description' must be a non-empty string.")

        todo_data = {"description": description.strip()}
        logger.info("TodoService: creating todo with description='%s'", todo_data["description"])
        return self._repository.create(todo_data)
