import { create } from "zustand";

const ROLE_KEY = "synapse_role";

type Role = "admin" | "user";

function loadRole(): Role {
  try {
    const r = localStorage.getItem(ROLE_KEY);
    if (r === "admin" || r === "user") return r;
  } catch {
    // ignore
  }
  return "admin";
}

interface RoleStore {
  role: Role;
  setRole: (role: Role) => void;
  isAdmin: boolean;
}

export const useRoleStore = create<RoleStore>((set) => ({
  role: loadRole(),
  isAdmin: loadRole() === "admin",

  setRole: (role) => {
    try {
      localStorage.setItem(ROLE_KEY, role);
    } catch {
      // ignore
    }
    set({ role, isAdmin: role === "admin" });
  },
}));
