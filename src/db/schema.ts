export const schema = {
  agents: `
    CREATE TABLE IF NOT EXISTS agents (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      phoneNumber TEXT NOT NULL,
      socialLink TEXT,
      uplineId TEXT REFERENCES agents(id),
      createdAt INTEGER DEFAULT (unixepoch())
    )
  `,

  reports: `
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
      FOREIGN KEY (agentId) REFERENCES agents(id)
    )
  `,

  notices: `
    CREATE TABLE IF NOT EXISTS notices (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      priority TEXT CHECK(priority IN ('low', 'medium', 'high')) NOT NULL,
      status TEXT CHECK(status IN ('active', 'archived')) DEFAULT 'active',
      createdAt INTEGER DEFAULT (unixepoch())
    )
  `
};