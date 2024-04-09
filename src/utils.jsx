function addTask(event, tasks, setTasks) {
  event.preventDefault();
  let newTask = {
    name: event.target.elements.taskInput.value,
    status: false,
  };
  setTasks([...tasks, newTask]);
  event.target.reset();
}

function finishTask(event, index, tasks, setTasks) {
  const isChecked = event.target.checked;
  setTasks(
    tasks.map((task, idx) =>
      idx === index ? { ...task, status: isChecked } : task
    )
  );
}

function editTask(event, index, tasks, setTasks) {
  const spanElement = event.target;
  spanElement.contentEditable = false;
  const newName = spanElement.textContent.trim();
  setTasks(
    tasks.map((task, idx) =>
      idx === index ? { ...task, name: newName } : task
    )
  );
}

function deleteTask(tasks, index, setTasks) {
  setTasks(tasks.filter((_, idx) => idx !== index));
}

function makeEditable(event) {
  const listItem = event.currentTarget.closest("li");
  const spanElement = listItem.querySelector("span");
  spanElement.contentEditable = true;
  spanElement.focus();
}

export { addTask, finishTask, editTask, deleteTask, makeEditable };
