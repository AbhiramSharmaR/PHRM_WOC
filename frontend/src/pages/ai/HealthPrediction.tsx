import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, TrendingUp, AlertTriangle, Loader2, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MainLayout } from '@/components/layouts/MainLayout';
import { cn } from '@/lib/utils';

const HealthPrediction = () => {
  const [vitals, setVitals] = useState({
    age: '',
    weight: '',
    height: '',
    heartRate: '',
    systolic: '',
    diastolic: '',
    cholesterol: '',
    glucose: '',
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<null | {
    riskScore: number;
    riskLevel: 'low' | 'moderate' | 'high' | 'critical';
    factors: { name: string; impact: number; isPositive: boolean }[];
    recommendations: string[];
  }>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setResults({
      riskScore: 32,
      riskLevel: 'low',
      factors: [
        { name: 'Blood Pressure', impact: 15, isPositive: true },
        { name: 'Cholesterol Levels', impact: 25, isPositive: false },
        { name: 'BMI', impact: 10, isPositive: true },
        { name: 'Heart Rate', impact: 5, isPositive: true },
        { name: 'Blood Glucose', impact: 20, isPositive: false },
      ],
      recommendations: [
        'Maintain current exercise routine',
        'Consider reducing saturated fat intake',
        'Schedule regular cholesterol checks',
        'Monitor blood glucose levels monthly',
        'Continue with healthy sleep patterns',
      ],
    });
    
    setIsAnalyzing(false);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return { bg: 'bg-success', text: 'text-success', light: 'bg-success/10' };
      case 'moderate': return { bg: 'bg-warning', text: 'text-warning', light: 'bg-warning/10' };
      case 'high': return { bg: 'bg-destructive', text: 'text-destructive', light: 'bg-destructive/10' };
      case 'critical': return { bg: 'bg-destructive', text: 'text-destructive', light: 'bg-destructive/10' };
      default: return { bg: 'bg-muted', text: 'text-muted-foreground', light: 'bg-muted' };
    }
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            Health Risk Prediction
          </h1>
          <p className="text-muted-foreground">Enter your vitals for AI-powered health risk assessment</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Vitals</CardTitle>
              <CardDescription>Provide accurate data for better predictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="35"
                    value={vitals.age}
                    onChange={(e) => setVitals({ ...vitals, age: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={vitals.weight}
                    onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={vitals.height}
                    onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    placeholder="72"
                    value={vitals.heartRate}
                    onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Blood Pressure (mmHg)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Systolic (120)"
                    value={vitals.systolic}
                    onChange={(e) => setVitals({ ...vitals, systolic: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Diastolic (80)"
                    value={vitals.diastolic}
                    onChange={(e) => setVitals({ ...vitals, diastolic: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cholesterol">Total Cholesterol (mg/dL)</Label>
                  <Input
                    id="cholesterol"
                    type="number"
                    placeholder="200"
                    value={vitals.cholesterol}
                    onChange={(e) => setVitals({ ...vitals, cholesterol: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="glucose">Blood Glucose (mg/dL)</Label>
                  <Input
                    id="glucose"
                    type="number"
                    placeholder="100"
                    value={vitals.glucose}
                    onChange={(e) => setVitals({ ...vitals, glucose: e.target.value })}
                  />
                </div>
              </div>

              <Button
                variant="gradient"
                className="w-full"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    Predict Health Risk
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>AI-powered health risk prediction</CardDescription>
            </CardHeader>
            <CardContent>
              {!results && !isAnalyzing && (
                <div className="h-80 flex items-center justify-center text-center">
                  <div>
                    <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">Enter your vitals</p>
                    <p className="text-sm text-muted-foreground/70">to get AI health predictions</p>
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    </div>
                    <p className="font-medium">Analyzing health data...</p>
                    <p className="text-sm text-muted-foreground">AI is calculating risk factors</p>
                  </div>
                </div>
              )}

              {results && !isAnalyzing && (
                <div className="space-y-6">
                  {/* Risk Score Circle */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-36 h-36">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="72"
                          cy="72"
                          r="64"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="none"
                          className="text-muted"
                        />
                        <circle
                          cx="72"
                          cy="72"
                          r="64"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${results.riskScore * 4.02} 402`}
                          className={getRiskColor(results.riskLevel).text}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">{results.riskScore}</span>
                        <span className={cn('text-sm font-medium capitalize', getRiskColor(results.riskLevel).text)}>
                          {results.riskLevel} Risk
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Risk Factors */}
                  <div>
                    <p className="text-sm font-medium mb-3">Contributing Factors</p>
                    <div className="space-y-2">
                      {results.factors.map((factor, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className={cn(
                            'w-2 h-2 rounded-full',
                            factor.isPositive ? 'bg-success' : 'bg-warning'
                          )} />
                          <span className="flex-1 text-sm">{factor.name}</span>
                          <span className="text-sm text-muted-foreground">{factor.impact}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="p-4 rounded-lg bg-accent/50 border border-accent">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-primary" />
                      <p className="text-sm font-medium">Recommendations</p>
                    </div>
                    <ul className="space-y-1">
                      {results.recommendations.slice(0, 3).map((rec, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-xs text-muted-foreground border-t border-border pt-4">
                    ⚠️ This prediction is for informational purposes only. Consult a healthcare professional for medical advice.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default HealthPrediction;
