const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const input = document.querySelector(".task-input");
const Data = document.querySelector(".Data");
let filter = "all"; // Default to show all tasks

// Add Task
function addTask() {
    const taskInput = input.value.trim();
    const newObj = { id: Date.now(), name: taskInput, status: "Active" }; // Add a unique ID

    if (taskInput) {
        tasks.push(newObj);
        input.value = '';
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTask();
    } else {
        alert("Please write something");
    }
}

// Display Task
function displayTask() {
    Data.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === "active") return task.status === "Active";
        if (filter === "completed") return task.status === "Done";
    });

    const tasksHTML = filteredTasks.map((item) => `
        <div class="data-container d-flex justify-content-between align-items-center">
            <p class="task-name w-75" style="text-decoration: ${item.status === "Done" ? "line-through" : "none"};">${item.name}</p>
            <div class="task-btn w-25 d-flex gap-2">
                <button class="done-btn p-1" onclick="markAsDone(${item.id})" style="background-color: ${item.status === "Done" ? "#929aab" : "none"};">${item.status === "Active" ? "Done" : "Undo"}</button>
                <button class="delete-btn p-1" onclick="removeTask(${item.id})">Delete</button>
            </div>
        </div>
    `).join('');

    Data.innerHTML = tasksHTML;
}

// Remove Task
function removeTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTask();
    }
}

// Mark as Done
function markAsDone(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.status = task.status === "Active" ? "Done" : "Active";
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Re-render the list while preserving the current filter
        displayTask();
    }
}

function filterTasks(newFilter, clickedButton) {
    filter = newFilter;
    displayTask();

    document.querySelectorAll(".filter-buttons button").forEach(btn => {
        btn.style.backgroundColor = "";  // Reset to default
        btn.style.color = ""; // Reset text color
    });

    clickedButton.style.backgroundColor = "#2c2f34";  // Blue background
    clickedButton.style.color = "#fff";  // White text
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("all-btn").style.backgroundColor = "#2c2f34";
    document.getElementById("all-btn").style.color = "#fff";
});


displayTask();

