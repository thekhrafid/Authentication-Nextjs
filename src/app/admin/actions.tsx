"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import type { Roles } from "../../../types/globals";
import { revalidatePath } from "next/cache";

/**
 * Set a user's role (admin only)
 */
export async function setRole(formData: FormData) {
  const { sessionClaims } = await auth();

  // TypeScript-safe: explicitly tell TS what metadata contains
  const roleInSession = (sessionClaims?.metadata as { role?: string })?.role;

  if (roleInSession !== "admin") {
    throw new Error("Not Authorized");
  }

  const id = formData.get("id") as string;
  const role = formData.get("role") as Roles;

  try {
    // ⚡ Call clerkClient() to get the instance
    const client = await clerkClient();

    await client.users.updateUser(id, {
      publicMetadata: { role },
    });

    revalidatePath("/admin");
  } catch (error) {
    console.error("❌ Failed to set role:", error);
    throw new Error("Failed to set role");
  }
}

/**
 * Remove a user's role (admin only)
 */
export async function removeRole(formData: FormData) {
  const { sessionClaims } = await auth();

  const roleInSession = (sessionClaims?.metadata as { role?: string })?.role;

  if (roleInSession !== "admin") {
    throw new Error("Not Authorized");
  }

  const id = formData.get("id") as string;

  try {
    const client = await clerkClient();

    await client.users.updateUser(id, {
      publicMetadata: { role: null },
    });

    revalidatePath("/admin");
  } catch (error) {
    console.error("❌ Failed to remove role:", error);
    throw new Error("Failed to remove role");
  }
}
