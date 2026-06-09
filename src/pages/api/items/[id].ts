import type { APIRoute } from "astro";
import { supabase, updateItem, deleteItem } from "@/lib/supabase";
import { getSessionUser } from "../auth/_session";

export const PUT: APIRoute = async ({ request, params }) => {
  const user = await getSessionUser(request);
  if (!user) {
    return new Response(JSON.stringify({ detail: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: item } = await supabase.from("items").select("*").eq("item_id", params.id).eq("user_id", user.user_id).single();
  if (!item) {
    return new Response(JSON.stringify({ detail: "Item not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json();
  const updates: Record<string, any> = {};
  if (body.name !== undefined) updates.name = body.name;
  if (body.price !== undefined) updates.price = parseFloat(body.price);
  if (body.category !== undefined) updates.category = body.category;
  if (body.description !== undefined) updates.description = body.description;
  if (body.stock !== undefined) updates.stock = parseInt(body.stock, 10) || 0;
  if (body.image_base64 !== undefined) updates.image_base64 = body.image_base64;

  if (Object.keys(updates).length > 0) {
    await updateItem(params.id!, updates);
  }

  const merged = { ...item, ...updates } as any;
  return new Response(JSON.stringify(merged), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const DELETE: APIRoute = async ({ request, params }) => {
  const user = await getSessionUser(request);
  if (!user) {
    return new Response(JSON.stringify({ detail: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: item } = await supabase.from("items").select("item_id").eq("item_id", params.id).eq("user_id", user.user_id).single();
  if (!item) {
    return new Response(JSON.stringify({ detail: "Item not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  await deleteItem(params.id!);
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
