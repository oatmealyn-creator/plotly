import { g as getDB, s as saveDB } from './db-json_BBNVdGi8.mjs';

const POST = async ({ request }) => {
  const db = getDB();
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/session_id=([^;]+)/);
  if (match) {
    const sessionId = match[1].trim();
    db.sessions = db.sessions.filter((s) => s.session_id !== sessionId);
    saveDB(db);
  }
  return new Response(
    JSON.stringify({ success: true }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": "session_id=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly"
      }
    }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
