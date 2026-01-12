import { motion } from 'framer-motion';
import { Activity, Heart, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MainLayout } from '@/components/layouts/MainLayout';

const mockUpdates = [
  {
    id: 1,
    patient: 'Mary Smith',
    type: 'vitals',
    message: 'Blood sugar levels within normal range (95 mg/dL)',
    time: '30 minutes ago',
    trend: 'positive',
  },
  {
    id: 2,
    patient: 'James Smith',
    type: 'medication',
    message: 'Morning medication taken on time',
    time: '1 hour ago',
    trend: 'positive',
  },
  {
    id: 3,
    patient: 'Mary Smith',
    type: 'vitals',
    message: 'Blood pressure slightly elevated (142/88 mmHg)',
    time: '2 hours ago',
    trend: 'warning',
  },
  {
    id: 4,
    patient: 'James Smith',
    type: 'appointment',
    message: 'Upcoming appointment with Dr. Chen tomorrow at 10 AM',
    time: '3 hours ago',
    trend: 'neutral',
  },
  {
    id: 5,
    patient: 'Mary Smith',
    type: 'vitals',
    message: 'Heart rate stable at 72 bpm',
    time: '4 hours ago',
    trend: 'positive',
  },
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'positive':
      return <TrendingUp className="w-4 h-4 text-success" />;
    case 'warning':
      return <TrendingDown className="w-4 h-4 text-warning" />;
    default:
      return <Activity className="w-4 h-4 text-info" />;
  }
};

const getTrendBg = (trend: string) => {
  switch (trend) {
    case 'positive':
      return 'border-l-success bg-success/5';
    case 'warning':
      return 'border-l-warning bg-warning/5';
    default:
      return 'border-l-info bg-info/5';
  }
};

const HealthUpdates = () => {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Health Updates</h1>
          <p className="text-muted-foreground">Real-time health updates from your linked patients</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Stable</p>
              </div>
            </div>
          </Card>
          <Card className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">Needs Attention</p>
              </div>
            </div>
          </Card>
          <Card className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-muted-foreground">Updates Today</p>
              </div>
            </div>
          </Card>
          <Card className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-xs text-muted-foreground">Compliance</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Updates Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockUpdates.map((update, index) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-l-4 ${getTrendBg(update.trend)}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center shrink-0 border border-border">
                      {getTrendIcon(update.trend)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{update.patient}</span>
                        <span className="text-xs text-muted-foreground">{update.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{update.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </MainLayout>
  );
};

export default HealthUpdates;
