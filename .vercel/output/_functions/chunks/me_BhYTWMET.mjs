import { g as getDB, s as saveDB } from './db-json_BBNVdGi8.mjs';
import { g as getSessionUser } from './_session_DH4uVZhr.mjs';

const PUT = async ({ request }) => {
  const db = getDB();
  const user = getSessionUser(request, db);
  if (!user) {
    return new Response(JSON.stringify({ detail: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const body = await request.json();
  const { store_name, username, bio, whatsapp_number } = body;
  if (username !== void 0) {
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return new Response(JSON.stringify({ detail: "Invalid username slug" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const existing = db.users.find((u) => u.username === username && u.user_id !== user.user_id);
    if (existing) {
      return new Response(JSON.stringify({ detail: "Username slug is already taken" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
  const oldUsername = user.username;
  if (store_name !== void 0) user.store_name = store_name;
  if (username !== void 0) user.username = username;
  if (bio !== void 0) user.bio = bio;
  if (whatsapp_number !== void 0) user.whatsapp_number = whatsapp_number;
  if (username !== void 0 && oldUsername !== username) {
    db.items.forEach((item) => {
      if (item.user_id === user.user_id) {
        item.user_id = user.user_id;
      }
    });
  }
  saveDB(db);
  const { password_hash: _, ...safeUser } = user;
  return new Response(JSON.stringify(safeUser), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
