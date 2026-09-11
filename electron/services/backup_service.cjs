const fs = require('fs');
const path = require('path');
const { app } = require('electron');

class BackupService {
  constructor(db) {
    this.db = db;
    this.dbPath = path.join(app.getPath('userData'), 'ai-resource-manager.db');
    this.backupDir = path.join(app.getPath('userData'), 'backups');
  }

  _ensureBackupDir() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  _getTimestamp() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
  }

  _getTableCounts() {
    const tables = ['providers', 'models', 'accounts', 'api_keys', 'agents', 'projects', 'notes', 'tags', 'entity_tags', 'settings', 'usage_logs', 'activity_logs'];
    const counts = {};
    for (const table of tables) {
      try {
        const row = this.db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get();
        counts[table] = row ? row.count : 0;
      } catch {
        counts[table] = 0;
      }
    }
    return counts;
  }

  createBackup() {
    this._ensureBackupDir();

    if (!fs.existsSync(this.dbPath)) {
      throw new Error('Database file not found');
    }

    const timestamp = this._getTimestamp();
    const backupName = `backup_${timestamp}.db`;
    const backupPath = path.join(this.backupDir, backupName);
    const metaPath = backupPath + '.meta.json';

    fs.copyFileSync(this.dbPath, backupPath);

    const metadata = {
      version: '2.0.0',
      created_at: new Date().toISOString(),
      tables: this._getTableCounts(),
    };
    fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2));

    return { path: backupPath, metadata };
  }

  restoreBackup(backupFilePath) {
    if (!fs.existsSync(backupFilePath)) {
      throw new Error('Backup file not found');
    }

    if (!backupFilePath.endsWith('.db')) {
      throw new Error('Invalid backup file format');
    }

    const preRestorePath = path.join(this.backupDir, `pre_restore_${this._getTimestamp()}.db`);
    if (fs.existsSync(this.dbPath)) {
      this._ensureBackupDir();
      fs.copyFileSync(this.dbPath, preRestorePath);
    }

    fs.copyFileSync(backupFilePath, this.dbPath);

    return { success: true, preRestorePath };
  }

  listBackups() {
    this._ensureBackupDir();

    const files = fs.readdirSync(this.backupDir)
      .filter(f => f.endsWith('.db') && !f.startsWith('pre_restore_'));

    const backups = files.map(file => {
      const filePath = path.join(this.backupDir, file);
      const metaPath = filePath + '.meta.json';
      const stat = fs.statSync(filePath);
      let metadata = null;

      try {
        if (fs.existsSync(metaPath)) {
          metadata = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        }
      } catch {
        // metadata optional
      }

      return {
        name: file,
        path: filePath,
        size: stat.size,
        created_at: stat.mtime.toISOString(),
        metadata,
      };
    });

    return backups.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  deleteBackup(backupPath) {
    if (!fs.existsSync(backupPath)) {
      throw new Error('Backup file not found');
    }

    if (!backupPath.startsWith(this.backupDir)) {
      throw new Error('Invalid backup path');
    }

    fs.unlinkSync(backupPath);

    const metaPath = backupPath + '.meta.json';
    if (fs.existsSync(metaPath)) {
      fs.unlinkSync(metaPath);
    }

    return { success: true };
  }

  cleanupOldBackups(retentionDays) {
    this._ensureBackupDir();

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - retentionDays);

    const files = fs.readdirSync(this.backupDir)
      .filter(f => f.endsWith('.db') && !f.startsWith('pre_restore_'));

    let deleted = 0;
    for (const file of files) {
      const filePath = path.join(this.backupDir, file);
      const stat = fs.statSync(filePath);
      if (stat.mtime < cutoff) {
        this.deleteBackup(filePath);
        deleted++;
      }
    }

    return { deleted };
  }
}

module.exports = BackupService;
