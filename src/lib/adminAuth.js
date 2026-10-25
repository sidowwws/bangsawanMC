const SESSION_KEY = "bangsawanmc_admin_session";

export function loginAdmin(username, password) {
  const envUser = import.meta.env.VITE_ADMIN_USERNAME;
  const envPass = import.meta.env.VITE_ADMIN_PASSWORD;

  if (username === envUser && password === envPass) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ username }));
    return true;
  }
  return false;
}

export function getAdminSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logoutAdmin() {
  localStorage.removeItem(SESSION_KEY);
}
