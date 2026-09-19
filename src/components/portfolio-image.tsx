import { useState } from "react";

type PortfolioImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
};

export function PortfolioImage({ src, alt, className, loading = "lazy" }: PortfolioImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className={`portfolio-image-placeholder ${className ?? ""}`.trim()}>[Фото проекта]</span>;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}