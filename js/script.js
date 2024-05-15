// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id.
const todoEl= $('#to-do');
const inprogressEl =$('#in-progress');
const doneEl =$('#done');
const secAddTaskEL = $('.second-add-task');

function generateTaskId() {  
  const id = Math.floor(Math.random() * 1000000);

  return id
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const cardContainer = $('<div>').addClass('card')
  const cardBody = $('<div>').addClass('card-body')
  const cardTitle = $('<h5>').addClass('card-title')
  const cardDate = $('<p>').addClass('card-text')
  const cardDes = $('<p>').addClass('card-text')
  const delBtn = $('<button>').addClass('btn btn-danger').text('delete')
console.log(task)
  cardTitle.append(task.title)
  cardDate.append(task.date)
  cardDes.append(task.taskDescription)


  cardContainer.append(cardBody, cardTitle, cardDate, cardDes, delBtn)

  todoEl.append(cardContainer)

  

}

// Todo: create a function to render the task list and make cards draggable
$( function() {
  $( "#draggable" ).draggable();
} );
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault()



  const titleEl = $('#task-title');
  const dateEl = $('#datepicker');
  const taskDeEl = $('#text-description');

  const title = titleEl.val();
  const date = dateEl.val();
  const taskDe = taskDeEl.val();

  const task = {
    id: generateTaskId(),
    title: title,
    date: date,
    taskDescription: taskDe,
  }
  // console.log(title, date, taskDe)
  createTaskCard(task)


}

// Todo: create a function to handle deleting a task

function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  secAddTaskEL.on('click',handleAddTask)
  
$(function () {
    $('#datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });
});


  
  // const printtask = function (task, date) {
  //   const listEl = $('<li>')
  //   const listDetail = task.concat('on', date)
  //   listEl.addClass('list-group-item').text(listDetail)
  //   listEl.appenTo(todoEl)
  // }

