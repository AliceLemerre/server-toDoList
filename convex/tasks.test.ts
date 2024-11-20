import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";
import exp from "constants";


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


test("test vue liste taches", async () => {
  const t = convexTest();

  await t.mutation(api.myFunctions.createTask, {title: "testA", description: "testA"});
  const task = (await t.query(api.myFunctions.getTasks))[0];

  await t.query(api.myFunctions.getTask, { id: task._id});

  expect(await t.query(api.myFunctions.getTasks)).toMatchObject([{title: "testA", description: "testA"}]);

});



test("test vue taches todo", async () => {
  const t = convexTest();

  await t.mutation(api.myFunctions.createTask, {title: "testTodo", description: "testTodo", isStarted: false}); //une todo
  await t.mutation(api.myFunctions.createTask, {title: "testDoing", description: "testDoing", isStarted: true, isCompleted: false}); //une doing
  await t.mutation(api.myFunctions.createTask, {title: "testDone", description: "testDone", isStarted: true, isCompleted: true}); //une done

  expect(await t.query(api.myFunctions.getTodoTasks)).toMatchObject([{title: "testTodo", description: "testTodo"}]);

});


test("test vue liste taches doing", async () => {
  const t = convexTest();

 
  await t.mutation(api.myFunctions.createTask, {title: "testTodo", description: "testTodo", isStarted: false}); //une todo
  await t.mutation(api.myFunctions.createTask, {title: "testDoing", description: "testDoing", isStarted: true, isCompleted: false}); //une doing
  await t.mutation(api.myFunctions.createTask, {title: "testDone", description: "testDone", isCompleted: true}); //une done

  expect(await t.query(api.myFunctions.getDoingTasks)).toMatchObject([{title: "testDoing", description: "testDoing"}]);

});


test("test vue liste taches done", async () => {
  const t = convexTest();

  await t.mutation(api.myFunctions.createTask, {title: "testTodo", description: "testTodo", isStarted: false}); //une todo
  await t.mutation(api.myFunctions.createTask, {title: "testDoing", description: "testDoing", isStarted: true, isCompleted: false}); //une doing
  await t.mutation(api.myFunctions.createTask, {title: "testDone", description: "testDone", isCompleted: true}); //une done

  expect(await t.query(api.myFunctions.getDoneTasks)).toMatchObject([{title: "testDone", description: "testDone"}]);

});




//tests métier : ajout, suppression, modification

test("create", async () => {
  const t = convexTest(schema);

  await t.mutation(api.myFunctions.createTask, {title: "test1", description: "test1"});

  expect(await t.query(api.myFunctions.getTasks)).toMatchObject([{title: "test1", description: "test1"}]);

});


test("update", async () => {
  const t = convexTest(schema);

  await t.mutation(api.myFunctions.createTask, {title: "test2", description: "test2"});
  const task = (await t.query(api.myFunctions.getTasks))[0];
  
  await t.mutation(api.myFunctions.updateTask, {taskListId: task._id, title: "test2test", description: "test2", isStarted: true, isCompleted: false, isDeleted: false });

  expect(await t.query(api.myFunctions.getTasks)).toMatchObject([{title: "test2test", description: "test2"}]);

});

test("delete", async () => {
  const t = convexTest(schema);

  await t.mutation(api.myFunctions.createTask, {title: "test2", description: "test2"});
  const task = (await t.query(api.myFunctions.getTasks))[0];

  await t.mutation(api.myFunctions.deleteTask, {taskListId: task._id });

  expect(await t.query(api.myFunctions.getTasks)).toMatchObject([]);


});

