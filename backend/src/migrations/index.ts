import type { Migration } from "./types";
import baselineSchema from "./001-baseline-schema";
import addUserTokenVersion from "./002-add-user-token-version";

export const migrations: Migration[] = [baselineSchema, addUserTokenVersion];
