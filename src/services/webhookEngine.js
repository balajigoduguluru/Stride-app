/**
 * Stride Enterprise Webhook & Notification Engine
 * Simulates real-time outbound WhatsApp Business API & Twilio SMS Webhooks.
 */

export function triggerWhatsAppWebhook(cardData, actionType) {
  const payload = {
    event: `stride.card.${actionType.toLowerCase().replace(/\s+/g, '_')}`,
    timestamp: new Date().toISOString(),
    recipient: cardData.phone,
    customerName: cardData.customerName,
    serviceType: cardData.serviceType,
    status: cardData.status,
    estimatedValue: cardData.estimatedValue,
    messagePayload: {
      to: cardData.phone,
      type: "whatsapp_template",
      templateName: "appointment_status_update",
      body: `Hello ${cardData.customerName}, your ${cardData.serviceType} appointment has been updated to: ${cardData.status}. Preferred Slot: ${cardData.preferredTime}. Thank you for choosing Apex Home Care!`
    }
  };

  console.log("📱 [WHATSAPP WEBHOOK FIRED]:", payload);
  return payload;
}

export function exportPipelineToCSV(cards) {
  if (!cards || cards.length === 0) return;

  const headers = ["Card ID", "Customer Name", "Phone", "Service Type", "Location", "Preferred Time", "Status", "Lane", "Priority", "Estimated Value (INR)"];
  const rows = cards.map(c => [
    c.id,
    `"${c.customerName}"`,
    `"${c.phone}"`,
    `"${c.serviceType}"`,
    `"${c.location}"`,
    `"${c.preferredTime}"`,
    c.status,
    c.lane,
    c.priority,
    c.estimatedValue || 1500
  ]);

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `stride_pipeline_report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
