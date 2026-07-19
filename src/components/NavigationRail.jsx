import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Monitor, 
  MessageSquare, 
  LayoutGrid, 
  BarChart3, 
  BookOpen, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Zap
} from 'lucide-react';

export function NavigationRail() {
  const { 
    activeView, 
    setActiveView, 
    isNavCollapsed, 
    setIsNavCollapsed,
    activeRightPanel,
    openAnalyticsDrawer,
    openKbDrawer,
    resetDemoData
  } = useApp();

  const navItems = [
    {
      id: 'split',
      label: 'Split Workspace',
      icon: Monitor,
      onClick: () => setActiveView('split'),
      isActive: activeView === 'split'
    },
    {
      id: 'customer',
      label: 'Customer Chat',
      icon: MessageSquare,
      onClick: () => setActiveView('customer'),
      isActive: activeView === 'customer'
    },
    {
      id: 'owner',
      label: 'Owner Board',
      icon: LayoutGrid,
      onClick: () => setActiveView('owner'),
      isActive: activeView === 'owner'
    },
    {
      id: 'analytics',
      label: 'Analytics & SLA',
      icon: BarChart3,
      onClick: openAnalyticsDrawer,
      isActive: activeRightPanel === 'analytics'
    },
    {
      id: 'kb',
      label: 'Knowledge Base',
      icon: BookOpen,
      onClick: openKbDrawer,
      isActive: activeRightPanel === 'kb'
    }
  ];

  return (
    <aside 
      className={`h-screen sticky top-0 z-30 bg-[#FFFFFF] border-r border-[#F0F4F9] flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isNavCollapsed ? 'w-[64px] px-2 py-4' : 'w-[256px] px-4 py-4'
      }`}
    >
      {/* Top Header & Brand */}
      <div className="space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between min-h-[40px]">
          {!isNavCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0B57D0] flex items-center justify-center text-white shadow-xs shrink-0">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div className="overflow-hidden">
                <h1 className="font-bold text-lg text-[#1A1C1E] font-heading tracking-tight truncate">
                  Stride
                </h1>
                <p className="text-[11px] text-[#43474E] font-medium truncate">AI Operations Co-Pilot</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#0B57D0] flex items-center justify-center text-white shadow-xs shrink-0 mx-auto">
              <Zap className="w-5 h-5 fill-current" />
            </div>
          )}

          {!isNavCollapsed && (
            <button
              onClick={() => setIsNavCollapsed(true)}
              className="p-2 text-[#43474E] hover:text-[#1A1C1E] hover:bg-[#F0F4F9] rounded-full transition-colors"
              title="Collapse Navigation Rail"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        {isNavCollapsed && (
          <button
            onClick={() => setIsNavCollapsed(false)}
            className="w-10 h-10 mx-auto text-[#43474E] hover:text-[#1A1C1E] hover:bg-[#F0F4F9] rounded-full flex items-center justify-center transition-colors"
            title="Expand Navigation Rail"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Navigation Items (M3 Destination Pills) */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 rounded-full transition-all duration-200 cursor-pointer ${
                  isNavCollapsed ? 'justify-center h-12 p-0' : 'px-4 py-3 text-xs font-semibold'
                } ${
                  item.isActive 
                    ? 'bg-[#D3E3FD] text-[#041E49] font-bold shadow-xs' 
                    : 'text-[#43474E] hover:bg-[#F0F4F9] hover:text-[#1A1C1E]'
                }`}
                title={isNavCollapsed ? item.label : undefined}
              >
                <div className={`flex items-center justify-center ${isNavCollapsed ? 'w-10 h-10 rounded-full bg-[#D3E3FD]' : ''}`}>
                  <Icon className={`w-5 h-5 ${item.isActive ? 'text-[#0B57D0]' : 'text-[#43474E]'}`} />
                </div>
                {!isNavCollapsed && (
                  <span className="truncate font-heading text-xs">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

      </div>

      {/* Reset Action */}
      <div className="pt-4 border-t border-[#F0F4F9]">
        <button
          onClick={resetDemoData}
          className={`w-full flex items-center gap-3 rounded-full text-xs font-semibold text-[#43474E] hover:text-[#EA4335] hover:bg-[#FCE8E6] transition-all ${
            isNavCollapsed ? 'justify-center h-10 p-0' : 'px-4 py-2.5'
          }`}
          title="Reset Demo Data"
        >
          <RotateCcw className="w-4 h-4 shrink-0" />
          {!isNavCollapsed && <span>Reset Demo Data</span>}
        </button>
      </div>

    </aside>
  );
}
