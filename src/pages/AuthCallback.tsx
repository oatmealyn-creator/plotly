import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const exchange = async () => {
      const hash = window.location.hash || "";
      const match = hash.match(/session_id=([^&]+)/);
      if (!match) {
        navigate("/");
        return;
      }
      const session_id = decodeURIComponent(match[1]);
      try {
        const { data } = await api.post("/auth/process-session", { session_id });
        if (data.session_id) {
          localStorage.setItem("session_id", data.session_id);
        }
        setUser(data.user);
        // Clean URL & navigate
        window.history.replaceState({}, "", "/dashboard");
        navigate("/dashboard", { replace: true, state: { user: data.user } });
      } catch (e) {
        console.error("Auth callback failed", e);
        navigate("/");
      }
    };
    exchange();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F0]">
      <div className="text-center">
        <div className="font-display text-3xl text-[#2C332A] mb-2">Welcome back</div>
        <div className="text-[#5C665A]">Setting up your garden…</div>
      </div>
    </div>
  );
}
