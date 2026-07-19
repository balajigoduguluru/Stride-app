import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../shared/ui/Button';
import { 
  X, 
  Sparkles, 
  MapPin, 
  Clock, 
  Phone, 
  User, 
  CheckCircle2, 
  Calendar, 
  Trash2, 
  BarChart3, 
  BookOpen, 
  Plus, 
  Save, 
  Check,
  Download
} from 'lucide-react';

export function RightDrawerPanel() {
  const { 
    activeRightPanel, 
    closeRightDrawer, 
    selectedCard, 
    cards,
    updateCardStatus, 
    deleteCard,
    knowledgeBase,
    setKnowledgeBase,
    handleExportCSV
  } = useApp();

  const [customActionText, setCustomActionText] = useState('');

  // Knowledge Base Form State
  const [businessName, setBusinessName] = useState(knowledgeBase.businessInfo.name);
  const [workingHours, setWorkingHours] = useState(knowledgeBase.businessInfo.workingHours);
  const [faqs, setFaqs] = useState(knowledgeBase.faqs);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!activeRightPanel) return null;

  const handleCustomOverride = () => {
    if (!customActionText.trim() || !selectedCard) return;
    updateCardStatus(selectedCard.id, selectedCard.status, `Owner Note: ${customActionText}`);
    setCustomActionText('');
  };

  const handleAddFaq = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    setFaqs([...faqs, { question: newQuestion, answer: newAnswer }]);
    setNewQuestion('');
    setNewAnswer('');
  };

  const handleDeleteFaq = (idx) => {
    setFaqs(faqs.filter((_, i) => i !== idx));
  };

  const handleSaveKb = () => {
    setKnowledgeBase({
      ...knowledgeBase,
      businessInfo: {
        ...knowledgeBase.businessInfo,
        name: businessName,
        workingHours: workingHours
      },
      faqs: faqs
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const totalCards = cards.length;
  const totalLeads = cards.filter(c => c.lane === 'leads').length;
  const totalBookings = cards.filter(c => c.lane === 'bookings').length;
  const completedJobs = cards.filter(c => c.status === 'Completed').length;

  return (
    <aside className="w-[380px] h-screen sticky top-0 z-30 bg-[#FFFFFF] border-l border-[#F0F4F9] flex flex-col shadow-lg shrink-0 m3-slide-in">
      
      {/* Drawer Header with 25% Expanded Padding */}
      <div className="p-6 px-7 border-b border-[#F0F4F9] flex items-center justify-between bg-[#F8FAFD]">
        <div className="flex items-center gap-3">
          {activeRightPanel === 'card' && selectedCard && (
            <>
              <div className="w-9 h-9 rounded-full bg-[#E8F0FE] flex items-center justify-center text-[#0B57D0]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1A1C1E] font-heading">{selectedCard.customerName}</h3>
                <p className="text-xs text-[#43474E] font-medium">{selectedCard.serviceType}</p>
              </div>
            </>
          )}

          {activeRightPanel === 'analytics' && (
            <>
              <div className="w-9 h-9 rounded-full bg-[#E8F0FE] flex items-center justify-center text-[#0B57D0]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1A1C1E] font-heading">Analytics Summary</h3>
                <p className="text-xs text-[#43474E] font-medium">Operational Performance</p>
              </div>
            </>
          )}

          {activeRightPanel === 'kb' && (
            <>
              <div className="w-9 h-9 rounded-full bg-[#E8F0FE] flex items-center justify-center text-[#0B57D0]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1A1C1E] font-heading">Knowledge Base</h3>
                <p className="text-xs text-[#43474E] font-medium">Auto-Reply Configuration</p>
              </div>
            </>
          )}
        </div>

        <button 
          onClick={closeRightDrawer}
          className="p-2 text-[#43474E] hover:text-[#1A1C1E] rounded-full hover:bg-[#E1E9F5] transition-colors"
          title="Close Sheet"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body Content with 25% Expanded Padding */}
      <div className="p-7 overflow-y-auto space-y-7 flex-1 custom-scrollbar">
        
        {/* VIEW 1: CARD DETAILS INSPECTOR */}
        {activeRightPanel === 'card' && selectedCard && (
          <>
            <div className="bg-[#F0F4F9] border-none rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-[#1A1C1E] font-heading">{selectedCard.customerName}</h4>
                <span className="text-xs font-mono font-bold text-[#0B57D0]">{selectedCard.id}</span>
              </div>
              <p className="text-xs text-[#43474E] font-medium">{selectedCard.phone} • {selectedCard.location}</p>
              <p className="text-xs text-[#0F9D58] font-semibold">{selectedCard.preferredTime}</p>
            </div>

            {/* AI Next Best Action Box */}
            <div className="bg-[#E8F0FE] rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#041E49] text-xs font-heading">
                <Sparkles className="w-4 h-4 text-[#0B57D0]" />
                <span>AI Recommended Action</span>
              </div>
              <p className="text-xs text-[#1A1C1E] leading-relaxed font-medium">{selectedCard.recommendedAction}</p>

              <div className="pt-2 flex flex-col gap-2.5">
                <Button 
                  size="sm" 
                  variant="accent" 
                  icon={Calendar} 
                  onClick={() => updateCardStatus(selectedCard.id, 'Confirmed', 'Confirmed slot')}
                >
                  Confirm Slot
                </Button>
                <Button 
                  size="sm" 
                  variant="primary" 
                  icon={CheckCircle2} 
                  onClick={() => updateCardStatus(selectedCard.id, 'Completed', 'Job marked completed')}
                >
                  Complete Visit
                </Button>
              </div>
            </div>

            {/* Action Note Form */}
            <div className="space-y-2 pt-3 border-t border-[#F0F4F9]">
              <label className="block text-xs font-bold text-[#43474E] font-heading">
                Action Note
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={customActionText}
                  onChange={(e) => setCustomActionText(e.target.value)}
                  placeholder="Type note..."
                  className="bg-[#F0F4F9] border-none rounded-2xl px-4 py-2.5 text-xs text-[#1A1C1E] w-full focus:outline-none font-medium"
                />
                <div className="flex justify-end">
                  <Button size="sm" variant="secondary" onClick={handleCustomOverride}>
                    Save Note
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end border-t border-[#F0F4F9]">
              <Button size="sm" variant="danger" icon={Trash2} onClick={() => deleteCard(selectedCard.id)}>
                Delete Card
              </Button>
            </div>
          </>
        )}

        {/* VIEW 2: CLEAN PLAIN TEXT ANALYTICS SUMMARY + EXPORT CSV BUTTON */}
        {activeRightPanel === 'analytics' && (
          <>
            <div className="bg-[#F0F4F9] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase text-[#43474E] tracking-wider font-heading">Pipeline Overview</h4>
                <Button size="sm" variant="accent" icon={Download} onClick={handleExportCSV}>
                  Export CSV
                </Button>
              </div>
              
              <div className="space-y-3 text-xs text-[#1A1C1E]">
                <div className="flex justify-between py-1 border-b border-[#E1E9F5]/50">
                  <span className="text-[#43474E]">Active Pipeline Tasks:</span>
                  <strong className="font-mono">{totalCards}</strong>
                </div>

                <div className="flex justify-between py-1 border-b border-[#E1E9F5]/50">
                  <span className="text-[#43474E]">New Leads Captured:</span>
                  <strong className="font-mono text-[#0B57D0]">{totalLeads}</strong>
                </div>

                <div className="flex justify-between py-1 border-b border-[#E1E9F5]/50">
                  <span className="text-[#43474E]">Confirmed Appointments:</span>
                  <strong className="font-mono text-[#0F9D58]">{totalBookings}</strong>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-[#43474E]">Jobs Completed:</span>
                  <strong className="font-mono text-[#6B21A8]">{completedJobs}</strong>
                </div>
              </div>
            </div>

            {/* SLA CLEAN PLAIN TEXT SUMMARY */}
            <div className="bg-[#F0F4F9] rounded-2xl p-6 space-y-3">
              <h4 className="font-bold text-xs uppercase text-[#43474E] tracking-wider font-heading">SLA Compliance Summary</h4>
              <p className="text-xs text-[#1A1C1E] leading-relaxed font-medium">
                • <strong>Initial AI Response:</strong> 100% compliant (&lt; 2 seconds)<br />
                • <strong>Technician Dispatch:</strong> 94% compliant (&lt; 15 minutes)<br />
                • <strong>Customer Resolution:</strong> 98% compliant (&lt; 24 hours)
              </p>
            </div>
          </>
        )}

        {/* VIEW 3: KNOWLEDGE BASE PLAIN TEXT CONFIGURATION */}
        {activeRightPanel === 'kb' && (
          <>
            <div className="bg-[#F0F4F9] rounded-2xl p-6 space-y-4">
              <h4 className="font-bold text-xs uppercase text-[#43474E] tracking-wider font-heading">Business Profile</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#1A1C1E] mb-1">Business Name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    className="bg-[#FFFFFF] border-none rounded-2xl px-4 py-2 text-xs text-[#1A1C1E] w-full focus:outline-none font-medium shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1A1C1E] mb-1">Operating Hours</label>
                  <input
                    type="text"
                    value={workingHours}
                    onChange={e => setWorkingHours(e.target.value)}
                    className="bg-[#FFFFFF] border-none rounded-2xl px-4 py-2 text-xs text-[#1A1C1E] w-full focus:outline-none font-medium shadow-2xs"
                  />
                </div>
              </div>
            </div>

            {/* Add FAQ Rule Form */}
            <div className="bg-[#E8F0FE] rounded-2xl p-6 space-y-3">
              <span className="text-xs font-bold text-[#041E49] font-heading block">Add Auto-Reply Rule</span>

              <div className="space-y-2.5">
                <input
                  type="text"
                  value={newQuestion}
                  onChange={e => setNewQuestion(e.target.value)}
                  placeholder="Question..."
                  className="bg-[#FFFFFF] border-none rounded-2xl px-4 py-2 text-xs text-[#1A1C1E] w-full focus:outline-none font-medium shadow-2xs"
                />
                <textarea
                  value={newAnswer}
                  onChange={e => setNewAnswer(e.target.value)}
                  placeholder="Answer..."
                  rows={2}
                  className="bg-[#FFFFFF] border-none rounded-2xl px-4 py-2 text-xs text-[#1A1C1E] w-full focus:outline-none font-medium shadow-2xs resize-none"
                />
              </div>

              <div className="flex justify-end pt-1">
                <Button size="sm" variant="accent" icon={Plus} onClick={handleAddFaq}>
                  Add Rule
                </Button>
              </div>
            </div>

            {/* Active FAQs List */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase text-[#43474E] tracking-wider font-heading">Auto-Reply Rules ({faqs.length})</h4>
              <div className="space-y-2">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-[#FFFFFF] p-4 rounded-2xl flex items-start justify-between gap-3 shadow-2xs">
                    <div className="space-y-1 text-xs">
                      <p className="font-bold text-[#0B57D0]">Q: {faq.question}</p>
                      <p className="text-[#1A1C1E]">A: {faq.answer}</p>
                    </div>
                    <button onClick={() => handleDeleteFaq(idx)} className="p-1 text-[#43474E] hover:text-[#EA4335]">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              {savedSuccess && <span className="text-xs font-bold text-[#0F9D58] flex items-center gap-1"><Check className="w-4 h-4" /> Saved!</span>}
              <Button size="sm" variant="primary" icon={Save} onClick={handleSaveKb}>
                Save Profile
              </Button>
            </div>
          </>
        )}

      </div>

    </aside>
  );
}
