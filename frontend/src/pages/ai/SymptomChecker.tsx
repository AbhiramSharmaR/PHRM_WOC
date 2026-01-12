import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertCircle, CheckCircle, Loader2, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MainLayout } from '@/components/layouts/MainLayout';
import { cn } from '@/lib/utils';

const commonSymptoms = [
  'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea',
  'Dizziness', 'Chest Pain', 'Shortness of Breath', 'Joint Pain',
  'Sore Throat', 'Runny Nose', 'Body Aches', 'Loss of Appetite',
  'Insomnia', 'Anxiety', 'Stomach Pain', 'Vomiting', 'Diarrhea',
];

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<null | {
    conditions: { name: string; probability: number }[];
    severity: 'low' | 'medium' | 'high';
    recommendations: string[];
  }>(null);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setResults({
      conditions: [
        { name: 'Common Cold', probability: 75 },
        { name: 'Seasonal Allergies', probability: 45 },
        { name: 'Viral Infection', probability: 30 },
      ],
      severity: 'low',
      recommendations: [
        'Rest and stay hydrated',
        'Consider over-the-counter cold medicine',
        'Monitor symptoms for 48-72 hours',
        'Consult a doctor if symptoms worsen',
      ],
    });
    
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-success/10 text-success border-success/30';
      case 'medium': return 'bg-warning/10 text-warning border-warning/30';
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary" />
            AI Symptom Checker
          </h1>
          <p className="text-muted-foreground">Select your symptoms and get AI-powered health insights</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Symptom Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Your Symptoms</CardTitle>
              <CardDescription>Choose all symptoms you're experiencing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border',
                      selectedSymptoms.includes(symptom)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-muted/50 text-muted-foreground border-border hover:border-primary/50'
                    )}
                  >
                    {symptom}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Information</label>
                <Textarea
                  placeholder="Describe any other symptoms or relevant information..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {selectedSymptoms.length} symptoms selected
                </p>
                <Button
                  variant="gradient"
                  onClick={handleAnalyze}
                  disabled={selectedSymptoms.length === 0 || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Analyze Symptoms
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>AI-powered health assessment</CardDescription>
            </CardHeader>
            <CardContent>
              {!results && !isAnalyzing && (
                <div className="h-64 flex items-center justify-center text-center">
                  <div>
                    <Brain className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">Select symptoms and click analyze</p>
                    <p className="text-sm text-muted-foreground/70">to get AI-powered insights</p>
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                    <p className="font-medium">Analyzing symptoms...</p>
                    <p className="text-sm text-muted-foreground">Our AI is processing your inputs</p>
                  </div>
                </div>
              )}

              {results && !isAnalyzing && (
                <div className="space-y-6">
                  {/* Severity Badge */}
                  <div className={cn('p-4 rounded-lg border', getSeverityColor(results.severity))}>
                    <div className="flex items-center gap-2">
                      {results.severity === 'low' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <AlertCircle className="w-5 h-5" />
                      )}
                      <span className="font-medium capitalize">{results.severity} Severity</span>
                    </div>
                  </div>

                  {/* Possible Conditions */}
                  <div>
                    <p className="text-sm font-medium mb-3">Possible Conditions</p>
                    <div className="space-y-2">
                      {results.conditions.map((condition, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>{condition.name}</span>
                              <span className="text-muted-foreground">{condition.probability}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all duration-500"
                                style={{ width: `${condition.probability}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <p className="text-sm font-medium mb-3">Recommendations</p>
                    <ul className="space-y-2">
                      {results.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-xs text-muted-foreground border-t border-border pt-4">
                    ⚠️ This is not a medical diagnosis. Please consult a healthcare professional for proper medical advice.
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

export default SymptomChecker;
