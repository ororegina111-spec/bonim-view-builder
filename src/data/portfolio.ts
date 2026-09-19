export type PortfolioProject = {
  id: string;
  city: string;
  title: string;
  description: string;
  cover: string | null;
  photos: string[];
};

/**
 * Все объекты партнёров. Чтобы добавить новый проект — допишите одну строку в этот список.
 * cover: null и пустой photos дают заглушку «[Фото проекта]».
 */
export const portfolioProjects: PortfolioProject[] = [
  { id: "project-1", city: "[Город]", title: "[Название проекта]", description: "[Краткое описание]", cover: null, photos: [] },
  { id: "project-2", city: "[Город]", title: "[Название проекта]", description: "[Краткое описание]", cover: null, photos: [] },
  { id: "project-3", city: "[Город]", title: "[Название проекта]", description: "[Краткое описание]", cover: null, photos: [] },
  { id: "project-4", city: "[Город]", title: "[Название проекта]", description: "[Краткое описание]", cover: null, photos: [] },
  { id: "project-5", city: "[Город]", title: "[Название проекта]", description: "[Краткое описание]", cover: null, photos: [] },
];
