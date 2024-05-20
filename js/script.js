// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id.
const todoEl = $("#to-do");
const inprogressEl = $("#in-progress");
const doneEl = $("#done");
const secAddTaskEL = $("#taskform");

function generateTaskId() {
  const id = Math.floor(Math.random() * 1000000);

  return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const cardContainer = $("<div>")
    .addClass("card draggable my-3")
    .addClass("ui-widget-content")
    .attr("data-task-id", task.id);
  const cardBody = $("<div>").addClass("card-body");
  const cardTitle = $("<h5>").addClass("card-title");
  const cardDate = $("<p>").addClass("card-text");
  const cardDes = $("<p>").addClass("card-text");
  const delBtn = $("<button>")
    .addClass("btn btn-danger")
    .text("delete")
    .attr("data-task-it", task.id);
  delBtn.on("click", handleDeleteTask);
  console.log(task);
  cardTitle.append(task.title);
  cardDate.append(task.date);
  cardDes.append(task.taskDescription);
  dayjs();

  cardContainer.append(cardBody, cardTitle, cardDate, cardDes, delBtn);

  todoEl.append(cardContainer);

  let cardColor = "";

  if (dayjs().isSame(dayjs(task.taskDate), "day")) {
    console.log("yellow");
    cardColor = "yellow";
  } else if (dayjs().isAfter(dayjs(task.taskDate))) {
    console.log("red");
    cardColor = "red";
  } else {
    // not really needed but makes code easier to read
    console.log("white");
  }

  $(".draggable").draggable({
    revert: "invalid",
    zIndex: 100,
    cursor: "grab",
  });
}

// Todo: create a function to render the task list and make cards draggable

function renderTaskList() {}

// Todo: create a function to handle adding a new task

// let taskArray =[localStorage.getItem("taskArray")];

if (taskList === null) {
  taskList = [];
  console.log(null);
} else {
  taskList = JSON.parse([localStorage.getItem("tasks")]);
}
function handleAddTask(event) {
  event.preventDefault();
  console.log("hello");

  const titleEl = $("#task-title");
  const dateEl = $("#datepicker");
  const taskDeEl = $("#text-description");

  const title = titleEl.val();
  const date = dateEl.val();
  const taskDe = taskDeEl.val();

  const tasks = {
    id: generateTaskId(),
    title: title,
    date: date,
    taskDescription: taskDe,
  };
  console.log(title, date, taskDe);
  createTaskCard(tasks);
  // $('#myModal #formModal')[0].reset
  localStorage.setItem("tasks", JSON.stringify(tasks));

  titleEl.val("");
  dateEl.val("");
  taskDeEl.val("");

  const saveToLocalSrorage = function () {
    tasks.push(JSON.stringify(taskList));
    localStorage.setItem("taskList", JSON.stringify(tasks));
  };
  for (let i = 0; i < taskList.length; i++) createTaskCard(taskList[i]);
  saveToLocalSrorage(tasks);
}

// Todo: create a function to handle deleting a task

function handleDeleteTask(event) {
  // const taskid =$(this).att('data-task-id')
  // const tasks = readTaskFromStorage()
  // tasks.forEach((task) => {
  //   if (task.id === taskid) {
  //     tasks.splice(tasks.indexOf(task), 1)
  //   }
  // })
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// $(function () {
//   $("#draggable").draggable();
//   $("#droppable").droppable({
//     drop: function (event, ui) {
//     $(".lane").droppable({
//     accept: ".draggable",
//     drop: "#in-porgress",
//     drop: "#done" 
//   });
//     }
//   });
// },

$(function (){
  $(".draggable").draggable();

  $('#in-progress').droppable({
    accept: ".draggable",
    drop: function(event, ui) {
      ui.draggable.appendTo($(this)).css({top: 0, left: 0});
    }
  });

  $("#done").droppable({
    accept: ".draggable",
    drop: function(evnet, ui) {
      ui.draggable.appendTo($(this)).css({top: 0, left: 0});
    }
  });

  $('#to-do').droppable({
    accept: ".draggable",
    drop: function(event, ui) {
      ui.draggable.appendTo($(this)).css({top: 0, left: 0});
    }
  });
});


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $("#taskform").on("submit", handleAddTask);
  //
  $(function () {
    $("#datepicker").datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });

  $(".close").click(function () {
    $("#formModal").hide();
    return;
  });
})