
import { cookies } from "next/headers";
import { verifySessionToken } from "./token";

export const SESSION_COOKIE = "lafontant_session";

export async function getSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}
