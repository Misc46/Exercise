const readline = require("readline"); // Anjing bbrapa kali bingung banget kok module not found ternyata type :skull:

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
}); //Walahi kenapa di tutorial tutorial gapernah disuru naro ini, padahal vital banget :skull:

let tasks = [];

// Main menu function rapih tapi ntah kenapa berasa goofy dah
function mainMenu() {
  console.log("\nTask Manager");
  console.log("1. Add Task");
  console.log("2. Show Tasks");
  console.log("3. Edit Task");
  console.log("4. Exit");
  
  rl.question("Choose an option: ", (answer) => {
    switch (answer.trim()) {
      case "1":
        addTask();
        break;
      case "2":
        showTasks();
        break;
      case "3":
        editTask();
        break;
      case "4":
        console.log("Exiting...");
        rl.close();
        break;
      default:
        console.log("Invalid option, please try again.");
        mainMenu();
    }
  });
}

// Add task function kalo yang ini seneng si, berasa rapih
function addTask() {
  rl.question("Enter task name: ", (name) => {
    rl.question("Enter task deadline: ", (deadline) => {
      tasks.push({ name, deadline, status: "Ongoing" });
      console.log("Task added successfully!");
      mainMenu();
    });
  });
}

// Show tasks function
function showTasks() {
  console.log("\nChoose a filter:");
  console.log("1. Show All");
  console.log("2. Show Done");
  console.log("3. Show Ongoing");

  rl.question("Choose an option: ", (answer) => {
    let filteredTasks;
    switch (answer.trim()) {
      case "1":
        filteredTasks = tasks;
        break;
      case "2":
        filteredTasks = tasks.filter(task => task.status === "Done");
        break;
      case "3":
        filteredTasks = tasks.filter(task => task.status === "Ongoing");
        break;
      default:
        console.log("Invalid option, returning to main menu.");
        mainMenu();
        return;
    }

    if (filteredTasks.length === 0) {
      console.log("No tasks found for this filter.");
    } else {
      filteredTasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.name} - Deadline: ${task.deadline} - Status: ${task.status}`);
      });
    }
    mainMenu();
  });
}

// Edit task function
function editTask() {
  if (tasks.length === 0) {
    console.log("No tasks to edit.");
    mainMenu();
    return;
  }

  console.log("\nChoose a task to edit:");
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.name} - Deadline: ${task.deadline} - Status: ${task.status}`);
  });

  rl.question("Enter task number: ", (taskNumber) => {
    const index = parseInt(taskNumber.trim()) - 1;
    if (isNaN(index) || index < 0 || index >= tasks.length) {
      console.log("Invalid task number.");
      mainMenu();
      return;
    }

    rl.question("Enter new task name (leave blank to keep current): ", (name) => {
      rl.question("Enter new deadline (leave blank to keep current): ", (deadline) => {
        rl.question("Enter status (1 for Ongoing, 2 for Done): ", (statusOption) => {
          tasks[index].name = name || tasks[index].name;
          tasks[index].deadline = deadline || tasks[index].deadline;
          tasks[index].status = statusOption === "2" ? "Done" : "Ongoing";
          
          console.log("Task updated successfully!");
          mainMenu();
        });
      });
    });
  });
}

// Start the application
mainMenu();
