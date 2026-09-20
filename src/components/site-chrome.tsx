import { Link } from "@tanstack/react-router";
import { useSyncExternalStore } from "react";
import { Facebook, MessageCircle, Phone, Send } from "lucide-react";

import logoAsset from "@/assets/bonim-logo.png.asset.json";
import { Button } from "@/components/ui/button";

export const whatsappUrl = "https://wa.me/972559404379";

type SiteLanguage = "ru" | "he";

let siteLanguage: SiteLanguage = "ru";
const languageListeners = new Set<() => void>();

function subscribeLanguage(listener: () => void) {
  languageListeners.add(listener);
  return () => {
    languageListeners.delete(listener);
  };
}

export function setSiteLanguage(lang: SiteLanguage) {
  if (siteLanguage === lang) return;
  siteLanguage = lang;
  languageListeners.forEach((listener) => listener());
}

export function useSiteLanguage(): SiteLanguage {
  return useSyncExternalStore(
    subscribeLanguage,
    () => siteLanguage,
    () => siteLanguage,
  );
}

export function BrandMark({ compact = false, slogan = "he" }: { compact?: boolean; slogan?: "he" | "ru" }) {
  return (
    <div className={compact ? "brand-mark brand-mark--compact" : "brand-mark"}>
      <img src={logoAsset.url} alt="בונים BONIM" width="1024" height="768" />
      {slogan === "ru" ? (
        <p className="brand-slogan">
          <span>Закрываем балкон.</span>
          <span>Открываем вид.</span>
        </p>
      ) : (
        <p className="brand-slogan" dir="rtl">
          <span>סוגרים את המרפסת.</span>
          <span>פותחים את הנוף.</span>
        </p>
      )}
    </div>
  );
}

export function WhatsAppButton({ secondary = false }: { secondary?: boolean }) {
  return (
    <Button asChild size="lg" variant={secondary ? "outline" : "default"}>
      <a href={whatsappUrl} target="_blank" rel="noreferrer">
        <MessageCircle />
        Написать в WhatsApp
      </a>
    </Button>
  );
}

export function SiteHeader({ homeHref = "#top" }: { homeHref?: string }) {
  const language = useSiteLanguage();

  return (
    <header className="site-header">
      <a href={homeHref} aria-label="BONIM – в начало страницы">
        <BrandMark compact />
      </a>
      <div className="header-tools">
        <div className="language-switch" role="group" aria-label="Выбор языка">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className={language === "he" ? "language-button active" : "language-button"}
            aria-pressed={language === "he"}
            aria-label="Иврит – в разработке"
            onClick={() => setSiteLanguage("he")}
          >
            עב
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className={language === "ru" ? "language-button active" : "language-button"}
            aria-pressed={language === "ru"}
            aria-label="Русский язык"
            onClick={() => setSiteLanguage("ru")}
          >
            РУ
          </Button>
        </div>
        <a className="header-phone" href="tel:+972559404379" aria-label="Позвонить по телефону +972 55-940-4379" title="Позвонить">
          <Phone />
        </a>
        <WhatsAppButton secondary />
      </div>
    </header>
  );
}

export function SiteFooter() {
  const language = useSiteLanguage();

  return (
    <footer className="site-footer">
      <div className="section-shell footer-grid">
        <BrandMark compact slogan={language} />
        <div className="footer-links">
          <Link to="/privacy">Политика конфиденциальности</Link>
          <Link to="/terms">Условия оказания услуг</Link>
          <Link to="/portfolio">Реальные объекты наших партнёров</Link>
          <div className="footer-contacts">
            <div className="footer-socials">
              <a href="ЗАПОЛНИТЬ_FACEBOOK" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>
              <a href="https://t.me/bonimbalconimbot" target="_blank" rel="noreferrer" aria-label="Telegram-бот @bonimbalconimbot"><Send /></a>
            </div>
            <p><a href="tel:+972559404379">+972 55-940-4379</a></p>
            <p><a href="https://t.me/bonimbalconimbot" target="_blank" rel="noreferrer">@bonimbalconimbot</a></p>
            <p><a href="mailto:info@bonimbalconim.com">info@bonimbalconim.com</a></p>
            <p>г. Рамле, ул. Моше Даян, 8</p>
          </div>
        </div>
        <p dir="rtl">בונים בלקונים / BONIM BALCONIM</p>
      </div>
    </footer>
  );
}

export function MobileWhatsApp() {
  return (
    <a className="mobile-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Написать в WhatsApp">
      <MessageCircle />Написать в WhatsApp
    </a>
  );
}
