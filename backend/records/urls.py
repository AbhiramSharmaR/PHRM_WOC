from django.urls import path
from .views import HealthRecordListCreateView

urlpatterns = [
    path("", HealthRecordListCreateView.as_view(), name="records-list-create"),
]
