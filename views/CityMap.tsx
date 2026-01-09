
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Search, Filter, Phone, Star, Clock, Info, Shield, Droplets, Zap, Trash2, Hospital, Building2, School, ExternalLink, Bot, Sparkles, Loader2 } from 'lucide-react';
import { CityService, GroundingLink } from '../types';
import { geminiService } from '../services/geminiService';

const MOCK_SERVICES: CityService[] = [
  { id: '1', name: 'NIMS Hospital', type: 'HOSPITAL', lat: 17.420, lng: 78.455, rating: 4.5, address: 'Panjagutta, Hyderabad' },
  { id: '2', name: 'JNTU EV Station', type: 'EV_CHARGER', lat: 17.493, lng: 78.391, rating: 4.8, address: 'Kukatpally, Hyderabad' },
  { id: '3', name: 'Tank Bund Heritage', type: 'TOURISM', lat: 17.424, lng: 78.481, rating: 4.7, address: 'Hussain Sagar, Hyderabad' },
  { id: '4', name: 'GHMC Central Office', type: 'TOURISM', lat: 17.412, lng: 78.473, rating: 4.2, address: 'Tank Bund Rd, Hyderabad' },
  { id: '5', name: 'Banjara Hills ATM', type: 'ATM', lat: 17.416, lng: 78.441, rating: 4.0, address: 'Road No. 1, Banjara Hills' },
  { id: '6', name: 'Apollo Health City', type: 'HOSPITAL', lat: 17.415, lng: 78.411, rating: 4.9, address: 'Jubilee Hills, Hyderabad' },
];

const CityMap: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<CityService | null>(null);
  const [aiResults, setAiResults] = useState<GroundingLink[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [userCoords, setUserCoords] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.warn("Geolocation disabled or failed", err)
      );
    }
  }, []);

  const handleAiSearch = async () => {
    if (!searchQuery.trim() || isAiLoading) return;
    setIsAiLoading(true);
    try {
      const result = await geminiService.getSmartCityHelp(
        `Find ${searchQuery} near me or in Hyderabad. Return specific locations.`,
        {},
        userCoords || { lat: 17.3850, lng: 78.4867 }
      );
      setAiResults(result.links);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredServices = MOCK_SERVICES.filter(s => 
    (selectedCategory === 'All' || s.type === selectedCategory) &&
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getServiceIcon = (type: string) => {
    switch(type) {
      case 'HOSPITAL': return <Hospital size={16} />;
      case 'SCHOOL': return <School size={16} />;
      case 'TOURISM': return <Building2 size={16} />;
      case 'EV_CHARGER': return <Zap size={16} />;
      default: return <MapPin size={16} />;
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
      {/* Sidebar Controls */}
      <div className="w-full md:w-96 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-blue-600" size={18} />
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Smart AI Search</h3>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search or ask AI for places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAiSearch()}
              className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-sm font-medium transition-all"
            />
            <button 
              onClick={handleAiSearch}
              disabled={isAiLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isAiLoading ? <Loader2 size={16} className="animate-spin" /> : <Bot size={16} />}
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['All', 'HOSPITAL', 'EV_CHARGER', 'TOURISM', 'ATM'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {aiResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest px-2 flex items-center gap-2">
                <Sparkles size={14} /> AI Verified Places (Live Maps)
              </h3>
              {aiResults.map((link, idx) => (
                <a
                  key={idx}
                  href={link.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-4 bg-blue-50/50 border border-blue-100 rounded-[1.5rem] hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-blue-600 text-white rounded-xl shadow-sm">
                      <MapPin size={16} />
                    </div>
                    <span className="text-sm font-bold text-slate-900 truncate">{link.title}</span>
                  </div>
                  <ExternalLink size={16} className="text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
                </a>
              ))}
              <div className="h-px bg-slate-100 mx-2" />
            </div>
          )}

          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Local Infrastructure</h3>
          <div className="space-y-3">
            {filteredServices.map(service => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`w-full text-left p-4 rounded-[1.5rem] border transition-all flex gap-4 ${
                  selectedService?.id === service.id 
                    ? 'bg-white border-blue-400 shadow-xl ring-4 ring-blue-500/5' 
                    : 'bg-white border-slate-100 hover:border-slate-300'
                }`}
              >
                <div className={`p-3 rounded-2xl h-fit transition-all ${selectedService?.id === service.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}>
                  {getServiceIcon(service.type)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 text-base">{service.name}</h4>
                  <p className="text-xs text-slate-500 mb-2 truncate">{service.address || service.type.replace('_', ' ')}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                      <Star size={12} fill="currentColor" />
                      <span className="text-[10px] font-black ml-1">{service.rating}</span>
                    </div>
                    <span className="text-[10px] text-green-600 font-black uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded-lg border border-green-100">Functional</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Viewport */}
      <div className="flex-1 relative bg-slate-100 rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-inner group">
        {/* Mock Map Background - High Quality Visualization */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:40px_40px]"></div>
        <svg className="absolute inset-0 w-full h-full text-slate-200/50" preserveAspectRatio="none">
          <path d="M0,200 L1200,600 M400,0 L800,1000 M0,800 L1200,300" stroke="currentColor" strokeWidth="6" fill="none" />
          <path d="M0,400 Q600,450 1200,400" stroke="white" strokeWidth="10" fill="none" className="opacity-40" />
          <path d="M600,0 L600,1000" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="12 12" />
        </svg>

        {/* Pulsing User Location */}
        {userCoords && (
          <div 
            style={{ 
              top: `50%`, 
              left: `50%` 
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white relative z-10 shadow-lg"></div>
            <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-60"></div>
          </div>
        )}

        {/* Map Markers */}
        {filteredServices.map(service => (
          <button
            key={service.id}
            onClick={() => setSelectedService(service)}
            style={{ 
              top: `${(service.lat - 17.4) * 2000}%`, 
              left: `${(service.lng - 78.3) * 500}%` 
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl border-2 transition-all hover:scale-125 hover:z-30 group/marker ${
              selectedService?.id === service.id 
                ? 'bg-blue-600 border-white text-white shadow-2xl scale-125 z-20' 
                : 'bg-white border-blue-600 text-blue-600 shadow-lg z-10'
            }`}
          >
            {getServiceIcon(service.type)}
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none shadow-xl ${selectedService?.id === service.id ? 'opacity-100' : ''}`}>
              {service.name}
            </div>
          </button>
        ))}

        {/* Selected Location Info Card */}
        {selectedService && (
          <div className="absolute bottom-8 left-8 right-8 md:right-auto md:w-96 bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 border border-white shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-500">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1 block">{selectedService.type.replace('_', ' ')}</span>
                <h3 className="text-xl font-black text-slate-900 leading-tight">{selectedService.name}</h3>
              </div>
              <button onClick={() => setSelectedService(null)} className="p-2 hover:bg-slate-200/50 rounded-xl text-slate-400 transition-colors">
                <Navigation size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Clock size={16} /></div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Operating Hours</p>
                  <p className="text-slate-500">09:00 AM - 09:00 PM • Open Now</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Phone size={16} /></div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Direct Contact</p>
                  <p className="text-slate-500">+91 40 2345 6789</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><MapPin size={16} /></div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Location</p>
                  <p className="text-slate-500 truncate">{selectedService.address}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2">
                Get Navigation <ExternalLink size={18} />
              </button>
              <button className="px-6 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all">
                Share
              </button>
            </div>
          </div>
        )}

        {/* Map UI Layers */}
        <div className="absolute top-8 right-8 flex flex-col gap-3">
          <button className="p-4 bg-white rounded-2xl shadow-xl text-slate-600 hover:bg-slate-50 transition-all active:scale-95">
            <Navigation size={22} />
          </button>
          <button className="p-4 bg-white rounded-2xl shadow-xl text-slate-600 hover:bg-slate-50 transition-all active:scale-95">
            <Shield size={22} />
          </button>
          <div className="h-px bg-slate-200 mx-2" />
          <button className="p-4 bg-blue-600 rounded-2xl shadow-xl text-white hover:bg-blue-700 transition-all active:scale-95">
            <Sparkles size={22} />
          </button>
        </div>

        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl rounded-full px-6 py-2 border border-white shadow-2xl flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-600">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" /> Smart Nodes Connected</div>
          <div className="w-px h-3 bg-slate-300" />
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" /> Traffic Sensor Live</div>
          <div className="w-px h-3 bg-slate-300" />
          <div className="flex items-center gap-2 text-blue-600"><Bot size={14} className="animate-pulse" /> AI Agent Monitoring</div>
        </div>

        <div className="absolute bottom-8 right-8">
          <div className="bg-slate-900/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl border border-slate-800 shadow-2xl flex items-center gap-4">
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase">Current Sector</span>
                <span className="text-sm font-bold">Hyderabad Central Zone</span>
             </div>
             <div className="w-px h-8 bg-slate-700" />
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase">Visibility</span>
                <span className="text-sm font-bold">12km Clear</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityMap;
