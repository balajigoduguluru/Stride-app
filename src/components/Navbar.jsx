import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../shared/ui/Button';
import { BookOpen, BarChart3, RotateCcw, Zap, Sparkles } from 'lucide-react';

export function Navbar() {
  const { 
    resetDemoData, 
    openKbDrawer, 
    openAnalyticsDrawer,
    lastAiAction 
  } = useApp();

  return (
    <header className="sticky top-0 z-40 px-6 py-4 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto bg-[#FFFFFF] shadow-xs rounded-full px-6 py-3 flex items-center justify-between gap-6 border-none">
        
        {/* Brand Title Badge */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#0B57D0] flex items-center justify-center text-white shadow-xs">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#0F9D58] rounded-full border-2 border-[#FFFFFF]"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-[#1A1C1E] font-heading tracking-tight">
                Stride
              </h1>
              <span className="bg-[#E8F0FE] text-[#0B57D0] text-[11px] font-mono px-3 py-0.5 rounded-full uppercase tracking-wider font-bold">
                M3 Co-Pilot
              </span>
            </div>
            <p className="text-xs text-[#43474E] font-medium">Autonomous Operations Engine</p>
          </div>
        </div>

        {/* Right-Side Co-Planar Drawer Triggers */}
        <div className="flex items-center gap-2.5">
          <Button 
            size="sm" 
            variant="ghost" 
            icon={BookOpen} 
            onClick={openKbDrawer}
          >
            Knowledge Base
          </Button>

          <Button 
            size="sm" 
            variant="ghost" 
            icon={BarChart3} 
            onClick={openAnalyticsDrawer}
          >
            Analytics & SLA
          </Button>

          <Button 
            size="sm" 
            variant="secondary" 
            icon={RotateCcw} 
            onClick={resetDemoData}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Gemini Ambient Aura AI Ticker Bar */}
      {lastAiAction && (
        <div className="max-w-7xl mx-auto mt-3 bg-ai-aura rounded-full px-6 py-2 flex items-center justify-between text-xs animate-fade-in border-none shadow-xs">
          <div className="flex items-center gap-2.5 text-[#1A1C1E] font-medium">
            <Sparkles className="w-4 h-4 text-[#0B57D0]" />
            <span>
              <strong>Gemini AI Ambient Engine:</strong> Intent Classified <code className="bg-[#FFFFFF]/90 px-2.5 py-0.5 rounded-full text-[#0B57D0] font-mono font-bold">{lastAiAction.intent.toUpperCase()}</code> ({(lastAiAction.confidence * 100).toFixed(0)}%) | Extracted <em>{lastAiAction.entities.serviceType}</em> ({lastAiAction.entities.location})
            </span>
          </div>
          <span className="text-[11px] text-[#43474E] font-mono font-bold">
            {new Date(lastAiAction.timestamp).toLocaleTimeString()}
          </span>
        </div>
      )}
    </header>
  );
}
