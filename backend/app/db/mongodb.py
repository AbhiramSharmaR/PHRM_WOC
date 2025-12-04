from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

client = None
database = None   # <-- consistently use this name


async def connect_to_mongo():
    global client, database
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    database = client[settings.DATABASE_NAME]   # <-- consistent
    print("MongoDB connected:", database)


async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("MongoDB connection closed.")


def get_db():
    global database
    if database is None:
        raise Exception("Database not initialized")
    return database
