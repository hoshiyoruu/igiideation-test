import prisma from "@/prisma/db";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export interface CustomJWTPayload extends JWTPayload {
  userId: string;
  expiresAt: Date;
}

const encrypt = async (payload: { userId: string; expiresAt: Date }) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
};

const decrypt = async (session: string | undefined) => {
  try {
    if (!session) return undefined;

    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as CustomJWTPayload;
  } catch (error: any) {
    console.error(`Failed to verify session`, error);
    throw error;
  }
};

const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const payload = { userId, expiresAt };
  const jwt = await encrypt(payload);

  cookies().set("session", jwt, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  // store session in database
  await prisma.session.create({
    data: {
      userId: userId,
    },
  });
};

const updateSession = async () => {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) return null;

  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

const deleteSession = async (userId: string) => {
  (await cookies()).delete("session");

  await prisma.session.delete({
    where: {
      userId: userId,
    },
  });
};

export { encrypt, decrypt, createSession, updateSession, deleteSession };
