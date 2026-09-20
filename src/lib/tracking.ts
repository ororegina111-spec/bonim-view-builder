// Запоминает, откуда пришёл человек (UTM-метки и рекламные метки), и отдаёт их при отправке формы.
const STORAGE_KEY = "bonim_tracking_v1";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];

export type Tracking = Record<string, string>;

function readSaved(): Tracking {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? (parsed as Tracking) : {};
  } catch {
    return {};
  }
}

function writeSaved(value: Tracking): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Браузер не разрешает хранить данные: метки просто не сохранятся, форма продолжит работать.
  }
}

// Вызывается один раз при загрузке сайта.
export function captureTracking(): void {
  if (typeof window === "undefined") return;
  const saved = readSaved();
  const fresh: Tracking = {};
  const query = new URLSearchParams(window.location.search);
  PARAMS.forEach((name) => {
    const value = query.get(name);
    if (value) fresh[name] = value.slice(0, 255);
  });
  // Метки из ссылки заменяют прежние. Если в ссылке меток нет, остаются прежние (человек уже заходил по рекламной ссылке).
  let merged: Tracking = Object.keys(fresh).length > 0 ? fresh : saved;
  // Откуда пришёл человек, если это другой сайт. Запоминаем один раз.
  if (!merged.utm_referrer && document.referrer) {
    try {
      const from = new URL(document.referrer);
      if (from.hostname !== window.location.hostname) {
        merged = { ...merged, utm_referrer: document.referrer.slice(0, 255) };
      }
    } catch {
      // Некорректный адрес источника: пропускаем.
    }
  }
  writeSaved(merged);
}

// Вызывается при отправке формы.
export function getTracking(): Tracking {
  if (typeof window === "undefined") return {};
  return readSaved();
}
