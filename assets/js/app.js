const cl = console.log;

let todoArr = [
  {
    id: "101",
    taskName: "Go to Gym",
    priority: "High",
  },
  {
    id: "102",
    taskName: "Complete JavaScript Practice",
    priority: "High",
  },
  {
    id: "103",
    taskName: "Buy Groceries",
    priority: "Medium",
  },
  {
    id: "104",
    taskName: "Read a Book",
    priority: "Low",
  },
  {
    id: "105",
    taskName: "Complete HTML Project",
    priority: "High",
  },
  {
    id: "106",
    taskName: "Clean the Room",
    priority: "Low",
  },
  {
    id: "107",
    taskName: "Practice CSS",
    priority: "Medium",
  },
  {
    id: "108",
    taskName: "Watch JavaScript Tutorial",
    priority: "Medium",
  },
  {
    id: "109",
    taskName: "Go for a Walk",
    priority: "Low",
  },
  {
    id: "110",
    taskName: "Complete Todo CRUD",
    priority: "High",
  },
];

localStorage.setItem("todoArr", JSON.stringify(todoArr));