import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Search, Mail, Phone, Unlink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MainLayout } from '@/components/layouts/MainLayout';
import { useToast } from '@/hooks/use-toast';

const mockLinkedPatients = [
  {
    id: '1',
    name: 'Mary Smith',
    email: 'mary.smith@email.com',
    phone: '+1 234 567 8901',
    relation: 'Mother',
    age: 68,
    bloodGroup: 'A+',
    conditions: ['Diabetes', 'Hypertension'],
    linkedDate: 'Oct 15, 2024',
  },
  {
    id: '2',
    name: 'James Smith',
    email: 'james.smith@email.com',
    phone: '+1 234 567 8902',
    relation: 'Father',
    age: 72,
    bloodGroup: 'O+',
    conditions: ['Heart Disease'],
    linkedDate: 'Oct 20, 2024',
  },
];

const FamilyPatients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [linkEmail, setLinkEmail] = useState('');
  const { toast } = useToast();

  const handleLinkPatient = () => {
    if (!linkEmail) return;
    
    toast({
      title: 'Link Request Sent',
      description: 'A link request has been sent to the patient.',
    });
    setLinkEmail('');
    setShowLinkForm(false);
  };

  const handleUnlinkPatient = (name: string) => {
    toast({
      title: 'Patient Unlinked',
      description: `${name} has been removed from your linked patients.`,
    });
  };

  const filteredPatients = mockLinkedPatients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-2xl lg:text-3xl font-bold">Linked Patients</h1>
            <p className="text-muted-foreground">Manage and monitor your family members' health</p>
          </div>
          <Button variant="gradient" onClick={() => setShowLinkForm(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Link Patient
          </Button>
        </div>

        {/* Link Patient Form */}
        {showLinkForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Link a New Patient</CardTitle>
                <CardDescription>Enter the patient's email to send a link request</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="patient@email.com"
                    value={linkEmail}
                    onChange={(e) => setLinkEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleLinkPatient}>Send Request</Button>
                  <Button variant="outline" onClick={() => setShowLinkForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

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

        {/* Patients List */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredPatients.map((patient) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-2xl font-bold text-primary">
                        {patient.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-lg">{patient.name}</h3>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-accent text-accent-foreground">
                            {patient.relation}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => handleUnlinkPatient(patient.name)}
                        >
                          <Unlink className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          {patient.email}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {patient.phone}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Age</p>
                          <p className="font-medium">{patient.age} years</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Blood Group</p>
                          <p className="font-medium">{patient.bloodGroup}</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground mb-2">Conditions</p>
                        <div className="flex flex-wrap gap-2">
                          {patient.conditions.map((condition) => (
                            <span
                              key={condition}
                              className="px-2 py-1 rounded-md text-xs bg-warning/10 text-warning"
                            >
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="mt-4 text-xs text-muted-foreground">
                        Linked since {patient.linkedDate}
                      </p>
                    </div>
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
              <p className="text-muted-foreground">No linked patients found</p>
              <Button variant="outline" className="mt-4" onClick={() => setShowLinkForm(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Link Your First Patient
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default FamilyPatients;
