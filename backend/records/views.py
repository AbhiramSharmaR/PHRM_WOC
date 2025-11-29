from rest_framework.views import APIView
from rest_framework.response import Response
from bson import ObjectId
from .mongo_client import get_mongo_db

def _serialize(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

class HealthRecordListCreateView(APIView):
    def get(self, request):
        db = get_mongo_db()
        docs = db.health_records.find().limit(50)
        return Response([_serialize(d) for d in docs])

    def post(self, request):
        db = get_mongo_db()
        payload = {
            "type": request.data.get("type"),
            "content": request.data.get("content"),
            "tags": request.data.get("tags", []),
        }
        res = db.health_records.insert_one(payload)
        payload["id"] = str(res.inserted_id)
        return Response(payload)
