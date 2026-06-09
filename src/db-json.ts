import * as fs from 'fs';
import * as path from 'path';

export interface User {
  username: string;
  name: string;
  password?: string;
  store_name?: string;
  bio?: string;
  whatsapp_number?: string;
  picture?: string;
  google_id?: string;
}

export interface Item {
  item_id: string;
  username: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  stock: number;
  image_base64?: string;
}

export interface Session {
  session_id: string;
  username: string;
  createdAt: string;
}

interface DBStructure {
  users: User[];
  items: Item[];
  sessions: Session[];
}

const DB_PATH = path.join(process.cwd(), 'db.json');

function initDB(): DBStructure {
  if (!fs.existsSync(DB_PATH)) {
    const initial: DBStructure = {
      users: [],
      items: [],
      sessions: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
  try {
    const content = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading DB, resetting', err);
    const initial: DBStructure = {
      users: [],
      items: [],
      sessions: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
}

export function getDB(): DBStructure {
  return initDB();
}

export function saveDB(db: DBStructure) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}
