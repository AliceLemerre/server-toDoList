import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    description: v.string(),
    isStarted: v.boolean(),
    isCompleted: v.boolean(),
    isDeleted: v.boolean(),
  }),
});