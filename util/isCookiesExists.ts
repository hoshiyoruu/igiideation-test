"use server";

import { cookies } from "next/headers";

const isCookiesExists = async () => {
  try {
    const sessionCookie = await cookies().get("session")?.value;
    console.log(sessionCookie);

    if (sessionCookie) return true;
  } catch (error: any) {
    console.error(`Failed to check for cookie : ${error}`);
  }
};

export default isCookiesExists;
