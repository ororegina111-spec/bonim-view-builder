export type PortfolioProject = {
  id: number;
  city: string;
  title: string;
  description: string;
  cover: string;
  photos: string[];
  videos: string[];
};

type PortfolioSource = Omit<PortfolioProject, "cover" | "photos" | "videos"> & {
  photos: string[];
  videos: string[];
};

function createProject(project: PortfolioSource): PortfolioProject {
  const folder = `/media/portfolio/project-${String(project.id).padStart(2, "0")}`;

  return {
    ...project,
    cover: `${folder}/1.webp`,
    photos: project.photos.map((name) => `${folder}/${name}.webp`),
    videos: project.videos.map((name) => `${folder}/${name}.mp4`),
  };
}

export const portfolioProjects: PortfolioProject[] = [
  createProject({ id: 1, city: "Эйлат", title: "Эйлат_09.26", description: "Система остекления от пола до потолка балкона и дверь в служебное помещение", photos: ["1", "2"], videos: ["video-3"] }),
  createProject({ id: 2, city: "Рамла", title: "Рамла_08.26", description: "Система неасафот (гармошка) – выход из салона на балкон. И закрытие балкона Г-образной формы", photos: ["1", "2", "3", "4", "5", "6", "7", "8"], videos: [] }),
  createProject({ id: 3, city: "Петах-Тиква", title: "Петах-Тиква_09.26", description: "Стеклянные перила и закрытие балкона П-образной формы", photos: ["1", "2", "3"], videos: ["video-4", "video-x1"] }),
  createProject({ id: 4, city: "Петах-Тиква", title: "Петах-Тиква_01.26", description: "Стеклянные перила и закрытие балкона П-образной формы", photos: ["1", "2", "3", "4", "5"], videos: ["video-2", "video-6"] }),
  createProject({ id: 5, city: "Петах-Тиква", title: "Петах-Тиква_10.25", description: "Укрепление и модернизация перголы и закрытие балкона сложной формы", photos: ["1", "2", "3", "4", "5", "6"], videos: ["video-5", "video-6"] }),
  createProject({ id: 6, city: "Хайфа", title: "Хайфа_02.26", description: "Закрытие балкона Г-образной формы", photos: ["1", "2", "3", "4", "5"], videos: ["video-6"] }),
  createProject({ id: 7, city: "Раанана", title: "Раанана_03.26", description: "Пергола и закрытие балкона прямой формы и 3 отдельных окна", photos: ["1", "2", "3", "4", "8", "11", "12", "13"], videos: ["video-13", "video-14", "video-15", "video-6"] }),
  createProject({ id: 8, city: "Беэр-Шева", title: "Беэр-Шева", description: "Закрытие балкона Г-образной формы", photos: ["1", "2"], videos: ["video-4"] }),
  createProject({ id: 9, city: "Мазкерет-Батья", title: "Мазкерет-Батья_10.25", description: "Закрытие перголы безрамными системами остекления, включая организацию фундамента", photos: ["1", "2", "3", "4", "5", "6"], videos: ["video-7", "video-8"] }),
  createProject({ id: 10, city: "Ашкелон", title: "Ашкелон_09.25", description: "Закрытие большого балкона и стеклянная дверь между двумя частями балкона", photos: ["1", "2", "3", "4"], videos: ["video-4"] }),
  createProject({ id: 11, city: "Петах-Тиква", title: "Петах-Тиква_02.26", description: "Стеклянные перила и закрытие балкона П-образной формы", photos: ["1", "2"], videos: ["video-3"] }),
  createProject({ id: 12, city: "Нагария", title: "Нагария_08.26", description: "Пергола и закрытие балкона Г-образной формы", photos: ["1", "9", "10", "14", "15", "16", "17"], videos: ["video-2", "video-7"] }),
];