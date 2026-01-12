import { motion } from 'framer-motion';
import { FileText, Calendar, User, Pill, Download, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MainLayout } from '@/components/layouts/MainLayout';
import { useState } from 'react';

const mockPrescriptions = [
  {
    id: '1',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: 'Dec 2, 2024',
    diagnosis: 'Essential Hypertension',
    medicines: ['Lisinopril 10mg - Once daily', 'Aspirin 81mg - Once daily'],
    notes: 'Continue monitoring blood pressure at home. Follow up in 2 weeks.',
  },
  {
    id: '2',
    doctor: 'Dr. Michael Chen',
    specialty: 'Endocrinologist',
    date: 'Nov 28, 2024',
    diagnosis: 'Type 2 Diabetes Mellitus',
    medicines: ['Metformin 500mg - Twice daily', 'Glipizide 5mg - Before meals'],
    notes: 'Maintain low-carb diet. Check blood sugar twice daily.',
  },
  {
    id: '3',
    doctor: 'Dr. Emily Rodriguez',
    specialty: 'General Physician',
    date: 'Nov 15, 2024',
    diagnosis: 'Upper Respiratory Infection',
    medicines: ['Amoxicillin 500mg - Three times daily for 7 days', 'Acetaminophen 500mg - As needed for fever'],
    notes: 'Rest and stay hydrated. Complete full course of antibiotics.',
  },
];

const PatientPrescriptions = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrescriptions = mockPrescriptions.filter(
    (rx) =>
      rx.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.doctor.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-2xl lg:text-3xl font-bold">My Prescriptions</h1>
            <p className="text-muted-foreground">View and manage your prescription history</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search prescriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Prescriptions List */}
        <div className="space-y-4">
          {filteredPrescriptions.map((rx, index) => (
            <motion.div
              key={rx.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        {rx.diagnosis}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {rx.doctor} • {rx.specialty}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {rx.date}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <Pill className="w-4 h-4" />
                      Prescribed Medicines
                    </p>
                    <ul className="space-y-2">
                      {rx.medicines.map((med, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm bg-muted/30 rounded-lg p-2"
                        >
                          <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-medium">
                            {idx + 1}
                          </span>
                          {med}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {rx.notes && (
                    <div className="p-3 rounded-lg bg-accent/50 border border-accent">
                      <p className="text-sm font-medium mb-1">Doctor's Notes</p>
                      <p className="text-sm text-muted-foreground">{rx.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {filteredPrescriptions.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No prescriptions found</p>
              </CardContent>
            </Card>
          )}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default PatientPrescriptions;
