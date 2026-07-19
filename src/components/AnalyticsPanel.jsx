import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../shared/ui/Button';
import { Badge } from '../shared/ui/Badge';
import { X, TrendingUp, Clock, CheckCircle2, AlertTriangle, Sparkles, BarChart3, Users, Zap } from 'lucide-react';

export function AnalyticsPanel() {
  const { isAnalyticsOpen, setIsAnalyticsOpen, cards } = useApp();

  if (!isAnalyticsOpen) return null;

  const totalCards = cards.length;
  const totalLeads = cards.filter(c => c.lane === 'leads').length;
  const totalBookings = cards.filter(c => c.lane === 'bookings').length;
  const totalSupport = cards.filter(c => c.lane === 'support').length;
  const completedJobs = cards.filter(c => c.status === 'Completed').length;

  const conversionRate = totalLeads + totalBookings > 0 
    ? ((totalBookings / (totalLeads + totalBookings)) * 100).toFixed(0) 
    : 75;

  return (
    <div className="fixed inset-0 z-50 bg-[#1F1F1F]/40 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
      <div 
        className="bg-[#FFFFFF] border-none rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-[#F0F4F9] flex items-center justify-between bg-[#F8FAFD]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#E8F0FE] flex items-center justify-center text-[#0B57D0]">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1F1F1F] font-heading">Co-Pilot Analytics & Response SLA</h3>
              <p className="text-xs text-[#747775] font-medium">Real-time performance metrics for SMB operations</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAnalyticsOpen(false)}
            className="p-2.5 text-[#747775] hover:text-[#1F1F1F] rounded-full hover:bg-[#E1E9F5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-[#F0F4F9] border-none rounded-2xl p-4 space-y-1 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#747775] font-semibold font-heading">
                <span>Total Cards</span>
                <Users className="w-4 h-4 text-[#0B57D0]" />
              </div>
              <p className="text-2xl font-extrabold text-[#1F1F1F] font-mono">{totalCards}</p>
              <span className="text-[11px] text-[#137333] font-bold">+12% today</span>
            </div>

            <div className="bg-[#F0F4F9] border-none rounded-2xl p-4 space-y-1 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#747775] font-semibold font-heading">
                <span>Lead Conversion</span>
                <TrendingUp className="w-4 h-4 text-[#137333]" />
              </div>
              <p className="text-2xl font-extrabold text-[#137333] font-mono">{conversionRate}%</p>
              <span className="text-[11px] text-[#747775] font-medium">Lead → Booking</span>
            </div>

            <div className="bg-[#F0F4F9] border-none rounded-2xl p-4 space-y-1 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#747775] font-semibold font-heading">
                <span>Avg SLA Response</span>
                <Zap className="w-4 h-4 text-[#B06000]" />
              </div>
              <p className="text-2xl font-extrabold text-[#B06000] font-mono">1.2s</p>
              <span className="text-[11px] text-[#137333] font-bold">Instant Auto-reply</span>
            </div>

            <div className="bg-[#F0F4F9] border-none rounded-2xl p-4 space-y-1 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#747775] font-semibold font-heading">
                <span>Jobs Completed</span>
                <CheckCircle2 className="w-4 h-4 text-[#6B21A8]" />
              </div>
              <p className="text-2xl font-extrabold text-[#6B21A8] font-mono">{completedJobs}</p>
              <span className="text-[11px] text-[#747775] font-medium">Resolved tickets</span>
            </div>
          </div>

          {/* SLA Performance Bar */}
          <div className="bg-[#F0F4F9] border-none rounded-3xl p-5 space-y-3.5">
            <h4 className="font-bold text-xs uppercase text-[#747775] tracking-wider font-heading">Customer Response SLA Health</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#1F1F1F]">AI Initial Response Speed (&lt; 5 seconds)</span>
                <span className="text-[#137333] font-mono font-bold">100% Target Met</span>
              </div>
              <div className="w-full bg-[#E1E9F5] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#0B57D0] h-full w-[100%] rounded-full"></div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#1F1F1F]">Owner First-Touch Action SLA (&lt; 15 mins)</span>
                <span className="text-[#0B57D0] font-mono font-bold">88% Target Met</span>
              </div>
              <div className="w-full bg-[#E1E9F5] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#0B57D0] h-full w-[88%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Proactive AI Recommendations */}
          <div className="bg-[#E8F0FE] border-none rounded-3xl p-5 space-y-3.5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#041E49] font-heading">
              <Sparkles className="w-4 h-4 text-[#0B57D0]" />
              <span>Proactive AI Co-Pilot Recommendations</span>
            </div>
            
            <ul className="space-y-3 text-xs text-[#1F1F1F] font-medium">
              <li className="flex items-start gap-3 bg-[#FFFFFF] p-3.5 rounded-2xl shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B06000] shrink-0 mt-1"></span>
                <span><strong>Hot Lead Alert:</strong> You have {totalLeads} lead(s) with high intent scores waiting for final slot confirmation. Call them now to boost conversion by 35%.</span>
              </li>
              <li className="flex items-start gap-3 bg-[#FFFFFF] p-3.5 rounded-2xl shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C5221F] shrink-0 mt-1"></span>
                <span><strong>Support Prevention:</strong> AC Repair is your top requested service (65% of volume). Consider offering a quarterly preventative maintenance package.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#F0F4F9] bg-[#F8FAFD] flex justify-end">
          <Button size="sm" variant="ghost" onClick={() => setIsAnalyticsOpen(false)}>
            Close Panel
          </Button>
        </div>

      </div>
    </div>
  );
}
