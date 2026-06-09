import type { APIRoute } from "astro";
import { deleteSession } from "@/lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/session_id=([^;]+)/);
  if (match) {
    const sessionId = match[1].trim();
    await deleteSession(sessionId);
  }

  return new Response(
    JSON.stringify({ success: true }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": "session_id=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly",
      },
    },
  );
};
