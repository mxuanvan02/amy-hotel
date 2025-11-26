import { DIRECTUS_DEFAULT_HEADERS, DIRECTUS_STATIC_TOKEN, DIRECTUS_URL } from "@/config/directus";
import { AppError, normalizeDirectusError } from "@/lib/error-handling";
import { logApiError, logApiRequest } from "@/lib/logger";

type RequestOptions = RequestInit & {
  skipAuth?: boolean;
};

export async function directusFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = `${DIRECTUS_URL}${path}`;
  const headers: Record<string, string> = {
    ...DIRECTUS_DEFAULT_HEADERS,
    ...(options.headers as Record<string, string> || {}),
  };

  if (!options.skipAuth && DIRECTUS_STATIC_TOKEN) {
    headers.Authorization = `Bearer ${DIRECTUS_STATIC_TOKEN}`;
  }

  logApiRequest({ url, options });

  const response = await fetch(url, {
    cache: "no-store",
    ...options,
    headers,
  });

  if (!response.ok) {
    const raw = await response.json().catch(() => null);
    const appError = normalizeDirectusError(response, raw);
    logApiError({ url, status: response.status, error: appError });
    throw appError;
  }

  try {
    return (await response.json()) as T;
  } catch (error) {
    logApiError({ url, status: response.status, error });
    throw new AppError("DIRECTUS_PARSE_ERROR", "Không thể đọc dữ liệu Directus", {
      status: response.status,
      meta: error,
    });
  }
}
