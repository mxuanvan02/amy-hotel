import { DEFAULT_ASSET_URL } from "@/lib/constants";

export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export const formatCurrency = (amount: number, locale = "vi-VN", currency = "VND") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number.isFinite(amount) ? amount : 0);

export const formatDate = (value: string | Date, locale = "vi-VN") => {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString(locale);
};

export const getAssetUrl = (id?: string) => {
  if (!id) return DEFAULT_ASSET_URL;
  return `${DEFAULT_ASSET_URL}/${id}`;
};
