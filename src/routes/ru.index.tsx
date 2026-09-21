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

const whatsappUrl = "https://wa.me/972559404379";

const systemGalleries = [
  {
    system: "Безрамная складывающаяся",
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
    system: "Раздвижная",
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
  {
    question: "Замер платный? У других бесплатно.",
    answer:
      "Сам замер как услуга специалиста – бесплатный. От 300 ₪ покрывают расчёт и подготовку проекта с точными цифрами и доставку специалиста к вам, особенно если вы живёте далеко. Если не закажете – профессиональный расчёт и проект остаются у вас.",
  },
  {
    question: "Почему одни системы отличаются от других?",
    answer:
      "Мы получаем одинаковое вознаграждение независимо от вашего выбора. Но у систем с более толстым профилем и надёжным механизмом объективно ниже риск деформации – покажем это в цифрах на замере. Ряд систем не используют современные решения крепежа стекол.",
  },
  {
    question: "Можно узнать цену без замера?",
    answer:
      "Пришлите размеры и получите предварительный расчёт в тот же день. Точная цена – после замера.",
  },
  {
    question: "А если ничего не устроит?",
    answer:
      "Профессиональный расчёт, смета и точный проект останутся у вас. Вы сможете обратиться с ними к любым производителям.",
  },
  {
    question: "Какие сроки поставки?",
    answer:
      "У систем местных производителей – от 24 рабочих дней. У остальных срок называем после проверки наличия у поставщика.",
  },
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

export const Route = createFileRoute("/ru/")({
  head: () => ({
    meta: [
      { title: "BONIM – подбор систем остекления балконов в Израиле" },
      {
        name: "description",
        content:
          "Диспетчерская служба подбора систем закрытия балконов и пергол. Предварительный расчёт по вашим размерам в течение дня.",
      },
      { property: "og:title", content: "BONIM – подбор систем остекления балконов в Израиле" },
      {
        property: "og:description",
        content:
          "Сравните несколько вариантов и получите предварительный расчёт по размерам вашего балкона.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "BONIM – подбор систем остекления балконов в Израиле" },
    ],
    links: [
      { rel: "alternate", hrefLang: "ru", href: "https://bonimbalconim.com/" },
      { rel: "alternate", hrefLang: "he", href: "https://bonimbalconim.com/he" },
      { rel: "canonical", href: "https://bonimbalconim.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(faqSchema),
      },
    ],
  }),
  component: Index,
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
        Написать в WhatsApp
      </a>
    </Button>
  );
}

function PortfolioCarousel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  function scrollBy(direction: -1 | 1) {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.max(280, node.clientWidth * 0.8), behavior: "smooth" });
  }

  return (
    <div className="portfolio-carousel">
      <div className="portfolio-carousel-track" ref={scrollerRef}>
        {portfolioProjects.slice(0, 5).map((project) => (
          <article className="portfolio-card" key={project.id}>
            <span className="portfolio-cover">
              <PortfolioImage src={project.cover} alt={project.title} />
              {project.videos.length > 0 ? <span className="portfolio-video-badge" aria-label="Есть видео"><Play /></span> : null}
            </span>
            <span className="portfolio-title">{project.title}</span>
            {project.date ? <span className="portfolio-date">{project.date}</span> : null}
            <span className="portfolio-description">{project.description}</span>
          </article>
        ))}
      </div>
      <div className="portfolio-carousel-nav">
        <button type="button" onClick={() => scrollBy(-1)} aria-label="Предыдущие проекты"><ChevronLeft /></button>
        <button type="button" onClick={() => scrollBy(1)} aria-label="Следующие проекты"><ChevronRight /></button>
      </div>
      <Link to="/ru/portfolio" className="portfolio-more">Смотреть ещё</Link>
    </div>
  );
}

const FORM_PAGE = "main";

function Index() {
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
       lang: "ru",
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
    <main>
      <header className="site-header">
        <a href="#top" aria-label="BONIM – в начало страницы">
          <BrandMark compact />
        </a>
        <div className="header-tools">
          <div className="language-switch" role="group" aria-label="Выбор языка">
            <Button asChild size="icon" variant="ghost" className="language-button" aria-label="Иврит">
              <Link to="/ru" lang="he">עב</Link>
            </Button>
            <Button asChild size="icon" variant="ghost" className="language-button active" aria-label="Русский язык">
              <Link to="/ru" aria-current="page">РУ</Link>
            </Button>
          </div>
          <a className="header-phone" href="tel:+972559404379" aria-label="Позвонить по телефону +972 55-940-4379" title="Позвонить">
            <Phone />
          </a>
          <WhatsAppButton secondary />
        </div>
      </header>

      <section id="top" className="hero section-shell">
        <div className="hero-copy">
          <div className="eyebrow">Диспетчерская служба подбора систем остекления</div>
          <div className="section-heading hero-heading">
            <span>01</span>
            <h1>
              <span className="hero-title-main">Балкон не в порядке?</span>{" "}
              <span className="hero-title-sub">Мы поможем подобрать систему, которая подходит именно вам</span>
            </h1>
          </div>
          <p className="hero-lead">
            Мы диспетчерская служба: помогаем выбрать систему закрытия балкона и перголы среди
            нескольких проверенных вариантов. Специалист привозит образцы, вы сравниваете вживую и
            выбираете сами.
          </p>
          <div className="hero-actions">
            <WhatsAppButton />
            <Button asChild size="lg" variant="outline">
              <a href="#calculation">
                Получить предварительный расчёт
                <ArrowDown />
              </a>
            </Button>
          </div>
          <p className="price-note">
            Выезд специалиста – бесплатно. Вы платите только за расчёт и подготовку проекта: от 300 ₪.
          </p>
        </div>
        <div className="hero-photo">
          <img
            src={balkonHero.url}
            alt="Балкон с панорамным безрамным остеклением и видом на город"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      <Divider image={dividerWindow} text="Ещё один сезон без остекления – ещё один сезон впустую" />

      <section className="section-shell problem-section">
        <SectionHeading number="02">Проблема</SectionHeading>
        <div className="problem-grid">
          {[
            "Балкон в новой квартире так и остался голой бетонной коробкой.",
            "Летом на балконе или террасе нельзя долго находиться из-за жары и ветра, а зимой – из-за холода.",
            "Из соседних домов видно всё, что происходит на балконе.",
            "Ребёнок подходит к перилам без ограждения, и это страшно.",
            "Шум с улицы мешает спокойно жить, всё покрывается пылью за день.",
          ].map((text, index) => (
            <div className="problem-item" key={text}>
              <span>0{index + 1}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <p className="statement">
          Причины разные, а решение одно: понять, какая система подходит именно вашему балкону, и
          не переплатить за то, что развалится через год.
        </p>
      </section>

      <section className="blue-band">
        <div className="section-shell narrow">
          <SectionHeading number="03">Мы диспетчеры</SectionHeading>
          <p className="large-copy">
            «Bonim» – не производитель и не фирма-установщик. Мы диспетчерская служба: специалисты,
            которые помогают подобрать нужную систему закрытия балкона или перголы среди нескольких
            проверенных производителей. Наш специалист приезжает с образцами, показывает разницу
            вживую, вы
            выбираете. Мы не навязываем вам конкретную систему – наша задача, чтобы вы выбрали то,
            что подходит именно вашему балкону и бюджету.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeading number="04">Что привезём</SectionHeading>
        <p className="section-intro">Несколько типов конструкций от разных производителей. Сравните сами.</p>
        <div className="comparison-table" role="table" aria-label="Сравнение типов конструкций">
          <div className="compare-row compare-head" role="row">
            <span>Тип конструкции</span><span>Как работает</span><span>Цена</span><span>Что важно знать</span>
          </div>
          <div className="compare-row" role="row">
            <strong>Безрамная складывающаяся</strong>
            <span>складываются гармошкой, открывают до 100% проёма, панорамный вид</span>
            <strong>от 1250 ₪/м²</strong>
            <span>толщина профиля и материал механизма различаются у разных производителей – от этого зависят надёжность и срок службы</span>
          </div>
          <div className="compare-row" role="row">
            <strong>Раздвижная</strong>
            <span>створки сдвигаются в стороны, экономят место</span>
            <strong>от 1100 ₪/м²</strong>
            <span>более бюджетное решение, подходит, если панорамное открывание не обязательно</span>
          </div>
        </div>
        <div className="system-galleries" aria-label="Фотографии систем остекления">
          {systemGalleries.map((gallery) => (
            <section className="system-gallery" key={gallery.system} aria-label={`Фотографии: ${gallery.system}`}>
              <h3>{gallery.system}</h3>
              <div className="system-photo-track">
                {gallery.photos.length === 0
                  ? [1, 2, 3, 4].map((n) => (
                      <div className="system-photo system-photo--placeholder" key={n}>
                        <span>Фото появится</span>
                      </div>
                    ))
                  : gallery.photos.map((photo, index) => (
                      <div className="system-photo" key={photo}>
                        <img
                          src={photo}
                          alt={`${gallery.system}: фото ${index + 1}`}
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
          У систем есть отличия, которые не видны на фото: толщина профиля, материал колёс,
          технология изготовления и установки, замки и стоперы и многое другое, а также срок поставки
          – от 24 рабочих дней у систем местных производителей, у остальных срок называем после
          проверки наличия у поставщика. Специалист привезёт несколько образцов и честно покажет
          разницу вживую, с цифрами в руках. Вы увидите отличие в толщине профиля своими глазами.
        </p>
      </section>

      <Divider image={dividerSunbeam} text="Один замер – и балкон начинает работать на вас, а не простаивать" />

      <section className="soft-band">
        <div className="section-shell">
          <SectionHeading number="05">Как это работает</SectionHeading>
          <ol className="steps-grid">
            {[
              "Звоните, пишете в WhatsApp, оставляете заявку на сайте или в Facebook.",
              "Присылаете размеры балкона – чем точнее, тем точнее будет предварительный расчёт.",
              "В тот же день получаете предварительный расчёт с разными тарифами.",
              "Оплачиваете подготовку итогового проекта: от 300 ₪.",
              "Специалист бесплатно приезжает с образцами, снимает точные размеры.",
              "Получаете итоговое коммерческое предложение с точной суммой.",
              "Выбираете удобную вам систему. Если не решились, то расчёт и готовый профессиональный проект остаются у вас в любом случае.",
              "Подписываете договор напрямую с исполнителем.",
            ].map((step, index) => (
              <li key={step}><span>{index + 1}</span><p>{step}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell measure-section">
        <SectionHeading number="06">Предварительный расчёт по вашим размерам</SectionHeading>
        <p className="section-intro measure-intro">
          Не обязательно вызывать специалиста, чтобы понять порядок цен. Напишите размеры балкона или
          перголы (инструкция ниже) – в WhatsApp, через форму на сайте или в заявке Facebook – и мы
          пришлём предварительный расчёт в течение дня. Чем точнее вы пришлёте размеры, тем точнее
          будет предварительная стоимость.
        </p>
        <div className="tab-container">
          <div className="tab-header" role="tablist" aria-label="Инструкция по замеру">
            <button
              type="button"
              role="tab"
              aria-selected={measureTab === "balcony"}
              className={`header-btn${measureTab === "balcony" ? " active" : ""}`}
              onClick={() => setMeasureTab("balcony")}
            >
              <Ruler aria-hidden="true" />
              Инструкция для балкона/лоджии
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={measureTab === "pergola"}
              className={`header-btn${measureTab === "pergola" ? " active" : ""}`}
              onClick={() => setMeasureTab("pergola")}
            >
              <Leaf aria-hidden="true" />
              Инструкция для перголы/террасы
            </button>
          </div>

          <div
            className={`content-block${measureTab === "balcony" ? " active" : ""}`}
            role="tabpanel"
            hidden={measureTab !== "balcony"}
          >
            <h3>Как измерить самостоятельно</h3>
            <div className="measure-layout">
              <div>
                <div className="measure-list">
                  <p><span className="measure-number">1</span><span>Ширина: от стены до стены, если балкон прямой. Если закрываете 2–3 стороны, от перил до перил или от перил до стены и укажите общую сумму длин.</span></p>
                  <p><span className="measure-number">2</span><span>Высота: от перил до потолка или от пола до потолка, если нет стеклянного ограждения (мааке цхухит). Если нет потолка или частично нет потолка, возьмите для расчёта высоту 150 см. Стоимость перголы, необходимой в этом случае, рассчитывают отдельно.</span></p>
                  <p className="measure-unnumbered"><Check /><span>Отметьте, есть ли парапет и доходит ли остекление от пола до потолка.</span></p>
                </div>
              </div>
              <img
                className="measurement-diagram"
                src={balconyMeasureDiagram.url}
                alt="Схема замера балкона: 1 – ширина, 2 – высота"
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
            <h3>Как измерить перголу</h3>
            <div className="measure-layout">
              <div>
                <p className="measure-lead">Если вы закрываете перголу, измерьте каждую сторону, которую хотите закрыть, как отдельный прямоугольник.</p>
                <div className="measure-list">
                  <p><span className="measure-number">1</span><span>Ширина (W): расстояние между опорными столбами.</span></p>
                  <p><span className="measure-number">2</span><span>Высота (H): расстояние от пола до нижней части крыши или балки.</span></p>
                  <p><span className="measure-number">3</span><span>Отметьте, есть ли примыкание к дому и длина этого примыкания (стороны).</span></p>
                </div>
                <p className="measure-hint">Окончательный замер всегда делает специалист.</p>
              </div>
              <img
                className="measurement-diagram"
                src={pergolaMeasureDiagram.url}
                alt="Схема замера перголы: 1 – ширина, 2 – высота, 3 – примыкание к дому"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <p className="tip measure-common-note">
            Даже если вы не закажете через нас – профессиональный расчёт и подготовленный проект
            остаются у вас. Если вы живёте до 60 километров – дорога входит в стоимость подготовки
            проекта (от 300 ₪).
            Если расстояние больше, мы попросим доплату за проезд специалиста.
          </p>
          <button
            type="button"
            className="whatsapp-link whatsapp-link--standalone"
            onClick={() => window.open(whatsappUrl, "_blank", "noopener,noreferrer")}
          >
            Заказать бесплатный выезд замерщика
          </button>
        </div>
      </section>

      <section className="blue-band">
        <div className="section-shell">
          <SectionHeading number="07">Что происходит на замере</SectionHeading>
          <div className="check-grid">
            {[
              "Специалист привозит настоящие образцы профиля, не картинки.",
              "Снимает точные размеры вашего балкона.",
              "Показывает разницу между системами вживую.",
              "Честно называет особенности и ограничения каждого варианта.",
              "В течение 24 часов получаете точный расчёт и сам проект.",
              "Даже если вы не закажете через нас – профессиональный расчёт и подготовленный проект остаются у вас.",
            ].map((item) => <p key={item}><Check />{item}</p>)}
          </div>
        </div>
      </section>

      <section className="section-shell split-section">
        <div className="number-card">от <span className="price-nowrap">300 ₪</span></div>
        <div>
          <SectionHeading number="08"><span className="section-title-main">Специалист&nbsp;приезжает бесплатно.</span>{" "}<span className="section-title-sub">За что от 300 ₪?</span></SectionHeading>
          <p>Сам замер – услуга специалиста – бесплатный. От 300 ₪ покрывают две вещи: подготовку расчёта и проекта вашего будущего балкона с точными цифрами, и доставку специалиста к вам. Если вы живёте до 60 километров – дорога входит в сумму. Если расстояние больше, мы попросим доплату за проезд специалиста.</p>
          <p>Если решите не заказывать дальше проект, профессиональный расчёт, смета и точный проект останутся у вас. Вы сможете обратиться с ними к любым производителям.</p>
        </div>
      </section>

      <section className="soft-band">
        <div className="section-shell narrow">
          <SectionHeading number="09">Как мы зарабатываем</SectionHeading>
          <p className="large-copy dark-copy">Мы получаем одинаковое вознаграждение независимо от вашего выбора. Потому готовы продемонстрировать системы с более толстым профилем и надёжными механизмами, системы, у которых ниже риск деформации. Покажем это в цифрах и на образцах на замере. Покажем системы, которые не используют современные решения крепежа стекол и которые используют.</p>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeading number="10">Было и стало</SectionHeading>
        <div className="photo-pairs">
          {[
            { city: "Эйлат", folder: "pair-1" },
            { city: "Петах-Тиква", folder: "pair-2" },
            { city: "Рамле", folder: "pair-3" },
          ].map(({ city, folder }) => (
            <article className="photo-pair" key={folder}>
              <div className="photo-grid">
                <figure>
                  <span className="photo-label">ДО</span>
                  <PortfolioImage
                    src={`/media/before-after/${folder}/before.webp`}
                    alt={`До: балкон, ${city}`}
                    placeholder="[Место для фотографии]"
                  />
                </figure>
                <figure>
                  <span className="photo-label">ПОСЛЕ</span>
                  <PortfolioImage
                    src={`/media/before-after/${folder}/after.webp`}
                    alt={`После: остекление балкона, ${city}`}
                    placeholder="[Место для фотографии]"
                  />
                </figure>
              </div>
              <p>{city}. Работу выполнил партнёр-исполнитель сети.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="soft-band">
        <div className="section-shell">
          <SectionHeading number="11">Реальные объекты наших партнёров</SectionHeading>
          <PortfolioCarousel />
        </div>
      </section>

      <section className="section-shell guarantee-section">
        <SectionHeading number="12">Кто исполнитель, чья гарантия</SectionHeading>
        <p className="section-intro">Договор на работы вы подписываете напрямую с исполнителем. Гарантия – его, условия увидите в договоре до оплаты аванса.</p>
        <div className="guarantee-banner">
          <ShieldCheck />
          <strong>Гарантия от 1 года до 5 лет в зависимости от системы.</strong>
        </div>
      </section>

      <section className="blue-band faq-section">
        <div className="section-shell narrow">
          <SectionHeading number="13">Вопросы и возражения</SectionHeading>
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

      <Divider image={dividerCozy} text="Вот каким может быть ваш вечер на балконе. Осталось оставить заявку" />

      <section id="calculation" className="section-shell form-section">
        <div className="form-copy">
          <SectionHeading number="14">Получить предварительный расчёт</SectionHeading>
          <p className="decorative-sign" dir="rtl">בונים בלקונים / BONIM BALCONIM</p>
        </div>
        <div className="form-panel">
          {submitted ? (
            <div className="success-message" role="status"><Check /><p>Спасибо, предварительный расчёт пришлём в течение дня</p></div>
          ) : (
            <form onSubmit={submitForm}>
              <div className="hp-field" aria-hidden="true">
                <label>
                  Оставьте это поле пустым
                  <Input name="hp_check" type="text" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <label>Телефон<Input name="phone" type="tel" required maxLength={30} autoComplete="tel" /></label>
              <label>Имя<Input name="name" required minLength={2} maxLength={100} autoComplete="name" /></label>

              <div className="field-row">
                <label>Ширина (см)<Input name="width" type="number" required min="1" max="10000" inputMode="decimal" /></label>
                <label>Высота (см)<Input name="height" type="number" required min="1" max="10000" inputMode="decimal" /></label>
              </div>
              <label className="consent-row">
                <Checkbox checked={consent} onCheckedChange={(value) => setConsent(value === true)} required />
                <span>Согласен(на) на обработку персональных данных для связи по заявке</span>
              </label>
              {submitError ? (
                <p className="form-error" role="alert">
                  Не удалось отправить заявку. Напишите нам в WhatsApp или позвоните: +972 55-940-4379
                </p>
              ) : null}
              <Button type="submit" size="lg" className="submit-button" disabled={sending}>
                Получить предварительный расчёт <ArrowRight />
              </Button>
            </form>
          )}
          <div className="form-divider"><span>или</span></div>
          <WhatsAppButton secondary />
        </div>
      </section>

      <footer className="site-footer">
        <div className="section-shell footer-grid">
          <BrandMark compact slogan="ru" />
          <div className="footer-links">
            <Link to="/ru/privacy">Политика конфиденциальности</Link>
            <Link to="/ru/terms">Условия оказания услуг</Link>
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

      <a className="mobile-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Написать в WhatsApp">
        <MessageCircle />Написать в WhatsApp
      </a>
    </main>
  );
}
