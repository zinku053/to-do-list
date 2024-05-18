document.addEventListener('DOMContentLoaded', function() {
    const inputBox = document.getElementById('input-box');
    const addButton = document.querySelector('button');
    const listContainer = document.getElementById('list-container');
    const clearButton = document.createElement('button');

    clearButton.textContent = 'Delete All';
    clearButton.classList.add('clear-btn');
    document.querySelector('.todo-app').appendChild(clearButton);

    loadTasks();

    addButton.addEventListener('click', addTask);
    clearButton.addEventListener('click', clearAllTasks);

    function addTask() {
        if (inputBox.value.trim() !== '') {
            const li = document.createElement('li');
            li.textContent = inputBox.value.trim();

            const deleteBtn = document.createElement('img');
            deleteBtn.src = 'images/delete.png';
            deleteBtn.alt = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                li.remove();
                saveTasks();
            });

            const editBtn = document.createElement('img');
            editBtn.src = 'images/edit.png';
            editBtn.alt = 'Edit';
            editBtn.classList.add('edit-btn');
            editBtn.addEventListener('click', () => {
                const newText = prompt('Edit task:', li.childNodes[0].textContent);
                if (newText !== null) {
                    li.childNodes[0].textContent = newText.trim();
                    saveTasks();
                }
            });

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('checkbox');
            checkbox.addEventListener('change', () => {
                li.classList.toggle('checked');
                saveTasks();
            });

            li.appendChild(checkbox);
            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
            listContainer.appendChild(li);

            saveTasks();
            inputBox.value = '';
        }
    }

    function clearAllTasks() {
        listContainer.innerHTML = '';
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        listContainer.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.childNodes[0].textContent,
                completed: li.classList.contains('checked')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.text;

                const deleteBtn = document.createElement('img');
                deleteBtn.src = 'images/delete.png';
                deleteBtn.alt = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => {
                    li.remove();
                    saveTasks();
                });

                const editBtn = document.createElement('img');
                editBtn.src = 'images/edit.png';
                editBtn.alt = 'Edit';
                editBtn.classList.add('edit-btn');
                editBtn.addEventListener('click', () => {
                    const newText = prompt('Edit task:', li.childNodes[0].textContent);
                    if (newText !== null) {
                        li.childNodes[0].textContent = newText.trim();
                        saveTasks();
                    }
                });

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.classList.add('checkbox');
                checkbox.checked = task.completed;
                if (task.completed) {
                    li.classList.add('checked');
                }
                checkbox.addEventListener('change', () => {
                    li.classList.toggle('checked');
                    saveTasks();
                });

                li.appendChild(checkbox);
                li.appendChild(deleteBtn);
                li.appendChild(editBtn);
                listContainer.appendChild(li);
            });
        }
    }
});
