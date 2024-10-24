import { createClient } from '@libsql/client';

export const db = createClient({
  url: import.meta.env.VITE_DB_URL as string,
  authToken: import.meta.env.VITE_DB_AUTH_TOKEN as string
});

export const initSchema = async () => {
  try {
    // Create agents table first
    await db.execute(`
      CREATE TABLE IF NOT EXISTS agents (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        phoneNumber TEXT NOT NULL,
        socialLink TEXT,
        uplineId TEXT NULL,
        createdAt INTEGER DEFAULT (unixepoch()),
        FOREIGN KEY (uplineId) REFERENCES agents(id) ON DELETE SET NULL
      ) WITHOUT ROWID;
    `);

    // Create reports table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        agentId TEXT NOT NULL,
        agentName TEXT NOT NULL,
        reportedById TEXT NOT NULL,
        reportedByName TEXT NOT NULL,
        reason TEXT NOT NULL,
        whatsappNumber TEXT NOT NULL,
        status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'resolved', 'rejected')),
        createdAt INTEGER DEFAULT (unixepoch()),
        FOREIGN KEY (agentId) REFERENCES agents(id) ON DELETE CASCADE,
        FOREIGN KEY (reportedById) REFERENCES agents(id) ON DELETE CASCADE
      );
    `);

    // Create notices table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS notices (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        priority TEXT CHECK(priority IN ('low', 'medium', 'high')) NOT NULL,
        status TEXT CHECK(status IN ('active', 'archived')) DEFAULT 'active',
        createdAt INTEGER DEFAULT (unixepoch())
      ) WITHOUT ROWID;
    `);

    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database schema:', error);
    throw error;
  }
};