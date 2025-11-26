const isDebugEnabled = process.env.NEXT_PUBLIC_DEBUG === "true";

type ApiLogPayload = {
  url: string;
  options?: unknown;
};

type ApiErrorPayload = {
  url: string;
  status?: number;
  error?: unknown;
};

export function logApiRequest(payload: ApiLogPayload) {
  if (!isDebugEnabled) return;
  console.debug("[API Request]", payload);
}

export function logApiError(payload: ApiErrorPayload) {
  if (!isDebugEnabled) return;
  console.error("[API Error]", payload);
}
