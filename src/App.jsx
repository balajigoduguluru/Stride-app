import React from 'react';
import { useApp } from './context/AppContext';
import { NavigationRail } from './components/NavigationRail';
import { Navbar } from './components/Navbar';
import { OwnerDashboard } from './components/OwnerDashboard';
import { CustomerChatWidget } from './components/CustomerChatWidget';
import { RightDrawerPanel } from './components/RightDrawerPanel';
import { Zap } from 'lucide-react';

export default function App() {
  const { activeView, activeRightPanel, webhookToast } = useApp();

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1C1E] flex flex-col font-sans selection:bg-[#D3E3FD] selection:text-[#041E49]">
      
      {/* Top Application Navigation Bar */}
      <Navbar />

      {/* Main Structural Three-Pane Layout Frame */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Pane 1: Left Collapsible Navigation Rail */}
        <NavigationRail />

        {/* Pane 2: Core Workspace Canvas Viewport */}
        <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-80px)] custom-scrollbar bg-[#F8F9FA]">
          {activeView === 'board' && <OwnerDashboard />}
          {activeView === 'chat' && <CustomerChatWidget />}
          {activeView === 'split' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full min-h-[680px]">
              <div className="h-full">
                <OwnerDashboard />
              </div>
              <div className="h-full">
                <CustomerChatWidget />
              </div>
            </div>
          )}
        </main>

        {/* Pane 3: Context-Aware 380px Co-Planar Utility Sheet */}
        {activeRightPanel && <RightDrawerPanel />}

      </div>

      {/* FLOATING WHATSAPP WEBHOOK TOAST BANNER */}
      {webhookToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#041E49] text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-3 animate-fade-in border border-[#0B57D0]">
          <div className="w-7 h-7 rounded-full bg-[#0F9D58] flex items-center justify-center text-white text-xs shrink-0">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <span className="text-xs font-semibold font-mono">{webhookToast}</span>
        </div>
      )}

    </div>
  );
}
