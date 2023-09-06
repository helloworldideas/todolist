

let todosArray = []


let addBtn = document.querySelector(".addTodoBtn")
let newTodoText = document.querySelector(".newTodoText")
let allTodos = document.querySelector(".todos")

displayTodosFromLocalStorage()


if(localStorage.getItem("TodosArray")){
   
    var todoID = JSON.parse(localStorage.getItem("TodosArray")).length
}else{
    todoID = 1;
}

addBtn.addEventListener("click", function () {
    let todoValue = newTodoText.value;
    
    let newTodoObj = {
        id: todoID,
        todoText: todoValue,
        done: false
    }
    todoID++;

    todosArray.push(newTodoObj)

    CreateTodo(newTodoObj)
    addTodoArrayToLocalStorage(todosArray)
    newTodoText.value = ''
})


function displayTodosFromLocalStorage() {
    let todos = JSON.parse(localStorage.getItem("TodosArray"))
   if(todos){
    todosArray = todos;
    for (const todo of todos) {
        CreateTodo(todo)
    }
   }
}

function addTodoArrayToLocalStorage(array) {
    let arraytoJSON = JSON.stringify(array)

    localStorage.setItem("TodosArray", arraytoJSON)
}

function CreateTodo(todo) {
    let todoLi = document.createElement("li")
    todoLi.classList.add("todo")

    let todoH3 = document.createElement("h3")
    todoH3.classList.add("todoText")
    todoH3.innerText = todo.todoText;

    let todoCheck = document.createElement("input")
    todoCheck.setAttribute("type", "checkbox")
    todoCheck.classList.add("todoCheckbox")
    
    todoCheck.addEventListener("change", function () {
        if (this.checked) {
           
            this.nextElementSibling.classList.add("done")
            this.nextElementSibling.classList.remove("pending")

            changeTodoStatus(this.previousElementSibling.innerText, true)

        } else {
           
            this.nextElementSibling.classList.add("pending")
            this.nextElementSibling.classList.remove("done")

            changeTodoStatus(this.previousElementSibling.innerText, false)

        }
    })

    let todoLabel = document.createElement("label")
    todoLabel.classList.add("todoLabel")

    if (todo.done) {
       
        todoLabel.classList.add("done")
        todoLabel.classList.remove("pending")
        todoCheck.checked = true
    } else {
       
        todoLabel.classList.add("pending")
        todoLabel.classList.remove("done")
        todoCheck.checked = false;
    }

    todoLi.appendChild(todoH3)
    todoLi.appendChild(todoCheck)
    todoLi.appendChild(todoLabel)

    allTodos.appendChild(todoLi)

}



function changeTodoStatus(todoText, isDone) {
    todosArray.forEach(function (todo) {
        if (todo.todoText == todoText) {
            todo.done = isDone
        }
    })

    addTodoArrayToLocalStorage(todosArray)
}


