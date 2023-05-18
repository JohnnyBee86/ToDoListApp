var picker = datepicker("#due-date");
var todokey = "todo";
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = getByID("add");
    addItem.onclick = addToDo;
    loadSavedItems();
};
function addToDo() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
        resetInputArea();
        saveToDo(item);
    }
}
function resetInputArea() {
    getInput("title").value = "";
    getInput("due-date").value = "";
    getByID("title-error").innerText = "*";
    getByID("date-error").innerText = "*";
    getInput("is-complete").checked = false;
}
function isValid() {
    var validData = true;
    if (getInput("title").value == "") {
        validData = false;
        displayError("title-error", "Title for task required");
    }
    if (getInput("due-date").value == "") {
        validData = false;
        displayError("date-error", "Date for task required");
    }
    return validData;
}
function displayError(id, errorMessage) {
    var errorSpan = getByID(id);
    errorSpan.innerText = errorMessage;
}
function getToDoItem() {
    var item = new ToDoItem();
    item.title = getInput("title").value;
    item.dueDate = new Date(getInput("due-date").value);
    item.isCompleted = getInput("is-complete").checked;
    return item;
}
function displayToDoItem(item) {
    var toDoText = document.createElement("h3");
    toDoText.innerText = item.title;
    var toDoDate = document.createElement("p");
    var dueDate = new Date(item.dueDate.toString());
    toDoDate.innerText = dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.setAttribute("data-task-title", item.title);
    itemDiv.onclick = toggleComplete;
    itemDiv.classList.add("todo");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(toDoText);
    itemDiv.appendChild(toDoDate);
    if (item.isCompleted) {
        var displayCompleted = getByID("completed-items");
        displayCompleted.appendChild(itemDiv);
    }
    else {
        var displayIncomplete = getByID("incomplete-items");
        displayIncomplete.appendChild(itemDiv);
    }
}
function toggleComplete() {
    var itemDiv = this;
    if (itemDiv.classList.contains("completed")) {
        itemDiv.classList.remove("completed");
        var incompleteItems = getByID("incomplete-items");
        incompleteItems.appendChild(itemDiv);
    }
    else {
        itemDiv.classList.add("completed");
        var completedItems = getByID("completed-items");
        completedItems.appendChild(itemDiv);
    }
    var allToDos = getToDoItems();
    var currentTodoTitle = itemDiv.getAttribute("data-task-title");
    for (var i = 0; i < allToDos.length; i++) {
        var nextTodo = allToDos[i];
        if (nextTodo.title == currentTodoTitle) {
            nextTodo.isCompleted = !nextTodo.isCompleted;
        }
    }
    saveAllToDos(allToDos);
}
function saveAllToDos(allToDos) {
    localStorage.setItem(todokey, "");
    var allToDosString = JSON.stringify(allToDos);
    localStorage.setItem(todokey, allToDosString);
}
function saveToDo(item) {
    var currItems = getToDoItems();
    if (currItems == null) {
        currItems = new Array();
    }
    currItems.push(item);
    var currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}
function getToDoItems() {
    var itemString = localStorage.getItem(todokey);
    var item = JSON.parse(itemString);
    return item;
}
function loadSavedItems() {
    var itemArray = getToDoItems();
    if (itemArray != null) {
        for (var i = 0; i < itemArray.length; i++) {
            displayToDoItem(itemArray[i]);
        }
    }
}
function getByID(id) {
    return document.getElementById(id);
}
function getInput(id) {
    return document.getElementById(id);
}
