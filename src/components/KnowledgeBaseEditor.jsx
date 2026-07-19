import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../shared/ui/Button';
import { X, BookOpen, Plus, Trash2, Save, Sparkles, Check } from 'lucide-react';

export function KnowledgeBaseEditor() {
  const { isKbEditorOpen, setIsKbEditorOpen, knowledgeBase, setKnowledgeBase } = useApp();

  const [businessName, setBusinessName] = useState(knowledgeBase.businessInfo.name);
  const [workingHours, setWorkingHours] = useState(knowledgeBase.businessInfo.workingHours);
  const [faqs, setFaqs] = useState(knowledgeBase.faqs);

  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newKeywords, setNewKeywords] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isKbEditorOpen) return null;

  const handleAddFaq = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const kwArray = newKeywords
      ? newKeywords.split(',').map(k => k.trim().toLowerCase())
      : newQuestion.toLowerCase().split(' ');

    const newFaqObj = {
      question: newQuestion,
      answer: newAnswer,
      keywords: kwArray
    };

    setFaqs([...faqs, newFaqObj]);
    setNewQuestion('');
    setNewAnswer('');
    setNewKeywords('');
  };

  const handleDeleteFaq = (idx) => {
    setFaqs(faqs.filter((_, i) => i !== idx));
  };

  const handleSaveAll = () => {
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
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1F1F1F] font-heading">Knowledge Base & FAQ Rules</h3>
              <p className="text-xs text-[#747775] font-medium">Configure business logic, pricing, and AI auto-answers</p>
            </div>
          </div>
          <button 
            onClick={() => setIsKbEditorOpen(false)}
            className="p-2.5 text-[#747775] hover:text-[#1F1F1F] rounded-full hover:bg-[#E1E9F5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          {/* Business Profile */}
          <div className="space-y-4 bg-[#F0F4F9] border-none rounded-3xl p-5">
            <h4 className="font-bold text-xs uppercase text-[#747775] tracking-wider font-heading">Business Profile & Operating Hours</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-[#1F1F1F] mb-1.5">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                  className="w-full bg-[#FFFFFF] border-none rounded-full px-4 py-3 text-xs text-[#1F1F1F] focus:outline-none font-medium shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F1F1F] mb-1.5">Working Hours</label>
                <input
                  type="text"
                  value={workingHours}
                  onChange={e => setWorkingHours(e.target.value)}
                  className="w-full bg-[#FFFFFF] border-none rounded-full px-4 py-3 text-xs text-[#1F1F1F] focus:outline-none font-medium shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Add New FAQ Rule Form */}
          <div className="space-y-3.5 bg-[#E8F0FE] border-none rounded-3xl p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#041E49] font-heading">
              <Sparkles className="w-4 h-4 text-[#0B57D0]" />
              <span>Add Custom FAQ Auto-Answer Rule</span>
            </div>

            <div className="space-y-2.5">
              <input
                type="text"
                value={newQuestion}
                onChange={e => setNewQuestion(e.target.value)}
                placeholder="Question (e.g. 'What is your refund policy?')"
                className="w-full bg-[#FFFFFF] border-none rounded-full px-5 py-3 text-xs text-[#1F1F1F] focus:outline-none font-medium shadow-xs"
              />
              <textarea
                value={newAnswer}
                onChange={e => setNewAnswer(e.target.value)}
                placeholder="AI Auto-Reply Answer..."
                rows={2}
                className="w-full bg-[#FFFFFF] border-none rounded-3xl px-5 py-3 text-xs text-[#1F1F1F] focus:outline-none font-medium resize-none shadow-xs"
              />
              <input
                type="text"
                value={newKeywords}
                onChange={e => setNewKeywords(e.target.value)}
                placeholder="Trigger Keywords (comma separated, e.g. 'refund, money back, cancel')"
                className="w-full bg-[#FFFFFF] border-none rounded-full px-5 py-3 text-xs text-[#1F1F1F] focus:outline-none font-medium shadow-xs"
              />
            </div>

            <div className="flex justify-end">
              <Button size="sm" variant="accent" icon={Plus} onClick={handleAddFaq}>
                Add Rule
              </Button>
            </div>
          </div>

          {/* Active FAQs List */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase text-[#747775] tracking-wider font-heading">Active Knowledge Base Rules ({faqs.length})</h4>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-[#FFFFFF] border-none rounded-2xl p-4 flex items-start justify-between gap-3 shadow-xs">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#0B57D0]">Q: {faq.question}</p>
                    <p className="text-xs text-[#1F1F1F] font-medium">A: {faq.answer}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {faq.keywords.map((kw, i) => (
                        <span key={i} className="text-[10px] font-mono bg-[#F0F4F9] text-[#041E49] px-3 py-0.5 rounded-full font-bold">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteFaq(idx)}
                    className="p-2 text-[#747775] hover:text-[#C5221F] rounded-full hover:bg-[#FCE8E6] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#F0F4F9] bg-[#F8FAFD] flex items-center justify-between">
          {savedSuccess ? (
            <span className="text-xs font-bold text-[#137333] flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Saved to local business knowledge base!
            </span>
          ) : (
            <span className="text-xs text-[#747775] font-medium">Changes take effect instantly in Customer Chat.</span>
          )}

          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => setIsKbEditorOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" icon={Save} onClick={handleSaveAll}>
              Save Knowledge Base
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
