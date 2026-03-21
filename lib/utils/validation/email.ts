const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'E-mail é obrigatório';
  if (!isValidEmail(email)) return 'E-mail inválido';
  return null;
}
