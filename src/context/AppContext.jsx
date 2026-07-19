import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCards, initialMessages, presetScenarios } from '../services/initialData';
import { analyzeCustomerMessage } from '../services/ai/engine';
import { defaultKnowledgeBase } from '../services/knowledgeBase';
import { triggerWhatsAppWebhook, exportPipelineToCSV } from '../services/webhookEngine';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation & View Layout State
  const [activeView, setActiveView] = useState('board'); // 'board' | 'chat' | 'split'
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  
  // Right-Side Co-Planar Sheet Drawer State
  const [activeRightPanel, setActiveRightPanel] = useState(null); // null | 'card' | 'analytics' | 'kb'
  const [selectedCardId, setSelectedCardId] = useState(null);

  // Webhook Toast Banner State
  const [webhookToast, setWebhookToast] = useState(null);

  // Persistence State Hooks
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('stride_cards');
    return saved ? JSON.parse(saved) : initialCards;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('stride_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [knowledgeBase, setKnowledgeBase] = useState(() => {
    const saved = localStorage.getItem('stride_kb');
    return saved ? JSON.parse(saved) : defaultKnowledgeBase;
  });

  const [lastAiAction, setLastAiAction] = useState(null);

  // LocalStorage Persistence Effects
  useEffect(() => {
    localStorage.setItem('stride_cards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('stride_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('stride_kb', JSON.stringify(knowledgeBase));
  }, [knowledgeBase]);

  // Toast Auto-Dismiss
  useEffect(() => {
    if (webhookToast) {
      const timer = setTimeout(() => setWebhookToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [webhookToast]);

  // Drawer Controls
  const toggleNavRail = () => setIsNavExpanded(prev => !prev);

  const openCardDrawer = (cardId) => {
    setSelectedCardId(cardId);
    setActiveRightPanel('card');
  };

  const openAnalyticsDrawer = () => {
    setSelectedCardId(null);
    setActiveRightPanel('analytics');
  };

  const openKbDrawer = () => {
    setSelectedCardId(null);
    setActiveRightPanel('kb');
  };

  const closeRightDrawer = () => {
    setActiveRightPanel(null);
    setSelectedCardId(null);
  };

  // Card Operations with Webhook Trigger
  const moveCard = (cardId, newLane) => {
    setCards(prev => prev.map(card => {
      if (card.id === cardId) {
        const updated = {
          ...card,
          lane: newLane,
          timeline: [
            ...card.timeline,
            { timestamp: new Date().toISOString(), author: 'Operator', text: `Moved card to ${newLane} lane` }
          ]
        };
        // Fire Simulated Webhook
        triggerWhatsAppWebhook(updated, `moved_to_${newLane}`);
        setWebhookToast(`📱 WhatsApp Webhook Sent: ${updated.customerName} (${updated.phone}) updated to ${newLane.toUpperCase()}`);
        return updated;
      }
      return card;
    }));
  };

  const updateCardStatus = (cardId, newStatus, note = '') => {
    setCards(prev => prev.map(card => {
      if (card.id === cardId) {
        const updated = {
          ...card,
          status: newStatus,
          timeline: [
            ...card.timeline,
            { timestamp: new Date().toISOString(), author: 'Operator', text: note || `Updated status to ${newStatus}` }
          ]
        };
        // Fire Simulated Webhook
        triggerWhatsAppWebhook(updated, newStatus);
        setWebhookToast(`📱 WhatsApp Webhook Sent: ${updated.customerName} status updated to ${newStatus}`);
        return updated;
      }
      return card;
    }));
  };

  const deleteCard = (cardId) => {
    setCards(prev => prev.filter(c => c.id !== cardId));
    if (selectedCardId === cardId) {
      closeRightDrawer();
    }
  };

  // Customer Chat Message Processing Engine
  const sendMessage = (text, sender = 'customer') => {
    const newMsg = {
      id: "msg-" + Date.now(),
      sender,
      text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMsg]);

    if (sender === 'customer') {
      setTimeout(() => {
        const analysis = analyzeCustomerMessage(text);
        
        setLastAiAction({
          intent: analysis.intent,
          confidence: analysis.confidence,
          entities: analysis.entities,
          timestamp: new Date().toISOString()
        });

        if (analysis.cardCreated && analysis.cardData) {
          setCards(prev => {
            const exists = prev.some(c => c.id === analysis.cardData.id);
            if (exists) return prev;
            return [analysis.cardData, ...prev];
          });
        }

        const botReply = {
          id: "msg-" + (Date.now() + 1),
          sender: "bot",
          text: analysis.draftReply,
          intentTag: analysis.intent.toLowerCase(),
          timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, botReply]);
      }, 700);
    }
  };

  const triggerScenario = (scenario) => {
    sendMessage(scenario.message, 'customer');
  };

  const handleExportCSV = () => {
    exportPipelineToCSV(cards);
    setWebhookToast(`📊 Pipeline CSV Report downloaded successfully!`);
  };

  const resetDemoData = () => {
    localStorage.removeItem('stride_cards');
    localStorage.removeItem('stride_messages');
    localStorage.removeItem('stride_kb');
    setCards(initialCards);
    setMessages(initialMessages);
    setKnowledgeBase(defaultKnowledgeBase);
    setLastAiAction(null);
    closeRightDrawer();
  };

  const selectedCard = cards.find(c => c.id === selectedCardId);

  return (
    <AppContext.Provider value={{
      activeView,
      setActiveView,
      isNavExpanded,
      toggleNavRail,
      activeRightPanel,
      openCardDrawer,
      openAnalyticsDrawer,
      openKbDrawer,
      closeRightDrawer,
      selectedCardId,
      setSelectedCardId,
      selectedCard,
      cards,
      moveCard,
      updateCardStatus,
      deleteCard,
      messages,
      sendMessage,
      triggerScenario,
      presetScenarios,
      knowledgeBase,
      setKnowledgeBase,
      lastAiAction,
      resetDemoData,
      webhookToast,
      handleExportCSV
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
