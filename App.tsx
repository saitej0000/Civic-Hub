
import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import Login from './views/Login';
import Layout from './components/Layout';
import CitizenDashboard from './views/CitizenDashboard';
import AdminDashboard from './views/AdminDashboard';
import ServicesPortal from './views/ServicesPortal';
import CityMap from './views/CityMap';
import Complaints from './views/Complaints';
import Jobs from './views/Jobs';
import Profile from './views/Profile';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [complaintsTab, setComplaintsTab] = useState<'tracking' | 'report'>('tracking');

  // Simple persistence simulation
  useEffect(() => {
    const savedUser = localStorage.getItem('civichub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('civichub_user', JSON.stringify(newUser));
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('civichub_user');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('civichub_user', JSON.stringify(updatedUser));
  };

  const navigateToComplaints = (tab: 'tracking' | 'report' = 'tracking') => {
    setComplaintsTab(tab);
    setActiveView('complaints');
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Authenticating SecurID...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return user.role === UserRole.CITIZEN ? (
          <CitizenDashboard 
            onViewServices={() => setActiveView('services')} 
            onReportIssue={() => navigateToComplaints('report')}
          />
        ) : (
          <AdminDashboard user={user} />
        );
      case 'services':
        return <ServicesPortal />;
      case 'complaints':
        return <Complaints defaultTab={complaintsTab} />;
      case 'map':
        return <CityMap />;
      case 'jobs':
        return <Jobs />;
      case 'profile':
        return <Profile user={user} onUpdate={handleUpdateUser} />;
      case 'admin':
        return user.role === UserRole.SUPER_ADMIN ? (
          <div className="space-y-6">
            <div className="p-10 bg-blue-700 rounded-3xl text-white shadow-xl shadow-blue-200">
              <h1 className="text-3xl font-bold mb-2">Government System Overlord</h1>
              <p className="opacity-80">Managing 127 city departments and 1.2M citizen records.</p>
            </div>
            <AdminDashboard user={user} />
          </div>
        ) : <CitizenDashboard onViewServices={() => setActiveView('services')} onReportIssue={() => navigateToComplaints('report')} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="bg-slate-100 p-6 rounded-full text-slate-400 mb-6">
              <Building2 size={64} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Module Under Maintenance</h2>
            <p className="text-slate-500 max-w-sm mt-2">This government digital asset is currently being updated for better accessibility.</p>
            <button 
              onClick={() => setActiveView('dashboard')}
              className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all"
            >
              Return to Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <Layout user={user} onLogout={handleLogout} activeView={activeView} onViewChange={setActiveView}>
      {renderContent()}
      <AIAssistant />
    </Layout>
  );
};

const Building2 = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
);

export default App;
