import { metadata } from "../src/app/layout";

export {};

export type Roles = "admin" | "moderator";
declare global {
  interface CustomJwtSessionsClainms {
    metadata: {
      role?: Roles;
    };
  }
}
