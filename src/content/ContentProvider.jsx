import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  applyTheme,
  bundledContent,
  CONTENT_CHANGE_EVENT,
  getMergedContent,
} from "./index";

const ContentContext = createContext(bundledContent);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => getMergedContent());

  useEffect(() => {
    const refresh = () => setContent(getMergedContent());
    window.addEventListener("storage", refresh);
    window.addEventListener(CONTENT_CHANGE_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(CONTENT_CHANGE_EVENT, refresh);
    };
  }, []);

  useEffect(() => {
    applyTheme(content.site?.theme);
  }, [content.site?.theme]);

  const value = useMemo(() => content, [content]);

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
