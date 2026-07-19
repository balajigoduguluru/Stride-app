import { describe, it, expect } from 'vitest';
import { analyzeCustomerMessage, SAFE_FALLBACK_MATRIX } from './engine';

describe('Stride Enterprise AI Engine — Core Pipeline Verification', () => {

  it('(a) Urgent plumbing message with specific address patterns returns intent of SUPPORT with priority of urgent and matching entities', () => {
    const rawMessage = "My sink pipe is leaking heavily at Cyber City! Water is leaking under the sink urgently.";
    const result = analyzeCustomerMessage(rawMessage);

    // Assertion 1: Correct Intent Classification
    expect(result.intent).toBe('SUPPORT');

    // Assertion 2: Correct Priority Escalation
    expect(result.priority).toBe('urgent');

    // Assertion 3: Entity Extraction (Service & Location)
    expect(result.entities.serviceType).toBe('Plumbing Repair');
    expect(result.entities.location).toBe('Cyber City, Flat 402');

    // Assertion 4: Financial Value & Card Creation
    expect(result.estimatedValue).toBe(1800);
    expect(result.cardCreated).toBe(true);
    expect(result.cardData.lane).toBe('support');
    expect(result.cardData.priority).toBe('Urgent');

    // Assertion 5: Conversational Draft Reply
    expect(result.draftReply).toContain('Service Request Captured');
    expect(result.draftReply).toContain('Plumbing Repair');
  });

  it('(b) Null or undefined string payloads gracefully trigger the exact safe system fallback matrix', () => {
    // Null Input Payload Test
    const nullResult = analyzeCustomerMessage(null);
    expect(nullResult).toEqual(SAFE_FALLBACK_MATRIX);

    // Undefined Input Payload Test
    const undefinedResult = analyzeCustomerMessage(undefined);
    expect(undefinedResult).toEqual(SAFE_FALLBACK_MATRIX);

    // Empty String Input Payload Test
    const emptyResult = analyzeCustomerMessage("   ");
    expect(emptyResult).toEqual(SAFE_FALLBACK_MATRIX);

    // Fallback Matrix Value Integrity
    expect(nullResult.intent).toBe('GENERAL');
    expect(nullResult.priority).toBe('normal');
    expect(nullResult.cardCreated).toBe(false);
    expect(nullResult.cardData).toBeNull();
    expect(nullResult.draftReply).toContain('Apex Home Care');
  });

  it('Booking intent accurately extracts temporal slots and confirmed lane data', () => {
    const bookingMessage = "Can I book an AC repair slot for tomorrow morning at Green Park?";
    const result = analyzeCustomerMessage(bookingMessage);

    expect(result.intent).toBe('BOOKING');
    expect(result.entities.serviceType).toBe('AC Repair & Servicing');
    expect(result.entities.location).toBe('Green Park, Block C');
    expect(result.cardData.lane).toBe('bookings');
  });

});
