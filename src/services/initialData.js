export const initialCards = [
  {
    id: "LEAD-101",
    customerName: "Rahul Sharma",
    phone: "+91 98765 43210",
    serviceType: "AC Repair & Service",
    location: "Green Park, Block C",
    preferredTime: "Today Evening (5 PM - 7 PM)",
    intentScore: 0.92,
    status: "New",
    lane: "leads",
    priority: "High",
    estimatedValue: 2500,
    recommendedAction: "Confirm 5 PM technician visit slot and send quote of ₹2,500.",
    timeline: [
      { timestamp: "2026-07-19T10:15:00Z", author: "Stride AI", text: "Customer asked: 'My AC is blowing hot air. Can someone visit today?'" },
      { timestamp: "2026-07-19T10:15:05Z", author: "Stride AI", text: "Intent classified as LEAD (92% confidence). Card created in Leads lane." }
    ]
  },
  {
    id: "LEAD-102",
    customerName: "Priya Mehta",
    phone: "+91 91234 56789",
    serviceType: "Plumbing Maintenance",
    location: "Cyber City, Flat 402",
    preferredTime: "Tomorrow Morning (10 AM)",
    intentScore: 0.85,
    status: "New",
    lane: "leads",
    priority: "Medium",
    estimatedValue: 1800,
    recommendedAction: "Send plumbing rate list (₹1,800 estimate) and confirm address.",
    timeline: [
      { timestamp: "2026-07-19T11:00:00Z", author: "Stride AI", text: "Customer asked for plumbing service pricing" }
    ]
  },
  {
    id: "BOK-201",
    customerName: "Amit Verma",
    phone: "+91 99887 76655",
    serviceType: "Electrical Wiring Check",
    location: "MG Road, Sector 14",
    preferredTime: "Today Afternoon (2 PM)",
    intentScore: 0.95,
    status: "Confirmed",
    lane: "bookings",
    priority: "High",
    estimatedValue: 1500,
    recommendedAction: "Dispatch electrician Ramesh (ID: ELE-04) for visit.",
    timeline: [
      { timestamp: "2026-07-19T09:30:00Z", author: "Stride AI", text: "Slot confirmed by customer for 2 PM" }
    ]
  },
  {
    id: "SUP-301",
    customerName: "Vikram Malhotra",
    phone: "+91 97112 23344",
    serviceType: "AC Warranty Repair",
    location: "Vasant Kunj, Villa 12",
    preferredTime: "Immediate (< 1 hour)",
    intentScore: 0.98,
    status: "Escalated",
    lane: "support",
    priority: "Urgent",
    estimatedValue: 2500,
    recommendedAction: "Dispatch lead supervisor for free warranty inspection.",
    timeline: [
      { timestamp: "2026-07-19T08:00:00Z", author: "Stride AI", text: "Customer complaint: 'AC leaking water after yesterday service!'" },
      { timestamp: "2026-07-19T08:00:05Z", author: "Stride AI", text: "Classified as URGENT SUPPORT. Escalated to manager." }
    ]
  },
  {
    id: "FOL-401",
    customerName: "Sneh Lata",
    phone: "+91 98100 11223",
    serviceType: "Full Home Inspection",
    location: "Dwarka, Sector 10",
    preferredTime: "Completed Yesterday",
    intentScore: 0.88,
    status: "Waiting Customer",
    lane: "followups",
    priority: "Low",
    estimatedValue: 3500,
    recommendedAction: "Send WhatsApp feedback survey & 5-star Google review link.",
    timeline: [
      { timestamp: "2026-07-18T16:00:00Z", author: "Technician", text: "Inspection completed successfully" }
    ]
  }
];

export const initialMessages = [
  {
    id: "msg-1",
    sender: "customer",
    text: "Hi, my AC is blowing hot air at Green Park C-block. Can someone visit today evening?",
    timestamp: "2026-07-19T10:15:00Z"
  },
  {
    id: "msg-2",
    sender: "bot",
    text: "Hello Rahul! Stride AI has logged your request for AC Repair at Green Park. Our technician can visit between 5 PM - 7 PM. Would you like to confirm this slot?",
    intentTag: "lead",
    timestamp: "2026-07-19T10:15:02Z"
  }
];

export const presetScenarios = [
  {
    id: "sc-1",
    badge: "Scenario 1: AC Repair Lead",
    message: "Hi, I need AC repair today evening at Green Park. It is blowing hot air."
  },
  {
    id: "sc-2",
    badge: "Scenario 2: Support Complaint",
    message: "My AC still isn't cooling after yesterday's service visit! Water is leaking heavily."
  },
  {
    id: "sc-3",
    badge: "Scenario 3: Reschedule Slot",
    message: "Can I reschedule my plumbing booking to tomorrow morning at 10 AM?"
  },
  {
    id: "sc-4",
    badge: "Scenario 4: Price Query",
    message: "What are your standard electrical repair charges per hour?"
  }
];
