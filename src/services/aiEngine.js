/**
 * Stride AI Workflow & Intent Engine
 * Performs intent classification, entity extraction, financial value estimation,
 * and automated task card decision trees.
 */

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
  const combined = `${serviceType || ''} ${text || ''}`.toLowerCase();
  
  for (const [kw, val] of Object.entries(SERVICE_PRICING_CATALOG)) {
    if (combined.includes(kw)) {
      return val;
    }
  }
  
  return 1500; // Default fallback estimate
}

export function classifyIntent(text) {
  if (!text) return { intent: 'general', confidence: 0.5 };
  
  const lower = text.toLowerCase();

  // Working hours / general queries
  if (lower.includes('operating hours') || lower.includes('working hours') || lower.includes('diagnostic charges')) {
    return { intent: 'general', confidence: 0.85 };
  }
  
  // Post-service support complaints
  if (lower.includes("isn't cooling") || lower.includes('complaint') || lower.includes('water is leaking') || lower.includes('leaking heavily') || lower.includes('broken')) {
    return { intent: 'support', confidence: 0.95 };
  }

  // Booking / Slot change requests
  if (lower.includes('move my booking') || lower.includes('reschedule') || lower.includes('booking slot')) {
    return { intent: 'booking', confidence: 0.90 };
  }
  
  // Lead / New inquiry / AC repair request
  if (lower.includes('need ac repair') || lower.includes('ac repair today') || lower.includes('price') || lower.includes('rate') || lower.includes('repair')) {
    return { intent: 'lead', confidence: 0.95 };
  }

  return { intent: 'general', confidence: 0.70 };
}

export function extractEntities(text) {
  if (!text) return { serviceType: 'General Service', location: 'Local Area', time: 'ASAP', phone: '+91 98765 43210', priority: 'Medium' };
  
  const lower = text.toLowerCase();
  
  // Extract Service Type
  let serviceType = 'General Maintenance';
  if (lower.includes('ac') || lower.includes('air conditioner')) serviceType = 'AC Repair & Servicing';
  else if (lower.includes('plumb') || lower.includes('pipe') || lower.includes('sink') || lower.includes('leak')) serviceType = 'Plumbing Repair';
  else if (lower.includes('electric') || lower.includes('wire') || lower.includes('switch')) serviceType = 'Electrical Repair';
  
  // Extract Location
  let location = 'Local Service Area';
  if (lower.includes('green park')) location = 'Green Park';
  else if (lower.includes('cyber city')) location = 'Cyber City';
  else if (lower.includes('mg road')) location = 'MG Road, Sector 14';

  // Extract Time Slot
  let time = 'Today 5:00 PM - 7:00 PM';
  if (lower.includes('tomorrow')) time = 'Tomorrow 10:00 AM';
  else if (lower.includes('friday')) time = 'Friday 3:00 PM';
  else if (lower.includes('now') || lower.includes('urgent')) time = 'Immediate Dispatch (< 1 hour)';

  // Priority Assessment
  let priority = 'Medium';
  if (lower.includes('leak') || lower.includes('urgent') || lower.includes("isn't cooling") || lower.includes('broken')) {
    priority = 'Urgent';
  } else if (lower.includes('price') || lower.includes('need ac repair')) {
    priority = 'High';
  }

  const phone = '+91 98' + Math.floor(10000000 + Math.random() * 90000000);

  return { serviceType, location, time, phone, priority };
}

export function decideWorkflow(intent, entities, rawText, context = {}) {
  const estVal = estimateValue(entities.serviceType, rawText);

  if (intent === 'support') {
    const cardId = "SUP-" + Math.floor(1000 + Math.random() * 9000);
    return {
      workflowType: 'support_ticket',
      cardCreated: true,
      cardData: {
        id: cardId,
        customerName: context.customerName || "Customer (" + entities.location + ")",
        phone: entities.phone,
        serviceType: entities.serviceType,
        location: entities.location,
        preferredTime: entities.time,
        intentScore: 0.95,
        status: "Escalated",
        lane: "support",
        priority: entities.priority,
        estimatedValue: estVal,
        recommendedAction: "Dispatch senior technician for emergency repair inspection.",
        timeline: [
          { timestamp: new Date().toISOString(), author: "Stride AI", text: "Customer complaint registered from WhatsApp stream" }
        ]
      },
      replyText: `Service Request Captured. I have logged an urgent support ticket (${cardId}) for your ${entities.serviceType}. A supervisor is assigned.`
    };
  }

  if (intent === 'booking') {
    const cardId = "BOK-" + Math.floor(1000 + Math.random() * 9000);
    return {
      workflowType: 'booking_confirm',
      cardCreated: true,
      cardData: {
        id: cardId,
        customerName: context.customerName || "Customer (" + entities.location + ")",
        phone: entities.phone,
        serviceType: entities.serviceType,
        location: entities.location,
        preferredTime: entities.time,
        intentScore: 0.90,
        status: "Confirmed",
        lane: "bookings",
        priority: "High",
        estimatedValue: estVal,
        recommendedAction: "Confirm technician arrival slot with customer.",
        timeline: [
          { timestamp: new Date().toISOString(), author: "Stride AI", text: "Slot booking request processed" }
        ]
      },
      replyText: `Service Request Captured. Your ${entities.serviceType} visit is requested for ${entities.time}. Our technician will confirm shortly.`
    };
  }

  if (intent === 'lead') {
    const cardId = "LEAD-" + Math.floor(1000 + Math.random() * 9000);
    return {
      workflowType: 'lead_capture',
      cardCreated: true,
      cardData: {
        id: cardId,
        customerName: context.customerName || "Customer (" + entities.location + ")",
        phone: entities.phone,
        serviceType: entities.serviceType,
        location: entities.location,
        preferredTime: entities.time,
        intentScore: 0.95,
        status: "New",
        lane: "leads",
        priority: "High",
        estimatedValue: estVal,
        recommendedAction: "Send official rate chart and offer ₹200 off first booking.",
        timeline: [
          { timestamp: new Date().toISOString(), author: "Stride AI", text: "New lead captured from price query" }
        ]
      },
      replyText: `Service Request Captured. Our standard charge for ${entities.serviceType} starts at ₹${estVal.toLocaleString('en-IN')}. Would you like to book a slot?`
    };
  }

  return {
    workflowType: 'general_faq',
    cardCreated: false,
    replyText: `Thanks for messaging Apex Home Care. How can we assist you with AC, Plumbing, or Electrical repairs today?`
  };
}
