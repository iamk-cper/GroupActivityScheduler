const API_URL = '/api/users';

export async function register(nickname, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nickname, password })
  });
  if (!res.ok) throw new Error('Registration failed');
  return await res.json();
}

export async function login(nickname, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nickname, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json();
} 