import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Droplets, AlertCircle, Save, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MainLayout } from '@/components/layouts/MainLayout';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/authStore';

const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const PatientProfile = () => {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    age: '',
    gender: '',
    blood_group: '',
    allergies: '',
    medical_history: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been saved successfully.',
    });
    setIsLoading(false);
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Patient Profile</h1>
          <p className="text-muted-foreground">Manage your personal and medical information</p>
        </div>

        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl font-semibold text-primary">
                  {user?.full_name?.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-xl font-semibold">{user?.full_name}</p>
                <p className="text-muted-foreground">{user?.email}</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary mt-2 capitalize">
                  {user?.role}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle>Medical Profile</CardTitle>
            <CardDescription>
              Keep your medical information up to date for better care
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                    min={0}
                    max={150}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <select
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  >
                    <option value="">Select gender</option>
                    {genders.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  <Droplets className="w-4 h-4 inline mr-2" />
                  Blood Group
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodGroups.map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => setProfile({ ...profile, blood_group: bg })}
                      className={`p-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        profile.blood_group === bg
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Allergies
                </Label>
                <Textarea
                  id="allergies"
                  placeholder="List any known allergies (e.g., Penicillin, Peanuts, Latex)"
                  value={profile.allergies}
                  onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medical_history">Medical History</Label>
                <Textarea
                  id="medical_history"
                  placeholder="Describe your medical history, past surgeries, chronic conditions..."
                  value={profile.medical_history}
                  onChange={(e) => setProfile({ ...profile, medical_history: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" variant="gradient" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Profile
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </MainLayout>
  );
};

export default PatientProfile;
