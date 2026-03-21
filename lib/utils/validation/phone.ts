const PHONE_REGEX = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

export function isValidPhone(phone: string): boolean {
  return PHONE_REGEX.test(phone.trim());
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) return 'Telefone é obrigatório';
  if (!isValidPhone(phone)) return 'Telefone inválido';
  return null;
}
