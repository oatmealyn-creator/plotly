import type { User } from "@/lib/db-json";
import { getSessionById, getUserById } from "@/lib/supabase";

export async function getSessionUser(req: { headers: { get: (name: string) => string | null } }): Promise<User | null> {
  let sessionId = "";

  const authHeader = req.headers.get("authorization") || "";
  if (authHeader.startsWith("Bearer ")) {
    sessionId = authHeader.substring(7).trim();
  }

  if (!sessionId) {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/session_id=([^;]+)/);
    if (match) {
      sessionId = match[1].trim();
    }
  }

  if (!sessionId) return null;

  const session = await getSessionById(sessionId);
  if (!session) return null;
  return getUserById(session.user_id);
}
