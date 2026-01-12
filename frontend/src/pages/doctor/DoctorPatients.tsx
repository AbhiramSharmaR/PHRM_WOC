import { motion } from 'framer-motion';
import { Users, Search, Mail, Phone, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MainLayout } from '@/components/layouts/MainLayout';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const mockPatients = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 234 567 8901',
    age: 45,
    bloodGroup: 'A+',
    condition: 'Hypertension',
    lastVisit: 'Dec 2, 2024',
    status: 'stable',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 234 567 8902',
    age: 32,
    bloodGroup: 'B+',
    condition: 'Diabetes Type 2',
    lastVisit: 'Dec 1, 2024',
    status: 'monitoring',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.j@email.com',
    phone: '+1 234 567 8903',
    age: 58,
    bloodGroup: 'O-',
    condition: 'Heart Disease',
    lastVisit: 'Nov 28, 2024',
    status: 'critical',
  },
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

const DoctorPatients = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">My Patients</h1>
            <p className="text-muted-foreground">View and manage your assigned patients</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Patients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xl font-bold text-primary">
                        {patient.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold">{patient.name}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs capitalize ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{patient.condition}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{patient.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {patient.phone}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="font-semibold">{patient.age}</p>
                      <p className="text-xs text-muted-foreground">Age</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="font-semibold">{patient.bloodGroup}</p>
                      <p className="text-xs text-muted-foreground">Blood</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="font-semibold text-xs">{patient.lastVisit.split(',')[0]}</p>
                      <p className="text-xs text-muted-foreground">Last Visit</p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link to="/doctor/prescriptions">
                        <Activity className="w-4 h-4 mr-1" />
                        Prescribe
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No patients found</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default DoctorPatients;
