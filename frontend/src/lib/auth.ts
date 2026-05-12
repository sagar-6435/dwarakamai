const TOKEN_KEY = "dwarakamai_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  profileImage?: string;
  address?: Record<string, string | undefined>;
};
