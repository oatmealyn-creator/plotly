import { createClient } from "@supabase/supabase-js";
import type { User, Session, Item } from "./db-json";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_SERVICE_KEY || import.meta.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getUserByEmail(email: string): Promise<User | null> {
  const { data } = await supabase.from("users").select("*").eq("email", email).single();
  return data as User | null;
}

export async function getUserById(userId: string): Promise<User | null> {
  const { data } = await supabase.from("users").select("*").eq("user_id", userId).single();
  return data as User | null;
}

export async function createUser(user: User): Promise<void> {
  await supabase.from("users").insert(user);
}

export async function updateUser(userId: string, updates: Partial<User>): Promise<void> {
  await supabase.from("users").update(updates).eq("user_id", userId);
}

export async function getUserItems(userId: string): Promise<Item[]> {
  const { data } = await supabase.from("items").select("*").eq("user_id", userId).order("created_at", { ascending: false });
  return (data as Item[]) || [];
}

export async function createItem(item: Item): Promise<void> {
  await supabase.from("items").insert(item);
}

export async function updateItem(itemId: string, updates: Partial<Item>): Promise<void> {
  await supabase.from("items").update(updates).eq("item_id", itemId);
}

export async function deleteItem(itemId: string): Promise<void> {
  await supabase.from("items").delete().eq("item_id", itemId);
}

export async function getStorefront(username: string): Promise<{ user: User | null; items: Item[] }> {
  const { data: user } = await supabase.from("users").select("*").eq("username", username).single();
  if (!user) return { user: null, items: [] };
  const { data: items } = await supabase.from("items").select("*").eq("user_id", (user as User).user_id).order("created_at", { ascending: false });
  return { user: user as User, items: (items as Item[]) || [] };
}

export async function createSession(session: Session): Promise<void> {
  await supabase.from("sessions").insert(session);
}

export async function getSessionById(sessionId: string): Promise<Session | null> {
  const { data } = await supabase.from("sessions").select("*").eq("session_id", sessionId).single();
  return data as Session | null;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await supabase.from("sessions").delete().eq("session_id", sessionId);
}
