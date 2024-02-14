document.getElementById("addButton").addEventListener("click", function () {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
        var todoList = document.querySelector(".todo-list");
        var newTask = document.createElement("li");
        newTask.classList.add("todo-item", "flex", "items-center", "mb-2");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("mr-2");

        var label = document.createElement("label");
        label.classList.add("flex-1");
        label.textContent = taskText;

        var buttonGroup = document.createElement("div");
        buttonGroup.classList.add("button-group");

        var updateButton = document.createElement("button");
        updateButton.classList.add("updateButton", "bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded");
        updateButton.textContent = "Update Task";

        var deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton", "bg-red-500", "hover:bg-red-700", "text-white", "font-bold", "py-2", "px-4", "rounded");
        deleteButton.textContent = "Delete Task";

        // Add a margin between the update and delete buttons
        updateButton.style.marginRight = "0.5rem";

        buttonGroup.appendChild(updateButton);
        buttonGroup.appendChild(deleteButton);

        newTask.appendChild(checkbox);
        newTask.appendChild(label);
        newTask.appendChild(buttonGroup);
        todoList.appendChild(newTask);

        taskInput.value = "";
    }
});

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteButton")) {
        var taskItem = event.target.closest(".todo-item");
        taskItem.remove();
    }

    if (event.target.classList.contains("updateButton")) {
        var taskItem = event.target.closest(".todo-item");
        var label = taskItem.querySelector("label");

        var newTaskText = prompt("Update the task:", label.textContent);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            label.textContent = newTaskText.trim();
        }
    }
});