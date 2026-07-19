import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { NavigationRail } from './components/NavigationRail';
import { Navbar } from './components/Navbar';
import { CustomerChatWidget } from './components/CustomerChatWidget';
import { OwnerDashboard } from './components/OwnerDashboard';
import { RightDrawerPanel } from './components/RightDrawerPanel';

function ThreePaneWorkspaceScaffold() {
  const { activeView } = useApp();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8F9FA]">
      
      {/* PANE 1 (LEFT): Collapsible Navigation Rail (256px <-> 64px Footprint) */}
      <NavigationRail />

      {/* PANE 2 (CENTER): Core Workspace Canvas */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        <Navbar />

        <div className="flex-1 p-6 overflow-hidden flex flex-col min-h-0">
          {activeView === 'split' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
              <div className="lg:col-span-5 h-[calc(100vh-140px)]">
                <CustomerChatWidget />
              </div>
              <div className="lg:col-span-7 h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
                <OwnerDashboard />
              </div>
            </div>
          )}

          {activeView === 'customer' && (
            <div className="max-w-3xl mx-auto w-full h-[calc(100vh-140px)]">
              <CustomerChatWidget />
            </div>
          )}

          {activeView === 'owner' && (
            <div className="h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
              <OwnerDashboard />
            </div>
          )}
        </div>
      </main>

      {/* PANE 3 (RIGHT): Context-Aware RightDrawerPanel (Locked 380px Footprint) */}
      <RightDrawerPanel />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ThreePaneWorkspaceScaffold />
    </AppProvider>
  );
}
