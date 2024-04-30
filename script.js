document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(function (expense, index) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${expense.description}: ₹${expense.amount}</span>
                <button class="edit-btn" data-id="${index}">Edit</button>
                <button class="delete-btn" data-id="${index}">Delete</button>
            `;
            expenseList.appendChild(li);
        });
        updateLocalStorage();
    }

    function addExpense(description, amount) {
        expenses.push({
            description: description,
            amount: parseFloat(amount)
        });
        renderExpenses();
    }

    function deleteExpense(index) {
        expenses.splice(index, 1);
        renderExpenses();
    }

    function editExpense(index, description, amount) {
        expenses[index] = {
            description: description,
            amount: parseFloat(amount)
        };
        renderExpenses();
    }

    function updateLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const description = document.getElementById('expenseDescription').value;
        const amount = document.getElementById('expenseAmount').value;
        addExpense(description, amount);
        expenseForm.reset();
    });

    expenseList.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('delete-btn')) {
            const index = target.getAttribute('data-id');
            deleteExpense(index);
        } else if (target.classList.contains('edit-btn')) {
            const index = target.getAttribute('data-id');
            const expense = expenses[index];
            const newDescription = prompt('Enter new description:', expense.description);
            const newAmount = prompt('Enter new amount:', expense.amount);
            if (newDescription !== null && newAmount !== null) {
                editExpense(index, newDescription, newAmount);
            }
        }
    });

    renderExpenses();
});
