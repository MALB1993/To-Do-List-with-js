//----------- for input form by name : task
const taskStructure = document.getElementById("task-structure");
const task = document.getElementById("task");
const taskButton = document.getElementById("btn-task");
const form = document.getElementById("form");
const messages = document.getElementById("messages");
// create element
const ul = document.createElement("ul");
ul.classList.add("list-group", "list-group-numbered");
form.appendChild(ul);

// create new task
function createTaskItem() {
    const validInput = false;
    if (task.value === "") {
        messages.textContent = "The input cannot be empty."
        task.classList.add("is-invalid");
        return;
    } else if (task.value.length <= 3) {
        messages.textContent = "The input must contain at least 3 words."
        task.classList.add("is-invalid");
        return;
    } else if (task.value.length >= 1001) {
        messages.textContent = "The input must not exceed 1000 words."
        task.classList.add("is-invalid");
        return;
    } else {
        validInput = true;
    }
    
    if (validInput === true) {
        // Create list elements and add it to the form
        const li = document.createElement("li");
        li.classList.add("list-group-item", "my-1");
        ul.appendChild(li);
        // Add input value as desired text
        li.textContent = task.value;
        // Clear the input value after adding to the list
        task.value = "";
    }
}




// events

taskButton.addEventListener("click", (evt) => {
    evt.preventDefault()
    createTaskItem();
});

window.addEventListener("keypress", (evt) => evt.key === "Enter" ? createTaskItem : "");
