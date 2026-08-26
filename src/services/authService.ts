const AUTH_STORAGE_KEY = "Auth";

export function saveAuth<T>(user: T): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function getAuth(): string | null {
  return localStorage.getItem(AUTH_STORAGE_KEY);
}

export function clearAuth(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
