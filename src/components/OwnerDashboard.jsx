import React from 'react';
import { useApp } from '../context/AppContext';
import { LaneColumn } from '../shared/ui/LaneColumn';
import { CardItem } from '../shared/ui/CardItem';
import { Button } from '../shared/ui/Button';
import { Inbox, Calendar, AlertCircle, Clock } from 'lucide-react';

export function OwnerDashboard() {
  const { cards, setSelectedCardId, updateCardStatus } = useApp();

  const leadsCards = cards.filter(c => c.lane === 'leads');
  const bookingsCards = cards.filter(c => c.lane === 'bookings');
  const supportCards = cards.filter(c => c.lane === 'support');
  const followupsCards = cards.filter(c => c.lane === 'followups');

  // Aggregate Revenue Values per Lane
  const leadsTotalValue = leadsCards.reduce((acc, c) => acc + (c.estimatedValue || 1500), 0);
  const bookingsTotalValue = bookingsCards.reduce((acc, c) => acc + (c.estimatedValue || 1500), 0);
  const supportTotalValue = supportCards.reduce((acc, c) => acc + (c.estimatedValue || 1500), 0);
  const followupsTotalValue = followupsCards.reduce((acc, c) => acc + (c.estimatedValue || 1500), 0);
  
  const totalPipelineRevenue = cards.reduce((acc, c) => acc + (c.estimatedValue || 1500), 0);
  const urgentSupportCount = supportCards.filter(c => c.priority === 'Urgent' || c.priority === 'High').length;

  return (
    <div className="flex flex-col h-full space-y-8">
      
      {/* Top Overview Bar: Clean Plain Text Summary & 25% Expanded Padding */}
      <div className="bg-[#FFFFFF] border-none rounded-[28px] p-8 flex flex-wrap items-center justify-between gap-8 shadow-xs">
        <div>
          <h2 className="font-bold text-[#1A1C1E] text-xl font-heading tracking-tight">Stride Operations Board</h2>
          <p className="text-xs text-[#43474E] font-medium mt-1">
            Total Pipeline Revenue: <strong className="text-[#0F9D58] font-mono">₹{totalPipelineRevenue.toLocaleString('en-IN')}</strong> ({cards.length} active tasks across 4 lanes)
          </p>
        </div>

        {/* Clean Plain Text Metric Summaries */}
        <div className="flex items-center gap-6 flex-wrap text-xs text-[#43474E] font-medium">
          <div>
            <span className="block text-[11px] uppercase font-bold text-[#747775]">Hot Leads</span>
            <span className="font-bold text-[#1A1C1E] font-mono text-base">{leadsCards.length}</span>
          </div>

          <div>
            <span className="block text-[11px] uppercase font-bold text-[#747775]">Confirmed Slots</span>
            <span className="font-bold text-[#1A1C1E] font-mono text-base">{bookingsCards.length}</span>
          </div>

          <div>
            <span className="block text-[11px] uppercase font-bold text-[#747775]">Open Tickets</span>
            <span className="font-bold text-[#EA4335] font-mono text-base">{supportCards.length}</span>
          </div>
        </div>
      </div>

      {/* Minimal Urgent Dot Notification */}
      {urgentSupportCount > 0 && (
        <div className="bg-[#FFFFFF] border-none rounded-[24px] p-6 px-8 flex items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-3 text-xs text-[#1A1C1E] font-medium">
            <span className="status-dot-urgent shrink-0"></span>
            <span>
              <strong>Attention Required:</strong> You have {urgentSupportCount} urgent support ticket(s) awaiting priority supervisor dispatch.
            </span>
          </div>
          <Button 
            size="sm" 
            variant="danger"
            onClick={() => {
              const firstUrgent = supportCards.find(c => c.priority === 'Urgent');
              if (firstUrgent) setSelectedCardId(firstUrgent.id);
            }}
          >
            Review Ticket
          </Button>
        </div>
      )}

      {/* 4-Lane Operations Board Grid (25% Expanded Whitespace Gaps) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 flex-1">
        
        {/* Lane 1: Leads */}
        <LaneColumn 
          id="leads"
          title="Leads"
          icon={Inbox}
          colorTheme="indigo"
          count={leadsCards.length}
          totalValue={leadsTotalValue}
        >
          {leadsCards.length === 0 ? (
            <div className="text-center py-20 text-[#747775] text-xs font-medium">No active leads.</div>
          ) : (
            leadsCards.map(card => (
              <CardItem 
                key={card.id} 
                card={card} 
                onQuickAction={updateCardStatus} 
              />
            ))
          )}
        </LaneColumn>

        {/* Lane 2: Bookings */}
        <LaneColumn 
          id="bookings"
          title="Bookings"
          icon={Calendar}
          colorTheme="emerald"
          count={bookingsCards.length}
          totalValue={bookingsTotalValue}
        >
          {bookingsCards.length === 0 ? (
            <div className="text-center py-20 text-[#747775] text-xs font-medium">No confirmed bookings.</div>
          ) : (
            bookingsCards.map(card => (
              <CardItem 
                key={card.id} 
                card={card} 
                onQuickAction={updateCardStatus} 
              />
            ))
          )}
        </LaneColumn>

        {/* Lane 3: Support */}
        <LaneColumn 
          id="support"
          title="Support"
          icon={AlertCircle}
          colorTheme="rose"
          count={supportCards.length}
          urgentCount={urgentSupportCount}
          totalValue={supportTotalValue}
        >
          {supportCards.length === 0 ? (
            <div className="text-center py-20 text-[#747775] text-xs font-medium">No open tickets. All clear!</div>
          ) : (
            supportCards.map(card => (
              <CardItem 
                key={card.id} 
                card={card} 
                onQuickAction={updateCardStatus} 
              />
            ))
          )}
        </LaneColumn>

        {/* Lane 4: Follow-ups */}
        <LaneColumn 
          id="followups"
          title="Follow-ups"
          icon={Clock}
          colorTheme="amber"
          count={followupsCards.length}
          totalValue={followupsTotalValue}
        >
          {followupsCards.length === 0 ? (
            <div className="text-center py-20 text-[#747775] text-xs font-medium">No pending follow-ups.</div>
          ) : (
            followupsCards.map(card => (
              <CardItem 
                key={card.id} 
                card={card} 
                onQuickAction={updateCardStatus} 
              />
            ))
          )}
        </LaneColumn>

      </div>

    </div>
  );
}
