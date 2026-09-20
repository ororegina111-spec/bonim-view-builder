import { useState } from "react";

type PortfolioImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  placeholder?: string;
};

export function PortfolioImage({
  src,
  alt,
  className,
  loading = "lazy",
  placeholder = "[Фото проекта]",
}: PortfolioImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={`portfolio-image-frame ${className ?? ""}`.trim()}>
      {!loaded || failed ? <span className="portfolio-image-placeholder">{placeholder}</span> : null}
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          className={loaded ? "is-loaded" : ""}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : null}
    </span>
  );
}
