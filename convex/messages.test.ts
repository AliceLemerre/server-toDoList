import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";


//exemple de la doc
/*
test("sending messages", async () => {
  const t = convexTest(schema);
  await t.mutation(api.messages.send, { body: "Hi!", author: "Sarah" });
  await t.mutation(api.messages.send, { body: "Hey!", author: "Tom" });
  const messages = await t.query(api.messages.list);
  expect(messages).toMatchObject([
    { body: "Hi!", author: "Sarah" },
    { body: "Hey!", author: "Tom" }
  ]);
});
*/


//test vue : écriture, clics, affichage

test("présence éléments", async () => {
    const t = convexTest(schema);
    

});


//tests métier : ajout, suppression, modification, changement statut

//écrire dans la mock db
test("functions", async () => {
  const t = convexTest();
  const firstTask = await t.run(async (ctx) => {
    await ctx.db.insert("tasks", { text: "Eat breakfast" });
    return await ctx.db.query("tasks").first();
  });
  expect(firstTask).toMatchObject({ text: "Eat breakfast" });
});


test("functions", async () => {
  const t = convexTest();
  
  const create = await t.mutation(api.myFunctions.createTask, {  title: "test1", description: "test1", isStarted: false, isCompleted: false, isDeleted: false });
  const update = await t.mutation(api.myFunctions.updateTask, { v.id("tasks"), title: "test2", description: "test1", isStarted: true, isCompleted: false, isDeleted: false });
  const del = await t.mutation(api.myFunctions.deleteTask, { a: 1 });

});


/*
test("functions", async () => {
    const t = convexTest();
    const x = await t.query(api.myFunctions.myQuery, { a: 1, b: 2 });
    const y = await t.query(internal.myFunctions.internalQuery, { a: 1, b: 2 });
    const z = await t.mutation(api.myFunctions.mutateSomething, { a: 1, b: 2 });
    const w = await t.mutation(internal.myFunctions.mutateSomething, { a: 1 });
    const u = await t.action(api.myFunctions.doSomething, { a: 1, b: 2 });
    const v = await t.action(internal.myFunctions.internalAction, { a: 1, b: 2 });
  });
*/


//tests mock auth