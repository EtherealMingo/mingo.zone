import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ContentProvider, useContent } from "@/content/ContentProvider";
import { getAppRoutes } from "./nav-items";

const queryClient = new QueryClient();

function AppRoutes() {
  const { site } = useContent();
  const routes = getAppRoutes(site.nav);

  return (
    <Routes>
      {routes.map(({ id, to, Component }) => (
        <Route key={id} path={to} element={<Component />} />
      ))}
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <HashRouter>
        <ContentProvider>
          <AppRoutes />
        </ContentProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
