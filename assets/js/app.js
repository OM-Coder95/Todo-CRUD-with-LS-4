const cl = console.log;

const todocontainer = document.getElementById("todocontainer");

let jsonArr = localStorage.getItem("todoArr");

let todoArr = jsonArr ? JSON.parse(jsonArr) : [];

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
                                        <i class="fa-regular fa-pen-to-square fa-2x text-primary"></i>
                                        <i class="fa-solid fa-trash-can fa-2x text-danger"></i>
                                    </td>
                                </tr>
        `;
  });
  todocontainer.innerHTML = result;
}

showOnUI(todoArr);
