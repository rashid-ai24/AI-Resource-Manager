import { Bell, Check, CheckCheck, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { useNotifications, useMarkAsRead, useMarkAllAsRead, useUnreadCount } from '../../hooks/use-notifications';
import { Button } from '../../common/ActionButton';
import { Badge } from '../../common/Badge';
import { Skeleton } from '../../ui/skeleton';

const typeConfig = {
  info: { icon: Info, color: 'text-blue-500' },
  success: { icon: Check, color: 'text-green-500' },
  warning: { icon: AlertTriangle, color: 'text-yellow-500' },
  error: { icon: AlertCircle, color: 'text-destructive' },
};

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

function NotificationItem({ notification, onMarkAsRead }) {
  const config = typeConfig[notification.notification_type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div
      className={`p-3 rounded-lg border transition-colors ${
        notification.is_read ? 'bg-card opacity-70' : 'bg-accent/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 shrink-0 ${config.color}`}>
          <Icon className="size-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium truncate">{notification.title}</h4>
            {!notification.is_read && (
              <span className="size-2 rounded-full bg-primary shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
          <span className="text-xs text-muted-foreground mt-1 block">
            {formatRelativeTime(notification.created_at)}
          </span>
        </div>
        {!notification.is_read && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkAsRead(notification.id)}
            className="shrink-0"
          >
            <Check className="size-3" />
          </Button>
        )}
      </div>
    </div>
  );
}

function NotificationDisplay({ onClose }) {
  const { data: notifications, isLoading } = useNotifications({ limit: 20 });
  const { data: unreadCount } = useUnreadCount();
  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();

  const handleMarkAsRead = (id) => {
    markAsReadMutation.mutate(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  return (
    <div className="w-80 max-h-96 flex flex-col">
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <Bell className="size-4" />
          <h3 className="font-semibold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="text-xs">{unreadCount}</Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} title="Mark all as read">
              <CheckCheck className="size-4" />
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="size-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-3 rounded-lg border">
              <Skeleton className="h-4 w-48 mb-2" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))
        ) : !notifications || notifications.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground text-sm">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
            />
          ))
        )}
      </div>
    </div>
  );
}

function NotificationBadge() {
  const { data: unreadCount, isLoading } = useUnreadCount();

  if (isLoading || !unreadCount) return null;

  return (
    <Badge variant="destructive" className="text-xs min-w-5 h-5 justify-center">
      {unreadCount > 99 ? '99+' : unreadCount}
    </Badge>
  );
}

export { NotificationDisplay, NotificationBadge };
export default NotificationDisplay;
