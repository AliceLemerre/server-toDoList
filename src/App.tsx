import React, { useState } from 'react'
import './App.css'
import Hello from './Hello.tsx';
import '../convex/myFunctions.ts';
import { Id } from "../convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

type Task = {
  _id: Id<"tasks">;
  title: string;
  description: string;
  isStarted: boolean;
  isCompleted: boolean;
  isDeleted: boolean;
};


function App() {
  const tasks = useQuery(api.tasks.get);
  const [firstname, setFirstName] = useState("")
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")

  const createTask = useMutation(api.myFunctions.createTask);
  const updateTask = useMutation(api.myFunctions.updateTask);
  const deleteTask = useMutation(api.myFunctions.deleteTask);

  const allTasks = useQuery(api.myFunctions.getTasks);
  const todoTasks = useQuery(api.myFunctions.getTodoTasks);
  const doingTasks = useQuery(api.myFunctions.getDoingTasks);
  const doneTasks = useQuery(api.myFunctions.getDoneTasks);


  const handleClick = () => {
    console.log(firstname);
  };

  
  const handleUpdateStatus = async (taskId: Id<"tasks">, title: string, description: string, isStarted: boolean, isCompleted: boolean) => {
    await updateTask({
      taskListId: taskId,
      title,
      description,
      isStarted,
      isCompleted,
    });
  };

  const handleDeleteTask = async (taskId: Id<"tasks">) => {
    await deleteTask({ taskListId: taskId });
  };

  const handleUpdateTask = async (taskId: Id<"tasks">, title: string, description: string, isStarted: boolean, isCompleted: boolean) => {
    await updateTask({
      taskListId: taskId,
      title,
      description,
      isStarted,
      isCompleted,
    });
  }


  const TaskDisplay = ({task}: {task: Task}) => (
    <div>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      {!task.isStarted && (
            <button
              onClick={() => handleUpdateStatus(task._id, task.title, task.description, true, false)}
            >
              Démarrer
            </button>
          )}
          {task.isStarted && !task.isCompleted && (
            <button
              onClick={() => handleUpdateStatus(task._id, task.title, task.description, true, true)}>
              Terminer
            </button>
          )}
          <button
            onClick={() => handleUpdateTask(task._id, task.title, task.description, task.isStarted, task.isCompleted)}>
            Mettre à jour
          </button>
          <button
            onClick={() => handleDeleteTask(task._id)} >
            Supprimer
          </button>
    </div>
  );

  const taskDisplay = (tasks: Task[] | undefined, emptyMessage: string) => {
    if (!tasks) return <div className="text-gray-500">Chargement</div>;
    if (tasks.length === 0) return <div className="text-gray-500">{emptyMessage}</div>;
    return tasks.map((task) => <TaskDisplay key={task._id} task={task} />);
  };

  return (
    <div>
      <Hello firstname={firstname} />
      <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
      <button onClick={handleClick}>set name</button>

      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={() => createTask({ title, description })}>Ajouter</button>

      <table>
        <tbody>
          <tr>
            <td>All</td>
            <td>Todo</td>
            <td>Doing</td>
            <td>Done</td>
          </tr>
          <tr>
            <td>
              {tasks?.map(({ _id, title }) => <div key={_id}>{title}</div>)}
            </td>
            <td>
              {taskDisplay(todoTasks, "none")}
            </td>
            <td>
              {taskDisplay(doingTasks, "none")}
            </td>
            <td>
              {taskDisplay(doneTasks, "none")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

}

export default App;