
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "development-secret-change-me"
);

export interface SessionPayload extends JWTPayload {
  userId: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "ADMIN" | "SUPER_ADMIN";
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload as unknown as SessionPayload;
}
