import { HomeIcon, BriefcaseIcon, CameraIcon, FileTextIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Projects from "./pages/Projects.jsx";
import Photography from "./pages/Photography.jsx";
import Resume from "./pages/Resume.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "首页",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "项目",
    to: "/projects",
    icon: <BriefcaseIcon className="h-4 w-4" />,
    page: <Projects />,
  },
  {
    title: "摄影",
    to: "/photography",
    icon: <CameraIcon className="h-4 w-4" />,
    page: <Photography />,
  },
  {
    title: "简历",
    to: "/resume",
    icon: <FileTextIcon className="h-4 w-4" />,
    page: <Resume />,
  },
];
