import * as fs from 'node:fs';
import * as nodePath from 'node:path';

const DB_PATH = process.env.VERCEL ? "/tmp/db.json" : nodePath.join(process.cwd(), "db.json");
function initDB() {
  if (!fs.existsSync(DB_PATH)) {
    const initial = { users: [], items: [], sessions: [] };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), "utf-8");
    return initial;
  }
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch {
    const initial = { users: [], items: [], sessions: [] };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), "utf-8");
    return initial;
  }
}
function getDB() {
  return initDB();
}
function saveDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

export { getDB as g, saveDB as s };
