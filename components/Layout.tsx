
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Map as MapIcon, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User as UserIcon,
  Briefcase,
  Bell,
  Globe,
  UserCircle
} from 'lucide-react';
import { UserRole, User } from '../types';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  activeView: string;
  onViewChange: (view: string) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, activeView, onViewChange, children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: <LayoutDashboard size={20} />, role: [UserRole.CITIZEN, UserRole.DEPT_ADMIN, UserRole.SUPER_ADMIN] },
    { name: 'Gov Services', id: 'services', icon: <Globe size={20} />, role: [UserRole.CITIZEN, UserRole.DEPT_ADMIN, UserRole.SUPER_ADMIN] },
    { name: 'Complaints', id: 'complaints', icon: <AlertTriangle size={20} />, role: [UserRole.CITIZEN, UserRole.DEPT_ADMIN, UserRole.SUPER_ADMIN] },
    { name: 'City Map', id: 'map', icon: <MapIcon size={20} />, role: [UserRole.CITIZEN, UserRole.DEPT_ADMIN, UserRole.SUPER_ADMIN] },
    { name: 'Jobs', id: 'jobs', icon: <Briefcase size={20} />, role: [UserRole.CITIZEN, UserRole.SUPER_ADMIN] },
    { name: 'Profile', id: 'profile', icon: <UserCircle size={20} />, role: [UserRole.CITIZEN, UserRole.DEPT_ADMIN, UserRole.SUPER_ADMIN] },
    { name: 'Admin Hub', id: 'admin', icon: <Settings size={20} />, role: [UserRole.SUPER_ADMIN] },
  ];

  const filteredNav = navigation.filter(item => item.role.includes(user.role));

  const handleNavClick = (id: string) => {
    onViewChange(id);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl text-white">
                <Building2 size={24} />
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">CivicHub</h1>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredNav.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
                  activeView === item.id 
                    ? 'bg-blue-50 text-blue-600 shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleNavClick('profile')}>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate capitalize">{user.role.toLowerCase().replace('_', ' ')}</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-bold text-slate-800 capitalize">
              {navigation.find(n => n.id === activeView)?.name || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center px-4 py-1.5 bg-green-50 rounded-full text-xs text-green-700 font-bold uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
              Secure Portal Active
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg" onClick={() => handleNavClick('profile')}>
              <UserIcon size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

const Building2 = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
);

export default Layout;
