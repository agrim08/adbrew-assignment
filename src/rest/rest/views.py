import logging
import os

from pymongo import MongoClient
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .repository import MongoTodoRepository
from .service import TodoService

logger = logging.getLogger(__name__)

_mongo_uri = "mongodb://{}:{}".format(
    os.environ.get("MONGO_HOST", "localhost"),
    os.environ.get("MONGO_PORT", "27017"),
)
_db = MongoClient(_mongo_uri)["test_db"]
_repository = MongoTodoRepository(_db["todos"])
_service = TodoService(_repository)


class TodoListView(APIView):

    def get(self, request):
        try:
            todos = _service.get_all_todos()
            return Response(todos, status=status.HTTP_200_OK)
        except Exception as exc:
            logger.exception("GET /todos failed")
            return Response(
                {"error": "Failed to retrieve todos.", "detail": str(exc)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request):
        description = request.data.get("description", "")
        try:
            created = _service.create_todo(description)
            return Response(created, status=status.HTTP_201_CREATED)
        except ValueError as exc:
            logger.warning("POST /todos bad request: %s", exc)
            return Response(
                {"error": str(exc)},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as exc:
            logger.exception("POST /todos failed")
            return Response(
                {"error": "Failed to create todo.", "detail": str(exc)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
