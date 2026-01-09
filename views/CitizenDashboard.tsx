
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ShieldAlert, TrendingUp, CheckCircle2, Clock, Plus, MapPin, Globe, ChevronRight, Star, ExternalLink } from 'lucide-react';
import { MOCK_ALERTS, MOCK_COMPLAINTS, DEPARTMENTS_METADATA, GOV_PORTALS } from '../constants';

const chartData = [
  { name: 'Mon', complaints: 12, resolved: 10 },
  { name: 'Tue', complaints: 19, resolved: 15 },
  { name: 'Wed', complaints: 15, resolved: 14 },
  { name: 'Thu', complaints: 22, resolved: 18 },
  { name: 'Fri', complaints: 30, resolved: 25 },
  { name: 'Sat', complaints: 10, resolved: 8 },
  { name: 'Sun', complaints: 8, resolved: 7 },
];

const CitizenDashboard: React.FC<{ onViewServices: () => void, onReportIssue: () => void }> = ({ onViewServices, onReportIssue }) => {
  const popularPortals = GOV_PORTALS.filter(p => p.isPopular).slice(0, 4);

  const handlePortalClick = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Citizen Command Centre</h1>
          <p className="text-slate-500">Unified access to your city's digital infrastructure.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onReportIssue}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 font-bold"
          >
            <Plus size={20} />
            Report Issue
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm font-bold">
            <MapPin size={20} />
            Local Guide
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Tickets" value="02" icon={<Clock className="text-blue-600" />} color="bg-blue-50" />
        <StatCard title="Resolved Issues" value="14" icon={<CheckCircle2 className="text-green-600" />} color="bg-green-50" />
        <StatCard title="Live Alerts" value="03" icon={<ShieldAlert className="text-red-600" />} color="bg-red-50" />
        <StatCard title="City Score" value="450" icon={<TrendingUp className="text-purple-600" />} color="bg-purple-50" />
      </div>

      {/* Unified Portal Highlight */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 text-blue-50 opacity-10 pointer-events-none">
          <Globe size={200} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Featured Government Sites</h3>
              <p className="text-slate-500 text-sm">Most accessed digital services in your region.</p>
            </div>
            <button 
              onClick={onViewServices}
              className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Directory <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularPortals.map(portal => (
              <div 
                key={portal.id} 
                onClick={() => handlePortalClick(portal.url)}
                className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded uppercase">{portal.category}</span>
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                  </div>
                  {portal.url !== '#' && <ExternalLink size={12} className="text-slate-300 group-hover:text-blue-500 transition-colors" />}
                </div>
                <h4 className="font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{portal.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1">{portal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="text-red-500" size={20} />
                Emergency Alerts
              </h3>
              <button className="text-sm text-blue-600 font-bold hover:underline">Full Feed</button>
            </div>
            <div className="space-y-4">
              {MOCK_ALERTS.map(alert => (
                <div key={alert.id} className={`p-5 rounded-2xl border-l-4 ${
                  alert.severity === 'WARNING' ? 'bg-orange-50/50 border-orange-500' : 'bg-blue-50/50 border-blue-500'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      alert.severity === 'WARNING' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {alert.type}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-sm text-slate-800 font-bold leading-relaxed">{alert.message}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Citizen Participation Index</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 600}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 600}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} 
                  />
                  <Area type="monotone" dataKey="complaints" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorComp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Service Departments</h3>
            <div className="grid grid-cols-2 gap-4">
              {DEPARTMENTS_METADATA.map((dept) => (
                <button 
                  key={dept.id} 
                  className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all gap-2 group"
                >
                  <div className={`p-3 rounded-2xl group-hover:scale-110 transition-transform ${dept.color}`}>
                    {dept.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">{dept.id}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Recent Applications</h3>
              <button className="text-sm font-bold text-blue-600">History</button>
            </div>
            <div className="space-y-5">
              {MOCK_COMPLAINTS.map(comp => (
                <div key={comp.id} className="flex items-start gap-4 pb-5 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className={`mt-1 p-2 rounded-xl shrink-0 ${DEPARTMENTS_METADATA.find(d => d.id === comp.category)?.color}`}>
                    {DEPARTMENTS_METADATA.find(d => d.id === comp.category)?.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 truncate">{comp.title}</h4>
                    <p className="text-xs text-slate-500 mb-3 truncate">{comp.description}</p>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-widest ${
                      comp.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {comp.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2.5 rounded-2xl ${color}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly</span>
    </div>
    <div className="space-y-1">
      <h4 className="text-slate-500 text-sm font-bold uppercase tracking-wider">{title}</h4>
      <p className="text-4xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

export default CitizenDashboard;
