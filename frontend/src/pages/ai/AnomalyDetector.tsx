import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ScanLine, Upload, Loader2, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layouts/MainLayout';
import { cn } from '@/lib/utils';

const AnomalyDetector = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<null | {
    detected: boolean;
    anomalies: { type: string; confidence: number; severity: string }[];
    summary: string;
  }>(null);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResults(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResults(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    setResults({
      detected: true,
      anomalies: [
        { type: 'Opacity in lower left lobe', confidence: 87, severity: 'medium' },
        { type: 'Minor calcification', confidence: 65, severity: 'low' },
      ],
      summary: 'The AI analysis has detected potential areas of concern in the uploaded scan. These findings should be reviewed by a qualified radiologist for proper diagnosis. The highlighted regions show possible opacities that may warrant further investigation.',
    });
    
    setIsAnalyzing(false);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setResults(null);
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
            <ScanLine className="w-8 h-8 text-primary" />
            AI Anomaly Detector
          </h1>
          <p className="text-muted-foreground">Upload medical images for AI-powered anomaly detection</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Medical Image</CardTitle>
              <CardDescription>Supported formats: X-ray, CT scan, MRI images</CardDescription>
            </CardHeader>
            <CardContent>
              {!preview ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Drop your image here</p>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                    <Button variant="outline" type="button">
                      Select File
                    </Button>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden bg-muted">
                    <img
                      src={preview}
                      alt="Upload preview"
                      className="w-full h-64 object-contain"
                    />
                    <button
                      onClick={clearFile}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{selectedFile?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile?.size || 0 / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="gradient"
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
                          <ScanLine className="w-4 h-4" />
                          Analyze Image
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>AI-detected anomalies and findings</CardDescription>
            </CardHeader>
            <CardContent>
              {!results && !isAnalyzing && (
                <div className="h-64 flex items-center justify-center text-center">
                  <div>
                    <ScanLine className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">Upload an image to analyze</p>
                    <p className="text-sm text-muted-foreground/70">AI will detect potential anomalies</p>
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full border-4 border-muted" />
                      <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                      <ScanLine className="absolute inset-0 m-auto w-8 h-8 text-primary" />
                    </div>
                    <p className="font-medium">Analyzing image...</p>
                    <p className="text-sm text-muted-foreground">AI is scanning for anomalies</p>
                  </div>
                </div>
              )}

              {results && !isAnalyzing && (
                <div className="space-y-6">
                  {/* Detection Status */}
                  <div
                    className={cn(
                      'p-4 rounded-lg border',
                      results.detected
                        ? 'bg-warning/10 border-warning/30 text-warning'
                        : 'bg-success/10 border-success/30 text-success'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {results.detected ? (
                        <AlertCircle className="w-5 h-5" />
                      ) : (
                        <CheckCircle className="w-5 h-5" />
                      )}
                      <span className="font-medium">
                        {results.detected ? 'Anomalies Detected' : 'No Anomalies Found'}
                      </span>
                    </div>
                  </div>

                  {/* Detected Anomalies */}
                  {results.anomalies.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-3">Detected Findings</p>
                      <div className="space-y-2">
                        {results.anomalies.map((anomaly, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-muted/50 border border-border"
                          >
                            <div className="flex justify-between items-start">
                              <p className="font-medium">{anomaly.type}</p>
                              <span
                                className={cn(
                                  'text-xs px-2 py-0.5 rounded-full',
                                  anomaly.severity === 'high'
                                    ? 'bg-destructive/10 text-destructive'
                                    : anomaly.severity === 'medium'
                                    ? 'bg-warning/10 text-warning'
                                    : 'bg-info/10 text-info'
                                )}
                              >
                                {anomaly.severity}
                              </span>
                            </div>
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Confidence</span>
                                <span>{anomaly.confidence}%</span>
                              </div>
                              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${anomaly.confidence}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  <div className="p-4 rounded-lg bg-accent/50 border border-accent">
                    <p className="text-sm font-medium mb-2">AI Summary</p>
                    <p className="text-sm text-muted-foreground">{results.summary}</p>
                  </div>

                  <p className="text-xs text-muted-foreground border-t border-border pt-4">
                    ⚠️ This AI analysis is for informational purposes only. Please consult a qualified medical professional for proper diagnosis.
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

export default AnomalyDetector;
