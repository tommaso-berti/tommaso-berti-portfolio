import { describe, expect, it } from 'vitest';
import { buildContactMailto } from './contact.utils.js';

describe('buildContactMailto', () => {
  it('encodes contact fields into the existing email channel', () => {
    const mailto = buildContactMailto({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Hello & welcome',
    });
    expect(mailto).toContain('tommaso.berti.15@gmail.com');
    expect(mailto).toContain('Hello%20%26%20welcome');
  });

  it('adds the selected English topic to the subject', () => {
    const mailto = buildContactMailto(
      { name: 'Ada', email: 'ada@example.com', message: 'Hello' },
      'en',
      'Collaboration'
    );
    expect(mailto).toContain('subject=Collaboration%20%E2%80%94%20Portfolio%20contact');
  });

  it('adds the selected Italian topic to the subject', () => {
    const mailto = buildContactMailto(
      { name: 'Ada', email: 'ada@example.com', message: 'Ciao' },
      'it',
      'Collaborazione'
    );
    expect(mailto).toContain('subject=Collaborazione%20%E2%80%94%20Contatto%20dal%20portfolio');
  });
});
