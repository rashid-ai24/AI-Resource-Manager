import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/ThemeProvider';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import AgentDetail from './components/features/agents/agent-detail';
import Providers from './pages/Providers';
import ProviderDetail from './components/features/providers/provider-detail';
import Models from './pages/Models';
import ModelDetail from './components/features/models/model-detail';
import Accounts from './pages/Accounts';
import AccountDetail from './components/features/accounts/account-detail';
import ApiKeys from './pages/ApiKeys';
import ApiKeyDetail from './components/features/api-keys/api-key-detail';
import Projects from './pages/Projects';
import ProjectDetail from './components/features/projects/project-detail';
import Notes from './pages/Notes';
import Settings from './pages/Settings';
import { queryClient } from './lib/query-client';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <HashRouter>
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
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
