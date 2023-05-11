// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date()); // Set to today's date

class ToDoItem{
    title:string;
    dueDate:Date;
    isCompleted:boolean;
}
/* Test Code if needed
let item = new ToDoItem();
item.title = "Testing";
item.dueDate = new Date(2023, 8, 2);
item.isCompleted = false;
*/

window.onload = function() {
    let addItem = getByID("add");
    addItem.onclick = addToDo;
}

function addToDo() {
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
        getInputByID("title").value = "";
        getInputByID("due-date").value = "";
    }
}

/**
 * Check form data is valid
 */
function isValid():boolean{
    let validData = true;

    if (getInputByID("title").value == "") {
        validData = false;
        displayError("title-error", "Title for task required");
    }
    if (getInputByID("due-date")) {

    }

    return validData;
}

/**
 * Get all input from form and
 * turn it into a ToDoItem object
 */
function getToDoItem():ToDoItem{
    let item = new ToDoItem();
    item.title = getInputByID("title").value;
    item.dueDate = new Date(getInputByID("due-date").value);
    item.isCompleted = getInputByID("is-complete").checked;
    return item;
}

/**
 *  Display given ToDoItem on webpage
 * @param item
 */
function displayToDoItem(item:ToDoItem):void{
    let toDoText = document.createElement("h3");
    toDoText.innerText = item.title;

    let toDoDate = document.createElement("p");
    toDoDate.innerText = item.dueDate.toDateString();

    let displayIncomplete = getByID("incomplete-items");
    let displayCompleted = getByID("completed-items");

    if (!item.isCompleted) {
        displayIncomplete.appendChild(toDoText);
        displayIncomplete.appendChild(toDoDate);     
    }
    else (item.isCompleted) {
        displayCompleted.appendChild(toDoText);
        displayCompleted.appendChild(toDoDate);
    }
}

// Task: Allow user to mark item as completed

function displayError(id:string, errorMessage:string):void{
    let errorSpan = getByID(id);
    errorSpan.innerText = errorMessage;
}

function getByID(id:string):HTMLElement {
    return document.getElementById(id);
}

function getInputByID(id:string):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}