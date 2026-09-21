export function buildContactMailto({ name, email, message }, language = "en") {
    const subject = language.startsWith("it") ? "Contatto dal portfolio" : "Portfolio contact";
    const body = [`Name: ${name.trim()}`, `Email: ${email.trim()}`, "", message.trim()].join("\n");
    return `mailto:tommaso.berti.15@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
