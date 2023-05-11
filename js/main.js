var picker = datepicker("#due-date");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = getByID("add");
    addItem.onclick = addToDo;
};
function addToDo() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
        getInputByID("title").value = "";
        getInputByID("due-date").value = "";
    }
}
function isValid() {
    var validData = true;
    if (getInputByID("title").value == "") {
        validData = false;
        displayError("title-error", "Title for task required");
    }
    if (getInputByID("due-date").value == "") {
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
    item.title = getInputByID("title").value;
    item.dueDate = new Date(getInputByID("due-date").value);
    item.isCompleted = getInputByID("is-complete").checked;
    return item;
}
function displayToDoItem(item) {
    var toDoText = document.createElement("h3");
    toDoText.innerText = item.title;
    var toDoDate = document.createElement("p");
    toDoDate.innerText = item.dueDate.toDateString();
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
}
function getByID(id) {
    return document.getElementById(id);
}
function getInputByID(id) {
    return document.getElementById(id);
}
