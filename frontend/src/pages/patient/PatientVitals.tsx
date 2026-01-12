import { motion } from 'framer-motion';
import { Activity, Heart, Thermometer, Droplets, Wind, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MainLayout } from '@/components/layouts/MainLayout';
import { StatCard } from '@/components/common/StatCard';

const mockVitalsHistory = [
  { time: '8:00 AM', heartRate: 72, bp: '120/80', temp: 98.6, o2: 98 },
  { time: '12:00 PM', heartRate: 78, bp: '122/82', temp: 98.4, o2: 97 },
  { time: '4:00 PM', heartRate: 75, bp: '118/78', temp: 98.8, o2: 98 },
  { time: '8:00 PM', heartRate: 70, bp: '116/76', temp: 98.5, o2: 99 },
];

const PatientVitals = () => {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Vitals Monitor</h1>
          <p className="text-muted-foreground">Track your health metrics in real-time</p>
        </div>

        {/* Current Vitals */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Heart Rate"
            value="72 bpm"
            icon={<Heart className="w-6 h-6" />}
            trend={{ value: 2, isPositive: true }}
          />
          <StatCard
            title="Blood Pressure"
            value="120/80"
            subtitle="mmHg"
            icon={<Activity className="w-6 h-6" />}
          />
          <StatCard
            title="Temperature"
            value="98.6°F"
            icon={<Thermometer className="w-6 h-6" />}
          />
          <StatCard
            title="SpO2"
            value="98%"
            icon={<Droplets className="w-6 h-6" />}
          />
        </div>

        {/* Vitals Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Vitals Trend
            </CardTitle>
            <CardDescription>
              Connect to IoT devices for real-time monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed border-border">
              <div className="text-center">
                <Activity className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground">Real-time Chart</p>
                <p className="text-sm text-muted-foreground/70">Connect IoT devices to see live data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vitals History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Today's Readings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Time</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Heart Rate</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Blood Pressure</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Temperature</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">SpO2</th>
                  </tr>
                </thead>
                <tbody>
                  {mockVitalsHistory.map((reading, idx) => (
                    <tr key={idx} className="border-b border-border/50">
                      <td className="py-3 px-2 font-medium">{reading.time}</td>
                      <td className="py-3 px-2">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-destructive" />
                          {reading.heartRate} bpm
                        </span>
                      </td>
                      <td className="py-3 px-2">{reading.bp} mmHg</td>
                      <td className="py-3 px-2">{reading.temp}°F</td>
                      <td className="py-3 px-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-success/10 text-success">
                          {reading.o2}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Device Connection */}
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Wind className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Connect Your Devices</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                Link your wearables and health devices for automatic vitals tracking and real-time monitoring.
              </p>
              <p className="text-sm text-muted-foreground/70">
                Device integration coming soon
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </MainLayout>
  );
};

export default PatientVitals;
