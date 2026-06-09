import type { APIRoute } from "astro";
import { supabase, createSession } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ detail: "Email and password are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data: user } = await supabase.from("users").select("*").eq("email", email).single();
    if (!user) {
      return new Response(JSON.stringify({ detail: "Invalid email or password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const valid = await bcrypt.compare(password, (user as any).password_hash);
    if (!valid) {
      return new Response(JSON.stringify({ detail: "Invalid email or password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const session_id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    await createSession({
      session_id,
      user_id: (user as any).user_id,
      created_at: new Date().toISOString(),
    });

    const { password_hash: _, ...safeUser } = user as any;

    return new Response(
      JSON.stringify({ user: safeUser, session_id }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `session_id=${session_id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
        },
      },
    );
  } catch (err) {
    console.error("Login error:", err);
    return new Response(JSON.stringify({ detail: "Login failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
