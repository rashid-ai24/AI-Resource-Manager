import { useNavigate } from 'react-router-dom';
import { Bot, Server, Key, FolderOpen, Download, Upload, Settings, Zap } from 'lucide-react';
import { DashboardCard } from '../cards/DashboardCard';
import { Button } from '../ui/button';

const actions = [
  { label: 'New Agent', icon: Bot, path: '/agents', color: 'text-blue-500' },
  { label: 'New Provider', icon: Server, path: '/providers', color: 'text-green-500' },
  { label: 'New API Key', icon: Key, path: '/api-keys', color: 'text-purple-500' },
  { label: 'New Project', icon: FolderOpen, path: '/projects', color: 'text-orange-500' },
  { label: 'Import Data', icon: Download, action: 'import', color: 'text-cyan-500' },
  { label: 'Export Data', icon: Upload, action: 'export', color: 'text-pink-500' },
  { label: 'Settings', icon: Settings, path: '/settings', color: 'text-gray-500' },
];

function QuickActionsWidget() {
  const navigate = useNavigate();

  const handleAction = (action) => {
    if (action.path) {
      navigate(action.path);
    } else if (action.action === 'import') {
      // TODO: Implement import dialog
      console.log('Import clicked');
    } else if (action.action === 'export') {
      // TODO: Implement export dialog
      console.log('Export clicked');
    }
  };

  return (
    <DashboardCard title="Quick Actions" icon={Zap} compact>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant="outline"
              className="flex flex-col items-center justify-center gap-2 h-auto py-4"
              onClick={() => handleAction(action)}
            >
              <Icon className={`size-5 ${action.color}`} />
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </DashboardCard>
  );
}

export { QuickActionsWidget };
export default QuickActionsWidget;
