import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

// lightweight debounce utility
function debounce<T extends (...args: any[]) => void>(fn: T, delay = 300) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args as any), delay);
  };
}

interface Suggestion {
  id: string;
  type: 'organization' | 'campaign' | 'shelter' | 'volunteer';
  name: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = debounce(async (q: string) => {
    if (!q) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data.results || []);
      }
    } catch (e) {
      console.error(e);
    }
  }, 300);

  useEffect(() => {
    fetchSuggestions(query);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full" style={{ maxWidth: '520px' }}>
      <div
        className={cn(
          "flex items-center bg-white border transition-all duration-300 px-5 py-3.5",
          show ? "border-primary/50 ring-4 ring-primary/10 shadow-md" : "border-slate-100 hover:border-slate-200 shadow-sm"
        )}
        style={{ borderRadius: '9999px' }}
      >
        <Search size={20} className={cn("transition-colors duration-300", show ? "text-primary" : "text-slate-400")} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setShow(true)}
          placeholder="Search organizations, campaigns, shelters, volunteers..."
          className="ml-3 w-full outline-none text-[15px] font-medium bg-transparent text-slate-700 placeholder:text-slate-400"
        />
      </div>
      {show && suggestions.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl max-h-[400px] overflow-hidden flex flex-col">
          <div className="p-2 border-b border-slate-50 bg-slate-50/50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Quick results</span>
          </div>
          <ul className="overflow-auto py-2 custom-scrollbar">
            {['organization', 'campaign', 'volunteer', 'shelter'].map((type) => {
              const typedSuggestions = suggestions.filter(s => s.type === type);
              if (typedSuggestions.length === 0) return null;

              return (
                <div key={type}>
                  <div className="px-4 py-1.5">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider capitalize">{type}s</span>
                  </div>
                  {typedSuggestions.map(s => (
                    <li
                      key={`${s.type}-${s.id}`}
                      className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-center gap-3 group"
                      onClick={() => {
                        window.location.href = `/${s.type === 'organization' ? 'dashboard/org' : 'dashboard/user'}/${s.id}`;
                      }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Search size={14} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">{s.name}</span>
                    </li>
                  ))}
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
