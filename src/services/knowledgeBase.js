export const defaultKnowledgeBase = {
  businessInfo: {
    name: "Apex Home Care & Repair",
    category: "Home Services & Appliance Repair",
    workingHours: "8:00 AM - 8:00 PM (Monday to Saturday)",
    emergencySupport: "24/7 for urgent leak & electrical hazards",
    serviceAreas: ["Green Park", "Connaught Place", "Cyber City", "Indiranagar", "Bandra West", "Downtown"],
    contactPhone: "+91 98765 43210",
    email: "support@apexhomecare.com"
  },
  services: [
    { id: "ac_repair", name: "AC Repair & Servicing", price: "$49 / ₹1,499", duration: "60 mins" },
    { id: "plumbing", name: "Plumbing Inspection & Fix", price: "$35 / ₹999", duration: "45 mins" },
    { id: "electrical", name: "Electrical Wiring & Appliance Fix", price: "$40 / ₹1,199", duration: "50 mins" },
    { id: "deep_cleaning", name: "Home Deep Cleaning", price: "$89 / ₹2,999", duration: "180 mins" },
    { id: "diagnostic", name: "General Diagnostic Visit", price: "$20 / ₹499", duration: "30 mins" }
  ],
  faqs: [
    {
      keywords: ["hours", "open", "timing", "time", "working"],
      question: "What are your business operating hours?",
      answer: "We are open Monday to Saturday from 8:00 AM to 8:00 PM. Emergency repair support is available 24/7."
    },
    {
      keywords: ["charge", "cost", "price", "fee", "rate", "diagnostic", "inspection"],
      question: "What are your diagnostic or visit charges?",
      answer: "Our standard diagnostic visit charge is $20 / ₹499, which is fully adjusted against your final repair bill if you proceed."
    },
    {
      keywords: ["reschedule", "cancel", "change date", "move slot"],
      question: "How can I reschedule or cancel a booking?",
      answer: "You can reschedule or cancel free of charge up to 2 hours before your scheduled appointment time directly in this chat!"
    },
    {
      keywords: ["warranty", "guarantee", "re-do", "fix again"],
      question: "Do you offer a service warranty?",
      answer: "Yes! All our repairs and installations come with a 30-day service guarantee. If the issue recurs within 30 days, we fix it for free."
    },
    {
      keywords: ["payment", "pay", "upi", "card", "cash"],
      question: "What payment methods do you accept?",
      answer: "We accept UPI, Credit/Debit cards, NetBanking, and cash upon service completion. Digital invoice is sent via SMS/WhatsApp."
    }
  ]
};

export function getFaqAnswer(message, kb = defaultKnowledgeBase) {
  const lowerMsg = message.toLowerCase();
  for (const faq of kb.faqs) {
    if (faq.keywords.some(k => lowerMsg.includes(k))) {
      return faq.answer;
    }
  }
  return null;
}
