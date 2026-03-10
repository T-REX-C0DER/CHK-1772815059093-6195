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
    <div className="min-h-screen" style={{ backgroundColor: '#F8F6F4' }}>
      {/* Main container with max-width and centering */}
      <div className="mx-auto px-8" style={{ maxWidth: '1440px', paddingTop: '0', paddingBottom: '64px' }}>
        {/* 3-column grid layout: 240px | 32px | 640px | 32px | 320px */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: hasSidebar
              ? '240px 48px 800px 48px 320px'
              : '0px 0px 800px 48px 320px',
            gap: '0',
            alignItems: 'start',
          }}
        >
          {/* Left Sidebar - 240px */}
          {hasSidebar && <aside className="hidden lg:block">{sidebar}</aside>}

          {/* Spacer - 48px */}
          {hasSidebar && <div></div>}

          {/* Main Feed - 640px */}
          <main>{feed}</main>

          {/* Spacer - 48px */}
          <div></div>

          {/* Right Panel - 320px */}
          <aside className="hidden xl:block">{rightPanel}</aside>
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
