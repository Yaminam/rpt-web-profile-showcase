import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AchievementsProvider } from "@/hooks/use-achievements";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectPage from "./pages/ProjectPage";
// Hire page hidden for now. Restore this import, the route below, the navbar links, the prerender entry and the sitemap entry to bring it back.
// import HirePage from "./pages/HirePage";
import BooksPage from "./pages/BooksPage";
import BookPage from "./pages/BookPage";

const queryClient = new QueryClient();

/** Providers + toasters shared by the browser app and the build-time prerender (entry-server.tsx). */
export const AppShell = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AchievementsProvider>
        <Toaster />
        <Sonner />
        {children}
      </AchievementsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/projects/:slug" element={<ProjectPage />} />
    {/* <Route path="/hire" element={<HirePage />} /> */}
    <Route path="/books" element={<BooksPage />} />
    <Route path="/books/:slug" element={<BookPage />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <AppShell>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppShell>
);

export default App;
