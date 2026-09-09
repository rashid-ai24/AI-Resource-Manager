import db from '../../electron/database.cjs';
import fs from 'fs';
import path from 'path';

export function initializeDatabase() {
  const migrationsDir = path.join(__dirname, 'migrations');
  const seedsDir = path.join(__dirname, 'seeds');

  // Run migrations
  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

  for (const file of migrationFiles) {
    const migration = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    db.exec(migration);
  }

  // Run seeds
  const seedFiles = fs.readdirSync(seedsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

  for (const file of seedFiles) {
    const seed = fs.readFileSync(path.join(seedsDir, file), 'utf8');
    db.exec(seed);
  }
}

export default db;
