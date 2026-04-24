import { APP_CONFIG } from './config';

export async function apiGet(path: string) {
  const response = await fetch(`${APP_CONFIG.apiBaseUrl}${path}`);
  if (!response.ok) throw new Error(`API error ${response.status}`);
  return response.json();
}

export async function apiPost(path: string, body: unknown) {
  const response = await fetch(`${APP_CONFIG.apiBaseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error(`API error ${response.status}`);
  return response.json();
}
