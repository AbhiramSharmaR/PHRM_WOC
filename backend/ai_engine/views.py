import torch
import torch.nn as nn
from rest_framework.views import APIView
from rest_framework.response import Response

class SimpleRiskModel(nn.Module):
    def __init__(self, input_dim=3):
        super().__init__()
        self.linear = nn.Linear(input_dim, 1)

    def forward(self, x):
        return torch.sigmoid(self.linear(x))

model = SimpleRiskModel()

class RiskPredictionView(APIView):
    def post(self, request):
        hr = float(request.data.get("resting_hr", 70))
        sleep = float(request.data.get("sleep_hours", 7))
        steps = float(request.data.get("steps", 6000))

        x = torch.tensor([[hr, sleep, steps]], dtype=torch.float32)
        score = model(x).item()

        if score < 0.33:
            label = "Low"
        elif score < 0.66:
            label = "Moderate"
        else:
            label = "High"

        return Response({
            "risk_score": round(score, 3),
            "risk_label": label,
            "details": "Prototype model prediction"
        })
