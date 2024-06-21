// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 0;

// Todo: create a function to generate a unique task id
function generateTaskId() { 
    const timestamp = new Date().getTime(); //current time
    const randomNum = Math.floor(Math.random() * 100); //creates a random number between 0 and 99
    const uniqueID = timestamp + '-' + randomNum; //combines timestamp and random number to create a unique id
    nextId = uniqueID;
    return uniqueID;
}

// Todo: create a function to create a task card
// t means task
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);
    const tHeader = $('<div>').addClass('card-header h4').text(task.name);
    const tBody = $('<div>').addClass('card-body');
    const tDescription = $('<p>').addClass('card-text').text(task.description);
    const tDeleteButton = $('<button>').addClass('btn btn-danger delete').text('Delete').attr('data-task-id', task.id);
    const tDate = $('<p>').addClass('card-text').text('Due Date: ' + task.date);
    tDeleteButton.on('click', handleDeleteTask);
    taskCard.append(tHeader);
    taskCard.append(tBody);
    taskCard.append(tDescription);
    taskCard.append(tDate);
    taskCard.append(tDeleteButton);
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $("#todo-cards").empty();
    for (const task of taskList) {
       let taskCard = createTaskCard(task)
       $("#todo-cards").append(taskCard)
    }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    let nTask = $("#nTask").val();
    let submissionDate = $("#dueDate").val();
    let description = $("#description").val();
    if(submissionDate && description && nTask){
        let newTask = {
            id: generateTaskId(),
            name: nTask,
            date: submissionDate,
            description: description,
            status: "todo"
        };
        taskList.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        localStorage.setItem("nextId", JSON.stringify(nextId));
        renderTaskList();
        //$("#formModal").modal("hide");
        
    } else {
        alert("Please Complete the Task Form.")
    }
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    let tId = $(this).data("task-id");
    taskList = taskList.filter(task => task.id !== tId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    let taskID = ui.draggable.attr("data-task-id");
    let newStatus = $(this).attr("id");
    let taskIndex = taskList.findIndex(task => task.id == taskID);
    taskList[taskIndex].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    $("#submit-button").click(handleAddTask);
    
    $(".task-card").draggable({
        revert: "invalid",
        cursor: "move"
    });

    $(".lane").droppable({
        accept: ".task-card",
        drop: handleDrop
    });

    $("#dueDate").datepicker();
});