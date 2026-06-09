import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";
import { getSessionUser } from "../auth/_session";

export const PUT: APIRoute = async ({ request }) => {
  const user = await getSessionUser(request);
  if (!user) {
    return new Response(JSON.stringify({ detail: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json();
  const { store_name, username, bio, whatsapp_number } = body;

  if (username !== undefined) {
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return new Response(JSON.stringify({ detail: "Invalid username slug" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const { data: existing } = await supabase.from("users").select("user_id").eq("username", username).neq("user_id", user.user_id).single();
    if (existing) {
      return new Response(JSON.stringify({ detail: "Username slug is already taken" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  const updates: Record<string, string> = {};
  if (store_name !== undefined) updates.store_name = store_name;
  if (username !== undefined) updates.username = username;
  if (bio !== undefined) updates.bio = bio;
  if (whatsapp_number !== undefined) updates.whatsapp_number = whatsapp_number;

  if (Object.keys(updates).length > 0) {
    await supabase.from("users").update(updates).eq("user_id", user.user_id);
  }

  const merged = { ...user, ...updates };
  const { password_hash: _, ...safeUser } = merged;
  return new Response(JSON.stringify(safeUser), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
