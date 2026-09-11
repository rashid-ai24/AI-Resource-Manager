import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import TitleBar from '../TitleBar';
import Sidebar from '../Sidebar';
import StatusBar from './StatusBar';
import { PageTransition } from '../transitions/PageTransition';

export function AppLayout({ children, className }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={cn('flex flex-col h-screen bg-background overflow-hidden', className)}>
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto">
            <PageTransition>
              {children || <Outlet />}
            </PageTransition>
          </main>
          <StatusBar />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
