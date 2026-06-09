import { g as getDB, s as saveDB } from './db-json_BBNVdGi8.mjs';
import { g as getSessionUser } from './_session_DH4uVZhr.mjs';

const PUT = async ({ request, params }) => {
  const db = getDB();
  const user = getSessionUser(request, db);
  if (!user) {
    return new Response(JSON.stringify({ detail: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const item = db.items.find((i) => i.item_id === params.id && i.user_id === user.user_id);
  if (!item) {
    return new Response(JSON.stringify({ detail: "Item not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
  const body = await request.json();
  if (body.name !== void 0) item.name = body.name;
  if (body.price !== void 0) item.price = parseFloat(body.price);
  if (body.category !== void 0) item.category = body.category;
  if (body.description !== void 0) item.description = body.description;
  if (body.stock !== void 0) item.stock = parseInt(body.stock, 10) || 0;
  if (body.image_base64 !== void 0) item.image_base64 = body.image_base64;
  saveDB(db);
  return new Response(JSON.stringify(item), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
const DELETE = async ({ request, params }) => {
  const db = getDB();
  const user = getSessionUser(request, db);
  if (!user) {
    return new Response(JSON.stringify({ detail: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const before = db.items.length;
  db.items = db.items.filter((i) => !(i.item_id === params.id && i.user_id === user.user_id));
  if (db.items.length === before) {
    return new Response(JSON.stringify({ detail: "Item not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
  saveDB(db);
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
