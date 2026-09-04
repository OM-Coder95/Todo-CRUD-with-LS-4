const cl = console.log;

const todocontainer = document.getElementById("todocontainer");
const form = document.getElementById("form");
const taskName = document.getElementById("taskName");
const priority = document.getElementById("priority");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");
const todoTableParent = document.getElementById("todoTableParent");
const deleteAll = document.getElementById("deleteAll");

let jsonArr = localStorage.getItem("todoArr");

let todoArr = jsonArr ? JSON.parse(jsonArr) : [];

// SaveData

function saveTodos() {
  localStorage.setItem("todoArr", JSON.stringify(todoArr));
}

// If Array Empty

function hideTable() {
  if (todoArr.length === 0) {
    todoTableParent.classList.add("d-none");
  } else {
    todoTableParent.classList.remove("d-none");
  }
}

// DeleteAll

function onDeleteAllClick() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete All!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        todoArr = [];
        saveTodos();
        showOnUI(todoArr);
        hideTable();

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "All Todo has been deleted.",
          icon: "success",
          timer: 1500,
        });
      } else if (result.dismiss === Swal.DismissReason.cancel)
        /* Read more about handling dismissals below */
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your Todo's are safe :)",
          icon: "error",
          timer: 1500,
        });
    });
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
                                    <td class="actionTd">
                                        <button onclick="editTodo(this)" class="btn"><i class="fa-regular fa-pen-to-square fa-2x text-primary"></i></button>
                                        <button onclick="removeTodo(this)" class="btn deleteIcon"><i class="fa-solid fa-trash-can fa-2x text-danger"></i></button>
                                    </td>
                                </tr>
        `;
  });
  todocontainer.innerHTML = result;
}

showOnUI(todoArr);
hideTable();

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
  hideTable();
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
                                    <td class="actionTd">
                                        <button onclick="editTodo(this)" class="btn"><i class="fa-regular fa-pen-to-square fa-2x text-primary"></i></button>
                                        <button onclick="removeTodo(this)" class="btn deleteIcon"><i class="fa-solid fa-trash-can fa-2x text-danger"></i></button>
                                    </td>
  `;

  todocontainer.append(tr);
}

// Edit

function editTodo(ele) {
  let editId = ele.closest("tr").id;
  localStorage.setItem("editId", editId);

  let tr = ele.closest("tr");
  let deleteIcon = tr.querySelector(".deleteIcon");
  deleteIcon.disabled = true;

  deleteAll.disabled = true;

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

  let tr = (document
    .getElementById(updateId)
    .querySelector(".deleteIcon").disabled = false);
  deleteAll.disabled = false;
}

// remove Todo

function removeTodo(ele) {
  let removeId = ele.closest("tr").id;

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        let getIndex = todoArr.findIndex((ele) => ele.id === removeId);
        if (getIndex === -1) return;

        todoArr.splice(getIndex, 1);
        saveTodos();
        hideTable();

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your Todo has been deleted.",
          icon: "success",
          timer: 1500,
        });

        ele.closest("tr").remove();

        let srno = [
          ...document.querySelectorAll("#todocontainer tr td:first-child"),
        ];
        srno.forEach((ele, i) => (ele.innerText = i + 1));
      } else if (result.dismiss === Swal.DismissReason.cancel)
        /* Read more about handling dismissals below */
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your Todo is safe :)",
          icon: "error",
          timer: 1500,
        });
    });
}

form.addEventListener("submit", onTodoAdd);
updateBtn.addEventListener("click", onUpdateClick);
deleteAll.addEventListener("click", onDeleteAllClick);
