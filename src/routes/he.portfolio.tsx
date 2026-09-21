import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Play, X } from "lucide-react";

import { PortfolioImage } from "@/components/portfolio-image";
import { MobileWhatsApp, SiteFooter, SiteHeader, WhatsAppButton } from "@/components/site-chrome";
import { portfolioProjects, type PortfolioProject } from "@/data/portfolio";

export const Route = createFileRoute("/he/portfolio")({
  head: () => ({
    meta: [
       { title: "פרויקטים אמיתיים של השותפים שלנו – BONIM" },
      {
        name: "description",
        content:
          "העבודות בוצעו על ידי השותפים המבצעים של הרשת. לחצו על הכרטיס כדי לראות תמונות וסרטונים של הפרויקט.",
      },
       { property: "og:title", content: "פרויקטים אמיתיים של השותפים שלנו – BONIM" },
      {
        property: "og:description",
         content: "העבודות בוצעו על ידי השותפים המבצעים של הרשת. לחצו על הכרטיס כדי לראות תמונות וסרטונים של הפרויקט.",
      },
      { property: "og:type", content: "website" },
       { property: "og:url", content: "https://bonimbalconim.com/he/portfolio" },
      { name: "twitter:card", content: "summary_large_image" },
       { name: "twitter:title", content: "פרויקטים אמיתיים של השותפים שלנו – BONIM" },
       { name: "twitter:description", content: "העבודות בוצעו על ידי השותפים המבצעים של הרשת. לחצו על הכרטיס כדי לראות תמונות וסרטונים של הפרויקט." },
    ],
     links: [
       { rel: "canonical", href: "https://bonimbalconim.com/he/portfolio" },
       { rel: "alternate", hrefLang: "he", href: "https://bonimbalconim.com/he/portfolio" },
       { rel: "alternate", hrefLang: "ru", href: "https://bonimbalconim.com/portfolio" },
       { rel: "preconnect", href: "https://fonts.googleapis.com" },
       { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
       { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800&display=swap" },
     ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [active, setActive] = useState<PortfolioProject | null>(null);

  return (
    <main className="he-page" lang="he" dir="rtl">
       <SiteHeader homeHref="/he" lang="he" />

      <section className="section-shell portfolio-page">
        <Link to="/he" className="legal-back">→ לדף הבית</Link>
        <h1>פרויקטים אמיתיים של השותפים שלנו</h1>
        <p className="section-intro">
          העבודות בוצעו על ידי השותפים המבצעים של הרשת. לחצו על הכרטיס כדי לראות תמונות וסרטונים של הפרויקט.
        </p>

        <div className="portfolio-grid">
          {portfolioProjects.map((project) => (
            <button type="button" className="portfolio-card" key={project.id} onClick={() => setActive(project)}>
              <span className="portfolio-cover">
                 <PortfolioImage src={project.cover} alt={project.titleHe} placeholder="[תמונת הפרויקט]" />
                 {project.videos.length > 0 ? <span className="portfolio-video-badge" aria-label="יש סרטון"><Play /></span> : null}
              </span>
               <span className="portfolio-title">{project.titleHe}</span>
               {project.dateHe ? <span className="portfolio-date">{project.dateHe}</span> : null}
               <span className="portfolio-description">{project.descriptionHe}</span>
            </button>
          ))}
        </div>

        <div className="portfolio-cta">
           <WhatsAppButton lang="he" />
        </div>
      </section>

      {active ? (
         <div className="portfolio-viewer" role="dialog" aria-modal="true" aria-label={active.titleHe}>
          <div className="portfolio-viewer-panel">
             <button type="button" className="portfolio-viewer-close" onClick={() => setActive(null)} aria-label="סגירה">
              <X />
            </button>
             <h2>{active.titleHe}</h2>
             {active.dateHe ? <p>{active.dateHe}</p> : null}
            <div className="portfolio-viewer-photos">
              {active.photos.length === 0 && active.videos.length === 0 ? (
                 <div className="portfolio-cover">[תמונת הפרויקט]</div>
              ) : null}
              {active.photos.map((photo, index) => (
                 <PortfolioImage key={photo} src={photo} alt={`${active.titleHe}, תמונה ${index + 1}`} placeholder="[תמונת הפרויקט]" />
              ))}
              {active.videos.map((video) => (
                <video key={video} controls playsInline preload="none" poster={active.cover}>
                  <source src={video} type="video/mp4" />
                </video>
              ))}
            </div>
          </div>
        </div>
      ) : null}

        <SiteFooter lang="he" />
        <MobileWhatsApp lang="he" />
    </main>
  );
}
