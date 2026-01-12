import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Award, Building, Save, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MainLayout } from '@/components/layouts/MainLayout';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/authStore';

const specializations = [
  'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology',
  'General Practice', 'Neurology', 'Oncology', 'Orthopedics',
  'Pediatrics', 'Psychiatry', 'Pulmonology', 'Radiology',
];

const DoctorProfile = () => {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    specialization: '',
    license_number: '',
    experience_years: '',
    hospital: '',
    bio: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: 'Profile Updated',
      description: 'Your professional profile has been saved.',
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
          <h1 className="text-2xl lg:text-3xl font-bold">Doctor Profile</h1>
          <p className="text-muted-foreground">Manage your professional information</p>
        </div>

        {/* Account Info */}
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
                <p className="text-xl font-semibold">Dr. {user?.full_name}</p>
                <p className="text-muted-foreground">{user?.email}</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary mt-2">
                  Medical Professional
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Professional Profile
            </CardTitle>
            <CardDescription>
              Your credentials and professional information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Specialization</Label>
                <select
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
                  value={profile.specialization}
                  onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                >
                  <option value="">Select specialization</option>
                  {specializations.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="license">
                    <Award className="w-4 h-4 inline mr-2" />
                    License Number
                  </Label>
                  <Input
                    id="license"
                    placeholder="MD-XXXXX"
                    value={profile.license_number}
                    onChange={(e) => setProfile({ ...profile, license_number: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder="10"
                    value={profile.experience_years}
                    onChange={(e) => setProfile({ ...profile, experience_years: e.target.value })}
                    min={0}
                    max={60}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hospital">
                  <Building className="w-4 h-4 inline mr-2" />
                  Hospital / Clinic
                </Label>
                <Input
                  id="hospital"
                  placeholder="General Hospital"
                  value={profile.hospital}
                  onChange={(e) => setProfile({ ...profile, hospital: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Write a brief description about your experience and expertise..."
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
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

export default DoctorProfile;
