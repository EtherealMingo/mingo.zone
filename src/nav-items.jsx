import {
  HomeIcon,
  BriefcaseIcon,
  CameraIcon,
  FileTextIcon,
} from "lucide-react";
import Index from "./pages/Index.jsx";
import Projects from "./pages/Projects.jsx";
import Photography from "./pages/Photography.jsx";
import Resume from "./pages/Resume.jsx";
import Admin from "./pages/admin/Admin.jsx";

export const PAGE_REGISTRY = {
  home: { defaultTo: "/", icon: HomeIcon, Component: Index },
  projects: {
    defaultTo: "/projects",
    icon: BriefcaseIcon,
    Component: Projects,
  },
  photography: {
    defaultTo: "/photography",
    icon: CameraIcon,
    Component: Photography,
  },
  resume: { defaultTo: "/resume", icon: FileTextIcon, Component: Resume },
};

export const ADMIN_ROUTE = { to: "/admin", Component: Admin };

export function getNavItems(siteNav) {
  return (siteNav || [])
    .filter((item) => item.visible !== false)
    .map((item) => {
      const page = PAGE_REGISTRY[item.id];
      if (!page) return null;
      return {
        id: item.id,
        title: item.title,
        to: item.to || page.defaultTo,
        Icon: page.icon,
      };
    })
    .filter(Boolean);
}

export function getPagePath(siteNav, id) {
  const item = (siteNav || []).find((entry) => entry.id === id);
  return item?.to || PAGE_REGISTRY[id]?.defaultTo || "/";
}

export function getAppRoutes(siteNav) {
  const routes = Object.entries(PAGE_REGISTRY).map(([id, page]) => {
    const navItem = (siteNav || []).find((item) => item.id === id);
    return {
      id,
      to: navItem?.to || page.defaultTo,
      Component: page.Component,
    };
  });
  routes.push({
    id: "admin",
    to: ADMIN_ROUTE.to,
    Component: ADMIN_ROUTE.Component,
  });
  return routes;
}
