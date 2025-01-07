const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function displayTasks() {
    taskList.innerHTML = ''; // Clear the current list
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task');
        // Add 'completed' class only if task is marked as completed
        if (task.completed) {
            li.classList.add('completed');
        }

        // Add click listener to the entire list item to toggle completion
        li.addEventListener('click', () => toggleCompletion(index));

        // Set the task text
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.classList.add('task-text');

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling to the <li>
            deleteTask(index);
        });

        // Append the text and button to the list item
        li.appendChild(taskText);
        li.appendChild(deleteBtn);

        // Append the list item to the task list
        taskList.appendChild(li);
    });
}

// Add new task function
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        taskInput.value = ''; // Clearing input
        saveTasks();
        displayTasks();
    }
}

// Add task when clicking the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Add task when pressing "Enter"
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask(); // Call addTask when Enter is pressed
    }
});

// Toggle task completion
function toggleCompletion(index) {
    // Toggle the completed state of the clicked task
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

// Delete task
function deleteTask(index) {
    // Remove task from the array
    tasks.splice(index, 1);
    saveTasks(); // Update localStorage
    displayTasks(); // Re-render the task list
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

displayTasks();
