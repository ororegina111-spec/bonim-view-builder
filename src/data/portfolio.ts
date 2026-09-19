export type PortfolioProject = {
  id: number;
  title: string;
  date: string;
  description: string;
  titleHe: string;
  dateHe: string;
  descriptionHe: string;
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
  createProject({ id: 1, title: "Эйлат", date: "сентябрь 2026", description: "Система остекления от пола до потолка балкона и дверь в служебное помещение", titleHe: "אילת", dateHe: "ספטמבר 2026", descriptionHe: "מערכת זכוכית מהרצפה עד התקרה במרפסת ודלת לחדר השירות", photos: ["1", "2"], videos: ["video-3"] }),
  createProject({ id: 2, title: "Рамла", date: "август 2026", description: "Система неасафот (гармошка) – выход из салона на балкон. И закрытие балкона Г-образной формы", titleHe: "רמלה", dateHe: "אוגוסט 2026", descriptionHe: "מערכת נאספות (אקורדיון) ביציאה מהסלון למרפסת וסגירת מרפסת בצורת L", photos: ["1", "2", "3", "4", "5", "6", "7", "8"], videos: [] }),
  createProject({ id: 3, title: "Петах-Тиква", date: "сентябрь 2026", description: "Стеклянные перила и закрытие балкона П-образной формы", titleHe: "פתח תקווה", dateHe: "ספטמבר 2026", descriptionHe: "מעקות זכוכית וסגירת מרפסת בצורת U", photos: ["1", "2", "3"], videos: ["video-4", "video-x1"] }),
  createProject({ id: 4, title: "Петах-Тиква", date: "январь 2026", description: "Стеклянные перила и закрытие балкона П-образной формы", titleHe: "פתח תקווה", dateHe: "ינואר 2026", descriptionHe: "מעקות זכוכית וסגירת מרפסת בצורת U", photos: ["1", "2", "3", "4", "5"], videos: ["video-2", "video-6"] }),
  createProject({ id: 5, title: "Петах-Тиква", date: "октябрь 2025", description: "Укрепление и модернизация перголы и закрытие балкона сложной формы", titleHe: "פתח תקווה", dateHe: "אוקטובר 2025", descriptionHe: "חיזוק ושדרוג של הפרגולה וסגירת מרפסת בצורה מורכבת", photos: ["1", "2", "3", "4", "5", "6"], videos: ["video-5", "video-6"] }),
  createProject({ id: 6, title: "Хайфа", date: "февраль 2026", description: "Закрытие балкона Г-образной формы", titleHe: "חיפה", dateHe: "פברואר 2026", descriptionHe: "סגירת מרפסת בצורת L", photos: ["1", "2", "3", "4", "5"], videos: ["video-6"] }),
  createProject({ id: 7, title: "Раанана", date: "март 2026", description: "Пергола и закрытие балкона прямой формы и 3 отдельных окна", titleHe: "רעננה", dateHe: "מרץ 2026", descriptionHe: "פרגולה וסגירת מרפסת ישרה ושלושה חלונות נפרדים", photos: ["1", "2", "3", "4", "8", "11", "12", "13"], videos: ["video-13", "video-14", "video-15", "video-6"] }),
  createProject({ id: 8, title: "Беэр-Шева", date: "", description: "Закрытие балкона Г-образной формы", titleHe: "באר שבע", dateHe: "", descriptionHe: "סגירת מרפסת בצורת L", photos: ["1", "2"], videos: ["video-4"] }),
  createProject({ id: 9, title: "Мазкерет-Батья", date: "октябрь 2025", description: "Закрытие перголы безрамными системами остекления, включая организацию фундамента", titleHe: "מזכרת בתיה", dateHe: "אוקטובר 2025", descriptionHe: "סגירת פרגולה במערכות זכוכית ללא מסגרת, כולל הכנת יסודות", photos: ["1", "2", "3", "4", "5", "6"], videos: ["video-7", "video-8"] }),
  createProject({ id: 10, title: "Ашкелон", date: "сентябрь 2025", description: "Закрытие большого балкона и стеклянная дверь между двумя частями балкона", titleHe: "אשקלון", dateHe: "ספטמבר 2025", descriptionHe: "סגירת המרפסת הגדולה ודלת זכוכית בין שני חלקי המרפסת", photos: ["1", "2", "3", "4"], videos: ["video-4"] }),
  createProject({ id: 11, title: "Петах-Тиква", date: "февраль 2026", description: "Стеклянные перила и закрытие балкона П-образной формы", titleHe: "פתח תקווה", dateHe: "פברואר 2026", descriptionHe: "מעקות זכוכית וסגירת מרפסת בצורת U", photos: ["1", "2"], videos: ["video-3"] }),
  createProject({ id: 12, title: "Нагария", date: "август 2026", description: "Пергола и закрытие балкона Г-образной формы", titleHe: "נהריה", dateHe: "אוגוסט 2026", descriptionHe: "פרגולה וסגירת מרפסת בצורת L", photos: ["1", "9", "10", "14", "15", "16", "17"], videos: ["video-2", "video-7"] }),
];
