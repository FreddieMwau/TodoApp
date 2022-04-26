// class Task {
//     readonly title: string
//     readonly due_date: string
//     readonly description: string
//     constructor(title: string, due_date: string, description: string) {
//     }
// }
// const taskInput = document.querySelector(".task-input input") as HTMLInputElement | null;
var todos = [];
var editId;
var isEditedTask = false;
// calling a HTML functions to update task status
var updateStatus = function (selectedTask) {
    // console.log("This is the selected task ===>" + selectedTask);
    // this gets the paragraph that contains the task name
    var taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    }
    else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
};
var showMenu = function (selectedTask) {
    // console.log("This is the selected task ===>" + selectedTask);
    // getting the task menu div
    var taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", function (e) {
        // stops displaying the editing controls when clicked
        if (e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    });
};
// Deletes the tasks by ID
var deleteTask = function (e) {
    // console.log("This is the deleted ID "+deleteId);
    // todos.splice(deleteId, 1);
    // import showToDo();
    console.log(e.parentElement);
    e.parentElement.parentElement.parentElement.remove();
};
var editTask = function (taskId, taskName) {
    // console.log(taskId, taskName);
    editId = taskId;
    isEditedTask = true;
    // taskName = taskInput?.value.trim();
};
window.addEventListener('load', function (e) {
    var taskInput = document.querySelector(".task-input input");
    var taskBox = document.querySelector(".task-box");
    var filters = document.querySelectorAll(".filters span");
    var clearAll = document.querySelector(".clear-btn");
    filters.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var _a;
            (_a = document.querySelector("span.active")) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
            btn.classList.add("active");
            showToDo(btn.id);
        });
    });
    // let todos = [] as any;
    function showToDo(filters) {
        var li = "";
        todos.forEach(function (todo, id) {
            // console.log("Testing this part");
            if (todos) {
                // if todoList is completed set the isCompleted value to checked
                var isCompleted = todos.status == "completed" ? "checked" : "";
                if (filters == todos.status || filters == "all") {
                    li += "<li class=\"task\">\n                                <label for=\"".concat(id, "\">\n                                    <input onclick=\"updateStatus(this)\" type=\"checkbox\" class=\"check-status\" id=\"").concat(id, "\" ").concat(isCompleted, ">\n                                    <p class=\"").concat(isCompleted, "\">").concat(todos[id].name, "</p>\n                                </label>\n                                <div class=\"settings\">\n                                    <img src=\"/images/dots.png\" onclick=\"showMenu(this)\" alt=\"ellipsis\">\n                                    <ul class=\"task-menu\">\n                                        <li onclick=\"editTask(").concat(id, ", '").concat(todos[id].name, "')\"><img src=\"/images/pen.png\" alt=\"pen\">Edit</li>\n                                        <li onclick=\"deleteTask(this)\"><img src=\"/images/delete.png\" alt=\"delete\">Delete</li>\n                                    </ul>\n                                </div>\n                            </li>");
                }
            }
        });
        if (!taskBox)
            return;
        taskBox.innerHTML = li || "<span>You don't have any task here</span>";
    }
    showToDo("all");
    clearAll === null || clearAll === void 0 ? void 0 : clearAll.addEventListener("click", function () {
        todos.splice(0, todos.length);
        showToDo("all");
    });
    taskInput === null || taskInput === void 0 ? void 0 : taskInput.addEventListener("keyup", function (e) {
        var userTask = taskInput.value.trim();
        if (e.key == "Enter" && userTask) {
            if (!isEditedTask) { //if isEditedTask isnt true
                if (!todos) {
                    // if todos doesn't exist, pass an empty array to todos
                    todos = [];
                }
                var taskInfo = { name: userTask, status: "pending", completedAt: new Date() };
                todos.push(taskInfo);
            }
            else {
                isEditedTask = false;
                todos[editId].name = userTask;
            }
            taskInput.value = "";
            // console.log(todos.name);
            showToDo("all");
            // console.log(taskInfo);
        }
    });
});
