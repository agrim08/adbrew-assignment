from abc import ABC, abstractmethod
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)


class BaseTodoRepository(ABC):

    @abstractmethod
    def get_all(self) -> List[Dict]:
        raise NotImplementedError

    @abstractmethod
    def create(self, data: Dict) -> Dict:
        raise NotImplementedError


class MongoTodoRepository(BaseTodoRepository):

    def __init__(self, collection):
        self._collection = collection

    def get_all(self) -> List[Dict]:
        try:
            todos = list(self._collection.find())
            return [self._serialise(todo) for todo in todos]
        except Exception as exc:
            logger.error("MongoTodoRepository.get_all failed: %s", exc)
            raise

    def create(self, data: Dict) -> Dict:
        try:
            result = self._collection.insert_one(data)
            data["_id"] = str(result.inserted_id)
            return data
        except Exception as exc:
            logger.error("MongoTodoRepository.create failed: %s", exc)
            raise

    @staticmethod
    def _serialise(document: Dict) -> Dict:
        document["_id"] = str(document["_id"])
        return document
