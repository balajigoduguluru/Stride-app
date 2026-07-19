import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../shared/ui/Button';
import { Badge } from '../shared/ui/Badge';
import { X, Sparkles, MapPin, Clock, Phone, User, CheckCircle2, AlertTriangle, Calendar, Trash2 } from 'lucide-react';

export function CardDetailModal() {
  const { selectedCard, setSelectedCardId, updateCardLane, updateCardStatus, deleteCard } = useApp();
  const [customActionText, setCustomActionText] = useState('');

  if (!selectedCard) return null;

  const handleCustomOverride = () => {
    if (!customActionText.trim()) return;
    updateCardStatus(selectedCard.id, selectedCard.status, `Owner Note: ${customActionText}`);
    setCustomActionText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1F1F1F]/40 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
      <div 
        className="bg-[#FFFFFF] border-none rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-[#F0F4F9] flex items-center justify-between bg-[#F8FAFD]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-[#0B57D0]">{selectedCard.id}</span>
            <Badge variant={selectedCard.lane === 'support' ? 'danger' : 'info'}>
              LANE: {selectedCard.lane.toUpperCase()}
            </Badge>
            <Badge variant="purple">STATUS: {selectedCard.status}</Badge>
          </div>
          <button 
            onClick={() => setSelectedCardId(null)}
            className="p-2.5 text-[#747775] hover:text-[#1F1F1F] rounded-full hover:bg-[#E1E9F5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          {/* Customer & Service Info Box */}
          <div className="bg-[#F0F4F9] border-none rounded-3xl p-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#0B57D0]" />
                <h3 className="font-bold text-lg text-[#1F1F1F] font-heading">{selectedCard.customerName}</h3>
              </div>
              <p className="text-sm font-semibold text-[#006A4E] mt-1">{selectedCard.serviceType}</p>
            </div>
            
            <div className="text-right space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#747775] font-mono font-medium">
                <Phone className="w-3.5 h-3.5 text-[#747775]" />
                <span>{selectedCard.phone}</span>
              </div>
              <Badge variant={selectedCard.priority === 'Urgent' ? 'danger' : 'warning'}>
                Priority: {selectedCard.priority}
              </Badge>
            </div>
          </div>

          {/* Extracted Entity Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FFFFFF] border-none shadow-xs rounded-2xl p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#747775] mb-1 font-heading">
                <Clock className="w-4 h-4 text-[#0B57D0]" />
                <span>Preferred Time Slot</span>
              </div>
              <p className="text-sm font-semibold text-[#1F1F1F]">{selectedCard.preferredTime}</p>
            </div>

            <div className="bg-[#FFFFFF] border-none shadow-xs rounded-2xl p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#747775] mb-1 font-heading">
                <MapPin className="w-4 h-4 text-[#0B57D0]" />
                <span>Service Address</span>
              </div>
              <p className="text-sm font-semibold text-[#1F1F1F]">{selectedCard.location}</p>
            </div>
          </div>

          {/* AI Next Best Action Box */}
          <div className="bg-[#E8F0FE] border-none rounded-3xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-[#041E49] font-heading">
                <Sparkles className="w-4 h-4 text-[#0B57D0]" />
                <span>AI Next Best Action Recommendation</span>
              </div>
              <span className="text-xs font-mono text-[#0B57D0] font-bold">{(selectedCard.intentScore * 100).toFixed(0)}% Match</span>
            </div>
            <p className="text-xs text-[#1F1F1F] leading-relaxed font-medium">{selectedCard.recommendedAction}</p>
          </div>

          {/* 1-Tap Workflow Action Triggers */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase text-[#747775] tracking-wider font-heading">1-Tap Workflow Actions</h4>
            <div className="flex flex-wrap gap-2.5">
              <Button 
                size="sm" 
                variant="accent" 
                icon={Calendar} 
                onClick={() => updateCardStatus(selectedCard.id, 'Confirmed', 'Owner confirmed slot with customer')}
              >
                Confirm Slot (Move to Bookings)
              </Button>

              <Button 
                size="sm" 
                variant="primary" 
                icon={CheckCircle2} 
                onClick={() => updateCardStatus(selectedCard.id, 'Completed', 'Job completed & payment captured')}
              >
                Mark Job Completed
              </Button>

              <Button 
                size="sm" 
                variant="danger" 
                icon={AlertTriangle} 
                onClick={() => updateCardStatus(selectedCard.id, 'Escalated', 'Flagged for priority manager visit')}
              >
                Escalate Ticket
              </Button>
            </div>

            {/* Manual Lane Move Controls */}
            <div className="flex items-center gap-2 pt-2 text-xs text-[#747775]">
              <span className="font-bold">Move Card Lane:</span>
              {['leads', 'bookings', 'support', 'followups'].map(lane => (
                <button
                  key={lane}
                  onClick={() => updateCardLane(selectedCard.id, lane)}
                  className={`px-4 py-1.5 rounded-full border-none capitalize transition-all font-bold text-xs ${selectedCard.lane === lane ? 'bg-[#0B57D0] text-white shadow-sm' : 'bg-[#E1E9F5] text-[#041E49] hover:bg-[#D3E3FD]'}`}
                >
                  {lane}
                </button>
              ))}
            </div>
          </div>

          {/* Owner Override Note Input */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase text-[#747775] tracking-wider font-heading">Owner Action Override Note</h4>
            <div className="flex gap-2.5">
              <input
                type="text"
                value={customActionText}
                onChange={(e) => setCustomActionText(e.target.value)}
                placeholder="Add manual note or instruction..."
                className="flex-1 bg-[#F0F4F9] border-none rounded-full px-5 py-3 text-xs text-[#1F1F1F] focus:outline-none font-medium"
              />
              <Button size="sm" variant="secondary" onClick={handleCustomOverride}>
                Save Note
              </Button>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-xs uppercase text-[#747775] tracking-wider font-heading">Card Event Audit Timeline</h4>
            <div className="space-y-3 border-l-2 border-[#D3E3FD] pl-4">
              {selectedCard.timeline.map((item, idx) => (
                <div key={idx} className="relative text-xs space-y-1">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#0B57D0] border-2 border-white"></div>
                  <div className="flex items-center justify-between text-[#747775]">
                    <span className="font-bold text-[#1F1F1F]">{item.author}</span>
                    <span className="font-mono text-[11px] font-bold">{new Date(item.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-[#444746] font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#F0F4F9] bg-[#F8FAFD] flex items-center justify-between">
          <Button 
            size="sm" 
            variant="danger" 
            icon={Trash2} 
            onClick={() => deleteCard(selectedCard.id)}
          >
            Delete Card
          </Button>

          <Button size="sm" variant="ghost" onClick={() => setSelectedCardId(null)}>
            Close Inspector
          </Button>
        </div>

      </div>
    </div>
  );
}
