const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categorySelect = document.getElementById("category");
const addExpenseButton = document.getElementById("add-expense");
const expensesList = document.getElementById("expenses");
const totalAmountDisplay = document.getElementById("total-amount");
const filterCategory = document.getElementById("filter-category");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

addExpenseButton.addEventListener("click", () => {
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const category = categorySelect.value;

  if (description && amount && category) {
    const expense = { id: Date.now(), description, amount, category };
    expenses.push(expense);
    updateLocalStorage();
    renderExpenses();
    clearForm();
  }
});

function renderExpenses() {
  expensesList.innerHTML = "";
  const filteredExpenses =
    filterCategory.value === "All"
      ? expenses
      : expenses.filter((exp) => exp.category === filterCategory.value);

  filteredExpenses.forEach((expense) => {
    const li = document.createElement("li");
    li.innerHTML = `
            ${expense.description} - $${expense.amount} (${expense.category})
            <span class="edit" onclick="editExpense(${expense.id})">✏️</span>
            <span class="delete" onclick="deleteExpense(${expense.id})">🗑️</span>
        `;
    expensesList.appendChild(li);
  });

  const total = filteredExpenses.reduce((acc, exp) => acc + exp.amount, 0);
  totalAmountDisplay.textContent = total.toFixed(2);
}

function updateLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function clearForm() {
  descriptionInput.value = "";
  amountInput.value = "";
  categorySelect.value = "";
}

function editExpense(id) {
  const expense = expenses.find((exp) => exp.id === id);
  if (expense) {
    descriptionInput.value = expense.description;
    amountInput.value = expense.amount;
    categorySelect.value = expense.category;
    deleteExpense(id);
  }
}

function deleteExpense(id) {
  expenses = expenses.filter((exp) => exp.id !== id);
  updateLocalStorage();
  renderExpenses();
}

filterCategory.addEventListener("change", renderExpenses);

renderExpenses();
