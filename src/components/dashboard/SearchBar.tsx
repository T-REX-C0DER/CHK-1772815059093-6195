import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div ref={containerRef} className="relative w-full" style={{ maxWidth: 520 }}>
      {/* Search Input — 48px pill with shadow */}
      <div
        className={cn(
          "search-bar",
          show && "focused"
        )}
        style={{
          width: '100%',
          ...(show ? {
            borderColor: 'var(--primary)',
            boxShadow: 'var(--shadow-search-focus)',
          } : {})
        }}
      >
        <Search
          size={18}
          className="flex-shrink-0"
          style={{ color: show ? 'var(--primary)' : 'var(--text-faint)', transition: 'color 0.2s' }}
        />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setShow(true)}
          placeholder="Search organizations, campaigns..."
          className="search-input"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setSuggestions([]); }}
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              background: 'var(--primary-light)',
              color: 'var(--text-faint)',
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 700,
              transition: 'all 0.15s',
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown */}
      {show && suggestions.length > 0 && (
        <div
          className="absolute z-50 mt-2 w-full overflow-hidden flex flex-col"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-elevated)',
            maxHeight: 400,
          }}
        >
          <div
            className="px-4 py-2.5"
            style={{ borderBottom: '1px solid var(--border)', background: 'var(--gradient-warm-subtle)' }}
          >
            <span
              style={{
                fontSize: 'var(--fs-tag)',
                fontWeight: 700,
                color: 'var(--text-faint)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Quick results
            </span>
          </div>
          <ul className="overflow-auto py-1 custom-scrollbar" style={{ margin: 0, padding: '4px 0', listStyle: 'none' }}>
            {['organization', 'campaign', 'volunteer', 'shelter'].map((type) => {
              const typedSuggestions = suggestions.filter(s => s.type === type);
              if (typedSuggestions.length === 0) return null;
              return (
                <div key={type}>
                  <div className="px-4 py-1.5">
                    <span
                      style={{
                        fontSize: 'var(--fs-tag)',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {type}s
                    </span>
                  </div>
                  {typedSuggestions.map(s => (
                    <li
                      key={`${s.type}-${s.id}`}
                      className="group"
                      style={{
                        padding: '10px 16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-light)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      onClick={() => {
                        window.location.href = `/${s.type === 'organization' ? 'dashboard/org' : 'dashboard/user'}/${s.id}`;
                      }}
                    >
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 'var(--radius-btn)',
                          background: 'var(--primary-light)',
                          color: 'var(--primary)',
                        }}
                      >
                        <Search size={14} />
                      </div>
                      <span style={{ fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-main)' }}>
                        {s.name}
                      </span>
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
