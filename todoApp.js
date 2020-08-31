// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const filterOption = document.querySelector('.todo-filter');
const todoList = document.querySelector('.todo-list');


// Functions
addTodo = (event) => {
    // Prevent form from submitting
    event.preventDefault();
    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Add todo to Local Storage
    saveLocalTodo(todoInput.value);
    // Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-button');
    todoDiv.appendChild(completedButton);
    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-button');
    todoDiv.appendChild(deleteButton);
    // Append to list
    todoList.appendChild(todoDiv);
    // Clear input
    todoInput.value = '';
}

deleteOrCheckTodo = (event) => {
    // Which button has been clicked
    const button = event.target;
    // Delete TODO
    if (button.classList[0] === 'delete-button') {
        const todo = button.parentElement;
        // Animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
        // Remove from local storage
        removeTodo(todo);
    }
    // Check mark
    if (button.classList[0] === 'complete-button') {
        const todo = button.parentElement;
        todo.classList.toggle('completed');
    }
}

filterTodos = (event) => {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch(event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

saveLocalTodo = (todo) => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

getTodos = () => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo) => {
        // Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-button');
        todoDiv.appendChild(completedButton);
        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-button');
        todoDiv.appendChild(deleteButton);
        // Append to list
        todoList.appendChild(todoDiv);
    })
}

removeTodo = (todo) => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoName = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoName), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheckTodo);
filterOption.addEventListener('click', filterTodos);
