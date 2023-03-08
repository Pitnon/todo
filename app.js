
const taskList = document.getElementById("task-list");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


renderTaskList(tasks);


const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", function () {
  const newTaskInput = document.getElementById("new-task");
  const newTask = newTaskInput.value.trim();
  if (newTask !== "") {
    tasks.push({
      id: Date.now(),
      text: newTask,
      completed: false
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTaskList(tasks);
    newTaskInput.value = "";
  }
});


taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const taskId = parseInt(event.target.dataset.taskId);
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTaskList(tasks);
  }
});


function renderTaskList(tasks) {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    if (task.completed) {
      li.classList.add("completed");
    }
    const text = document.createElement("span");
    text.textContent = task.text;
    text.addEventListener("click", function () {
      task.completed = !task.completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTaskList(tasks);
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.taskId = task.id;
    li.appendChild(text);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
