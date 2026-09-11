import { useState, useEffect } from 'react';
import { ipc } from '../../../lib/ipc';
import { Label } from '@/components/ui/label';

export function AboutSettings() {
  const [version, setVersion] = useState('');
  const [dbPath, setDbPath] = useState('');

  useEffect(() => {
    ipc.app.version().then(setVersion).catch(() => setVersion('2.0.0'));
    ipc.app.path().then(setDbPath).catch(() => setDbPath('Unknown'));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium">Application</Label>
        <div className="mt-2 space-y-1">
          <p className="text-sm"><span className="text-muted-foreground">Name:</span> AI Resource Manager</p>
          <p className="text-sm"><span className="text-muted-foreground">Version:</span> {version}</p>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Database</Label>
        <div className="mt-2">
          <p className="text-sm break-all"><span className="text-muted-foreground">Location:</span> {dbPath}</p>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Credits</Label>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-muted-foreground">Built with Electron, React, and SQLite</p>
          <p className="text-sm text-muted-foreground">UI inspired by Linear, Raycast, and Notion</p>
        </div>
      </div>
    </div>
  );
}

export default AboutSettings;
