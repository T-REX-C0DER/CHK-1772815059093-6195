import React from 'react';

interface DashboardGridProps {
  sidebar: React.ReactNode;
  feed: React.ReactNode;
  rightPanel: React.ReactNode;
}

export default function DashboardGrid({ sidebar, feed, rightPanel }: DashboardGridProps) {
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 360px)',
          gap: 32,
          alignItems: 'start',
        }}
        className="dashboard-responsive-grid"
      >
        {/* Main Feed */}
        <main style={{ minWidth: 0 }}>
          {feed}
        </main>

        {/* Right Panel — hidden below xl */}
        <aside
          className="hidden xl:block"
          style={{ position: 'sticky', top: 96, height: 'fit-content' }}
        >
          {rightPanel}
        </aside>
      </div>

      <style jsx>{`
        @media (max-width: 1280px) {
          .dashboard-responsive-grid {
            grid-template-columns: minmax(0, 1fr) 300px !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 1024px) {
          .dashboard-responsive-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
