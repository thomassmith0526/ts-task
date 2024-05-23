// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem("tasks")) || []
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id.
const todoEl = $("#to-do");
const inprogressEl = $("#in-progress");
const doneEl = $("#done");
const secAddTaskEL = $("#taskform");
const titleEl = $("#task-title");
const dateEl = $("#datepicker");
const taskDeEl = $("#text-description");
const today = dayjs();
function generateTaskId() {
  console.log("today");
  const uniqueId = "id" + new Date().getTime();
  $(".cardBody").text(today.format("MM DD, YY"));
  console.log(uniqueId);
  return uniqueId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const cardContainer = $("<div>")
    .addClass("card draggable my-3")
    .addClass("ui-widget-content")
    .attr("data-task-id", task.id);
  const delBtn = $("<button>")
    .addClass("btn btn-danger")
    .text("delete")
    .attr("data-task-id", task.id);

  delBtn.on("click", function () {
    console.log("button");
    const taskId = $(this).attr("data-task-id");
    $(`[data-task-id="${taskId}"]`).remove();
    console.log("Deleted cad with task Id:", taskId);
  });

  const cardBody = $("<div>").addClass("card-body");
  const cardTitle = $("<h5>").addClass("card-title");
  const cardDate = $("<p>").addClass("card-text");
  const cardDes = $("<p>").addClass("card-text");

  console.log("task");
  cardTitle.append(task.title);
  cardDate.append(task.date);
  cardDes.append(task.taskDescription);
  dayjs();

  cardContainer.append(cardBody, cardTitle, cardDate, cardDes, delBtn);

  todoEl.append(cardContainer);

  $(".draggable").draggable({
    revert: "invalid",
    zIndex: 100,
    cursor: "grab",
  });

  let cardColor = "";
  if (dayjs().isSame(dayjs(task.cardDate), "day")) {
    console.log("yellow");
    cardColor = $('.card draggable my-3').css('background-color' , 'yellow');
  } else if (dayjs().isBefore(dayjs(task.cardDate))) {
    console.log("red");
    cardColor = $('.card draggable my-3') .css('background-color' , 'red');
  }
  return cardColor;
}

// Todo: create a function to render the task list and make cards draggable

function renderTaskList() {}

// Todo: create a function to handle adding a new task

function handleAddTask(event) {
  event.preventDefault();
  console.log("hello");

  const title = titleEl.val();
  const date = dateEl.val();
  const taskDe = taskDeEl.val();

  const tasks = {
    id: generateTaskId(),
    title: title,
    date: date,
    taskDescription: taskDe,
  };

  titleEl.val("");
  dateEl.val("");
  taskDeEl.val("");
  createTaskCard(tasks);

  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

  if (taskList === null) {
    taskList = [];
    console.log(null);
  } else {
    taskList = JSON.parse([localStorage.getItem("tasks")]);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  const saveToLocalSrorage = function () {
    localStorage.setItem("tasks", JSON.stringify(tasksList));
  };
  const addNewTask = function (newTask) {
    taskList.push(newTask);
    saveToLocalSrorage(task);
  };
  for (let i = 0; i < taskList.length; i++) createTaskCard(taskList[i]);
  const newTask = {
    title: titleEl.val(""),
    description: taskDeEl.val(""),
    deadline: dateEl.val(""),
  };
  addNewTask(newTask);


}

// Todo: create a function to handle deleting a task

function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}


$(function () {
  $(".draggable").draggable();

  $("#in-progress").droppable({
    accept: ".draggable",
    drop: function (event, ui) {
      ui.draggable.appendTo($(this)).css({ top: 0, left: 0 });
    },
  });

  $("#done").droppable({
    accept: ".draggable",
    drop: function (evnet, ui) {
      ui.draggable.appendTo($(this)).css({ top: 0, left: 0 });
    },
  });

  $("#to-do").droppable({
    accept: ".draggable",
    drop: function (event, ui) {
      ui.draggable.appendTo($(this)).css({ top: 0, left: 0 });
    },
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
});
