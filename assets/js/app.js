const cl = console.log;

const todocontainer = document.getElementById("todocontainer");
const form = document.getElementById("form");
const taskName = document.getElementById("taskName");
const priority = document.getElementById("priority");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");

let jsonArr = localStorage.getItem("todoArr");

let todoArr = jsonArr ? JSON.parse(jsonArr) : [];

// SaveData

function saveTodos() {
  localStorage.setItem("todoArr", JSON.stringify(todoArr));
}
// Read

function showOnUI(arr) {
  let result = "";

  arr.forEach((ele, i) => {
    result += `
                                <tr id="${ele.id}">
                                    <td>${i + 1}</td>
                                    <td>${ele.taskName}</td>
                                    <td>${ele.priority}</td>
                                    <td>
                                        <i onclick="editTodo(this)" class="fa-regular fa-pen-to-square fa-2x text-primary"></i>
                                        <i class="fa-solid fa-trash-can fa-2x text-danger"></i>
                                    </td>
                                </tr>
        `;
  });
  todocontainer.innerHTML = result;
}

showOnUI(todoArr);

// Create

function onTodoAdd(event) {
  event.preventDefault();

  if (!taskName.value.trim() || !priority.value.trim()) {
    Swal.fire({
      title: "Required Fields!",
      text: "Please fill in all the fields.",
      icon: "warning",
      timer: 1500,
    });
    return;
  }

  let newTodo = {
    id: crypto.randomUUID(),
    taskName: taskName.value.trim(),
    priority: priority.value.trim(),
  };

  todoArr.push(newTodo);
  saveTodos();
  Swal.fire({
    title: "Todo Created!",
    text: `Your Todo has been added successfully.`,
    icon: "success",
    timer: 2000,
  });

  form.reset();

  let tr = document.createElement("tr");

  tr.id = newTodo.id;

  tr.innerHTML = `
                                    <td>${todoArr.length}</td>
                                    <td>${newTodo.taskName}</td>
                                    <td>${newTodo.priority}</td>
                                    <td>
                                        <i onclick="editTodo(this)" class="fa-regular fa-pen-to-square fa-2x text-primary"></i>
                                        <i class="fa-solid fa-trash-can fa-2x text-danger"></i>
                                    </td>
  `;

  todocontainer.append(tr);
}

// Edit

function editTodo(ele) {
  let editId = ele.closest("tr").id;
  localStorage.setItem("editId", editId);

  let editObj = todoArr.find((ele) => ele.id === editId);
  if (!editObj) return;

  taskName.value = editObj.taskName;
  priority.value = editObj.priority;

  submitBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

// update

function onUpdateClick() {
  let updateId = localStorage.getItem("editId");

  if (!taskName.value.trim() || !priority.value.trim()) {
    Swal.fire({
      title: "Required Fields!",
      text: "Please fill in all the fields.",
      icon: "warning",
      timer: 1500,
    });
    return;
  }

  let updatedObj = {
    id: updateId,
    taskName: taskName.value.trim(),
    priority: priority.value.trim(),
  };

  let getIndex = todoArr.findIndex((ele) => ele.id === updateId);
  if (getIndex === -1) return;
  todoArr[getIndex] = updatedObj;
  saveTodos();

  Swal.fire({
    title: "Todo Updated!",
    text: `Your Todo has been updated successfully.`,
    icon: "success",
    timer: 2000,
  });

  // UI

  let td = [...document.getElementById(updateId).children];

  td[1].innerText = updatedObj.taskName;
  td[2].innerText = updatedObj.priority;

  updateBtn.classList.add("d-none");
  submitBtn.classList.remove("d-none");
  localStorage.removeItem("editId");
  form.reset();
}

form.addEventListener("submit", onTodoAdd);
updateBtn.addEventListener("click", onUpdateClick);
