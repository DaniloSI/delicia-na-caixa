"use server";

import { signIn } from "@/../auth";

export async function signInCredentials(payload) {
  try {
    await signIn("credentials", payload);
    return true;
  } catch (error) {
    return false;
  }
}
