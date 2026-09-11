import { useState } from 'react';
import { useActivity } from '../../../hooks/use-activity';
import { ActivityItem } from './activity-item';
import { PageHeader } from '../../layout/PageHeader';
import { EmptyState } from '../../feedback/EmptyState';
import { LoadingPage } from '../../feedback/LoadingSpinner';
import { ErrorState } from '../../feedback/ErrorState';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../common/Badge';
import { Clock, Filter } from 'lucide-react';

const entityTypes = [
  { value: 'all', label: 'All Entities' },
  { value: 'agent', label: 'Agents' },
  { value: 'provider', label: 'Providers' },
  { value: 'model', label: 'Models' },
  { value: 'account', label: 'Accounts' },
  { value: 'api_key', label: 'API Keys' },
  { value: 'project', label: 'Projects' },
  { value: 'note', label: 'Notes' },
  { value: 'tag', label: 'Tags' },
];

const actionTypes = [
  { value: 'all', label: 'All Actions' },
  { value: 'created', label: 'Created' },
  { value: 'updated', label: 'Updated' },
  { value: 'deleted', label: 'Deleted' },
];

function ActivityList() {
  const [entityFilter, setEntityFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');

  const filters = {};
  if (entityFilter !== 'all') filters.entityType = entityFilter;
  if (actionFilter !== 'all') filters.action = actionFilter;

  const { data: activities, isLoading, error, refetch } = useActivity(filters);

  if (isLoading) return <LoadingPage label="Loading activity..." />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  const list = activities || [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Activity"
        description="View all system activity"
        icon={Clock}
      />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <Select value={entityFilter} onValueChange={setEntityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Entity Type" />
            </SelectTrigger>
            <SelectContent>
              {entityTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            {actionTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Badge variant="secondary">{list.length}</Badge>
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="No activity found"
          description="No activity matches your filters."
        />
      ) : (
        <div className="rounded-lg border divide-y">
          {list.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}

export { ActivityList };
export default ActivityList;
