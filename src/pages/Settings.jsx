import { Moon, Sun, Monitor } from 'lucide-react';

export default function Settings() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure your application</p>
      </div>
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold">Appearance</h2>
        <p className="text-sm text-muted-foreground mb-4">Customize the look and feel</p>
        <div className="flex gap-4">
          <button className="inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium">
            <Sun className="h-4 w-4" />
            Light
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium">
            <Moon className="h-4 w-4" />
            Dark
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium">
            <Monitor className="h-4 w-4" />
            System
          </button>
        </div>
      </div>
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold">Backup & Restore</h2>
        <p className="text-sm text-muted-foreground mb-4">Manage your data backups</p>
        <div className="flex gap-4">
          <button className="inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium">
            Create Backup
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium">
            Restore Backup
          </button>
        </div>
      </div>
    </div>
  );
}
