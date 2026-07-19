import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCards, initialMessages, presetScenarios } from '../services/initialData';
import { defaultKnowledgeBase } from '../services/knowledgeBase';
import { classifyIntent, extractEntities, decideWorkflow } from '../services/aiEngine';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. Three-Pane Layout & Panel Navigation State
  const [activeView, setActiveView] = useState('split'); // 'split' | 'customer' | 'owner'
  const [isNavCollapsed, setIsNavCollapsed] = useState(false); // 256px <-> 64px
  const [activeRightPanel, setActiveRightPanel] = useState(null); // null | 'card' | 'analytics' | 'kb'

  // 2. Persistent Domain Data State initialized with LocalStorage retrieval
  const [cards, setCards] = useState(() => {
    try {
      const saved = localStorage.getItem('stride_cards');
      return saved ? JSON.parse(saved) : initialCards;
    } catch {
      return initialCards;
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('stride_messages');
      return saved ? JSON.parse(saved) : initialMessages;
    } catch {
      return initialMessages;
    }
  });

  const [knowledgeBase, setKnowledgeBase] = useState(() => {
    try {
      const saved = localStorage.getItem('stride_kb');
      return saved ? JSON.parse(saved) : defaultKnowledgeBase;
    } catch {
      return defaultKnowledgeBase;
    }
  });

  // 3. Selection & AI Action State
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [lastAiAction, setLastAiAction] = useState(null);

  // LocalStorage Persistence Synchronization Effects
  useEffect(() => {
    try {
      localStorage.setItem('stride_cards', JSON.stringify(cards));
    } catch (e) {
      console.warn("Could not save cards to LocalStorage:", e);
    }
  }, [cards]);

  useEffect(() => {
    try {
      localStorage.setItem('stride_messages', JSON.stringify(messages));
    } catch (e) {
      console.warn("Could not save messages to LocalStorage:", e);
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('stride_kb', JSON.stringify(knowledgeBase));
    } catch (e) {
      console.warn("Could not save knowledge base to LocalStorage:", e);
    }
  }, [knowledgeBase]);

  // Drawer Panel Navigation Controllers
  const openCardDrawer = (cardId) => {
    setSelectedCardId(cardId);
    setActiveRightPanel('card');
  };

  const openAnalyticsDrawer = () => {
    setActiveRightPanel('analytics');
  };

  const openKbDrawer = () => {
    setActiveRightPanel('kb');
  };

  const closeRightDrawer = () => {
    setActiveRightPanel(null);
  };

  // moveCard function to handle state transitions between Kanban lanes
  const moveCard = (cardId, newLane) => {
    setCards(prev => prev.map(c => {
      if (c.id === cardId) {
        return {
          ...c,
          lane: newLane,
          updatedAt: new Date().toISOString(),
          timeline: [
            ...c.timeline,
            { 
              timestamp: new Date().toISOString(), 
              author: "Owner", 
              text: `Lane Transition: Moved card to ${newLane.toUpperCase()}` 
            }
          ]
        };
      }
      return c;
    }));
  };

  const updateCardLane = moveCard;

  // Execute 1-Tap Workflow Action Update
  const updateCardStatus = (cardId, newStatus, actionNote) => {
    setCards(prev => prev.map(c => {
      if (c.id === cardId) {
        let updatedLane = c.lane;
        if (newStatus === "Confirmed" && c.lane === "leads") updatedLane = "bookings";
        if (newStatus === "Visit Scheduled") updatedLane = "bookings";
        if (newStatus === "Completed") updatedLane = "followups";

        return {
          ...c,
          status: newStatus,
          lane: updatedLane,
          updatedAt: new Date().toISOString(),
          recommendedAction: actionNote || c.recommendedAction,
          timeline: [
            ...c.timeline,
            { 
              timestamp: new Date().toISOString(), 
              author: "Owner", 
              text: `Status Executed: ${newStatus}. ${actionNote || ''}` 
            }
          ]
        };
      }
      return c;
    }));
  };

  // Delete Card Handler
  const deleteCard = (cardId) => {
    setCards(prev => prev.filter(c => c.id !== cardId));
    if (selectedCardId === cardId) {
      setSelectedCardId(null);
      closeRightDrawer();
    }
  };

  // Customer Chat Message Pipeline
  const sendMessage = (userText) => {
    if (!userText.trim()) return;

    const userMsgObj = {
      id: "msg-" + Date.now(),
      sender: "customer",
      text: userText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsgObj]);

    // AI Classification Engine
    const intentRes = classifyIntent(userText);
    const entities = extractEntities(userText);
    const decision = decideWorkflow(intentRes.intent, entities, userText, {
      kb: knowledgeBase,
      customerName: "Customer (" + entities.location + ")"
    });

    setLastAiAction({
      intent: intentRes.intent,
      confidence: intentRes.confidence,
      entities,
      workflowType: decision.workflowType,
      timestamp: new Date().toISOString()
    });

    if (decision.cardCreated && decision.cardData) {
      setCards(prev => [decision.cardData, ...prev]);
    }

    setTimeout(() => {
      const botMsgObj = {
        id: "msg-bot-" + Date.now(),
        sender: "bot",
        text: decision.replyText,
        intentTag: intentRes.intent,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMsgObj]);
    }, 400);
  };

  const triggerScenario = (scenario) => {
    sendMessage(scenario.message);
  };

  // Reset Demo Data Handler
  const resetDemoData = () => {
    setCards(initialCards);
    setMessages(initialMessages);
    setKnowledgeBase(defaultKnowledgeBase);
    setSelectedCardId(null);
    setLastAiAction(null);
    setActiveRightPanel(null);
    try {
      localStorage.removeItem('stride_cards');
      localStorage.removeItem('stride_messages');
      localStorage.removeItem('stride_kb');
    } catch (e) {
      console.warn("Could not clear LocalStorage:", e);
    }
  };

  const selectedCard = cards.find(c => c.id === selectedCardId) || null;

  return (
    <AppContext.Provider value={{
      activeView,
      setActiveView,
      isNavCollapsed,
      setIsNavCollapsed,
      activeRightPanel,
      setActiveRightPanel,
      openCardDrawer,
      openAnalyticsDrawer,
      openKbDrawer,
      closeRightDrawer,
      cards,
      setCards,
      messages,
      knowledgeBase,
      setKnowledgeBase,
      selectedCard,
      setSelectedCardId,
      lastAiAction,
      sendMessage,
      triggerScenario,
      moveCard,
      updateCardLane,
      updateCardStatus,
      deleteCard,
      resetDemoData,
      presetScenarios
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
