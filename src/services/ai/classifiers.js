/**
 * Stride Enterprise AI Engine — Classifier Rules & Intent Matching Specifications
 * Decouples natural language parsing rules from core decision pipelines.
 */

export const INTENT_PATTERNS = {
  SUPPORT: {
    key: 'SUPPORT',
    confidenceThreshold: 0.94,
    patterns: [
      /sink\s+pipe/i,
      /leaking\s+heavily/i,
      /isn't\s+cooling/i,
      /is not cooling/i,
      /water\s+is\s+leaking/i,
      /complaint/i,
      /broken/i,
      /urgent/i,
      /emergency/i,
      /not\s+working/i
    ]
  },
  BOOKING: {
    key: 'BOOKING',
    confidenceThreshold: 0.90,
    patterns: [
      /move\s+my\s+booking/i,
      /reschedule/i,
      /appointment/i,
      /book\s+an\s+ac/i,
      /book\s+a/i,
      /booking\s+slot/i,
      /friday\s+at/i
    ]
  },
  LEAD: {
    key: 'LEAD',
    confidenceThreshold: 0.92,
    patterns: [
      /need\s+ac\s+repair/i,
      /need\s+plumbing/i,
      /price/i,
      /cost/i,
      /quote/i,
      /rate/i,
      /charge/i,
      /how\s+much/i,
      /estimate/i
    ]
  },
  GENERAL: {
    key: 'GENERAL',
    confidenceThreshold: 0.70,
    patterns: [
      /operating\s+hours/i,
      /working\s+hours/i,
      /diagnostic\s+charges/i,
      /hello/i,
      /info/i
    ]
  }
};

export const SERVICE_CATEGORIES = [
  {
    name: 'AC Repair & Servicing',
    shortCode: 'AC_REPAIR',
    basePrice: 2500,
    patterns: [/ac/i, /air\s+conditioner/i, /cooling/i, /compressor/i, /filter/i, /hot\s+air/i]
  },
  {
    name: 'Plumbing Repair',
    shortCode: 'PLUMBING',
    basePrice: 1800,
    patterns: [/plumb/i, /pipe/i, /sink/i, /drain/i, /tap/i, /faucet/i, /water\s+leak/i, /leak/i, /leaking/i]
  },
  {
    name: 'Electrical Wiring',
    shortCode: 'ELECTRICAL',
    basePrice: 1500,
    patterns: [/electric/i, /wire/i, /wiring/i, /switch/i, /circuit/i, /fuse/i, /short\s+circuit/i]
  },
  {
    name: 'General Inspection',
    shortCode: 'GENERAL_INSPECT',
    basePrice: 1200,
    patterns: [/inspect/i, /general/i, /maintenance/i, /check/i, /service/i]
  }
];

export const URGENCY_TRIGGERS = [
  /urgent/i,
  /emergency/i,
  /leaking\s+heavily/i,
  /leaking/i,
  /leak/i,
  /broken/i,
  /immediately/i,
  /asap/i,
  /isn't\s+cooling/i
];

export const LOCATION_RULES = [
  { fullName: 'Green Park, Block C', simpleName: 'Green Park', patterns: [/green\s+park/i, /c-block/i, /block\s+c/i] },
  { fullName: 'Cyber City, Flat 402', simpleName: 'Cyber City', patterns: [/cyber\s+city/i, /flat\s+402/i] },
  { fullName: 'MG Road, Sector 14', simpleName: 'MG Road', patterns: [/mg\s+road/i, /sector\s+14/i] },
  { fullName: 'Vasant Kunj, Villa 12', simpleName: 'Vasant Kunj', patterns: [/vasant\s+kunj/i, /villa\s+12/i] },
  { fullName: 'Dwarka, Sector 10', simpleName: 'Dwarka', patterns: [/dwarka/i, /sector\s+10/i] }
];

export const TEMPORAL_RULES = [
  { label: 'Today 5:00 PM - 7:00 PM', patterns: [/today\s+evening/i, /5\s*pm/i, /7\s*pm/i] },
  { label: 'Tomorrow Morning (10 AM)', patterns: [/tomorrow\s+morning/i, /10\s*am/i, /tomorrow/i] },
  { label: 'Immediate Dispatch (< 1 hour)', patterns: [/immediate/i, /asap/i, /urgent/i, /now/i] },
  { label: 'Friday 3:00 PM', patterns: [/friday/i, /3:00\s*pm/i, /3\s*pm/i] }
];
