import { useState } from 'react';
import { useSettings } from '../../../hooks/use-settings';
import { ipc } from '../../../lib/ipc';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Save, Upload, Download, AlertCircle, CheckCircle } from 'lucide-react';

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${checked ? 'bg-primary' : 'bg-input'}`}
    >
      <span
        className={`pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`}
      />
    </button>
  );
}

export function DataSettings() {
  const { settings, setSetting } = useSettings();
  const [backupStatus, setBackupStatus] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const [exportStatus, setExportStatus] = useState(null);
  const [exportTable, setExportTable] = useState('providers');

  const handleAutoBackupChange = (checked) => {
    setSetting({ key: 'backup.auto', value: checked });
  };

  const handleBackupIntervalChange = (value) => {
    setSetting({ key: 'backup.interval', value });
  };

  const handleRetentionChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      setSetting({ key: 'backup.retention', value: val });
    }
  };

  const handleBackup = async () => {
    setBackupStatus('loading');
    try {
      await ipc.db.backup();
      setBackupStatus('success');
      setTimeout(() => setBackupStatus(null), 3000);
    } catch (err) {
      setBackupStatus('error');
      setTimeout(() => setBackupStatus(null), 3000);
    }
  };

  const handleRestore = async () => {
    setBackupStatus('loading');
    try {
      await ipc.db.restore();
      setBackupStatus('success');
      setTimeout(() => setBackupStatus(null), 3000);
    } catch (err) {
      setBackupStatus('error');
      setTimeout(() => setBackupStatus(null), 3000);
    }
  };

  const handleExport = async (format) => {
    setExportStatus('loading');
    try {
      if (format === 'csv') {
        await ipc.db.export('csv', { table: exportTable });
      } else {
        await ipc.db.export('json');
      }
      setExportStatus('success');
      setTimeout(() => setExportStatus(null), 3000);
    } catch (err) {
      setExportStatus('error');
      setTimeout(() => setExportStatus(null), 3000);
    }
  };

  const handleImport = async () => {
    setImportStatus('loading');
    try {
      await ipc.db.import({ table: exportTable });
      setImportStatus('success');
      setTimeout(() => setImportStatus(null), 3000);
    } catch (err) {
      setImportStatus('error');
      setTimeout(() => setImportStatus(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Auto Backup</Label>
          <p className="text-xs text-muted-foreground">Automatically backup your data</p>
        </div>
        <ToggleSwitch
          checked={settings['backup.auto'] ?? true}
          onChange={handleAutoBackupChange}
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Backup Interval</Label>
        <p className="text-xs text-muted-foreground mb-2">How often to create automatic backups</p>
        <Select
          value={settings['backup.interval'] ?? 'daily'}
          onValueChange={handleBackupIntervalChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Interval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium">Retention (days)</Label>
        <p className="text-xs text-muted-foreground mb-2">Number of days to keep backups</p>
        <Input
          type="number"
          min="1"
          value={settings['backup.retention'] ?? 30}
          onChange={handleRetentionChange}
          className="w-[180px]"
        />
      </div>

      <div className="border-t pt-4">
        <Label className="text-sm font-medium mb-3 block">Manual Backup</Label>
        <div className="flex gap-3">
          <Button onClick={handleBackup} disabled={backupStatus === 'loading'}>
            {backupStatus === 'loading' ? 'Backing up...' : 'Create Backup'}
          </Button>
          <Button variant="outline" onClick={handleRestore} disabled={backupStatus === 'loading'}>
            Restore Backup
          </Button>
          {backupStatus === 'success' && (
            <span className="flex items-center text-sm text-green-600 gap-1">
              <CheckCircle className="size-4" /> Done
            </span>
          )}
          {backupStatus === 'error' && (
            <span className="flex items-center text-sm text-destructive gap-1">
              <AlertCircle className="size-4" /> Failed
            </span>
          )}
        </div>
      </div>

      <div className="border-t pt-4">
        <Label className="text-sm font-medium mb-3 block">Export Data</Label>
        <div className="flex gap-3 items-center">
          <Select value={exportTable} onValueChange={setExportTable}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="providers">Providers</SelectItem>
              <SelectItem value="models">Models</SelectItem>
              <SelectItem value="accounts">Accounts</SelectItem>
              <SelectItem value="api_keys">API Keys</SelectItem>
              <SelectItem value="agents">Agents</SelectItem>
              <SelectItem value="projects">Projects</SelectItem>
              <SelectItem value="notes">Notes</SelectItem>
              <SelectItem value="tags">Tags</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => handleExport('csv')} disabled={exportStatus === 'loading'}>
            <Download className="size-4 mr-2" /> Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport('json')} disabled={exportStatus === 'loading'}>
            <Download className="size-4 mr-2" /> Export JSON
          </Button>
          {exportStatus === 'success' && (
            <span className="flex items-center text-sm text-green-600 gap-1">
              <CheckCircle className="size-4" /> Exported
            </span>
          )}
        </div>
      </div>

      <div className="border-t pt-4">
        <Label className="text-sm font-medium mb-3 block">Import Data</Label>
        <div className="flex gap-3 items-center">
          <Select value={exportTable} onValueChange={setExportTable}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="providers">Providers</SelectItem>
              <SelectItem value="models">Models</SelectItem>
              <SelectItem value="accounts">Accounts</SelectItem>
              <SelectItem value="api_keys">API Keys</SelectItem>
              <SelectItem value="agents">Agents</SelectItem>
              <SelectItem value="projects">Projects</SelectItem>
              <SelectItem value="notes">Notes</SelectItem>
              <SelectItem value="tags">Tags</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleImport} disabled={importStatus === 'loading'}>
            <Upload className="size-4 mr-2" /> Import File
          </Button>
          {importStatus === 'success' && (
            <span className="flex items-center text-sm text-green-600 gap-1">
              <CheckCircle className="size-4" /> Imported
            </span>
          )}
          {importStatus === 'error' && (
            <span className="flex items-center text-sm text-destructive gap-1">
              <AlertCircle className="size-4" /> Failed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataSettings;
