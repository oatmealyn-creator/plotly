import { g as getDB } from './db-json_BBNVdGi8.mjs';

const GET = async ({ params }) => {
  const { username } = params;
  const db = getDB();
  const profile = db.users.find((u) => u.username === username);
  if (!profile) {
    return new Response(JSON.stringify({ detail: "Storefront not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
  const { password_hash: _, ...safeProfile } = profile;
  const items = db.items.filter((i) => i.user_id === profile.user_id);
  return new Response(JSON.stringify({ profile: safeProfile, items }), {
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
