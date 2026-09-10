import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/ThemeProvider';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import Providers from './pages/Providers';
import Models from './pages/Models';
import Accounts from './pages/Accounts';
import ApiKeys from './pages/ApiKeys';
import Projects from './pages/Projects';
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
              <Route path="providers" element={<Providers />} />
              <Route path="models" element={<Models />} />
              <Route path="accounts" element={<Accounts />} />
              <Route path="api-keys" element={<ApiKeys />} />
              <Route path="projects" element={<Projects />} />
              <Route path="notes" element={<Notes />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
