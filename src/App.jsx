import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus as AddIcon,
  faPenToSquare as EditIcon,
  faTrash as DeleteIcon,
} from "@fortawesome/free-solid-svg-icons";
import {
  addTask,
  finishTask,
  editTask,
  deleteTask,
  makeEditable,
} from "./utils.jsx";

function App() {
  const [tasks, setTasks] = useState([
    { name: "Learn React", status: false },
    { name: "Build todo app", status: false },
    { name: "Fix bug", status: false },
  ]);

  function handleAddTask(event) {
    addTask(event, tasks, setTasks);
  }

  function handleFinishTask(event, index) {
    finishTask(event, index, tasks, setTasks);
  }

  function handleEditTask(event, index) {
    editTask(event, index, tasks, setTasks);
  }

  function handleDeleteTask(index) {
    deleteTask(tasks, index, setTasks);
  }

  return (
    <>
      <div className="w-1/3 h-fit mx-auto mt-20 p-5 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-5 text-center">Todo List</h1>
        <hr></hr>
        <form className="relative my-5" onSubmit={(e) => handleAddTask(e)}>
          <input
            type="text"
            name="taskInput"
            required
            placeholder="Add new task"
            className="w-full rounded-2xl bg-blue-50 px-5 py-2.5 pe-10 shadow-sm sm:text-sm"
          />
          <button>
            <FontAwesomeIcon
              icon={AddIcon}
              className="absolute top-1/4 right-3 text-xl text-gray-400 hover:text-black"
            />
          </button>
        </form>
        <p className="mb-5">
          You have {tasks.filter((task) => !task.status).length} pending task(s)
        </p>

        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className="my-2 bg-blue-50 rounded-2xl px-5 py-2 flex"
            >
              <input
                type="checkbox"
                className="mr-2 scale-150 "
                onChange={(e) => handleFinishTask(e, index)}
              />
              <span
                className={`flex-grow ${task.status ? "line-through" : ""}`}
                onBlur={(e) => handleEditTask(e, index)}
              >
                {task.name}
              </span>
              <button className="mr-3" onClick={(e) => makeEditable(e)}>
                <FontAwesomeIcon
                  icon={EditIcon}
                  className="text-xl text-gray-400 hover:text-black"
                />
              </button>
              <button onClick={() => handleDeleteTask(index)}>
                <FontAwesomeIcon
                  icon={DeleteIcon}
                  className=" text-xl text-gray-400 hover:text-red-500"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
