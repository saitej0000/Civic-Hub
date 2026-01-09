
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Users, 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  ArrowUpRight,
  Filter,
  Download
} from 'lucide-react';
import { Department, User } from '../types';
import { MOCK_COMPLAINTS } from '../constants';

const PIE_DATA = [
  { name: 'Pending', value: 45, color: '#f59e0b' },
  { name: 'In Progress', value: 25, color: '#3b82f6' },
  { name: 'Resolved', value: 30, color: '#10b981' },
];

const AdminDashboard: React.FC<{ user: User }> = ({ user }) => {
  const department = user.department || Department.MUNICIPAL;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{department} Control Panel</h1>
          <p className="text-slate-500">Monitor and manage department-specific operations.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm font-medium">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-medium">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatCard title="Total Complaints" value="1,284" change="+12.5%" icon={<MessageCircle className="text-blue-600" />} />
        <AdminStatCard title="Active Resolution" value="89%" change="+2.3%" icon={<CheckCircle className="text-green-600" />} />
        <AdminStatCard title="Avg. Resp Time" value="4.2h" change="-15%" icon={<Clock className="text-orange-600" />} />
        <AdminStatCard title="Field Staff" value="42" change="0%" icon={<Users className="text-purple-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Resolution Status</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Recent Department Alerts</h3>
            <button className="text-sm text-blue-600 font-medium">Assign Staff</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-slate-400 font-medium border-b border-slate-100">
                  <th className="pb-4">Complaint ID</th>
                  <th className="pb-4">Citizen</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_COMPLAINTS.map(comp => (
                  <tr key={comp.id} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-semibold text-slate-700">#{comp.id.split('-')[1]}</td>
                    <td className="py-4 text-slate-600">Citizen User</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        comp.status === 'PENDING' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {comp.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="text-blue-600 hover:underline font-medium">Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminStatCard = ({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-slate-50 rounded-xl">
        {icon}
      </div>
      <div>
        <h4 className="text-slate-500 text-sm font-medium">{title}</h4>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <span className={`text-xs font-bold flex items-center ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change}
            <ArrowUpRight size={12} />
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
