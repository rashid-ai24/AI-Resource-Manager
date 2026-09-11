const fs = require('fs');
const path = require('path');
const { app } = require('electron');

class ImportExportService {
  constructor(db) {
    this.db = db;
  }

  exportJSON() {
    const tables = [
      'providers', 'models', 'accounts', 'api_keys', 'agents',
      'projects', 'notes', 'tags', 'entity_tags', 'settings',
      'usage_logs', 'activity_logs'
    ];

    const data = {};
    for (const table of tables) {
      try {
        data[table] = this.db.prepare(`SELECT * FROM ${table}`).all();
      } catch {
        data[table] = [];
      }
    }

    const exportData = {
      version: '2.0.0',
      exported_at: new Date().toISOString(),
      data,
    };

    return exportData;
  }

  exportCSV(tableName) {
    const allowedTables = [
      'providers', 'models', 'accounts', 'api_keys', 'agents',
      'projects', 'notes', 'tags', 'settings', 'usage_logs', 'activity_logs'
    ];

    if (!allowedTables.includes(tableName)) {
      throw new Error(`Invalid table: ${tableName}`);
    }

    let rows;
    try {
      rows = this.db.prepare(`SELECT * FROM ${tableName}`).all();
    } catch {
      return '';
    }

    if (rows.length === 0) return '';

    const headers = Object.keys(rows[0]);
    const csvRows = rows.map(row =>
      headers.map(h => {
        const val = row[h];
        if (val === null || val === undefined) return '';
        const str = String(val);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      }).join(',')
    );

    return [headers.join(','), ...csvRows].join('\n');
  }

  importJSON(jsonData) {
    if (!jsonData || !jsonData.data || typeof jsonData.data !== 'object') {
      throw new Error('Invalid JSON structure');
    }

    const imported = {};
    const allowedTables = [
      'providers', 'models', 'accounts', 'api_keys', 'agents',
      'projects', 'notes', 'tags', 'settings', 'usage_logs', 'activity_logs'
    ];

    for (const [table, rows] of Object.entries(jsonData.data)) {
      if (!allowedTables.includes(table) || !Array.isArray(rows)) {
        continue;
      }

      let count = 0;
      const insert = this.db.transaction(() => {
        for (const row of rows) {
          try {
            const columns = Object.keys(row);
            const values = Object.values(row);
            const placeholders = columns.map(() => '?').join(', ');
            const sql = `INSERT OR IGNORE INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
            const result = this.db.prepare(sql).run(...values);
            if (result.changes > 0) count++;
          } catch {
            // skip invalid rows
          }
        }
      });

      insert();
      imported[table] = count;
    }

    return imported;
  }

  importCSV(tableName, csvContent) {
    const allowedTables = [
      'providers', 'models', 'accounts', 'api_keys', 'agents',
      'projects', 'notes', 'tags', 'settings'
    ];

    if (!allowedTables.includes(tableName)) {
      throw new Error(`Cannot import into table: ${tableName}`);
    }

    const lines = csvContent.trim().split('\n');
    if (lines.length < 2) return 0;

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

    let count = 0;
    const insert = this.db.transaction(() => {
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => {
          const trimmed = v.trim();
          if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
            return trimmed.slice(1, -1).replace(/""/g, '"');
          }
          if (trimmed === 'NULL' || trimmed === '') return null;
          if (!isNaN(trimmed) && trimmed !== '') return Number(trimmed);
          return trimmed;
        });

        if (values.length !== headers.length) continue;

        try {
          const placeholders = headers.map(() => '?').join(', ');
          const sql = `INSERT OR IGNORE INTO ${tableName} (${headers.join(', ')}) VALUES (${placeholders})`;
          const result = this.db.prepare(sql).run(...values);
          if (result.changes > 0) count++;
        } catch {
          // skip invalid rows
        }
      }
    });

    insert();
    return count;
  }
}

module.exports = ImportExportService;
