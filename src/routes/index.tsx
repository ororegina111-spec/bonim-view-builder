import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Eye,
  Facebook,
  FileCheck2,
  MessageCircle,
  MoveHorizontal,
  Phone,
  Ruler,
  Send,
  ShieldCheck,
} from "lucide-react";

import logoAsset from "@/assets/bonim-logo.png.asset.json";
import dividerCozy from "@/assets/divider-cozy-interior.png.asset.json";
import dividerSunbeam from "@/assets/divider-glass-sunbeam.png.asset.json";
import dividerWindow from "@/assets/divider-window.png.asset.json";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const whatsappUrl =
  "https://wa.me/ЗАПОЛНИТЬ_НОМЕР?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%20%D0%BE%D1%81%D1%82%D0%B5%D0%BA%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B1%D0%B0%D0%BB%D0%BA%D0%BE%D0%BD%D0%B0";

const faqItems = [
  {
    question: "Замер платный? У других бесплатно.",
    answer:
      "Сам замер как услуга специалиста – бесплатный. От 300 ₪ покрывают расчёт и подготовку проекта с точными цифрами и доставку специалиста к вам, особенно если вы живёте далеко. Если не закажете – профессиональный расчёт и проект остаются у вас.",
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
    question: "А если после замера ничего не подойдёт?",
    answer:
      "Профессиональный расчёт, смета и точный проект останутся у вас. Вы сможете обратиться с ними к любым производителям.",
  },
  {
    question: "Какие сроки поставки?",
    answer:
      "У систем местного производства – от 29 рабочих дней. У остальных срок называем после проверки наличия у поставщика.",
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BONIM — подбор систем остекления балконов в Израиле" },
      {
        name: "description",
        content:
          "Диспетчерская служба подбора систем закрытия балконов и пергол. Предварительный расчёт по вашим размерам в течение дня.",
      },
      { property: "og:title", content: "BONIM — подбор систем остекления балконов" },
      {
        property: "og:description",
        content:
          "Сравните несколько вариантов и получите предварительный расчёт по размерам вашего балкона.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "brand-mark brand-mark--compact" : "brand-mark"}>
      <img src={logoAsset.url} alt="בונים BONIM" width="1024" height="768" />
      <p className="brand-slogan" dir="rtl">
        <span>סוגרים את המרפסת.</span>
        <span>פותחים את הנוף.</span>
      </p>
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

function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [measureTab, setMeasureTab] = useState<"balcony" | "pergola">("balcony");
  const [language, setLanguage] = useState<"ru" | "he">("ru");

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity() || !consent) {
      form.reportValidity();
      return;
    }
    setSubmitted(true);
  }

  return (
    <main>
      <header className="site-header">
        <a href="#top" aria-label="BONIM — в начало страницы">
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
              aria-label="Иврит — в разработке"
              onClick={() => setLanguage("he")}
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
              onClick={() => setLanguage("ru")}
            >
              РУ
            </Button>
          </div>
          <span className="header-phone" aria-label="Телефон будет добавлен позже" title="Телефон будет добавлен позже">
            <Phone />
          </span>
          <WhatsAppButton secondary />
        </div>
      </header>

      <section id="top" className="hero section-shell">
        <div className="hero-copy">
          <div className="eyebrow">Диспетчерская служба подбора систем остекления</div>
          <h1>
            <span className="hero-title-main">Балкон не в порядке?</span>{" "}
            <span className="hero-title-sub">Мы поможем подобрать систему, которая подходит именно вам</span>
          </h1>
          <p className="hero-lead">
            Мы диспетчерская служба: помогаем выбрать систему закрытия балкона и перголы среди
            нескольких проверенных вариантов. Специалист привозит образцы, вы сравниваете вживую и
            выбираете сами.
          </p>
          <div className="hero-actions">
            <WhatsAppButton />
            <Button asChild size="lg" variant="outline">
              <a href="#calculation">
                Узнать предварительный расчёт
                <ArrowDown />
              </a>
            </Button>
          </div>
          <p className="price-note">
            Выезд специалиста – бесплатно. Вы платите только за расчёт и подготовку проекта: от 300 ₪.
          </p>
        </div>
        <div className="hero-photo-placeholder" role="img" aria-label="Место для фотографии балкона с панорамным остеклением balkon_1.jpg">
          <span>balkon_1.jpg</span>
          <p>Фото будет добавлено после загрузки файла</p>
        </div>
      </section>

      <Divider image={dividerWindow} text="Ещё один сезон без остекления – ещё один сезон впустую" />

      <section className="section-shell problem-section">
        <SectionHeading number="02">Проблема</SectionHeading>
        <div className="problem-grid">
          {[
            "Балкон в новой квартире так и остался голой бетонной коробкой.",
            "Летом на террасе нельзя находиться от жары и ветра, зимой – от холода.",
            "С соседних домов видно всё, что происходит на балконе.",
            "Ребёнок подходит к открытому окну, и это страшно.",
            "Шум с улицы не даёт открыть окно, всё покрывается пылью за день.",
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
            <strong>Безрамная складная</strong>
            <span>складываются гармошкой, открывают до 100% проёма, панорамный вид</span>
            <strong>от 1500 ₪/м²</strong>
            <span>толщина профиля и материал механизма различаются у разных производителей – от этого зависят надёжность и срок службы</span>
          </div>
          <div className="compare-row" role="row">
            <strong>Раздвижная</strong>
            <span>створки сдвигаются в стороны, экономят место</span>
            <strong>от 1200 ₪/м²</strong>
            <span>более бюджетное решение, подходит, если панорамное открывание не обязательно</span>
          </div>
        </div>
        <div className="system-galleries" aria-label="Фотографии систем остекления">
          {["Безрамная складная", "Раздвижная"].map((system) => (
            <section className="system-gallery" key={system} aria-label={`Фотографии: ${system}`}>
              <h3>{system}</h3>
              <div className="system-photo-track">
                {[1, 2, 3, 4].map((photo) => (
                  <div className="system-photo-placeholder" key={photo}>
                    <span>{photo}/4</span>
                    <p>Фото появится</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="info-strip">
          У систем есть отличия, которые не видны на фото: толщина профиля, материал колёс и замков,
          срок поставки – от 29 рабочих дней у одних до нескольких месяцев у других. Специалист
          привезёт несколько образцов и честно покажет разницу вживую, с цифрами в руках. Вы увидите
          отличие в толщине профиля своими глазами.
        </p>
      </section>

      <Divider image={dividerSunbeam} text="Один замер – и балкон начинает работать на вас, а не простаивать" />

      <section className="soft-band">
        <div className="section-shell">
          <SectionHeading number="05">Как это работает</SectionHeading>
          <ol className="steps-grid">
            {[
              "Звоните, пишете в WhatsApp, оставляете заявку на сайте или в Facebook.",
              "Присылаете размеры балкона – чем точнее, тем точнее будет расчёт.",
              "В тот же день получаете предварительный расчёт.",
              "Оплачиваете расчёт и подготовку проекта: от 300 ₪.",
              "Специалист бесплатно приезжает с образцами, снимает точные размеры.",
              "Получаете итоговое коммерческое предложение с точной суммой.",
              "Выбираете систему или отказываетесь – расчёт и проект остаются у вас в любом случае.",
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
          Не обязательно вызывать специалиста, чтобы понять порядок цен. Напишите свои размеры – в
          WhatsApp, через форму на сайте или в заявке Facebook – и мы пришлём предварительный расчёт
          в течение дня. Чем точнее вы пришлёте размеры, тем точнее будет предварительная стоимость.
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
              📏 Инструкция для балкона/лоджии
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={measureTab === "pergola"}
              className={`header-btn${measureTab === "pergola" ? " active" : ""}`}
              onClick={() => setMeasureTab("pergola")}
            >
              🌿 Инструкция для перголы/террасы
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
                  <p><Ruler />Мерить нужно только сам проём, который закрываете – не весь балкон.</p>
                  <p><MoveHorizontal />Ширина: от стены до стены. Если закрываете 2–3 стороны – укажите общую сумму.</p>
                  <p><ArrowDown />Высота: от пола (или направляющей) до потолка или верхнего ограждения.</p>
                  <p><Check />Правило трёх точек: сделайте по три измерения ширины и высоты. Ширину измерьте вверху, внизу и в середине. Высоту – с левого края, с правого края и посередине. Для расчёта возьмите наименьшее значение – так система точно встанет.</p>
                  <p><Eye />Отметьте, есть ли парапет и доходит ли остекление от пола до потолка.</p>
                </div>
                <p className="tip">
                  Точный замер всегда делает специалист. Для предварительного расчёта достаточно
                  рулетки, блокнота и телефона. Или{" "}
                  <button type="button" className="whatsapp-link" onClick={() => window.open(whatsappUrl, "_blank", "noopener,noreferrer")}>
                    заказать бесплатный выезд замерщика
                  </button>
                </p>
              </div>
              <div className="measurement-placeholder" aria-label="Место для схемы замера">
                <Ruler />
                <span>[Место для схемы замера]</span>
              </div>
            </div>
          </div>

          <div
            className={`content-block${measureTab === "pergola" ? " active" : ""}`}
            role="tabpanel"
            hidden={measureTab !== "pergola"}
          >
            <h3>Как измерить перголу</h3>
            <div className="measure-list">
              <p><Ruler />Мерить нужно только проём перголы – не всю террасу.</p>
              <p><MoveHorizontal />Ширина: от стены до наружного края террасы или между опорами.</p>
              <p><ArrowDown />Вылет: от стены до наружного края крыши перголы.</p>
              <p><ArrowDown />Высота: от пола террасы до точки крепления – стены или потолка.</p>
              <p><Eye />Отметьте, есть ли рядом стена для крепления и куда выходят опоры.</p>
            </div>
            <p className="tip">
              Точный замер всегда делает специалист. Для предварительного расчёта достаточно
              рулетки, блокнота и телефона. Или{" "}
              <button type="button" className="whatsapp-link" onClick={() => window.open(whatsappUrl, "_blank", "noopener,noreferrer")}>
                заказать бесплатный выезд замерщика
              </button>
            </p>
          </div>
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
              "В тот же день вы получаете точный расчёт.",
              "Даже если вы не закажете у нас – профессиональный расчёт и подготовленный проект остаются у вас.",
            ].map((item) => <p key={item}><Check />{item}</p>)}
          </div>
        </div>
      </section>

      <section className="section-shell split-section">
        <div className="number-card">от <span className="price-nowrap">300 ₪</span></div>
        <div>
          <SectionHeading number="08"><span className="section-title-main">Специалист приезжает бесплатно.</span>{" "}<span className="section-title-sub">За что от 300 ₪?</span></SectionHeading>
          <p>Сам замер – услуга специалиста – бесплатный. От 300 ₪ покрывают две вещи: подготовку расчёта и проекта вашего будущего балкона с точными цифрами, и доставку специалиста к вам. Если вы живёте за 300–400 километров – дорога тоже стоит денег, и это тоже входит в сумму.</p>
          <p>Если решите не заказывать дальше проект, профессиональный расчёт, смета и точный проект останутся у вас. Вы сможете обратиться с ними к любым производителям.</p>
        </div>
      </section>

      <section className="soft-band">
        <div className="section-shell narrow">
          <SectionHeading number="09">Как мы зарабатываем</SectionHeading>
          <p className="large-copy dark-copy">Вознаграждение мы получаем от производителей, и оно одинаковое, какую бы систему вы ни выбрали. Наш доход не зависит от вас – мы помогаем вам подобрать систему бесплатно.</p>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeading number="10">Было и стало</SectionHeading>
        <div className="photo-pairs">
          {[1, 2, 3].map((item) => (
            <article className="photo-pair" key={item}>
              <div className="photo-grid"><div><span>ДО</span>[Место для фотографии]</div><div><span>ПОСЛЕ</span>[Место для фотографии]</div></div>
              <p>[Город]. Работу выполнил партнёр-исполнитель сети.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="soft-band">
        <div className="section-shell">
          <SectionHeading number="11">Отзывы о работах наших исполнителей</SectionHeading>
          <div className="reviews-grid">
            {[1, 2, 3].map((item) => <blockquote key={item}>«Отзыв появится после первых заказов»</blockquote>)}
          </div>
        </div>
      </section>

      <section className="section-shell guarantee-section">
        <SectionHeading number="12">Кто исполнитель, чья гарантия</SectionHeading>
        <p className="section-intro">Договор на работы вы подписываете напрямую с исполнителем. Гарантия – его, условия увидите в договоре до оплаты аванса.</p>
        <div className="guarantee-grid">
          <div><ShieldCheck /><strong>1 год</strong><span>Гарантия на фурнитуру – 1 год.</span></div>
          <div><FileCheck2 /><strong>5 лет</strong><span>Гарантия на саму систему (профиль и конструкцию) – 5 лет.</span></div>
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
          <SectionHeading number="14">Узнать предварительный расчёт</SectionHeading>
          <p className="decorative-sign" dir="rtl">בונים בלקונים / BONIM BALCONIM</p>
        </div>
        <div className="form-panel">
          {submitted ? (
            <div className="success-message" role="status"><Check /><p>Спасибо, предварительный расчёт пришлём в течение дня</p></div>
          ) : (
            <form onSubmit={submitForm}>
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
              <Button type="submit" size="lg" className="submit-button">Узнать предварительный расчёт <ArrowRight /></Button>
            </form>
          )}
          <div className="form-divider"><span>или</span></div>
          <WhatsAppButton secondary />
        </div>
      </section>

      <footer className="site-footer">
        <div className="section-shell footer-grid">
          <BrandMark compact />
          <div className="footer-links">
            <a href="https://modernbuilding.co.il/confidenc/ii/" target="_blank" rel="noreferrer">Политика конфиденциальности</a>
            <span>Условия оказания услуг</span>
            <div className="footer-contacts">
              <div className="footer-socials">
                <a href="ЗАПОЛНИТЬ_FACEBOOK" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>
                <a href="ЗАПОЛНИТЬ_TELEGRAM" target="_blank" rel="noreferrer" aria-label="Telegram"><Send /></a>
              </div>
              <p>ЗАПОЛНИТЬ_НОМЕР</p>
              <p>ЗАПОЛНИТЬ_АДРЕС</p>
              <p>ЗАПОЛНИТЬ_НОМЕР_КОМПАНИИ</p>
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
