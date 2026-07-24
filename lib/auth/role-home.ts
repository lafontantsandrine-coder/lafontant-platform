export type AppRole = "STUDENT" | "TEACHER" | "ADMIN" | "SUPER_ADMIN";

export function getRoleHome(role: AppRole): string {
  if (role === "SUPER_ADMIN" || role === "ADMIN") return "/admin";
  if (role === "TEACHER") return "/teacher";
  return "/dashboard";
}
