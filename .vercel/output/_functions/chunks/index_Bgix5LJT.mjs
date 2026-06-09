import { g as getDB, s as saveDB } from './db-json_BBNVdGi8.mjs';
import { g as getSessionUser } from './_session_DH4uVZhr.mjs';

const GET = async ({ request }) => {
  const db = getDB();
  const user = getSessionUser(request, db);
  if (!user) {
    return new Response(JSON.stringify({ detail: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const userItems = db.items.filter((item) => item.user_id === user.user_id);
  return new Response(JSON.stringify(userItems), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
const POST = async ({ request }) => {
  const db = getDB();
  const user = getSessionUser(request, db);
  if (!user) {
    return new Response(JSON.stringify({ detail: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const body = await request.json();
  const { name, price, category, description, stock, image_base64 } = body;
  if (!name || isNaN(parseFloat(price))) {
    return new Response(JSON.stringify({ detail: "Name and numeric price are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const newItem = {
    item_id: `item_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    user_id: user.user_id,
    name,
    price: parseFloat(price),
    category: category || "Plants",
    description: description || "",
    stock: parseInt(stock, 10) || 1,
    image_base64: image_base64 || "",
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  db.items.push(newItem);
  saveDB(db);
  return new Response(JSON.stringify(newItem), {
    status: 201,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
