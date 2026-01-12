import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  User,
  FileText,
  Users,
  Stethoscope,
  Bot,
  LogOut,
  Activity,
  Brain,
  MessageCircle,
  ScanLine,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore, getRoleDashboardPath } from '@/store/authStore';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const getNavItems = (role: string): NavItem[] => {
  const commonAiItems: NavItem[] = [
    { label: 'Symptom Checker', href: '/ai/symptom-checker', icon: <Brain className="w-5 h-5" /> },
    { label: 'AI Assistant', href: '/ai/chatbot', icon: <MessageCircle className="w-5 h-5" /> },
    { label: 'Anomaly Detector', href: '/ai/anomaly-detector', icon: <ScanLine className="w-5 h-5" /> },
    { label: 'Health Prediction', href: '/ai/health-prediction', icon: <Heart className="w-5 h-5" /> },
  ];

  switch (role) {
    case 'patient':
      return [
        { label: 'Dashboard', href: '/patient/dashboard', icon: <Home className="w-5 h-5" /> },
        { label: 'Profile', href: '/patient/profile', icon: <User className="w-5 h-5" /> },
        { label: 'Prescriptions', href: '/patient/prescriptions', icon: <FileText className="w-5 h-5" /> },
        { label: 'Vitals', href: '/patient/vitals', icon: <Activity className="w-5 h-5" /> },
        ...commonAiItems,
      ];
    case 'doctor':
      return [
        { label: 'Dashboard', href: '/doctor/dashboard', icon: <Home className="w-5 h-5" /> },
        { label: 'Profile', href: '/doctor/profile', icon: <User className="w-5 h-5" /> },
        { label: 'Patients', href: '/doctor/patients', icon: <Users className="w-5 h-5" /> },
        { label: 'Prescriptions', href: '/doctor/prescriptions', icon: <FileText className="w-5 h-5" /> },
        ...commonAiItems,
      ];
    case 'family':
      return [
        { label: 'Dashboard', href: '/family/dashboard', icon: <Home className="w-5 h-5" /> },
        { label: 'Linked Patients', href: '/family/patients', icon: <Users className="w-5 h-5" /> },
        { label: 'Health Updates', href: '/family/health-updates', icon: <Activity className="w-5 h-5" /> },
        ...commonAiItems,
      ];
    default:
      return [];
  }
};

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location, isMobile]);

  const navItems = user ? getNavItems(user.role) : [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center gap-3 px-6 border-b border-border">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">HealthCare</h1>
              <p className="text-xs text-muted-foreground capitalize">{user?.role} Portal</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.full_name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center px-4 lg:px-6 sticky top-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              System Online
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 lg:p-6"
          >
            {children}
          </motion.div>
        </main>

        {/* Mobile Bottom Nav */}
        {isMobile && (
          <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-2 z-30">
            <div className="flex justify-around items-center">
              {navItems.slice(0, 5).map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {item.icon}
                    <span className="text-[10px]">{item.label.split(' ')[0]}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};
