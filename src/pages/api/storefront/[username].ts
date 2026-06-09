import type { APIRoute } from "astro";
import { getStorefront } from "@/lib/supabase";

export const GET: APIRoute = async ({ params }) => {
  const { username } = params;
  if (!username) {
    return new Response(JSON.stringify({ detail: "Username is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { user, items } = await getStorefront(username);
  if (!user) {
    return new Response(JSON.stringify({ detail: "Storefront not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { password_hash: _, ...safeProfile } = user;

  return new Response(JSON.stringify({ profile: safeProfile, items }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
