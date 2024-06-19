// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() { 
    const timestamp = new Date().getTime(); //current time
    const randomNum = Math.floor(Math.random() * 100); //creates a random number between 0 and 99
    const uniqueID = timestamp + '-' + randomNum; //combines timestamp and random number to create a unique id
    return uniqueID;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    let cardBody = document.createElement("div");
    let cardHeader = documnet.createElement("h5");
    let cardText= document.createElement("p");
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
