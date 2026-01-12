import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  Calendar,
  Clock,
  TrendingUp,
  UserPlus,
  Stethoscope,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/common/StatCard';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

const mockPatients = [
  { id: 1, name: 'John Smith', age: 45, condition: 'Hypertension', lastVisit: 'Dec 2, 2024', status: 'stable' },
  { id: 2, name: 'Maria Garcia', age: 32, condition: 'Diabetes Type 2', lastVisit: 'Dec 1, 2024', status: 'monitoring' },
  { id: 3, name: 'Robert Johnson', age: 58, condition: 'Heart Disease', lastVisit: 'Nov 28, 2024', status: 'critical' },
];

const mockSchedule = [
  { id: 1, patient: 'Emma Wilson', time: '9:00 AM', type: 'Follow-up' },
  { id: 2, patient: 'David Brown', time: '10:30 AM', type: 'New Patient' },
  { id: 3, patient: 'Lisa Anderson', time: '2:00 PM', type: 'Consultation' },
  { id: 4, patient: 'James Taylor', time: '3:30 PM', type: 'Follow-up' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'stable':
      return 'bg-success/10 text-success';
    case 'monitoring':
      return 'bg-warning/10 text-warning';
    case 'critical':
      return 'bg-destructive/10 text-destructive';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const DoctorDashboard = () => {
  const { user } = useAuthStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MainLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Good morning, Dr. {user?.full_name?.split(' ').pop()}!</h1>
            <p className="text-muted-foreground">You have 4 appointments scheduled today</p>
          </div>
          <Button variant="gradient" asChild>
            <Link to="/doctor/prescriptions">
              <FileText className="w-4 h-4 mr-2" />
              New Prescription
            </Link>
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Patients"
            value="156"
            icon={<Users className="w-6 h-6" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Today's Appointments"
            value="4"
            icon={<Calendar className="w-6 h-6" />}
          />
          <StatCard
            title="Prescriptions"
            value="89"
            subtitle="This month"
            icon={<FileText className="w-6 h-6" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Avg. Consultation"
            value="24 min"
            icon={<Clock className="w-6 h-6" />}
            trend={{ value: 5, isPositive: false }}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockSchedule.map((apt, idx) => (
                  <div
                    key={apt.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{apt.patient}</p>
                      <p className="text-xs text-muted-foreground">{apt.type}</p>
                    </div>
                    <span className="text-sm text-primary font-medium">{apt.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Patients */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Recent Patients
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/doctor/patients">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Patient</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Age</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Condition</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Last Visit</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPatients.map((patient) => (
                        <tr key={patient.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-2">
                            <p className="font-medium">{patient.name}</p>
                          </td>
                          <td className="py-3 px-2 text-muted-foreground">{patient.age}</td>
                          <td className="py-3 px-2 text-muted-foreground">{patient.condition}</td>
                          <td className="py-3 px-2 text-muted-foreground">{patient.lastVisit}</td>
                          <td className="py-3 px-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs capitalize ${getStatusColor(patient.status)}`}>
                              {patient.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Add Patient', href: '/doctor/patients', icon: UserPlus },
              { label: 'Write Prescription', href: '/doctor/prescriptions', icon: FileText },
              { label: 'AI Diagnosis', href: '/ai/symptom-checker', icon: Stethoscope },
              { label: 'Health Analytics', href: '/ai/health-prediction', icon: Activity },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-200 text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <action.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium">{action.label}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default DoctorDashboard;
