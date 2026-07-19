import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../shared/ui/Button';
import { VoiceNoteSimulator } from './VoiceNoteSimulator';
import { Badge } from '../shared/ui/Badge';
import { 
  Send, 
  Bot, 
  User, 
  Mic, 
  Sparkles, 
  CheckCheck, 
  Check, 
  Edit2, 
  Phone, 
  MapPin, 
  Clock, 
  Zap, 
  Search,
  CheckCircle2
} from 'lucide-react';

export function CustomerChatWidget() {
  const { messages, sendMessage, triggerScenario, presetScenarios, lastAiAction, cards } = useApp();
  const [inputText, setInputText] = useState('');
  const [activeChannelId, setActiveChannelId] = useState('ch-1');
  const [showVoiceSimulator, setShowVoiceSimulator] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const handleSendVoiceTranscript = (transcript) => {
    sendMessage(transcript);
    setShowVoiceSimulator(false);
  };

  const approveAiDraft = (msgId) => {
    console.log("Approved AI draft message:", msgId);
  };

  const customerChannels = [
    {
      id: 'ch-1',
      name: 'Apex Home Care',
      phone: '+91 98765 43210',
      lastMsg: messages[messages.length - 1]?.text || 'I need AC repair service...',
      time: 'Just now',
      unread: 0,
      active: true
    },
    {
      id: 'ch-2',
      name: 'Dr. Sharma Clinic',
      phone: '+91 91234 56789',
      lastMsg: 'Can I reschedule my appointment to 5 PM?',
      time: '12m ago',
      unread: 1,
      active: false
    },
    {
      id: 'ch-3',
      name: 'Elite Auto Repair',
      phone: '+91 99887 76655',
      lastMsg: 'Is brake pad replacement covered under warranty?',
      time: '45m ago',
      unread: 0,
      active: false
    }
  ];

  return (
    <div className="h-full bg-[#F8F9FA] rounded-[24px] overflow-hidden shadow-xs flex flex-col border-none">
      
      {/* Messenger Header */}
      <div className="bg-[#FFFFFF] p-4 px-6 flex items-center justify-between border-b border-[#F0F4F9]">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#0B57D0] flex items-center justify-center text-white shadow-xs">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 status-dot-urgent"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-[#1A1C1E] text-base font-heading">Stride Live Customer Stream</h2>
              <Badge variant="info">WhatsApp Stream</Badge>
            </div>
            <p className="text-xs text-[#43474E] font-medium">Continuous 2-Panel Architecture • Gemini AI Aura Engine</p>
          </div>
        </div>

        <button 
          onClick={() => setShowVoiceSimulator(!showVoiceSimulator)}
          className={`px-4 py-2 rounded-full border-none transition-all text-xs flex items-center gap-2 font-bold ${
            showVoiceSimulator ? 'bg-[#0B57D0] text-white shadow-xs' : 'bg-[#F0F4F9] text-[#041E49] hover:bg-[#E1E9F5]'
          }`}
          title="Toggle Voice Simulator"
        >
          <Mic className="w-4 h-4" />
          <span className="hidden sm:inline">Voice Note AI</span>
        </button>
      </div>

      {/* CONTINUOUS 2-PANEL WORKSPACE VIEWPORT */}
      <div className="flex-1 flex overflow-hidden bg-[#F8F9FA]">
        
        {/* PANEL 1: LEFT NAVIGATION INDEX (FIXED 300px FOOTPRINT) */}
        <div className="w-[300px] shrink-0 border-r border-[#F0F4F9] bg-[#FFFFFF] flex flex-col h-full overflow-hidden">
          
          {/* Channel Search Header */}
          <div className="p-4 border-b border-[#F0F4F9]">
            <div className="relative">
              <Search className="w-4 h-4 text-[#43474E] absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full bg-[#F0F4F9] border-none rounded-full pl-9 pr-4 py-2 text-xs text-[#1A1C1E] focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Active Customer Channel Index Feed */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {customerChannels.map(channel => (
              <div
                key={channel.id}
                onClick={() => setActiveChannelId(channel.id)}
                className={`p-3 rounded-2xl cursor-pointer transition-all flex items-start gap-3 ${
                  activeChannelId === channel.id ? 'bg-[#E8F0FE] text-[#041E49] font-bold shadow-xs' : 'hover:bg-[#F0F4F9] text-[#1A1C1E]'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-[#0B57D0] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {channel.name.substring(0, 2).toUpperCase()}
                </div>

                <div className="flex-1 overflow-hidden space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold font-heading truncate">{channel.name}</h4>
                    <span className="text-[10px] text-[#43474E] font-mono">{channel.time}</span>
                  </div>
                  <p className="text-[11px] text-[#43474E] truncate font-medium">{channel.lastMsg}</p>
                </div>

                {channel.unread > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#0B57D0] shrink-0 mt-1"></span>
                )}
              </div>
            ))}
          </div>

          {/* Demo Scenario Footer Pills (Adjusted Bottom Padding Layout pb-5) */}
          <div className="p-4 pb-5 border-t border-[#F0F4F9] bg-[#F8F9FA] space-y-2.5">
            <span className="text-[10px] font-bold text-[#43474E] uppercase tracking-wider font-heading block">Demo Scenarios:</span>
            <div className="flex flex-wrap gap-2">
              {presetScenarios.map(sc => (
                <button
                  key={sc.id}
                  onClick={() => triggerScenario(sc)}
                  className="bg-[#FFFFFF] hover:bg-[#E8F0FE] text-[#1A1C1E] hover:text-[#0B57D0] px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-all shadow-xs border-none"
                >
                  {sc.badge}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* PANEL 2: RIGHT MESSAGING STREAMS VIEWPORT */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8F9FA]">
          
          {/* Voice Simulator Accordion */}
          {showVoiceSimulator && (
            <div className="p-4 bg-[#FFFFFF] border-b border-[#F0F4F9] animate-fade-in">
              <VoiceNoteSimulator onSendVoiceTranscript={handleSendVoiceTranscript} />
            </div>
          )}

          {/* Active Chat Message Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar bg-[#F8F9FA]">
            {messages.map((msg) => {
              const isUser = msg.sender === 'customer';
              return (
                <div 
                  key={msg.id}
                  className={`flex items-end gap-3 ${isUser ? 'justify-start' : 'justify-end'}`}
                >
                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-[#E1E9F5] flex items-center justify-center text-[#041E49] shrink-0 mb-1">
                      <User className="w-4.5 h-4.5" />
                    </div>
                  )}

                  {/* ASYMMETRIC CHAT BUBBLE GRID */}
                  <div className={`max-w-[82%] p-4 space-y-2 shadow-xs transition-all ${
                    isUser 
                      ? 'bg-[#FFFFFF] border border-[#F0F4F9] text-[#1A1C1E] rounded-[20px] rounded-tl-[4px]' 
                      : 'bg-ai-aura text-[#1A1C1E] rounded-[20px] rounded-tr-[4px] border-none'
                  }`}>
                    {msg.intentTag && (
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase px-3 py-0.5 rounded-full bg-[#FFFFFF]/90 text-[#041E49] shadow-xs">
                        <Sparkles className="w-3 h-3 text-[#0B57D0]" />
                        <span>GEMINI AI DRAFT • INTENT: {msg.intentTag.toUpperCase()}</span>
                      </div>
                    )}
                    
                    <div className="text-xs leading-relaxed font-medium whitespace-pre-wrap">{msg.text}</div>
                    
                    {/* AI DRAFTING AURA INLINE BUTTONS */}
                    {!isUser && (
                      <div className="pt-2 flex items-center gap-2 border-t border-[#FFFFFF]/80">
                        <button
                          onClick={() => approveAiDraft(msg.id)}
                          className="bg-[#0B57D0] hover:bg-[#0842A0] text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 shadow-xs transition-all border-none"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Send</span>
                        </button>

                        <button
                          onClick={() => sendMessage("Let me check our technician schedule and confirm your slot immediately.")}
                          className="bg-[#FFFFFF] hover:bg-[#E8F0FE] text-[#041E49] px-3.5 py-1.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 transition-all border-none"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#0B57D0]" />
                          <span>Edit Response</span>
                        </button>
                      </div>
                    )}

                    <div className={`flex items-center justify-end gap-1.5 text-[10px] font-mono ${isUser ? 'text-[#43474E]' : 'text-[#0B57D0]'}`}>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {isUser ? <CheckCheck className="w-3.5 h-3.5 text-[#43474E]" /> : <CheckCircle2 className="w-3.5 h-3.5 text-[#0B57D0]" />}
                    </div>
                  </div>

                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-[#0B57D0] flex items-center justify-center text-white shrink-0 mb-1 shadow-xs">
                      <Bot className="w-4.5 h-4.5" />
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Active Chat Input Messaging Form (Adjusted Padding pb-5) */}
          <form onSubmit={handleSubmit} className="p-4 pb-5 bg-[#FFFFFF] border-t border-[#F0F4F9] flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type customer message or query..."
              className="flex-1 bg-[#F0F4F9] border-none focus:bg-[#E8F0FE] rounded-full px-5 py-3 text-xs text-[#1A1C1E] placeholder-[#43474E] focus:outline-none transition-all font-medium"
            />
            <Button 
              type="submit" 
              variant="primary" 
              icon={Send}
              disabled={!inputText.trim()}
            >
              Send Stream
            </Button>
          </form>

        </div>

      </div>

    </div>
  );
}
