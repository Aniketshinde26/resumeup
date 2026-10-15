import type { Migration } from "./types";
import baselineSchema from "./001-baseline-schema";

export const migrations: Migration[] = [baselineSchema];
