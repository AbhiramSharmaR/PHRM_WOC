import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Search, User, Calendar, Pill, X, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MainLayout } from '@/components/layouts/MainLayout';
import { useToast } from '@/hooks/use-toast';

const mockPrescriptions = [
  {
    id: '1',
    patient: 'John Smith',
    patientId: 'P001',
    date: 'Dec 2, 2024',
    diagnosis: 'Essential Hypertension',
    medicines: ['Lisinopril 10mg', 'Aspirin 81mg'],
    status: 'active',
  },
  {
    id: '2',
    patient: 'Maria Garcia',
    patientId: 'P002',
    date: 'Dec 1, 2024',
    diagnosis: 'Type 2 Diabetes Mellitus',
    medicines: ['Metformin 500mg', 'Glipizide 5mg'],
    status: 'active',
  },
];

const DoctorPrescriptions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    patientId: '',
    diagnosis: '',
    medicines: [''],
    notes: '',
  });
  const { toast } = useToast();

  const handleAddMedicine = () => {
    setNewPrescription({
      ...newPrescription,
      medicines: [...newPrescription.medicines, ''],
    });
  };

  const handleRemoveMedicine = (index: number) => {
    const updated = newPrescription.medicines.filter((_, i) => i !== index);
    setNewPrescription({ ...newPrescription, medicines: updated });
  };

  const handleMedicineChange = (index: number, value: string) => {
    const updated = [...newPrescription.medicines];
    updated[index] = value;
    setNewPrescription({ ...newPrescription, medicines: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: 'Prescription Created',
      description: 'The prescription has been saved successfully.',
    });
    
    setNewPrescription({ patientId: '', diagnosis: '', medicines: [''], notes: '' });
    setShowCreateForm(false);
    setIsSubmitting(false);
  };

  const filteredPrescriptions = mockPrescriptions.filter(
    (p) =>
      p.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-2xl lg:text-3xl font-bold">Prescriptions</h1>
            <p className="text-muted-foreground">Create and manage patient prescriptions</p>
          </div>
          <Button variant="gradient" onClick={() => setShowCreateForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Prescription
          </Button>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Create New Prescription</CardTitle>
                <CardDescription>Fill in the prescription details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientId">Patient ID</Label>
                      <Input
                        id="patientId"
                        placeholder="Enter patient ID"
                        value={newPrescription.patientId}
                        onChange={(e) =>
                          setNewPrescription({ ...newPrescription, patientId: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="diagnosis">Diagnosis</Label>
                      <Input
                        id="diagnosis"
                        placeholder="Enter diagnosis"
                        value={newPrescription.diagnosis}
                        onChange={(e) =>
                          setNewPrescription({ ...newPrescription, diagnosis: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Medicines</Label>
                    {newPrescription.medicines.map((med, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Medicine name and dosage"
                          value={med}
                          onChange={(e) => handleMedicineChange(index, e.target.value)}
                          required
                        />
                        {newPrescription.medicines.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveMedicine(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={handleAddMedicine}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Medicine
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional instructions or notes"
                      value={newPrescription.notes}
                      onChange={(e) =>
                        setNewPrescription({ ...newPrescription, notes: e.target.value })
                      }
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" variant="gradient" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Create Prescription'
                      )}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

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
          {filteredPrescriptions.map((rx) => (
            <Card key={rx.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{rx.diagnosis}</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-success/10 text-success capitalize">
                        {rx.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {rx.patient} ({rx.patientId})
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {rx.date}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {rx.medicines.map((med, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-accent"
                        >
                          <Pill className="w-3 h-3" />
                          {med}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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

export default DoctorPrescriptions;
