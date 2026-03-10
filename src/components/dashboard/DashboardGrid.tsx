import React from 'react';

interface DashboardGridProps {
  sidebar: React.ReactNode;
  feed: React.ReactNode;
  rightPanel: React.ReactNode;
}

export default function DashboardGrid({ sidebar, feed, rightPanel }: DashboardGridProps) {
  // For now, always show the sidebar layout since navigation is in layout
  const hasSidebar = true;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F3EF] to-white">
      {/* Main container with max-width and centering */}
      <div className="mx-auto px-4 md:px-8 max-w-[1600px] pt-8 pb-20">
        {/* 3-column grid layout: fluid and responsive */}
        <div
          className="grid gap-8 items-start"
          style={{
            gridTemplateColumns: hasSidebar
              ? 'minmax(260px, 300px) 1fr minmax(320px, 380px)'
              : '1fr minmax(320px, 380px)',
          }}
        >
          {/* Left Sidebar - handled by layout.tsx usually, but this component supports local placement too */}
          {hasSidebar && (
            <aside className="hidden lg:block sticky top-24">
              {sidebar}
            </aside>
          )}

          {/* Main Feed */}
          <main className="min-w-0">
            {feed}
          </main>

          {/* Right Panel */}
          <aside className="hidden xl:block sticky top-24 h-fit">
            {rightPanel}
          </aside>
        </div>
      </div>

      {/* Mobile/tablet view - show only feed with full width */}
      <div className="lg:hidden px-4 pb-20">
        <main style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          {feed}
        </main>
      </div>
    </div>
  );
}
