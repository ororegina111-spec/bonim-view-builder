import { Link } from "@tanstack/react-router";
import { Facebook, MessageCircle, Phone, Send } from "lucide-react";

import logoAsset from "@/assets/bonim-logo.png.asset.json";
import { Button } from "@/components/ui/button";

export const whatsappUrl = "https://wa.me/972559404379";

type SiteLanguage = "ru" | "he";

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

export function WhatsAppButton({ secondary = false, lang = "ru" }: { secondary?: boolean; lang?: SiteLanguage }) {
  const href = lang === "he"
    ? `${whatsappUrl}?text=${encodeURIComponent("שלום, אני מעוניין/ת לברר על סגירת מרפסת")}`
    : whatsappUrl;
  return (
    <Button asChild size="lg" variant={secondary ? "outline" : "default"}>
      <a href={href} target="_blank" rel="noreferrer">
        <MessageCircle />
        {lang === "he" ? <>כתבו לנו ב<span dir="ltr" className="ltr-isolate">WhatsApp</span></> : "Написать в WhatsApp"}
      </a>
    </Button>
  );
}

export function SiteHeader({ homeHref = "#top", lang = "ru" }: { homeHref?: string; lang?: SiteLanguage }) {
  return (
    <header className="site-header">
       <a href={homeHref} aria-label={lang === "he" ? "BONIM – לדף הבית" : "BONIM – в начало страницы"}>
        <BrandMark compact />
      </a>
      <div className="header-tools">
         <div className="language-switch" role="group" aria-label={lang === "he" ? "בחירת שפה" : "Выбор языка"}>
          <Button
            asChild
            size="icon"
            variant="ghost"
            className={lang === "he" ? "language-button active" : "language-button"}
             aria-label={lang === "he" ? "עברית" : "Иврит"}
          >
            <Link to="/he" lang="he" aria-current={lang === "he" ? "page" : undefined}>עב</Link>
          </Button>
          <Button
            asChild
            size="icon"
            variant="ghost"
            className={lang === "ru" ? "language-button active" : "language-button"}
             aria-label={lang === "he" ? "רוסית" : "Русский язык"}
          >
            <Link to="/" aria-current={lang === "ru" ? "page" : undefined}>РУ</Link>
          </Button>
        </div>
         <a className="header-phone" href="tel:+972559404379" aria-label={lang === "he" ? "התקשרו למספר +972 55-940-4379" : "Позвонить по телефону +972 55-940-4379"} title={lang === "he" ? "התקשרו" : "Позвонить"}>
          <Phone />
        </a>
          <WhatsAppButton secondary lang={lang} />
      </div>
    </header>
  );
}

export function SiteFooter({ lang = "ru" }: { lang?: SiteLanguage }) {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-grid">
        <BrandMark compact slogan={lang} />
         <div className="footer-links">
           {lang === "he" ? <a href="/he/privacy">מדיניות פרטיות</a> : <Link to="/privacy">Политика конфиденциальности</Link>}
           {lang === "he" ? <a href="/he/terms">תנאי שירות</a> : <Link to="/terms">Условия оказания услуг</Link>}
           {lang === "he" ? <Link to="/he/portfolio">פרויקטים אמיתיים של השותפים שלנו</Link> : <Link to="/portfolio">Реальные объекты наших партнёров</Link>}
          <div className="footer-contacts">
            <div className="footer-socials">
              <a href="ЗАПОЛНИТЬ_FACEBOOK" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>
              <a href="https://t.me/bonimbalconimbot" target="_blank" rel="noreferrer" aria-label="Telegram-бот @bonimbalconimbot"><Send /></a>
            </div>
             <p><a href="tel:+972559404379" dir="ltr" className="ltr-isolate">+972 55-940-4379</a></p>
             <p><a href="https://t.me/bonimbalconimbot" target="_blank" rel="noreferrer" dir="ltr" className="ltr-isolate">@bonimbalconimbot</a></p>
             <p>{lang === "he" ? <>כתבו לנו: <a href="mailto:info@bonimbalconim.com" dir="ltr" className="ltr-isolate">info@bonimbalconim.com</a></> : <a href="mailto:info@bonimbalconim.com">info@bonimbalconim.com</a>}</p>
             <p>{lang === "he" ? "רחוב משה דיין 8, רמלה" : "г. Рамле, ул. Моше Даян, 8"}</p>
          </div>
        </div>
        <p dir="rtl">בונים בלקונים / BONIM BALCONIM</p>
      </div>
    </footer>
  );
}

export function MobileWhatsApp({ lang = "ru" }: { lang?: SiteLanguage }) {
  const href = lang === "he"
    ? `${whatsappUrl}?text=${encodeURIComponent("שלום, אני מעוניין/ת לברר על סגירת מרפסת")}`
    : whatsappUrl;
  return (
    <a className="mobile-whatsapp" href={href} target="_blank" rel="noreferrer" aria-label={lang === "he" ? "כתבו לנו בוואטסאפ" : "Написать в WhatsApp"}>
      <MessageCircle />{lang === "he" ? <>כתבו לנו ב<span dir="ltr" className="ltr-isolate">WhatsApp</span></> : "Написать в WhatsApp"}
    </a>
  );
}
