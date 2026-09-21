import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Play, X } from "lucide-react";

import { PortfolioImage } from "@/components/portfolio-image";
import { MobileWhatsApp, SiteFooter, SiteHeader, WhatsAppButton } from "@/components/site-chrome";
import { portfolioProjects, type PortfolioProject } from "@/data/portfolio";

export const Route = createFileRoute("/ru/portfolio")({
  head: () => ({
    meta: [
      { title: "Реальные объекты наших партнёров – BONIM" },
      {
        name: "description",
        content:
          "Галерея балконов и пергол, закрытых партнёрами-исполнителями BONIM: город, описание проекта и фотографии выполненных работ.",
      },
      { property: "og:title", content: "Реальные объекты наших партнёров – BONIM" },
      {
        property: "og:description",
        content: "Фотографии реальных балконов и пергол, остеклённых партнёрами BONIM в Израиле.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [active, setActive] = useState<PortfolioProject | null>(null);

  return (
    <main>
       <SiteHeader homeHref="/" lang="ru" />

      <section className="section-shell portfolio-page">
        <Link to="/" className="legal-back">← На главную</Link>
        <h1>Реальные объекты наших партнёров</h1>
        <p className="section-intro">
          Нажмите на карточку, чтобы посмотреть фотографии и видео проекта.
        </p>

        <div className="portfolio-grid">
          {portfolioProjects.map((project) => (
            <button type="button" className="portfolio-card" key={project.id} onClick={() => setActive(project)}>
              <span className="portfolio-cover">
                <PortfolioImage src={project.cover} alt={project.title} />
                {project.videos.length > 0 ? <span className="portfolio-video-badge" aria-label="Есть видео"><Play /></span> : null}
              </span>
              <span className="portfolio-title">{project.title}</span>
              {project.date ? <span className="portfolio-date">{project.date}</span> : null}
              <span className="portfolio-description">{project.description}</span>
            </button>
          ))}
        </div>

        <div className="portfolio-cta">
          <WhatsAppButton />
        </div>
      </section>

      {active ? (
        <div className="portfolio-viewer" role="dialog" aria-modal="true" aria-label={active.title}>
          <div className="portfolio-viewer-panel">
            <button type="button" className="portfolio-viewer-close" onClick={() => setActive(null)} aria-label="Закрыть">
              <X />
            </button>
            <h2>{active.title}</h2>
            {active.date ? <p>{active.date}</p> : null}
            <div className="portfolio-viewer-photos">
              {active.photos.length === 0 && active.videos.length === 0 ? (
                <div className="portfolio-cover">[Фото проекта]</div>
              ) : null}
              {active.photos.map((photo, index) => (
                <PortfolioImage key={photo} src={photo} alt={`${active.title}, фото ${index + 1}`} />
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

       <SiteFooter lang="ru" />
       <MobileWhatsApp lang="ru" />
    </main>
  );
}
