const API_ORIGIN = 'https://www.thecocktaildb.com'

interface ApiOptions {
  signal?: AbortSignal
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
}

export async function api<T = unknown>(
  url: string,
  payload?: Record<string, unknown>,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  options: ApiOptions = {},
): Promise<T> {
  const { signal, headers = {} } = options

  try {
    let finalUrl = url
    if (method === 'GET' && payload) {
      const params = new URLSearchParams(payload as Record<string, string>)
      finalUrl = `${url}?${params.toString()}`
    }

    console.log(`API запрос: ${method} ${finalUrl}`)

    const config: RequestInit = {
      method,
      headers: {
        ...headers,
      },
      signal,
    }

    if (method !== 'GET') {
      config.headers = {
        'Content-Type': 'application/json',
        ...headers,
      }
    }

    if (payload && method !== 'GET') {
      config.body = JSON.stringify(payload)
    }

    const response = await fetch(finalUrl, config)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('API ответ:', data)

    return data as T
  } catch (error) {
    console.error('API ошибка:', error)
    throw error
  }
}

export { API_ORIGIN }
