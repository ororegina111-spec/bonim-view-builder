import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Leaf,
  MessageCircle,
  Phone,
  Play,
  Ruler,
  Send,
  ShieldCheck,
} from "lucide-react";

import balkonHero from "@/assets/balkon-1.jpg.asset.json";
import balconyMeasureDiagram from "@/assets/bonim-measure-balcony.webp.asset.json";
import pergolaMeasureDiagram from "@/assets/bonim-measure-pergola.webp.asset.json";
import logoAsset from "@/assets/bonim-logo.png.asset.json";
import dividerCozy from "@/assets/divider-cozy-interior.png.asset.json";
import dividerSunbeam from "@/assets/divider-glass-sunbeam.png.asset.json";
import dividerWindow from "@/assets/divider-window.png.asset.json";
import framelessWebp1 from "@/assets/frameless-webp/frameless-webp-1.webp.asset.json";
import framelessWebp2 from "@/assets/frameless-webp/frameless-webp-2.webp.asset.json";
import framelessWebp3 from "@/assets/frameless-webp/frameless-webp-3.webp.asset.json";
import framelessWebp4 from "@/assets/frameless-webp/frameless-webp-4.webp.asset.json";
import framelessWebp5 from "@/assets/frameless-webp/frameless-webp-5.webp.asset.json";
import framelessJpg1 from "@/assets/frameless/frameless-1.jpg.asset.json";
import framelessJpg2 from "@/assets/frameless/frameless-2.jpg.asset.json";
import framelessJpg3 from "@/assets/frameless/frameless-3.jpg.asset.json";
import framelessJpg4 from "@/assets/frameless/frameless-4.jpg.asset.json";
import framelessJpg5 from "@/assets/frameless/frameless-5.jpg.asset.json";
import framelessJpg6 from "@/assets/frameless/frameless-6.jpg.asset.json";
import framelessJpg7 from "@/assets/frameless/frameless-7.jpg.asset.json";
import framelessJpg9 from "@/assets/frameless/frameless-9.jpg.asset.json";
import framelessJpg10 from "@/assets/frameless/frameless-10.jpg.asset.json";
import slidingWebp1 from "@/assets/sliding-webp/sliding-webp-1.webp.asset.json";
import slidingWebp2 from "@/assets/sliding-webp/sliding-webp-2.webp.asset.json";
import slidingWebp3 from "@/assets/sliding-webp/sliding-webp-3.webp.asset.json";
import slidingWebp4 from "@/assets/sliding-webp/sliding-webp-4.webp.asset.json";
import slidingWebp5 from "@/assets/sliding-webp/sliding-webp-5.webp.asset.json";
import slidingWebp6 from "@/assets/sliding-webp/sliding-webp-6.webp.asset.json";
import slidingWebp7 from "@/assets/sliding-webp/sliding-webp-7.webp.asset.json";
import slidingWebp8 from "@/assets/sliding-webp/sliding-webp-8.webp.asset.json";
import slidingWebp9 from "@/assets/sliding-webp/sliding-webp-9.webp.asset.json";
import slidingWebp10 from "@/assets/sliding-webp/sliding-webp-10.webp.asset.json";
import slidingWebp11 from "@/assets/sliding-webp/sliding-webp-11.webp.asset.json";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PortfolioImage } from "@/components/portfolio-image";
import { portfolioProjects } from "@/data/portfolio";
import { getTracking } from "@/lib/tracking";
import { SITE_ORIGIN } from "@/lib/site";

const whatsappUrl = `https://wa.me/972559404379?text=${encodeURIComponent("שלום, אני מעוניין/ת לברר על סגירת מרפסת")}`;

const systemGalleries = [
  {
    system: "זכוכית נאספת ללא מסגרת",
    photos: [
      framelessWebp1.url,
      framelessWebp2.url,
      framelessWebp3.url,
      framelessWebp4.url,
      framelessWebp5.url,
      framelessJpg1.url,
      framelessJpg2.url,
      framelessJpg3.url,
      framelessJpg4.url,
      framelessJpg5.url,
      framelessJpg6.url,
      framelessJpg7.url,
      framelessJpg9.url,
      framelessJpg10.url,
    ],
  },
  {
    system: "מערכת הזזה",
    photos: [
      slidingWebp1.url,
      slidingWebp2.url,
      slidingWebp3.url,
      slidingWebp4.url,
      slidingWebp5.url,
      slidingWebp6.url,
      slidingWebp7.url,
      slidingWebp8.url,
      slidingWebp9.url,
      slidingWebp10.url,
      slidingWebp11.url,
    ],
  },
];


const faqItems = [
  { question: "המדידה בתשלום? אצל אחרים היא בחינם.", answer: "המדידה עצמה, כשירות של איש המקצוע, היא בחינם. הסכום החל מ-300 ₪ מכסה את החישוב והכנת התוכנית עם מספרים מדויקים ואת הגעת איש המקצוע אליכם, במיוחד אם אתם גרים רחוק. אם לא תזמינו – החישוב המקצועי והתוכנית נשארים אצלכם." },
  { question: "למה מערכות שונות זו מזו?", answer: "אנחנו מקבלים תגמול זהה בלי קשר לבחירה שלכם. אבל למערכות עם פרופיל עבה יותר ומנגנון אמין סיכון נמוך יותר לעיוות באופן אובייקטיבי – נראה זאת במספרים במהלך המדידה. חלק מהמערכות לא משתמשות בפתרונות עיגון מודרניים לזכוכית." },
  { question: "אפשר לדעת את המחיר בלי מדידה?", answer: "שלחו את המידות וקבלו הערכת מחיר ראשונית עוד באותו יום. המחיר המדויק – אחרי המדידה." },
  { question: "ומה אם שום דבר לא יתאים?", answer: "החישוב המקצועי, הצעת המחיר המפורטת והתוכנית המדויקת נשארים אצלכם. תוכלו לפנות איתם לכל יצרן." },
  { question: "מה זמני האספקה?", answer: "אצל יצרנים מקומיים – מ-24 ימי עבודה. אצל האחרים נמסור את הזמן לאחר בדיקת זמינות מול הספק." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BONIM – בחירה והתאמה של מערכות סגירה למרפסות בישראל" },
      {
        name: "description",
        content:
          "שירות ליווי בבחירת מערכות סגירה למרפסות ופרגולות. הערכת מחיר ראשונית לפי המידות שלכם – עוד באותו יום.",
      },
      { property: "og:title", content: "BONIM – בחירת מערכות סגירה למרפסות" },
      {
        property: "og:description",
        content:
          "השוו כמה אפשרויות וקבלו הערכת מחיר ראשונית לפי מידות המרפסת שלכם.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_ORIGIN}/he` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "BONIM – בחירת מערכות סגירה למרפסות" },
      { name: "twitter:description", content: "השוו כמה אפשרויות וקבלו הערכת מחיר ראשונית לפי מידות המרפסת שלכם." },
    ],
    links: [
      { rel: "alternate", hrefLang: "he", href: `${SITE_ORIGIN}/he` },
      { rel: "alternate", hrefLang: "ru", href: `${SITE_ORIGIN}/` },
      { rel: "canonical", href: `${SITE_ORIGIN}/he` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(faqSchema),
      },
    ],
  }),
  component: HebrewHomePage,
});

function Divider({ image, text }: { image: { url: string }; text?: string }) {
  return (
    <div className="divider-band" style={{ backgroundImage: `url(${image.url})` }} aria-hidden={text ? undefined : "true"}>
      {text ? <p className="divider-text">{text}</p> : null}
    </div>
  );
}

function BrandMark({ compact = false, slogan = "he" }: { compact?: boolean; slogan?: "he" | "ru" }) {
  return (
    <div className={compact ? "brand-mark brand-mark--compact" : "brand-mark"}>
      <img src={logoAsset.url} alt="בונים BONIM" width="1024" height="768" />
      {slogan === "he" ? (
        <p className="brand-slogan" dir="rtl">
          <span>סוגרים את המרפסת.</span>
          <span>פותחים את הנוף.</span>
        </p>
      ) : null}
    </div>
  );
}

function SectionHeading({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-heading">
      <span>{number}</span>
      <h2>{children}</h2>
    </div>
  );
}

function WhatsAppButton({ secondary = false }: { secondary?: boolean }) {
  return (
    <Button asChild size="lg" variant={secondary ? "outline" : "default"}>
      <a href={whatsappUrl} target="_blank" rel="noreferrer">
        <MessageCircle />
        כתבו לנו ב<span className="ltr-isolate" dir="ltr">WhatsApp</span>
      </a>
    </Button>
  );
}

function PortfolioCarousel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  function scrollBy(direction: -1 | 1) {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: -direction * Math.max(280, node.clientWidth * 0.8), behavior: "smooth" });
  }

  return (
    <div className="portfolio-carousel">
      <div className="portfolio-carousel-track" ref={scrollerRef}>
        {portfolioProjects.slice(0, 5).map((project) => (
          <article className="portfolio-card" key={project.id}>
            <span className="portfolio-cover">
              <PortfolioImage src={project.cover} alt={project.titleHe} placeholder="[תמונת הפרויקט]" />
              {project.videos.length > 0 ? <span className="portfolio-video-badge" aria-label="יש סרטון"><Play /></span> : null}
            </span>
            <span className="portfolio-title">{project.titleHe}</span>
            {project.dateHe ? <span className="portfolio-date">{project.dateHe}</span> : null}
            <span className="portfolio-description">{project.descriptionHe}</span>
          </article>
        ))}
      </div>
      <div className="portfolio-carousel-nav">
        <button type="button" onClick={() => scrollBy(-1)} aria-label="פרויקטים קודמים"><ChevronLeft /></button>
        <button type="button" onClick={() => scrollBy(1)} aria-label="פרויקטים הבאים"><ChevronRight /></button>
      </div>
      <Link to="/portfolio" className="portfolio-more">עוד פרויקטים</Link>
    </div>
  );
}

const FORM_PAGE = "main";

function HebrewHomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [measureTab, setMeasureTab] = useState<"balcony" | "pergola">("balcony");

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity() || !consent) {
      form.reportValidity();
      return;
    }
    if (sending) return;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      width: String(data.get("width") ?? ""),
      height: String(data.get("height") ?? ""),
      consent: true,
      page: FORM_PAGE,
      lang: "he",
      hp_check: String(data.get("hp_check") ?? ""),
      tracking: getTracking(),
      landing: window.location.href,
    };
    setSending(true);
    setSubmitError(false);
    try {
      const response = await fetch("/lead.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result && result.ok === true) {
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="he-page" lang="he" dir="rtl">
      <header className="site-header">
        <a href="#top" aria-label="BONIM – לדף הבית">
          <BrandMark compact />
        </a>
        <div className="header-tools">
          <div className="language-switch" role="group" aria-label="בחירת שפה">
            <Button asChild size="icon" variant="ghost" className="language-button active" aria-label="עברית">
              <Link to="/" lang="he" aria-current="page">עב</Link>
            </Button>
            <Button asChild size="icon" variant="ghost" className="language-button" aria-label="רוסית">
              <Link to="/ru">РУ</Link>
            </Button>
          </div>
          <a className="header-phone" href="tel:+972559404379" aria-label="התקשרו למספר +972 55-940-4379" title="התקשרו">
            <Phone />
          </a>
          <WhatsAppButton secondary />
        </div>
      </header>

      <section id="top" className="hero section-shell">
        <div className="hero-copy">
          <div className="eyebrow">שירות ליווי והתאמה של מערכות סגירה למרפסות</div>
          <div className="section-heading hero-heading">
            <span>01</span>
            <h1>
              <span className="hero-title-main">המרפסת לא עובדת בשבילכם?</span>{" "}
              <span className="hero-title-sub">נעזור לכם לבחור את המערכת שמתאימה בדיוק לכם</span>
            </h1>
          </div>
          <p className="hero-lead">
            אנחנו שירות שמלווה אתכם בבחירת מערכת לסגירת מרפסת או פרגולה מתוך כמה אפשרויות מבוססות. איש מקצוע מגיע עם דוגמאות, אתם משווים בעצמכם במקום ובוחרים.
          </p>
          <div className="hero-actions">
            <WhatsAppButton />
            <Button asChild size="lg" variant="outline">
              <a href="#calculation">
                קבלו הערכת מחיר ראשונית
                <ArrowDown />
              </a>
            </Button>
          </div>
          <p className="price-note">
            הגעת איש המקצוע אליכם – בחינם. משלמים רק על חישוב והכנת התוכנית: <span dir="ltr" className="ltr-isolate">החל מ-300 ₪</span>.
          </p>
        </div>
        <div className="hero-photo">
          <img
            src={balkonHero.url}
            alt="מרפסת עם סגירת זכוכית פנורמית ללא מסגרת ונוף לעיר"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      <Divider image={dividerWindow} text="עוד עונה בלי סגירה – עוד עונה שהולכת לאיבוד" />

      <section className="section-shell problem-section">
        <SectionHeading number="02">הבעיה</SectionHeading>
        <div className="problem-grid">
          {[
            "המרפסת בדירה החדשה נשארה קופסת בטון חשופה.",
            "בקיץ אי אפשר לשבת במרפסת מרוב חום ורוח, ובחורף מרוב קור.",
            "מהבניינים הסמוכים רואים כל מה שקורה במרפסת.",
            "הילד מתקרב לחלון הפתוח, וזה מפחיד.",
            "הרעש מהרחוב לא מאפשר לפתוח חלון, וכל דבר מתכסה באבק תוך יום.",
          ].map((text, index) => (
            <div className="problem-item" key={text}>
              <span>0{index + 1}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <p className="statement">
          הסיבות שונות, והפתרון אחד: להבין איזו מערכת מתאימה בדיוק למרפסת שלכם, ולא לשלם יותר מדי על משהו שיתפרק תוך שנה.
        </p>
      </section>

      <section className="blue-band">
        <div className="section-shell narrow">
          <SectionHeading number="03">מי אנחנו</SectionHeading>
          <p className="large-copy">
            <span dir="ltr" className="ltr-isolate">BONIM</span> היא לא יצרן ולא חברת התקנה. אנחנו שירות ליווי והתאמה: אנשי מקצוע שעוזרים לבחור את המערכת המתאימה לסגירת מרפסת או פרגולה מתוך כמה יצרנים מבוססים. איש המקצוע שלנו מגיע עם דוגמאות ומראה את ההבדלים במקום, ואתם בוחרים. אנחנו לא מכתיבים מערכת מסוימת – המטרה שלנו שתבחרו את מה שמתאים בדיוק למרפסת ולתקציב שלכם.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeading number="04">מה נביא איתנו</SectionHeading>
        <p className="section-intro">כמה סוגי מערכות מיצרנים שונים. השוו בעצמכם.</p>
        <div className="comparison-table" role="table" aria-label="השוואת סוגי מערכות">
          <div className="compare-row compare-head" role="row">
            <span>סוג המערכת</span><span>איך זה עובד</span><span>מחיר</span><span>מה חשוב לדעת</span>
          </div>
          <div className="compare-row" role="row">
            <strong>זכוכית נאספת ללא מסגרת</strong>
            <span>נאספת כמו אקורדיון, פותחת עד <bdi dir="ltr">100%</bdi> מהפתח, נוף פנורמי</span>
            <strong><span dir="ltr" className="ltr-isolate">החל מ-1,250 ₪ למ״ר</span></strong>
            <span>עובי הפרופיל וחומר המנגנון שונים בין יצרנים, ומהם תלויים אמינות ואורך חיים</span>
          </div>
          <div className="compare-row" role="row">
            <strong>מערכת הזזה</strong>
            <span>הכנפיים נעות הצידה וחוסכות מקום</span>
            <strong><span dir="ltr" className="ltr-isolate">החל מ-1,100 ₪ למ״ר</span></strong>
            <span>פתרון חסכוני יותר, מתאים כשלא חייבים פתיחה פנורמית</span>
          </div>
        </div>
        <div className="system-galleries" aria-label="תמונות של מערכות סגירה">
          {systemGalleries.map((gallery) => (
            <section className="system-gallery" key={gallery.system} aria-label={`תמונות: ${gallery.system}`}>
              <h3>{gallery.system}</h3>
              <div className="system-photo-track">
                {gallery.photos.length === 0
                  ? [1, 2, 3, 4].map((n) => (
                      <div className="system-photo system-photo--placeholder" key={n}>
                        <span>התמונה תופיע כאן</span>
                      </div>
                    ))
                  : gallery.photos.map((photo, index) => (
                      <div className="system-photo" key={photo}>
                        <img
                          src={photo}
                          alt={`${gallery.system}: תמונה ${index + 1}`}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
              </div>

            </section>
          ))}
        </div>
        <p className="info-strip">
          בין המערכות יש הבדלים שלא רואים בתמונה: עובי הפרופיל, חומר הגלגלים, טכנולוגיית הייצור וההתקנה, מנעולים ועצרים ועוד, וגם זמן האספקה – מ-24 ימי עבודה אצל יצרנים מקומיים, ואצל האחרים נמסור את הזמן לאחר בדיקת זמינות מול הספק. איש המקצוע יביא כמה דוגמאות ויראה בכנות את ההבדל במקום, עם מספרים ביד. תראו במו עיניכם את ההבדל בעובי הפרופיל.
        </p>
      </section>

      <Divider image={dividerSunbeam} text="מדידה אחת – והמרפסת מתחילה לעבוד בשבילכם במקום לעמוד ריקה" />

      <section className="soft-band">
        <div className="section-shell">
          <SectionHeading number="05">איך זה עובד</SectionHeading>
          <ol className="steps-grid">
            {[
              <>מתקשרים, כותבים ב<span dir="ltr" className="ltr-isolate">WhatsApp</span>, משאירים פנייה באתר או ב<span dir="ltr" className="ltr-isolate">Facebook</span>.</>,
              "שולחים את מידות המרפסת – ככל שהמידות מדויקות יותר, כך ההערכה הראשונית מדויקת יותר.",
              "עוד באותו יום מקבלים הערכת מחיר ראשונית עם כמה מסלולים.",
              <>משלמים על הכנת התוכנית הסופית: <span dir="ltr" className="ltr-isolate">החל מ-300 ₪</span>.</>,
              "איש המקצוע מגיע בחינם עם דוגמאות ומודד מידות מדויקות.",
              "מקבלים הצעת מחיר סופית עם סכום מדויק.",
              "בוחרים את המערכת שנוחה לכם. גם אם לא החלטתם, החישוב והתוכנית המקצועית נשארים אצלכם בכל מקרה.",
              "חותמים על הסכם ישירות מול המבצע.",
            ].map((step, index) => (
              <li key={index}><span>{index + 1}</span><p>{step}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell measure-section">
        <SectionHeading number="06">הערכת מחיר ראשונית לפי המידות שלכם</SectionHeading>
        <p className="section-intro measure-intro">
          לא חייבים להזמין איש מקצוע כדי להבין את סדר הגודל של המחירים. שלחו לנו את מידות המרפסת או הפרגולה (ההוראות למטה) – בוואטסאפ, בטופס באתר או בפנייה בפייסבוק – ונשלח הערכת מחיר ראשונית עוד באותו יום. ככל שהמידות מדויקות יותר, כך ההערכה מדויקת יותר.
        </p>
        <div className="tab-container">
          <div className="tab-header" role="tablist" aria-label="הוראות מדידה">
            <button
              type="button"
              role="tab"
              aria-selected={measureTab === "balcony"}
              className={`header-btn${measureTab === "balcony" ? " active" : ""}`}
              onClick={() => setMeasureTab("balcony")}
            >
              <Ruler aria-hidden="true" />
              הוראות למרפסת / לוגיה
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={measureTab === "pergola"}
              className={`header-btn${measureTab === "pergola" ? " active" : ""}`}
              onClick={() => setMeasureTab("pergola")}
            >
              <Leaf aria-hidden="true" />
              הוראות לפרגולה / טרסה
            </button>
          </div>

          <div
            className={`content-block${measureTab === "balcony" ? " active" : ""}`}
            role="tabpanel"
            hidden={measureTab !== "balcony"}
          >
            <h3>איך למדוד בעצמכם</h3>
            <div className="measure-layout">
              <div>
                <div className="measure-list">
                  <p><span className="measure-number">1</span><span>רוחב: מקיר לקיר, אם המרפסת ישרה. אם סוגרים 2–3 צדדים – ממעקה למעקה או ממעקה לקיר, ורשמו את סכום האורכים הכולל.</span></p>
                  <p><span className="measure-number">2</span><span>גובה: מהמעקה עד התקרה, או מהרצפה עד התקרה אם אין מעקה זכוכית. אם אין תקרה או שיש תקרה חלקית – קחו לחישוב גובה של 150 ס״מ. עלות הפרגולה הנדרשת במקרה כזה מחושבת בנפרד.</span></p>
                  <p className="measure-unnumbered"><Check /><span>ציינו אם יש מעקה (פרפט) והאם הזיגוג מגיע מהרצפה עד התקרה.</span></p>
                </div>
              </div>
              <img
                className="measurement-diagram"
                src={balconyMeasureDiagram.url}
                alt="תרשים מדידת מרפסת: 1 – רוחב, 2 – גובה"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div
            className={`content-block${measureTab === "pergola" ? " active" : ""}`}
            role="tabpanel"
            hidden={measureTab !== "pergola"}
          >
            <h3>איך למדוד פרגולה</h3>
            <div className="measure-layout">
              <div>
                <p className="measure-lead">אם סוגרים פרגולה, מודדים כל צד שרוצים לסגור כמלבן נפרד.</p>
                <div className="measure-list">
                  <p><span className="measure-number">1</span><span>רוחב (W): המרחק בין עמודי התמיכה.</span></p>
                  <p><span className="measure-number">2</span><span>גובה (H): המרחק מהרצפה עד החלק התחתון של הגג או הקורה.</span></p>
                  <p><span className="measure-number">3</span><span>ציינו אם הפרגולה צמודה לבית ומה אורך הצד הצמוד.</span></p>
                </div>
                <p className="measure-hint">המדידה הסופית תמיד נעשית על ידי איש מקצוע.</p>
              </div>
              <img
                className="measurement-diagram"
                src={pergolaMeasureDiagram.url}
                alt="תרשים מדידת פרגולה: 1 – רוחב, 2 – גובה, 3 – חיבור לבית"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <p className="tip measure-common-note">
            גם אם לא תזמינו דרכנו – החישוב המקצועי והתוכנית שהוכנה נשארים אצלכם. אם אתם גרים עד 60 ק״מ – הנסיעה כלולה במחיר הכנת התוכנית (<span dir="ltr" className="ltr-isolate">החל מ-300 ₪</span>). אם המרחק גדול יותר, נבקש תוספת עבור נסיעת איש המקצוע.
          </p>
          <button
            type="button"
            className="whatsapp-link whatsapp-link--standalone"
            onClick={() => window.open(whatsappUrl, "_blank", "noopener,noreferrer")}
          >
            הזמינו מודד ללא עלות
          </button>
        </div>
      </section>

      <section className="blue-band">
        <div className="section-shell">
          <SectionHeading number="07">מה קורה במדידה</SectionHeading>
          <div className="check-grid">
            {[
              "איש המקצוע מביא דוגמאות אמיתיות של פרופיל, לא תמונות.",
              "מודד את מידות המרפסת בדיוק.",
              "מראה את ההבדל בין המערכות במקום.",
              "מציין בכנות את המאפיינים והמגבלות של כל אפשרות.",
              "תוך 24 שעות מקבלים חישוב מדויק ואת התוכנית עצמה.",
              "גם אם לא תזמינו דרכנו – החישוב המקצועי והתוכנית שהוכנה נשארים אצלכם.",
            ].map((item) => <p key={item}><Check />{item}</p>)}
          </div>
        </div>
      </section>

      <section className="section-shell split-section">
        <div className="number-card">החל מ-<span className="price-nowrap ltr-isolate" dir="ltr">300 ₪</span></div>
        <div>
          <SectionHeading number="08"><span className="section-title-main">איש המקצוע מגיע בחינם.</span>{" "}<span className="section-title-sub">על מה משלמים <span dir="ltr" className="ltr-isolate">החל מ-300 ₪</span>?</span></SectionHeading>
          <p>המדידה עצמה, שירות איש המקצוע, היא בחינם. הסכום <span dir="ltr" className="ltr-isolate">החל מ-300 ₪</span> מכסה שני דברים: הכנת החישוב והתוכנית של המרפסת העתידית שלכם עם מספרים מדויקים, והגעת איש המקצוע אליכם. אם אתם גרים עד <bdi dir="ltr">60 ק״מ</bdi> – הנסיעה כלולה בסכום. אם המרחק גדול יותר, נבקש תוספת עבור נסיעת איש המקצוע.</p>
          <p>אם תחליטו לא להמשיך להזמנה, החישוב המקצועי, הצעת המחיר המפורטת והתוכנית המדויקת נשארים אצלכם. תוכלו לפנות איתם לכל יצרן.</p>
        </div>
      </section>

      <section className="soft-band">
        <div className="section-shell narrow">
          <SectionHeading number="09">איך אנחנו מרוויחים</SectionHeading>
          <p className="large-copy dark-copy">אנחנו מקבלים תגמול זהה בלי קשר לבחירה שלכם. לכן אנחנו מוכנים להראות מערכות עם פרופיל עבה יותר ומנגנונים אמינים, מערכות עם סיכון נמוך יותר לעיוות. נראה זאת במספרים ובדוגמאות במהלך המדידה. נראה גם מערכות שלא משתמשות בפתרונות עיגון מודרניים לזכוכית, וגם כאלה שכן.</p>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeading number="10">לפני ואחרי</SectionHeading>
        <div className="photo-pairs">
          {[
            { city: "אילת", folder: "pair-1" },
            { city: "פתח תקווה", folder: "pair-2" },
            { city: "רמלה", folder: "pair-3" },
          ].map(({ city, folder }) => (
            <article className="photo-pair" key={folder}>
              <div className="photo-grid">
                <figure>
                  <span className="photo-label">לפני</span>
                  <PortfolioImage
                    src={`/media/before-after/${folder}/before.webp`}
                    alt={`לפני: מרפסת, ${city}`}
                    placeholder="[מקום לתמונה]"
                  />
                </figure>
                <figure>
                  <span className="photo-label">אחרי</span>
                  <PortfolioImage
                    src={`/media/before-after/${folder}/after.webp`}
                    alt={`אחרי: סגירת מרפסת, ${city}`}
                    placeholder="[מקום לתמונה]"
                  />
                </figure>
              </div>
              <p>{city}. העבודה בוצעה על ידי השותף המבצע של הרשת.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="soft-band">
        <div className="section-shell">
          <SectionHeading number="11">פרויקטים אמיתיים של השותפים שלנו</SectionHeading>
          <PortfolioCarousel />
        </div>
      </section>

      <section className="section-shell guarantee-section">
        <SectionHeading number="12">מי המבצע ומי נותן את האחריות</SectionHeading>
        <p className="section-intro">את הסכם העבודה חותמים ישירות מול המבצע. האחריות היא שלו, ואת התנאים תראו בהסכם לפני תשלום המקדמה.</p>
        <div className="guarantee-banner">
          <ShieldCheck />
          <strong>אחריות של שנה עד <bdi dir="ltr">5</bdi> שנים, בהתאם למערכת.</strong>
        </div>
      </section>

      <section className="blue-band faq-section">
        <div className="section-shell narrow">
          <SectionHeading number="13">שאלות ותשובות</SectionHeading>
          <div className="faq-list">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div className="faq-item" key={item.question}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)}>
                    {item.question}<ChevronDown className={isOpen ? "rotate" : ""} />
                  </button>
                  {isOpen && <div className="faq-answer"><p>{item.answer}</p></div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Divider image={dividerCozy} text="ככה יכול להיראות הערב שלכם במרפסת. נשאר רק להשאיר פנייה" />

      <section id="calculation" className="section-shell form-section">
        <div className="form-copy">
          <SectionHeading number="14">קבלו הערכת מחיר ראשונית</SectionHeading>
          <p className="decorative-sign" dir="rtl">בונים בלקונים / BONIM BALCONIM</p>
        </div>
        <div className="form-panel">
          {submitted ? (
            <div className="success-message" role="status"><Check /><p>תודה! נשלח הערכת מחיר ראשונית במהלך היום</p></div>
          ) : (
            <form onSubmit={submitForm}>
              <div className="hp-field" aria-hidden="true">
                <label>
                  השאירו שדה זה ריק
                  <Input name="hp_check" type="text" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <label>טלפון<Input name="phone" type="tel" dir="ltr" required maxLength={30} autoComplete="tel" /></label>
              <label>שם<Input name="name" required minLength={2} maxLength={100} autoComplete="name" /></label>

              <div className="field-row">
                <label>רוחב (ס״מ)<Input name="width" type="number" required min="1" max="10000" inputMode="decimal" /></label>
                <label>גובה (ס״מ)<Input name="height" type="number" required min="1" max="10000" inputMode="decimal" /></label>
              </div>
              <label className="consent-row">
                <Checkbox checked={consent} onCheckedChange={(value) => setConsent(value === true)} required />
                <span>אני מסכים/ה לעיבוד המידע האישי שלי לצורך יצירת קשר בעקבות הפנייה</span>
              </label>
              {submitError ? (
                <p className="form-error" role="alert">
                  לא הצלחנו לשלוח את הפנייה. כתבו לנו בוואטסאפ או התקשרו: <span dir="ltr" className="ltr-isolate">+972 55-940-4379</span>
                </p>
              ) : null}
              <Button type="submit" size="lg" className="submit-button" disabled={sending}>
                 קבלו הערכת מחיר ראשונית <ArrowRight className="directional-icon" />
              </Button>
            </form>
          )}
          <div className="form-divider"><span>או</span></div>
          <WhatsAppButton secondary />
        </div>
      </section>

      <footer className="site-footer">
        <div className="section-shell footer-grid">
          <BrandMark compact slogan="he" />
          <div className="footer-links">
            <a href="/privacy">מדיניות פרטיות</a>
            <a href="/terms">תנאי שירות</a>
            <div className="footer-contacts">
              <div className="footer-socials">
                <a href="ЗАПОЛНИТЬ_FACEBOOK" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>
                <a href="https://t.me/bonimbalconimbot" target="_blank" rel="noreferrer" aria-label="בוט טלגרם @bonimbalconimbot"><Send /></a>
              </div>
              <p><a href="tel:+972559404379" dir="ltr" className="ltr-isolate">+972 55-940-4379</a></p>
              <p><a href="https://t.me/bonimbalconimbot" target="_blank" rel="noreferrer" dir="ltr" className="ltr-isolate">@bonimbalconimbot</a></p>
              <p>כתבו לנו: <a href="mailto:info@bonimbalconim.com" dir="ltr" className="ltr-isolate">info@bonimbalconim.com</a></p>
              <p>רחוב משה דיין 8, רמלה</p>
            </div>
          </div>
          <p dir="rtl">בונים בלקונים / BONIM BALCONIM</p>
        </div>
      </footer>

      <a className="mobile-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="כתבו לנו בוואטסאפ">
        <MessageCircle />כתבו לנו ב<span dir="ltr" className="ltr-isolate">WhatsApp</span>
      </a>
    </main>
  );
}
