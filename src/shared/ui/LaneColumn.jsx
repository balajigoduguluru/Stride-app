import React from 'react';

export function LaneColumn({ id, title, icon: Icon, colorTheme, count, urgentCount, totalValue = 0, children }) {
  const themeStyles = {
    indigo: { accentBar: "bg-[#0B57D0]" },
    emerald: { accentBar: "bg-[#0F9D58]" },
    rose: { accentBar: "bg-[#EA4335]" },
    amber: { accentBar: "bg-[#B06000]" }
  };

  const currentTheme = themeStyles[colorTheme] || themeStyles.indigo;

  return (
    <div className="flex flex-col bg-[#F0F4F9]/70 border-none rounded-[28px] overflow-hidden min-w-[320px] flex-1 min-h-[560px] shadow-xs">
      
      {/* Top Accent Bar */}
      <div className={`h-1.5 ${currentTheme.accentBar} w-full`}></div>

      {/* Lane Header with 25% Increased Padding */}
      <div className="p-6 flex items-center justify-between bg-[#F0F4F9]">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#FFFFFF] flex items-center justify-center text-[#1A1C1E] font-bold shadow-xs">
            {Icon && <Icon className="w-5 h-5 text-[#0B57D0]" />}
          </div>
          <div>
            <h3 className="font-bold text-[#1A1C1E] text-base font-heading">{title}</h3>
            <span className="text-xs text-[#0F9D58] font-mono font-bold block mt-0.5">
              Pipeline: ₹{totalValue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
        
        <span className="bg-[#FFFFFF] text-[#041E49] px-3.5 py-1 rounded-full text-xs font-mono font-bold shadow-xs">
          {count}
        </span>
      </div>

      {/* Cards Scrollable Feed with 25% Expanded Padding */}
      <div className="p-6 flex-1 space-y-5 overflow-y-auto max-h-[calc(100vh-230px)] custom-scrollbar">
        {children}
      </div>
    </div>
  );
}
