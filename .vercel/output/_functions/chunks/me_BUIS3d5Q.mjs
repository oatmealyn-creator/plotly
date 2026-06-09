import { g as getDB } from './db-json_BBNVdGi8.mjs';
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
  const { password_hash: _, ...safeUser } = user;
  return new Response(JSON.stringify(safeUser), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
