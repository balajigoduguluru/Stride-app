import { describe, it, expect } from 'vitest';
import { classifyIntent, extractEntities, decideWorkflow } from './aiEngine';

describe('AI Engine - Intent Classification', () => {
  it('should correctly classify new AC repair inquiry as lead intent', () => {
    const text = 'Hi, I need AC repair today evening at Green Park.';
    const result = classifyIntent(text);
    expect(result.intent).toBe('lead');
    expect(result.confidence).toBeGreaterThan(0.9);
  });

  it('should classify post-service complaint as support intent', () => {
    const text = "My AC still isn't cooling after yesterday's service visit!";
    const result = classifyIntent(text);
    expect(result.intent).toBe('support');
  });

  it('should classify slot change request as booking intent', () => {
    const text = 'Can we move my booking slot to Friday at 3:00 PM?';
    const result = classifyIntent(text);
    expect(result.intent).toBe('booking');
  });

  it('should classify working hours query as general intent', () => {
    const text = 'What are your operating hours and diagnostic charges?';
    const result = classifyIntent(text);
    expect(result.intent).toBe('general');
  });
});

describe('AI Engine - Entity Extraction', () => {
  it('should extract serviceType, location, and time expression', () => {
    const text = 'Hi, I need AC repair today evening at Green Park.';
    const entities = extractEntities(text);
    expect(entities.serviceType).toBe('AC Repair & Servicing');
    expect(entities.location).toBe('Green Park');
    expect(entities.time).toBe('Today 5:00 PM - 7:00 PM');
  });
});

describe('AI Engine - Workflow Decision Engine', () => {
  it('should generate a Lead card and appropriate reply for lead intent', () => {
    const text = 'I need plumbing repair at Cyber City.';
    const intent = 'lead';
    const entities = extractEntities(text);
    const decision = decideWorkflow(intent, entities, text);

    expect(decision.cardCreated).toBe(true);
    expect(decision.cardData.lane).toBe('leads');
    expect(decision.replyText).toContain('Service Request Captured');
  });
});
