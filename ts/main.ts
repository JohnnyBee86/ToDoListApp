// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#due-date");
const todokey = "todo";
picker.setMin(new Date()); // Set to today's date

class ToDoItem{
    title:string;
    dueDate:Date;
    isCompleted:boolean;
}

window.onload = function() {
    let addItem = getByID("add");
    addItem.onclick = addToDo;

    loadSavedItems();
}

// main
function addToDo() {
    if(isValid()){
        let item = getToDoItem();
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

/**
 * Check form data is valid
 */
function isValid():boolean{
    let validData = true;

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
function displayError(id:string, errorMessage:string):void{
    let errorSpan = getByID(id);
    errorSpan.innerText = errorMessage;
}

/**
 * Get all input from form and
 * turn it into a ToDoItem object
 */
function getToDoItem():ToDoItem{
    let item = new ToDoItem();
    item.title = getInput("title").value;
    item.dueDate = new Date(getInput("due-date").value);
    item.isCompleted = getInput("is-complete").checked;
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
    //toDoDate.innerText = item.dueDate.toDateString();
    let dueDate = new Date(item.dueDate.toString());
    toDoDate.innerText = dueDate.toDateString();

    let itemDiv = document.createElement("div");
    itemDiv.setAttribute("data-task-title", item.title);
    itemDiv.onclick = toggleComplete;

    itemDiv.classList.add("todo");
    if(item.isCompleted) {
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(toDoText);
    itemDiv.appendChild(toDoDate);

    if (item.isCompleted) {
        let displayCompleted = getByID("completed-items");
        displayCompleted.appendChild(itemDiv);     
    }
    else {
        let displayIncomplete = getByID("incomplete-items");
        displayIncomplete.appendChild(itemDiv);
    }
    
}

// Task: Allow user to mark item as completed
function toggleComplete(){
    let itemDiv = <HTMLElement>this;

    if(itemDiv.classList.contains("completed")) {
        itemDiv.classList.remove("completed");
        let incompleteItems = getByID("incomplete-items");
        incompleteItems.appendChild(itemDiv);
    }
    else {
        itemDiv.classList.add("completed");
        let completedItems = getByID("completed-items");
        completedItems.appendChild(itemDiv);
    }

    let allToDos = getToDoItems();
    let currentTodoTitle = itemDiv.getAttribute("data-task-title");
    for(let i = 0; i < allToDos.length; i++){
        let nextTodo = allToDos[i]; // Get ToDo out of array
        if(nextTodo.title == currentTodoTitle){
            nextTodo.isCompleted = !nextTodo.isCompleted; // Flip complete/incomplete
        }
    }

    saveAllToDos(allToDos);
}

/**
 * Clear current ToDos and generate new save
 * @param allToDos new list to save
 */
function saveAllToDos(allToDos:ToDoItem[]) {
    localStorage.setItem(todokey, ""); // delete current save
    let allToDosString = JSON.stringify(allToDos); // generate new string
    localStorage.setItem(todokey, allToDosString);
}

/**
 * Save all ToDo items in local storage
 * @param item A ToDo item to be saved
 */
function saveToDo(item:ToDoItem):void {
    let currItems = getToDoItems();
    if (currItems == null) { // no items found
        currItems = new Array();
    }
    currItems.push(item); // add the new item to the curr item list

    let currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}

/**
 * Get all stored ToDo items from local storage
 * or return null if none are found
 */
function getToDoItems():ToDoItem[] {
    // retrieve ToDo item from local storage
    let itemString = localStorage.getItem(todokey);

    // change from string to item
    let item:ToDoItem[] = JSON.parse(itemString);

    return item;
}

/**
 * Load all ToDo items from local storage
 * or nothing if none are found
 */
function loadSavedItems() {
    let itemArray = getToDoItems(); // read from storage
    if (itemArray != null) {
        for (let i = 0; i < itemArray.length; i++) {
            displayToDoItem(itemArray[i]);
        }
    }
    
}


function getByID(id:string):HTMLElement {
    return document.getElementById(id);
}

function getInput(id:string):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}