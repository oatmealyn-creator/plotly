export { supabase } from "./supabase";

export interface User {
  user_id: string;
  username: string;
  email: string;
  password_hash: string;
  name: string;
  store_name: string;
  bio: string;
  whatsapp_number: string;
  picture: string;
  created_at: string;
}

export interface Item {
  item_id: string;
  user_id: string;
  name: string;
  price: number;
  category: "Plants" | "Pots" | "Tools" | "Seeds" | "Accessories";
  description: string;
  stock: number;
  image_base64: string;
  created_at: string;
}

export interface Session {
  session_id: string;
  user_id: string;
  created_at: string;
}
