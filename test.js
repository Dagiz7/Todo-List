const tasks = [

];/*
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }parse and string file
}*/
function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

// Function to handle drag over event
function handleDragOver(event) {
    event.preventDefault();
}

// Function to handle drop event
function handleDrop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    const taskElement = document.getElementById(taskId);
    const targetElement = event.target.closest(".todo-item");
    if (targetElement) {
        targetElement.parentNode.insertBefore(taskElement, targetElement.nextSibling);
    } else {
        todoList.appendChild(taskElement);
    }
    saveTasksToLocalStorage();
}

var todoList = document.querySelector(".todo-list");
var todoItems = document.querySelectorAll(".todo-item");

//used for adding new tasks in the list
document.addEventListener("DOMContentLoaded", function () {
    loadTasksFromLocalStorage();
    tasks.forEach((task) => {
        if (task.text) {
            const child = document.createElement("li");
            child.classList.add("todo-item", "flex", "items-center", "mb-2",);
            child.id = task.id;
            child.draggable = true;
            child.innerHTML = `
        <input type="checkbox" class="mr-2">
        <label class="flex-1">${task.text}</label>
        <div class="button-group">
          <button class="updateButton bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"><i class="fas fa-pencil-alt"></i></button>
          <button class="deleteButton bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"><i class="fas fa-trash"></i></button>
        </div>
    `;

            child.addEventListener("dragstart", handleDragStart);
            child.addEventListener("dragover", handleDragOver);
            child.addEventListener("drop", handleDrop);
            todoList.appendChild(child);
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const clearInputIcon = document.getElementById('clearInput');
    const updateInput = document.getElementById('updateInput');

    clearInputIcon.addEventListener('click', function () {
        updateInput.value = ''; // Clear the input field
        updateInput.focus(); // Keep the focus on the input field after clearing
    });
});
//the part will delete and a pop of update
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteButton")) {
        var taskItem = event.target.closest(".todo-item");
        taskItem.remove();
        var taskId = parseInt(taskItem.id);
        tasks = tasks.filter(task => task.id !== taskId); // Remove deleted task from tasks array
        saveTasksToLocalStorage(); // Save tasks to localStorage after deleting
    }

    if (event.target.classList.contains("updateButton")) {
        var taskItem = event.target.closest(".todo-item");
        var label = taskItem.querySelector("label");
        var updateInput = document.getElementById("updateInput");
        updateInput.value = label.textContent;

        var overlay = document.getElementById("overlay");
        overlay.style.display = "block";

        document.getElementById("updateConfirmButton").addEventListener("click", function () {
            var newTaskText = updateInput.value.trim();
            if (newTaskText !== "") {
                label.textContent = newTaskText;
                var taskId = parseInt(taskItem.id);
                tasks.forEach(task => {
                    if (task.id === taskId) {
                        task.text = newTaskText; // Update task text in tasks array
                    }
                });
                saveTasksToLocalStorage(); // Save tasks to localStorage after updating
            }
            overlay.style.display = "none";
        });
    }
});
document.getElementById("addButton").addEventListener("click", function () {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    if (taskText !== "") {
        var newTask = document.createElement("li");
        newTask.classList.add("todo-item", "flex", "items-center", "mb-2");
        newTask.setAttribute("draggable", "true"); // Add draggable attribute
        var taskId = Date.now();
        newTask.id = taskId;
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("mr-2");
        var label = document.createElement("label");
        label.classList.add("flex-1");
        label.textContent = taskText;
        var buttonGroup = document.createElement("div");
        buttonGroup.classList.add("button-group");
        var updateButton = document.createElement("button");
        updateButton.classList.add(
            "updateButton",
            "bg-green-500",
            "hover:bg-green-700",
            "text-white",
            "font-bold",
            "py-2",
            "px-4",
            "rounded"
        );
        updateButton.innerHTML = '<i class="fas fa-pencil-alt "></i>';
        var deleteButton = document.createElement("button");
        deleteButton.classList.add(
            "deleteButton",
            "bg-red-500",
            "hover:bg-red-700",
            "text-white",
            "font-bold",
            "py-2",
            "px-4",
            "rounded"
        );
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        // Add a margin between the update and delete buttons
        updateButton.style.marginRight = "0.5rem";
        buttonGroup.appendChild(updateButton);
        buttonGroup.appendChild(deleteButton);
        newTask.appendChild(checkbox);
        newTask.appendChild(label);
        newTask.appendChild(buttonGroup);

        newTask.addEventListener("dragstart", handleDragStart);
        newTask.addEventListener("dragover", handleDragOver);
        newTask.addEventListener("drop", handleDrop);

        todoList.appendChild(newTask);
        taskInput.value = "";
    }
});
