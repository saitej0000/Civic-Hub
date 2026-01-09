
import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, Camera, MapPin, 
  Clock, CheckCircle2, AlertCircle, ChevronRight,
  MessageSquare, History, User, Building2, Loader2, X
} from 'lucide-react';
import { MOCK_COMPLAINTS, DEPARTMENTS_METADATA } from '../constants';
import { Department } from '../types';

const Complaints: React.FC<{ defaultTab?: 'tracking' | 'report' }> = ({ defaultTab = 'tracking' }) => {
  const [activeTab, setActiveTab] = useState<'tracking' | 'report'>(defaultTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<Department | 'All'>('All');
  
  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [locationStr, setLocationStr] = useState<string>('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [selectedFormDept, setSelectedFormDept] = useState<Department | null>(null);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const filteredComplaints = MOCK_COMPLAINTS.filter(c => 
    (selectedDept === 'All' || c.category === selectedDept) &&
    (c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.includes(searchQuery))
  );

  const handleSetLocation = () => {
    setLocationStr("Fetching GPS... Done (17.4474° N, 78.3762° E)");
    setTimeout(() => setLocationStr("Hitech City Main Road, Cyber Towers Junction"), 1000);
  };

  const handleAddPhoto = () => {
    setHasPhoto(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-8 animate-in zoom-in-95 duration-300">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-100 border-4 border-white">
          <CheckCircle2 size={48} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Complaint Registered!</h2>
          <p className="text-slate-500 text-lg">Your ticket ID is <span className="font-bold text-blue-600 underline">#CH-77492</span>. Our response team has been dispatched.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-left">
          <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-widest">Next Steps</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-slate-600">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</div>
              Department admin will review your report within 60 minutes.
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-600">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</div>
              A field officer will be assigned for ground verification.
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-600">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</div>
              You'll receive SMS updates on resolution progress.
            </li>
          </ul>
        </div>
        <button 
          onClick={() => { setShowSuccess(false); setActiveTab('tracking'); }}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl"
        >
          Track Progress
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* View Toggle */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm inline-flex gap-1">
        <button 
          onClick={() => setActiveTab('tracking')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'tracking' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <History size={18} />
          Track Issues
        </button>
        <button 
          onClick={() => setActiveTab('report')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'report' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Plus size={18} />
          Report New
        </button>
      </div>

      {activeTab === 'tracking' ? (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by ID or Title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 no-scrollbar">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 shrink-0">
                <Filter size={16} /> Filter
              </button>
              {['All', ...Object.values(Department)].slice(0, 5).map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept as any)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap border transition-all ${
                    selectedDept === dept ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredComplaints.map(comp => (
              <div key={comp.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${DEPARTMENTS_METADATA.find(d => d.id === comp.category)?.color}`}>
                    {DEPARTMENTS_METADATA.find(d => d.id === comp.category)?.icon}
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                    comp.status === 'PENDING' ? 'bg-amber-100 text-amber-600' : 
                    comp.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {comp.status.replace('_', ' ')}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {comp.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">
                  {comp.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <MapPin size={14} className="text-slate-300" />
                    {comp.location.address}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <Clock size={14} className="text-slate-300" />
                    Reported {new Date(comp.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">ID: {comp.id}</span>
                  <button className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:gap-2 transition-all">
                    View Details <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
              <Loader2 size={48} className="text-blue-600 animate-spin" />
              <p className="font-black text-slate-900 uppercase tracking-widest text-sm">Transmitting Data...</p>
            </div>
          )}

          <div className="p-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h2 className="text-2xl font-bold mb-2">Report a Civic Issue</h2>
            <p className="text-blue-100 opacity-90">Our field teams typically respond to critical reports within 4 hours.</p>
          </div>
          
          <form className="p-8 space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Select Department</label>
                  <div className="grid grid-cols-2 gap-3">
                    {DEPARTMENTS_METADATA.map(dept => (
                      <button 
                        key={dept.id} 
                        type="button"
                        onClick={() => setSelectedFormDept(dept.id as Department)}
                        className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${
                          selectedFormDept === dept.id ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500/10' : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className={`p-2 rounded-xl ${dept.color}`}>{dept.icon}</div>
                        <span className="text-xs font-bold text-slate-600">{dept.id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Issue Title</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Streetlight out on 5th Ave"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Description</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Provide details like landmark, duration, etc."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none font-medium resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button" 
                    onClick={handleAddPhoto}
                    className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-3xl transition-all gap-2 group relative overflow-hidden ${
                      hasPhoto ? 'border-green-400 bg-green-50 text-green-600' : 'border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-500'
                    }`}
                  >
                    {hasPhoto ? (
                      <>
                        <div className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm text-red-500" onClick={(e) => { e.stopPropagation(); setHasPhoto(false); }}>
                          <X size={12} />
                        </div>
                        <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center">
                          <CheckCircle2 size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Photo Captured</span>
                      </>
                    ) : (
                      <>
                        <Camera size={32} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold uppercase">Add Photo</span>
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    onClick={handleSetLocation}
                    className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-3xl transition-all gap-2 group ${
                      locationStr ? 'border-blue-400 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-500'
                    }`}
                  >
                    <MapPin size={32} className={`${locationStr ? 'animate-bounce' : 'group-hover:scale-110'} transition-transform`} />
                    <span className="text-[10px] font-bold uppercase truncate w-full text-center">
                      {locationStr ? "Location Locked" : "Set Location"}
                    </span>
                  </button>
                </div>
                {locationStr && <p className="text-[10px] font-bold text-blue-600 flex items-center gap-1"><MapPin size={10} /> {locationStr}</p>}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold italic">
                <AlertCircle size={14} />
                False reporting may lead to penal actions.
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 disabled:opacity-50"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Complaints;
