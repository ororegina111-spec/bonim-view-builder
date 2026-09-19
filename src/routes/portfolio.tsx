import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";

import { MobileWhatsApp, SiteFooter, SiteHeader, WhatsAppButton } from "@/components/site-chrome";
import { portfolioProjects, type PortfolioProject } from "@/data/portfolio";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Реальные объекты наших партнёров — BONIM" },
      {
        name: "description",
        content:
          "Галерея балконов и пергол, закрытых партнёрами-исполнителями BONIM: город, описание проекта и фотографии выполненных работ.",
      },
      { property: "og:title", content: "Реальные объекты наших партнёров — BONIM" },
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
      <SiteHeader homeHref="/" />

      <section className="section-shell portfolio-page">
        <Link to="/" className="legal-back">← На главную</Link>
        <h1>Реальные объекты наших партнёров</h1>
        <p className="section-intro">
          Работы выполнены партнёрами-исполнителями сети. Нажмите на карточку, чтобы посмотреть все
          фотографии проекта.
        </p>

        <div className="portfolio-grid">
          {portfolioProjects.map((project) => (
            <button type="button" className="portfolio-card" key={project.id} onClick={() => setActive(project)}>
              <span className="portfolio-cover">
                {project.cover ? (
                  <img src={project.cover} alt={project.title} loading="lazy" decoding="async" />
                ) : (
                  "[Фото проекта]"
                )}
              </span>
              <span className="portfolio-city">{project.city}</span>
              <span className="portfolio-title">{project.title}</span>
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
            <p>{active.city}</p>
            <div className="portfolio-viewer-photos">
              {active.photos.length > 0 ? (
                active.photos.map((photo) => (
                  <img key={photo} src={photo} alt={active.title} loading="lazy" decoding="async" />
                ))
              ) : (
                <div className="portfolio-cover">[Фото проекта]</div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <SiteFooter />
      <MobileWhatsApp />
    </main>
  );
}
