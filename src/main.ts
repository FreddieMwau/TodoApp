// class Task {
//     readonly title: string
//     readonly due_date: string
//     readonly description: string

//     constructor(title: string, due_date: string, description: string) {
        
//     }
// }

// const taskInput = document.querySelector(".task-input input") as HTMLInputElement | null;

let todos = [] as any;
let editId: string;
let isEditedTask: boolean = false;



// calling a HTML functions to update task status
const updateStatus = function (selectedTask: any) {
    // console.log("This is the selected task ===>" + selectedTask);

    // this gets the paragraph that contains the task name
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }

}

const showMenu = function (selectedTask: any) {
    // console.log("This is the selected task ===>" + selectedTask);

    // getting the task menu div
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");

    document.addEventListener("click", e => {
        // stops displaying the editing controls when clicked
        if (e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    })

}

// Deletes the tasks by ID
const deleteTask = function (e: any): void {
    // console.log("This is the deleted ID "+deleteId);
    // todos.splice(deleteId, 1);
    // import showToDo();
    console.log(e.parentElement);
    e.parentElement.parentElement.parentElement.remove();

}

const editTask = function (taskId: string, taskName: any) {
    // console.log(taskId, taskName);
    editId = taskId;
    isEditedTask = true;
    // taskName = taskInput?.value.trim();
}

window.addEventListener('load', (e) => {
    const taskInput = document.querySelector(".task-input input") as HTMLInputElement | null;
    const taskBox = document.querySelector(".task-box") as HTMLUListElement | null;
    const filters = document.querySelectorAll(".filters span");
    const clearAll = document.querySelector(".clear-btn");


    filters.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector("span.active")?.classList.remove("active");
            btn.classList.add("active");
            showToDo(btn.id);
        });
    });

    // let todos = [] as any;
    function showToDo(filters: string) {
        let li = "";
        todos.forEach((todo: string, id: string) => {
            // console.log("Testing this part");
            if (todos) {
                // if todoList is completed set the isCompleted value to checked
                let isCompleted = todos.status == "completed" ? "checked" : "";
                if(filters == todos.status || filters == "all"){
                    li += `<li class="task">
                                <label for="${id}">
                                    <input onclick="updateStatus(this)" type="checkbox" class="check-status" id="${id}" ${isCompleted}>
                                    <p class="${isCompleted}">${todos[id].name}</p>
                                </label>
                                <div class="settings">
                                    <img src="/images/dots.png" onclick="showMenu(this)" alt="ellipsis">
                                    <ul class="task-menu">
                                        <li onclick="editTask(${id}, '${todos[id].name}')"><img src="/images/pen.png" alt="pen">Edit</li>
                                        <li onclick="deleteTask(this)"><img src="/images/delete.png" alt="delete">Delete</li>
                                    </ul>
                                </div>
                            </li>`;
                }
            }
        });
        if (!taskBox) return
        taskBox.innerHTML = li || `<span>You don't have any task here</span>`;
    }
    showToDo("all");

    clearAll?.addEventListener("click", () => {
        todos.splice(0, todos.length);
        showToDo("all")
    })

    taskInput?.addEventListener("keyup", e => {
        let userTask = taskInput.value.trim();
        if (e.key == "Enter" && userTask) {
            if(!isEditedTask){ //if isEditedTask isnt true
                if (!todos) {
                    // if todos doesn't exist, pass an empty array to todos
                    todos = [];
                }
                let taskInfo = { name: userTask, status: "pending", completedAt: new Date() };
                todos.push(taskInfo);
            } else {
                isEditedTask =false;
                todos[editId].name = userTask;
            }
            taskInput.value = "";
            // console.log(todos.name);
            showToDo("all");
            // console.log(taskInfo);
        }
    })
})