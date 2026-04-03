import { Shield, User } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useRoleStore } from "../store/useRoleStore";

export default function RoleSwitcher() {
  const { role, setRole } = useRoleStore();

  function handleSwitch(newRole: "admin" | "user") {
    if (newRole === role) return;
    setRole(newRole);
    toast.success(
      newRole === "admin"
        ? "Switched to Admin — full access enabled"
        : "Switched to User — read-only mode",
      {
        duration: 2500,
        icon: newRole === "admin" ? "🛡️" : "👤",
      },
    );
  }

  return (
    <div
      className="rounded-xl p-3"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      data-ocid="role.panel"
    >
      <p className="text-xs text-muted-foreground/50 font-medium mb-2 px-1">
        Access Level
      </p>
      <div
        className="flex rounded-lg overflow-hidden"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => handleSwitch("admin")}
          data-ocid="role.admin.toggle"
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold transition-all ${
            role === "admin"
              ? "text-white"
              : "text-muted-foreground/50 hover:text-muted-foreground/70"
          }`}
          style={{
            background:
              role === "admin"
                ? "linear-gradient(135deg, #3B82F6, #8B5CF6)"
                : "transparent",
            borderRadius: role === "admin" ? "0.4rem" : 0,
            boxShadow:
              role === "admin" ? "0 0 12px rgba(59,130,246,0.35)" : "none",
          }}
        >
          <Shield size={11} />
          Admin
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => handleSwitch("user")}
          data-ocid="role.user.toggle"
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold transition-all ${
            role === "user"
              ? "text-white"
              : "text-muted-foreground/50 hover:text-muted-foreground/70"
          }`}
          style={{
            background:
              role === "user"
                ? "linear-gradient(135deg, #37D6FF, #3B82F6)"
                : "transparent",
            borderRadius: role === "user" ? "0.4rem" : 0,
            boxShadow:
              role === "user" ? "0 0 12px rgba(55,214,255,0.3)" : "none",
          }}
        >
          <User size={11} />
          User
        </motion.button>
      </div>
    </div>
  );
}
