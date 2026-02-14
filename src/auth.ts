/** Demo auth: sessionStorage key. Any credentials + any 2FA code logs in. */

const AUTH_KEY = 'portal_demo_auth';

export function setAuth(): void {
  try {
    sessionStorage.setItem(AUTH_KEY, '1');
  } catch {
    // ignore
  }
}

export function clearAuth(): void {
  try {
    sessionStorage.removeItem(AUTH_KEY);
  } catch {
    // ignore
  }
}

export function isAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(AUTH_KEY) === '1';
  } catch {
    return false;
  }
}
