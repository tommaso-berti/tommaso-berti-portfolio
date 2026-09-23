export function buildContactMailto({ name, email, message }, language = 'en', topic = '') {
  const subject = language.startsWith('it') ? 'Contatto dal portfolio' : 'Portfolio contact';
  const localizedSubject = topic.trim() ? `${topic.trim()} — ${subject}` : subject;
  const body = [`Name: ${name.trim()}`, `Email: ${email.trim()}`, '', message.trim()].join('\n');
  return `mailto:tommaso.berti.15@gmail.com?subject=${encodeURIComponent(localizedSubject)}&body=${encodeURIComponent(body)}`;
}
