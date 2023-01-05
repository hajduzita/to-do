// Variables
let allTodo = 0;

// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter');
const emptyListText = document.querySelector('.empty-list');
const charCounter = document.querySelector('.counter');
const filterCounter = document.querySelector('.filter-counter');
const filterCounted = document.querySelector('.filter-counted');

// Events
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoFilter.addEventListener('click', filterTodo);
todoInput.addEventListener('keyup', countTodoLength);

// Functions
function addTodo(event) {
    // Prevent form submiting (browser refresh)
    event.preventDefault();

    // Add todo div
    const todoDiv = document.createElement('div'); // make div
    todoDiv.classList.add('todo'); // add class to maked div

    // Hide empty list text
    emptyListText.style.display = 'none';

    // Count todos
    filterCounter.innerText = 1 + todoList.childElementCount;
    allTodo = 1 + todoList.childElementCount;

    // Add li item
    const newTodo = document.createElement('li'); // make li
    newTodo.innerText = todoInput.value; // transfer todo text in li
    newTodo.classList.add('todo-item'); // add new todo to class
    todoDiv.appendChild(newTodo) // put new todo item li into the new div

    // Add buttons (created)
    const completedButton = document.createElement('button'); // make button
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'; // put tag in <button> tag
    completedButton.classList.add('complete-btn'); // add css class
    todoDiv.appendChild(completedButton) // put completed button button into the new div

    // Add buttons (trash)
    const trashButton = document.createElement('button'); // make button
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>'; // put <i> tag in <button> tag
    trashButton.classList.add('trash-btn'); // add css class
    todoDiv.appendChild(trashButton) // put trash button button into the new div

    // Append new div (class="todo") into the existenced <ul>
    todoList.appendChild(todoDiv);

    // Clear input field, after add todo
    todoInput.value = '';
}

function deleteCheck(event) {
    const item = event.target;
    const listElementCounter = todoList.childElementCount;

    if (item.classList[0] === 'trash-btn') {
        const todoItem = item.parentElement
        todoItem.classList.add('collapse');
        // Todo counter update
        allTodo --;
        filterCounter.innerText = allTodo;
        // Show empty list text if no todo left
        if (listElementCounter === 1) {
            emptyListText.style.display = 'flex';
        }
        // Remove item
        todoItem.addEventListener('transitionend', function(){
            todoItem.remove();
        });
    }

    if (item.classList[0] === 'complete-btn') {
        item.parentElement.classList.toggle('completed'); // add css class to its parent div
        item.nextSibling.remove();
        item.remove();
    }
}

function filterTodo(event) {
    const filterBy = event.target.value;
    const todos = todoList.childNodes;
    const todoArr = Array.from(todos);
    todoArr.shift();
    
    todoArr.forEach(function(todo) {
        switch(filterBy) {
            case 'all':
                todo.style.display = 'flex';
                // Count matches (all)
                const all = document.getElementsByClassName('todo').length;
                filterCounted.innerText = all;
                emptyListText.style.display = 'none'
                break;
            case 'completed': 
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                    // Count matches (completed)
                    const completed = document.getElementsByClassName('completed').length;
                    filterCounted.innerText = completed;                 
                } else {;
                    todo.style.display = "none";
                };
                break;
            case 'uncompleted':
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                    // Count matches (uncompleted)
                    const all = document.getElementsByClassName('todo').length;
                    const completed = document.getElementsByClassName('completed').length;
                    filterCounted.innerText = all - completed;
                } else {;
                    todo.style.display = "none";
                };
                break;
        }
    });
}

function countTodoLength(event) {
    const inputLength = event.target.value.length;
    charCounter.innerText = inputLength;
}