
import React, { useState } from 'react';
import { 
  Briefcase, Search, Calendar, MapPin, 
  ChevronRight, Building2, TrendingUp, Users,
  Globe, GraduationCap, ArrowUpRight, Loader2, CheckCircle2
} from 'lucide-react';
import { MOCK_JOBS, DEPARTMENTS_METADATA } from '../constants';

const Jobs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const filteredJobs = MOCK_JOBS.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = (id: string) => {
    setApplyingId(id);
    // Simulate application process
    setTimeout(() => {
      setApplyingId(null);
      setAppliedJobs(prev => [...prev, id]);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Hero Header */}
      <div className="relative bg-slate-900 rounded-[2rem] p-10 overflow-hidden text-white border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400 mb-6">
            <TrendingUp size={12} /> Opportunities Updated Hourly
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-[1.1]">
            Build the Future of <span className="text-blue-500">Your City.</span>
          </h1>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Explore diverse careers across 127 municipal departments. From urban planning to advanced AI research, your skills power our growth.
          </p>
          
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by role, department, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg shadow-inner"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="space-y-8">
          <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Building2 size={16} className="text-blue-600" /> Departments
            </h3>
            <div className="space-y-2">
              {DEPARTMENTS_METADATA.map(dept => (
                <button key={dept.id} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${dept.color}`}>{dept.icon}</div>
                    <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{dept.id}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-300">12</span>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
            <GraduationCap size={32} className="mb-4 text-blue-200" />
            <h3 className="text-lg font-bold mb-2">Skill Development</h3>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">Access subsidied courses to upgrade your technical expertise via TASK.</p>
            <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
              Learn More
            </button>
          </section>
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Open Positions ({filteredJobs.length})</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-xs font-bold">Latest</button>
              <button className="px-4 py-2 bg-white text-slate-400 border border-slate-200 rounded-xl text-xs font-bold">Expiring Soon</button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredJobs.map(job => {
              const isApplied = appliedJobs.includes(job.id);
              const isApplying = applyingId === job.id;

              return (
                <div key={job.id} className="group bg-white rounded-3xl border border-slate-200 p-8 hover:shadow-xl hover:border-blue-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-blue-100">
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-black text-green-600 uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full border border-green-100">
                        Full Time
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{job.title}</h3>
                      <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{job.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Deadline: {job.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Hyderabad Metro</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-3 shrink-0">
                    <button 
                      onClick={() => !isApplied && handleApply(job.id)}
                      disabled={isApplied || isApplying}
                      className={`flex-1 md:w-40 py-4 rounded-2xl font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
                        isApplied 
                          ? 'bg-green-100 text-green-700 shadow-none border border-green-200 cursor-default' 
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
                      }`}
                    >
                      {isApplying ? <Loader2 size={18} className="animate-spin" /> : 
                       isApplied ? <><CheckCircle2 size={18} /> Applied</> : 
                       <>Apply Now <ArrowUpRight size={18} /></>}
                    </button>
                    <button className="px-6 py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all border border-slate-200">
                      Save
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <Users size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-600">No active postings match your search.</h3>
              <p className="text-slate-400 text-sm">Try broadening your keywords or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
