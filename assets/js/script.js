// Get HTML elements
const taskStructure = document.getElementById("task-structure");
const task = document.getElementById("task");
const taskButton = document.getElementById("btn-task");
const form = document.getElementById("form");
const messages = document.getElementById("messages");
const clearItems = document.getElementById("clear-items");
// Create task list
const ul = document.createElement("ul");
ul.classList.add("list-group", "list-group-numbered");
form.appendChild(ul);

// Function to validate the form
function validateForm() {
    const taskValue = task.value.trim(); // Remove extra spaces

    if (taskValue === "") {
        messages.textContent = "The input cannot be empty.";
        task.classList.add("is-invalid");
        return false;
    }

    const wordCount = taskValue.length;

    if (wordCount < 3) {
        messages.textContent = "The input must contain at least 3 words.";
        task.classList.add("is-invalid");
        return false;
    } else if (wordCount > 1000) {
        messages.textContent = "The input must not exceed 1000 words.";
        task.classList.add("is-invalid");
        return false;
    }

    task.classList.remove("is-invalid");
    messages.textContent = "";
    return true;
}

// Function to create a new task
function createTaskItem() {
    const isValid = validateForm();
    if (isValid) {
        const taskValue = task.value.trim(); // Remove extra spaces again just to be sure
        const li = document.createElement("li");
        li.classList.add("list-group-item", "my-2", "border-primary");
        li.textContent = taskValue;
        const i = document.createElement('i');
        i.classList.add("bi","bi-trash", "remove-task");
        i.style.float = "right";
        i.style.color = "#ff0000"
        i.style.cursor = "pointer";
        li.appendChild(i);
        ul.appendChild(li);

        // Get existing tasks from localStorage
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        existingTasks.push(taskValue);

        // Save updated tasks to localStorage
        localStorage.setItem('tasks', JSON.stringify(existingTasks));

        // Clear the input value after adding to the list
        task.value = "";
    }
}

// Click event for task button
taskButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    createTaskItem();
});

// Enter key event to create a task
document.addEventListener("keypress", (evt) => {
    if (evt.key === "Enter") {
        evt.preventDefault();
        createTaskItem();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (storedTasks.length !== 0) {
        storedTasks.forEach(task => {
            const li = document.createElement("li");
            li.classList.add("list-group-item", "my-2", "border-primary");
            li.textContent = task;

            const i = document.createElement('i');
            i.classList.add("bi","bi-trash", "remove-task");
            i.style.float = "right";
            i.style.color = "#ff0000"
            i.style.cursor = "pointer";
            li.appendChild(i);
            ul.appendChild(li);

            

        });
    }
});

clearItems.addEventListener('click', (evt) => {
    evt.preventDefault();
    const getItems = JSON.parse(localStorage.getItem('tasks')) || [];
    
    
    if (getItems.length >= 1) {
        localStorage.clear('tasks');
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    }

});