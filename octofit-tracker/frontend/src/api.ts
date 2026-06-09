// Use Vite environment variables to support Codespaces and localhost.
// Define VITE_CODESPACE_NAME in .env.local for Codespaces URL support,
// or rely on CODESPACE_NAME injected by GitHub Codespaces.
const rawEnv = import.meta.env as Record<string, string | undefined>
const rawCodespaceName =
  (rawEnv.VITE_CODESPACE_NAME && rawEnv.VITE_CODESPACE_NAME.trim()) ||
  (rawEnv.CODESPACE_NAME && rawEnv.CODESPACE_NAME.trim()) ||
  ''

export const codespaceName = rawCodespaceName || null
export const codespaceSource = rawEnv.VITE_CODESPACE_NAME
  ? 'VITE_CODESPACE_NAME'
  : rawEnv.CODESPACE_NAME
  ? 'CODESPACE_NAME'
  : null

export const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const apiBaseUrl = `${apiHost}/api`

export async function fetchApi<T = unknown[]>(endpoint: string): Promise<T[]> {
  const response = await fetch(`${apiBaseUrl}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  if (Array.isArray(result)) {
    return result;
  }

  if (result && Array.isArray(result.data)) {
    return result.data;
  }

  if (result && Array.isArray(result.items)) {
    return result.items;
  }

  return [];
}
