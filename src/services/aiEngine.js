/**
 * Legacy AI Engine Entry Wrapper
 * Delegated to Enterprise Modular Architecture under src/services/ai/engine.js
 */

import { analyzeCustomerMessage, SAFE_FALLBACK_MATRIX } from './ai/engine';

export { analyzeCustomerMessage, SAFE_FALLBACK_MATRIX };

export const SERVICE_PRICING_CATALOG = {
  "ac repair": 2500,
  "ac service": 2500,
  "air conditioner": 2500,
  "plumbing": 1800,
  "leak": 1800,
  "sink": 1800,
  "electrical": 1500,
  "wiring": 1500,
  "short circuit": 1500,
  "carpentry": 2000,
  "appliance": 2200,
  "general": 1200
};

export function estimateValue(serviceType, text = '') {
  const analysis = analyzeCustomerMessage(`${serviceType} ${text}`);
  return analysis.estimatedValue;
}

export function classifyIntent(text) {
  const analysis = analyzeCustomerMessage(text);
  const mapIntent = analysis.intent.toLowerCase();
  return {
    intent: mapIntent,
    confidence: analysis.confidence
  };
}

export function extractEntities(text) {
  const analysis = analyzeCustomerMessage(text);
  return {
    serviceType: analysis.entities.serviceType,
    location: analysis.entities.simpleLocation || 'Green Park',
    time: analysis.entities.preferredTime,
    phone: analysis.entities.phone,
    priority: analysis.priority === 'urgent' ? 'Urgent' : 'High'
  };
}

export function decideWorkflow(intent, entities, rawText, context = {}) {
  const analysis = analyzeCustomerMessage(rawText, context);
  const targetLane = intent === 'lead' ? 'leads' : intent === 'booking' ? 'bookings' : 'support';
  const cardIdPrefix = targetLane === 'leads' ? 'LEAD' : targetLane === 'bookings' ? 'BOK' : 'SUP';
  const cardId = `${cardIdPrefix}-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    workflowType: intent === 'support' ? 'support_ticket' : intent === 'booking' ? 'booking_confirm' : 'lead_capture',
    cardCreated: intent !== 'general',
    cardData: intent !== 'general' ? {
      id: cardId,
      customerName: context.customerName || "Customer (" + (entities.location || 'Green Park') + ")",
      phone: entities.phone || '+91 98765 43210',
      serviceType: entities.serviceType || 'AC Repair & Servicing',
      location: entities.location || 'Green Park',
      preferredTime: entities.time || 'Today 5:00 PM - 7:00 PM',
      intentScore: 0.95,
      status: intent === 'support' ? 'Escalated' : intent === 'booking' ? 'Confirmed' : 'New',
      lane: targetLane,
      priority: entities.priority || 'High',
      estimatedValue: 2500,
      recommendedAction: 'Send official quote and confirm slot.',
      timeline: [
        { timestamp: new Date().toISOString(), author: "Stride AI", text: "Workflow processed" }
      ]
    } : null,
    replyText: `Service Request Captured. Our standard charge starts at ₹2,500.`
  };
}
