import React from 'react';
import { Button } from './Button';
import { useApp } from '../../context/AppContext';
import { Calendar, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';

export function CardItem({ card, onQuickAction }) {
  const { openCardDrawer, selectedCard, moveCard } = useApp();

  const isSelected = selectedCard?.id === card.id;
  const isUrgent = card.priority?.toLowerCase() === 'urgent' || card.status?.toLowerCase() === 'escalated';

  // Determine Action Button configuration
  const getInlineActionConfig = () => {
    if (card.lane === 'leads') {
      return {
        label: "Confirm Slot",
        icon: Calendar,
        variant: "accent",
        actionStatus: "Confirmed",
        targetLane: "bookings",
        actionNote: "Confirmed appointment visit"
      };
    }
    if (card.lane === 'bookings') {
      return {
        label: "Complete Visit",
        icon: CheckCircle2,
        variant: "primary",
        actionStatus: "Completed",
        targetLane: "followups",
        actionNote: "Service completed by technician"
      };
    }
    if (card.lane === 'support') {
      return {
        label: "Dispatch Supervisor",
        icon: AlertTriangle,
        variant: "danger",
        actionStatus: "Visit Scheduled",
        targetLane: "bookings",
        actionNote: "Dispatched lead supervisor"
      };
    }
    return {
      label: "Mark Resolved",
      icon: CheckCircle2,
      variant: "secondary",
      actionStatus: "Completed",
      targetLane: "followups",
      actionNote: "Follow-up resolved"
    };
  };

  const inlineAction = getInlineActionConfig();

  const handleExecuteAction = (e) => {
    e.stopPropagation();
    onQuickAction(card.id, inlineAction.actionStatus, inlineAction.actionNote);
    if (inlineAction.targetLane !== card.lane) {
      moveCard(card.id, inlineAction.targetLane);
    }
  };

  return (
    <div 
      tabIndex={0}
      className={`group relative border-none rounded-[20px] p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 outline-none ${
        isUrgent 
          ? 'bg-[#FCE8E6] text-[#1A1C1E] shadow-xs hover:shadow-sm' 
          : 'bg-[#FFFFFF] text-[#1A1C1E] shadow-xs hover:shadow-sm'
      } ${isSelected ? 'ring-2 ring-[#0B57D0] shadow-md' : ''}`}
      onClick={() => openCardDrawer(card.id)}
    >
      {/* ULTRA-MINIMAL CARD: CUSTOMER NAME & AI ACTION BUTTON ONLY */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-heading shrink-0 ${
            isUrgent ? 'bg-[#EA4335] text-white' : 'bg-[#F0F4F9] text-[#0B57D0]'
          }`}>
            {card.customerName ? card.customerName[0].toUpperCase() : 'C'}
          </div>

          <div>
            <h4 className="font-bold text-[#1A1C1E] text-base group-hover:text-[#0B57D0] transition-colors font-heading flex items-center gap-1">
              <span>{card.customerName}</span>
              <ArrowUpRight className="w-4 h-4 text-[#43474E] opacity-0 group-hover:opacity-100 transition-all" />
            </h4>
            <p className="text-xs text-[#43474E] font-medium mt-0.5">{card.serviceType}</p>
          </div>
        </div>

        {/* IMMEDIATELY ACTIONABLE M3 PILL BUTTON */}
        <div onClick={e => e.stopPropagation()}>
          <Button
            size="sm"
            variant={inlineAction.variant}
            icon={inlineAction.icon}
            onClick={handleExecuteAction}
          >
            {inlineAction.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
