import React from 'react';

interface DashboardGridProps {
  sidebar: React.ReactNode;
  feed: React.ReactNode;
  rightPanel: React.ReactNode;
}

export default function DashboardGrid({ sidebar, feed, rightPanel }: DashboardGridProps) {
  return (
    <div className="w-full">
      {/* Desktop & Tablet: 2-column grid (feed + right panel) */}
      <div
        className="grid gap-8 items-start"
        style={{
          gridTemplateColumns: 'minmax(0, 1fr) minmax(310px, 360px)',
        }}
      >
        {/* Main Feed */}
        <main className="min-w-0">
          {feed}
        </main>

        {/* Right Panel — hidden below xl */}
        <aside className="hidden xl:block sticky top-24 h-fit">
          {rightPanel}
        </aside>
      </div>
    </div>
  );
}
