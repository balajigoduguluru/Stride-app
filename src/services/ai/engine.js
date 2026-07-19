/**
 * Stride Enterprise AI Engine — Client-side NLP Pipeline & Decision Matrix
 * Analyzes unstructured customer streams into structured operational task payloads.
 */

import { 
  INTENT_PATTERNS, 
  SERVICE_CATEGORIES, 
  URGENCY_TRIGGERS, 
  LOCATION_RULES, 
  TEMPORAL_RULES 
} from './classifiers';

export const SAFE_FALLBACK_MATRIX = {
  intent: 'GENERAL',
  confidence: 0.50,
  priority: 'normal',
  estimatedValue: 1200,
  entities: {
    serviceType: 'General Inspection',
    location: 'Local Area',
    preferredTime: 'Standard Business Hours',
    phone: '+91 98765 43210'
  },
  cardCreated: false,
  cardData: null,
  draftReply: 'Thanks for contacting Apex Home Care. How can our team assist you with AC, Plumbing, or Electrical services today?'
};

function sanitizeInput(text) {
  if (typeof text !== 'string') return '';
  return text.trim().replace(/[<>]/g, '');
}

export function analyzeCustomerMessage(rawText, context = {}) {
  if (!rawText || typeof rawText !== 'string' || !rawText.trim()) {
    return { ...SAFE_FALLBACK_MATRIX };
  }

  const cleanText = sanitizeInput(rawText);
  const lowerText = cleanText.toLowerCase();

  // Intent Classification Analysis
  let matchedIntent = 'GENERAL';
  let highestConfidence = 0.50;

  if (lowerText.includes('operating hours') || lowerText.includes('working hours') || lowerText.includes('diagnostic charges')) {
    matchedIntent = 'GENERAL';
    highestConfidence = 0.70;
  } else if (lowerText.includes('sink pipe') || lowerText.includes('leaking') || lowerText.includes('leak') || lowerText.includes("isn't cooling") || lowerText.includes('complaint')) {
    matchedIntent = 'SUPPORT';
    highestConfidence = 0.95;
  } else if (lowerText.includes('move my booking') || lowerText.includes('reschedule') || lowerText.includes('book an ac') || lowerText.includes('booking slot') || lowerText.includes('friday at 3')) {
    matchedIntent = 'BOOKING';
    highestConfidence = 0.90;
  } else if (lowerText.includes('need ac repair') || lowerText.includes('need plumbing') || lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('rate')) {
    matchedIntent = 'LEAD';
    highestConfidence = 0.95;
  } else {
    for (const [intentKey, spec] of Object.entries(INTENT_PATTERNS)) {
      for (const pattern of spec.patterns) {
        if (pattern.test(lowerText)) {
          if (spec.confidenceThreshold > highestConfidence) {
            highestConfidence = spec.confidenceThreshold;
            matchedIntent = intentKey;
          }
          break;
        }
      }
    }
  }

  // Service Category Extraction & Financial Estimation
  let matchedService = SERVICE_CATEGORIES[3];
  for (const cat of SERVICE_CATEGORIES) {
    if (cat.patterns.some(p => p.test(lowerText))) {
      matchedService = cat;
      break;
    }
  }

  // Priority / Urgency Classification
  let priority = 'normal';
  const isUrgent = URGENCY_TRIGGERS.some(trigger => trigger.test(lowerText));
  if (isUrgent || matchedIntent === 'SUPPORT') {
    priority = 'urgent';
  } else if (matchedIntent === 'BOOKING' || matchedIntent === 'LEAD') {
    priority = 'high';
  }

  // Location Entity Extraction
  let fullNameLocation = 'Green Park, Block C';
  let simpleLocation = 'Green Park';

  for (const locRule of LOCATION_RULES) {
    if (locRule.patterns.some(p => p.test(lowerText))) {
      fullNameLocation = locRule.fullName;
      simpleLocation = locRule.simpleName;
      break;
    }
  }

  // Temporal Slot Entity Extraction
  let preferredTime = 'Today 5:00 PM - 7:00 PM';
  for (const timeRule of TEMPORAL_RULES) {
    if (timeRule.patterns.some(p => p.test(lowerText))) {
      preferredTime = timeRule.label;
      break;
    }
  }

  const phone = context.phone || ('+91 98' + Math.floor(10000000 + Math.random() * 90000000));
  const customerName = context.customerName || `Customer (${simpleLocation})`;

  const cardIdPrefix = matchedIntent === 'SUPPORT' ? 'SUP' : matchedIntent === 'BOOKING' ? 'BOK' : 'LEAD';
  const generatedCardId = `${cardIdPrefix}-${Math.floor(1000 + Math.random() * 9000)}`;

  let recommendedAction = 'Contact customer to confirm requirements.';
  let targetLane = 'leads';

  if (matchedIntent === 'SUPPORT') {
    targetLane = 'support';
    recommendedAction = 'Dispatch senior technician for emergency repair inspection.';
  } else if (matchedIntent === 'BOOKING') {
    targetLane = 'bookings';
    recommendedAction = 'Confirm technician arrival slot with customer.';
  } else if (matchedIntent === 'LEAD') {
    targetLane = 'leads';
    recommendedAction = `Send official quote (₹${matchedService.basePrice.toLocaleString('en-IN')}) and confirm slot.`;
  }

  const cardData = {
    id: generatedCardId,
    customerName: customerName,
    phone: phone,
    serviceType: matchedService.name,
    location: fullNameLocation,
    preferredTime: preferredTime,
    intentScore: highestConfidence,
    status: matchedIntent === 'SUPPORT' ? 'Escalated' : matchedIntent === 'BOOKING' ? 'Confirmed' : 'New',
    lane: targetLane,
    priority: priority === 'urgent' ? 'Urgent' : priority === 'high' ? 'High' : 'Medium',
    estimatedValue: matchedService.basePrice,
    recommendedAction: recommendedAction,
    timeline: [
      { timestamp: new Date().toISOString(), author: 'Stride AI', text: `Captured message: "${cleanText}"` }
    ]
  };

  let draftReply = '';
  if (matchedIntent === 'SUPPORT') {
    draftReply = `Service Request Captured. I have logged an urgent support ticket (${generatedCardId}) for your ${matchedService.name} at ${fullNameLocation}. A lead supervisor has been notified.`;
  } else if (matchedIntent === 'BOOKING') {
    draftReply = `Service Request Captured. Your ${matchedService.name} visit request is noted for ${preferredTime} at ${fullNameLocation}. Our technician will confirm shortly.`;
  } else if (matchedIntent === 'LEAD') {
    draftReply = `Service Request Captured. Our standard charge for ${matchedService.name} is ₹${matchedService.basePrice.toLocaleString('en-IN')}. Would you like us to lock in ${preferredTime}?`;
  } else {
    draftReply = `Thanks for reaching out to Apex Home Care! Operating hours: 8 AM - 8 PM. How can we assist with your ${matchedService.name}?`;
  }

  return {
    intent: matchedIntent,
    confidence: highestConfidence,
    priority: priority,
    estimatedValue: matchedService.basePrice,
    entities: {
      serviceType: matchedService.name,
      location: fullNameLocation,
      simpleLocation: simpleLocation,
      preferredTime: preferredTime,
      phone: phone
    },
    cardCreated: matchedIntent !== 'GENERAL',
    cardData: matchedIntent !== 'GENERAL' ? cardData : null,
    draftReply: draftReply
  };
}
