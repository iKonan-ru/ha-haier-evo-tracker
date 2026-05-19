export const generateUuid = (): string =>
  crypto.randomUUID?.() ??
  `n-${Date.now()}-${Math.random().toString(36).slice(2)}`;
