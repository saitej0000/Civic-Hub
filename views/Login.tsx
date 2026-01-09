
import React, { useState } from 'react';
import { UserRole, User, Department } from '../types';
import { Building2, ShieldCheck, User as UserIcon, Briefcase, Lock, Mail, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CITIZEN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation of authentication
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: selectedRole === UserRole.CITIZEN ? 'John Doe' : selectedRole === UserRole.DEPT_ADMIN ? 'Dept Admin' : 'Super Admin',
      email: email || 'admin@cityhub.gov',
      role: selectedRole,
      department: selectedRole === UserRole.DEPT_ADMIN ? Department.WASTE : undefined,
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl text-white mb-4 shadow-lg shadow-blue-200">
            <Building2 size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Telangana One</h1>
          <p className="text-slate-500 mt-2 font-medium">Smart City Portal</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
          <div className="mb-8">
            <label className="text-sm font-bold text-slate-700 block mb-4 uppercase tracking-wider">Select Access Role</label>
            <div className="grid grid-cols-3 gap-3">
              <RoleButton
                active={selectedRole === UserRole.CITIZEN}
                onClick={() => setSelectedRole(UserRole.CITIZEN)}
                icon={<UserIcon size={18} />}
                label="Citizen"
              />
              <RoleButton
                active={selectedRole === UserRole.DEPT_ADMIN}
                onClick={() => setSelectedRole(UserRole.DEPT_ADMIN)}
                icon={<Briefcase size={18} />}
                label="Dept"
              />
              <RoleButton
                active={selectedRole === UserRole.SUPER_ADMIN}
                onClick={() => setSelectedRole(UserRole.SUPER_ADMIN)}
                icon={<ShieldCheck size={18} />}
                label="Gov"
              />
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@city.gov"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs text-blue-600 font-bold hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center pt-8 border-t border-slate-100">
            <p className="text-slate-500 text-sm">
              Don't have an account? <a href="#" className="text-blue-600 font-bold hover:underline">Register Citizen ID</a>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-400 text-xs mt-8">
          &copy; 2025 Smart City Council. All rights reserved. Secure Gov Portals.
        </p>
      </div>
    </div>
  );
};

const RoleButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center p-3 rounded-2xl border transition-all gap-1
      ${active ? 'bg-blue-50 border-blue-600 text-blue-600 ring-2 ring-blue-500/10' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}
    `}
  >
    {icon}
    <span className="text-[10px] font-bold uppercase">{label}</span>
  </button>
);

export default Login;
