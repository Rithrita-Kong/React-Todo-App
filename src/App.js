import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus as AddIcon,
  faPenToSquare as EditIcon,
  faTrash as DeleteIcon,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [tasks, setTasks] = useState([
    { name: "Learn React", status: false },
    { name: "Build todo app", status: false },
    { name: "Fix bug", status: false },
  ]);

  function addTask(event) {
    event.preventDefault();
    let newTask = {
      name: event.target.elements.taskInput.value,
      status: false,
    };
    setTasks((task) => [...task, newTask]);
    event.target.reset();
  }

  function finishTask(event, index) {
    const isChecked = event.target.checked;
    setTasks((tasks) =>
      tasks.map((task, idx) =>
        idx === index ? { ...task, status: isChecked } : task
      )
    );
  }

  function editTask(event, index) {
    const spanElement = event.target;
    spanElement.contentEditable = false;
    console.log(spanElement);
    const newName = spanElement.textContent.trim();
    setTasks((tasks) =>
      tasks.map((task, idx) =>
        idx === index ? { ...task, name: newName } : task
      )
    );
  }

  function deleteTask(index) {
    console.log("Edit");
    setTasks((tasks) => {
      const copy = [...tasks];
      copy.splice(index, 1);
      return copy;
    });
  }

  function editable(event) {
    const listItem = event.currentTarget.closest("li");
    const spanElement = listItem.querySelector("span");
    console.log(spanElement);
    spanElement.contentEditable = true;
    spanElement.focus();
  }

  return (
    <>
      <div className="w-1/3 h-fit mx-auto mt-20 p-5 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-5 text-center">Todo List</h1>
        <hr></hr>
        <form className="relative my-5" onSubmit={addTask}>
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
                onChange={(e) => finishTask(e, index)}
              />
              <span
                className={`flex-grow ${task.status ? "line-through" : ""}`}
                onBlur={(e) => editTask(e, index)}
              >
                {task.name}
              </span>
              <button className="mr-3" onClick={(e) => editable(e)}>
                <FontAwesomeIcon
                  icon={EditIcon}
                  className="text-xl text-gray-400 hover:text-black"
                />
              </button>
              <button onClick={() => deleteTask(index)}>
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
