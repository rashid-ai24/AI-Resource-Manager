import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/ThemeProvider';
import AppLayout from './components/layout/AppLayout';
import { CommandPalette } from './components/command-palette';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { queryClient } from './lib/query-client';
import { Skeleton } from './components/ui/skeleton';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Agents = lazy(() => import('./pages/Agents'));
const AgentDetail = lazy(() => import('./components/features/agents/agent-detail'));
const Providers = lazy(() => import('./pages/Providers'));
const ProviderDetail = lazy(() => import('./components/features/providers/provider-detail'));
const Models = lazy(() => import('./pages/Models'));
const ModelDetail = lazy(() => import('./components/features/models/model-detail'));
const Accounts = lazy(() => import('./pages/Accounts'));
const AccountDetail = lazy(() => import('./components/features/accounts/account-detail'));
const ApiKeys = lazy(() => import('./pages/ApiKeys'));
const ApiKeyDetail = lazy(() => import('./components/features/api-keys/api-key-detail'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./components/features/projects/project-detail'));
const Notes = lazy(() => import('./pages/Notes'));
const NoteDetail = lazy(() => import('./components/features/notes/note-detail'));
const Tags = lazy(() => import('./pages/Tags'));
const TagDetail = lazy(() => import('./components/features/tags/tag-detail'));
const SearchPage = lazy(() => import('./pages/Search'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Activity = lazy(() => import('./pages/Activity'));
const Settings = lazy(() => import('./pages/Settings'));

function PageLoader() {
  return (
    <div className="p-6 space-y-4" aria-busy="true" aria-label="Loading page">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-96" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    </div>
  );
}

function AppContent() {
  useKeyboardShortcuts();

  return (
    <>
      <CommandPalette />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="agents" element={<Agents />} />
            <Route path="agents/:id" element={<AgentDetail />} />
            <Route path="providers" element={<Providers />} />
            <Route path="providers/:id" element={<ProviderDetail />} />
            <Route path="models" element={<Models />} />
            <Route path="models/:id" element={<ModelDetail />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="accounts/:id" element={<AccountDetail />} />
            <Route path="api-keys" element={<ApiKeys />} />
            <Route path="api-keys/:id" element={<ApiKeyDetail />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="notes" element={<Notes />} />
            <Route path="notes/:id" element={<NoteDetail />} />
            <Route path="tags" element={<Tags />} />
            <Route path="tags/:id" element={<TagDetail />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="activity" element={<Activity />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <AppContent />
        </HashRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
