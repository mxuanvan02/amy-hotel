export class AppError extends Error {
  code: string;
  status?: number;
  meta?: unknown;

  constructor(code: string, message: string, options?: { status?: number; meta?: unknown }) {
    super(message);
    this.code = code;
    this.status = options?.status;
    this.meta = options?.meta;
  }
}

type DirectusError = {
  errors?: Array<{ message?: string; extensions?: { code?: string } }>;
};

export function normalizeDirectusError(response: Response, raw: DirectusError | null) {
  const message =
    raw?.errors?.[0]?.message ||
    raw?.errors?.[0]?.extensions?.code ||
    `Directus request failed with status ${response.status}`;

  return new AppError("DIRECTUS_API_ERROR", message, { status: response.status, meta: raw });
}
