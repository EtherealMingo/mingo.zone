import site from "./site.json";
import profile from "./profile.json";
import home from "./home.json";
import projects from "./projects.json";
import resume from "./resume.json";
import photos from "./photos.json";

export const CONTENT_MODULES = [
  "site",
  "profile",
  "home",
  "projects",
  "resume",
  "photos",
];

export const DRAFT_STORAGE_KEY = "mingo.zone:content-draft";
export const CONTENT_CHANGE_EVENT = "content-draft-changed";

export const bundledContent = {
  site,
  profile,
  home,
  projects,
  resume,
  photos,
};

export const BUNDLE_VERSION = 1;

export function cloneContent(value) {
  return JSON.parse(JSON.stringify(value));
}

export function getDraft() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getMergedContent() {
  const draft = getDraft() ?? {};
  return {
    site: draft.site ?? bundledContent.site,
    profile: draft.profile ?? bundledContent.profile,
    home: draft.home ?? bundledContent.home,
    projects: draft.projects ?? bundledContent.projects,
    resume: draft.resume ?? bundledContent.resume,
    photos: draft.photos ?? bundledContent.photos,
  };
}

export function hasDraft() {
  return getDraft() != null;
}

export function isDraftDirty() {
  const draft = getDraft();
  if (!draft) return false;
  return CONTENT_MODULES.some(
    (key) =>
      draft[key] !== undefined &&
      JSON.stringify(draft[key]) !== JSON.stringify(bundledContent[key]),
  );
}

function notifyContentChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONTENT_CHANGE_EVENT));
}

export function saveDraftBundle(bundle) {
  const next = {};
  CONTENT_MODULES.forEach((key) => {
    if (bundle[key] !== undefined) {
      next[key] = bundle[key];
    }
  });
  window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(next));
  notifyContentChange();
}

export function saveDraftModule(key, value) {
  const draft = getDraft() ?? {};
  saveDraftBundle({ ...draft, [key]: value });
}

export function clearDraft() {
  window.localStorage.removeItem(DRAFT_STORAGE_KEY);
  notifyContentChange();
}

export function toContentBundle(content) {
  return {
    version: BUNDLE_VERSION,
    site: content.site,
    profile: content.profile,
    home: content.home,
    projects: content.projects,
    resume: content.resume,
    photos: content.photos,
  };
}

export function applyTheme(theme) {
  if (typeof document === "undefined") return;
  const primary = theme?.primary || bundledContent.site.theme.primary;
  document.documentElement.style.setProperty("--color-primary-base", primary);
}

if (typeof window !== "undefined") {
  applyTheme(getMergedContent().site.theme);
}
