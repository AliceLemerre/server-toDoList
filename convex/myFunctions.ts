import { query } from "./_generated/server";
import { v } from "convex/values";
import {mutation} from "./_generated/server";

// This function will be referred to as `api.myFunctions.getTask`.

export const getTask = query({
    args: { id: v.id("tasks") }, // The ID of the task list. v=value ds la table, tasks 
    handler: async (ctx, args) => { // The handler function takes a context and the arguments passed to the query to return the result.
      return await ctx.db.get(args.id); // Return the task list with the given ID.
    },
});
 

export const getTasks = query({
  args: v.object({}),
  handler: async (ctx) => {
    const tasks = await ctx.db
      .query("tasks")
      .order("desc")
      .take(100);
    return tasks;
  },
});


export const getTodoTasks = query({
  args: v.object({}),
  handler: async (ctx) => {
    const tasks = await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("isStarted"), false))
      .order("desc")
      .take(100);
    return tasks;
  },
});



export const getDoingTasks = query({
  args: v.object({}),
  handler: async (ctx) => {
    const tasks = await ctx.db
      .query("tasks")
      .filter((q) => 
        q.and(
          q.eq(q.field("isCompleted"), false),
          q.eq(q.field("isStarted"), true)
      )
      )
      .order("desc")
      .take(100);
    return tasks;
  },
});




export const getDoneTasks = query({
  args: v.object({}),
  handler: async (ctx) => {
    const tasks = await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .order("desc")
      .take(100);
    return tasks;
  },
});



export const createTask = mutation({
    args: { title: v.string(), description: v.string(), isStarted: v.optional(v.boolean()),
      isCompleted: v.optional(v.boolean()),
      isDeleted: v.optional(v.boolean()), },
    handler: async (ctx, args) => {      
    const newTaskId = await ctx.db.insert("tasks", {  title: args.title,
      description: args.description,
      isStarted: args.isStarted ?? false,
      isCompleted: args.isCompleted ?? false,
      isDeleted: args.isDeleted ?? false, });
    return newTaskId;
    },
});


export const deleteTask = mutation({
  args: {
    taskListId: v.id("tasks"),
  },
  handler: async (ctx, args) => {
      const existingTask = await ctx.db.get(args.taskListId);
      if (!existingTask) {
          throw new Error(`Tâche avec l'ID ${args.taskListId} inexistante`);
      }

      await ctx.db.delete(args.taskListId);
      return true;
  },
});

export const updateTask = mutation({
  args: {
    taskListId: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    isStarted: v.optional(v.boolean()),
    isCompleted: v.optional(v.boolean()),
    isDeleted: v.optional(v.boolean()),
},
  handler: async (ctx, args) => {      
  const newTaskInfos = await ctx.db.patch(args.taskListId, {  
    title: args.title,
    description: args.description,
    isStarted: args.isStarted ?? false,
    isCompleted: args.isCompleted ?? false,
    isDeleted: args.isDeleted ?? false, });
  return newTaskInfos;
  },
});
