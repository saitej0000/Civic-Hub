
import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Filter, ChevronRight, Star, AlertCircle, Info, LayoutGrid } from 'lucide-react';
import * as Icons from 'lucide-react';
import { GOV_PORTALS } from '../constants';
import { GovPortal } from '../types';

const ServicesPortal: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(GOV_PORTALS.map(p => p.category)))].sort((a, b) => 
      a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b)
    );
  }, []);

  const groupedPortals = useMemo(() => {
    const filtered = GOV_PORTALS.filter(portal => {
      const matchesSearch = portal.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            portal.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || portal.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    const groups: { [key: string]: GovPortal[] } = {};
    filtered.forEach(portal => {
      if (!groups[portal.category]) {
        groups[portal.category] = [];
      }
      groups[portal.category].push(portal);
    });

    return groups;
  }, [searchQuery, activeCategory]);

  const placeholderPortals = useMemo(() => GOV_PORTALS.filter(p => p.url === '#'), []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Search and Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-8 md:p-12 text-white shadow-xl mb-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/30 rounded-lg backdrop-blur-sm">
              <LayoutGrid size={24} className="text-blue-100" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Services Directory</h1>
          </div>
          <p className="text-blue-100 text-lg mb-8 max-w-xl">
            Grouped access to all Telangana government departments, innovation hubs, and citizen welfare portals.
          </p>
          
          <div className="relative group max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 group-focus-within:text-white transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search for services like 'Tax', 'DL', 'Health', or 'Dharani'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-lg shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-md py-4 border-b border-slate-200 -mx-6 px-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-full text-slate-400 shrink-0 shadow-sm">
            <Filter size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Filter</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200 ring-2 ring-blue-500/20' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Configuration Prompt for Placeholder URLs */}
      {placeholderPortals.length > 0 && searchQuery === '' && activeCategory === 'All' && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-sm">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
            <AlertCircle size={24} />
          </div>
          <div className="flex-1">
            <h4 className="text-amber-900 font-bold mb-1">Incomplete Service Mapping</h4>
            <p className="text-amber-700 text-sm">
              Some services require verified external URLs. Citizen access is currently restricted for these nodes.
            </p>
          </div>
        </div>
      )}

      {/* Content grouped by Category */}
      <div className="space-y-12">
        {/* Fixed: Assert the type of entries to prevent TS from inferring 'portals' as 'unknown' */}
        {(Object.entries(groupedPortals) as [string, GovPortal[]][]).sort().map(([category, portals]) => (
          <section key={category} className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest">{category}</h2>
              <div className="h-px bg-slate-200 flex-1"></div>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                {portals.length} {portals.length === 1 ? 'Service' : 'Services'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portals.map(portal => {
                const IconComponent = (Icons as any)[portal.icon] || Icons.HelpCircle;
                const isPlaceholder = portal.url === '#';
                
                return (
                  <div 
                    key={portal.id} 
                    className={`group bg-white rounded-2xl border p-6 transition-all flex flex-col h-full shadow-sm hover:shadow-xl relative ${
                      isPlaceholder 
                        ? 'border-dashed border-slate-200 opacity-75' 
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl transition-all duration-300 ${
                        isPlaceholder 
                          ? 'bg-slate-100 text-slate-400' 
                          : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6'
                      }`}>
                        <IconComponent size={24} />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {portal.isPopular && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full uppercase tracking-wider border border-amber-100">
                            <Star size={10} fill="currentColor" /> Popular
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold mb-2 transition-colors ${
                        isPlaceholder ? 'text-slate-400' : 'text-slate-900 group-hover:text-blue-600'
                      }`}>
                        {portal.name}
                      </h3>
                      <p className={`text-sm leading-relaxed mb-6 line-clamp-3 ${
                        isPlaceholder ? 'text-slate-400 italic' : 'text-slate-500'
                      }`}>
                        {portal.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{portal.category}</span>
                      {isPlaceholder ? (
                        <span className="text-[10px] font-bold text-slate-300 italic flex items-center gap-1">
                          <Info size={12} /> Pending Link
                        </span>
                      ) : (
                        <a 
                          href={portal.url} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 group/link"
                        >
                          Visit Portal
                          <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {Object.keys(groupedPortals).length === 0 && (
        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <div className="inline-flex p-6 bg-slate-50 rounded-full text-slate-300 mb-6">
            <Search size={48} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">No matches found</h3>
          <p className="text-slate-500 max-w-sm mx-auto mt-2">
            We couldn't find any services matching your current filter criteria. Try adjusting your search or category.
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicesPortal;
