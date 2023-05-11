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
    if (getInputByID("due-date")) {
    }
    return validData;
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
    var displayIncomplete = getByID("incomplete-items");
    var displayCompleted = getByID("completed-items");
    if (!item.isCompleted) {
        displayIncomplete.appendChild(toDoText);
        displayIncomplete.appendChild(toDoDate);
    }
    else
        (item.isCompleted);
    {
        displayCompleted.appendChild(toDoText);
        displayCompleted.appendChild(toDoDate);
    }
}
function displayError(id, errorMessage) {
    var errorSpan = getByID(id);
    errorSpan.innerText = errorMessage;
}
function getByID(id) {
    return document.getElementById(id);
}
function getInputByID(id) {
    return document.getElementById(id);
}
