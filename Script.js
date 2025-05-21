const expenses = [];

const form = document.getElementById("expense-form");
const searchInput = document.getElementById("search");
const searchResult1 = document.getElementById("searchResult1");
const total_expense = document.getElementById("total_expense");
const itemName = document.getElementById("itemName");
const monthInput = document.getElementById("month");

// Handle form submission
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("expense-name").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    if (!name || isNaN(amount) || !date) {
        alert("Please enter valid expense details.");
        return;
    }

    expenses.push({ name, amount, date });
    form.reset();
});

// Search for a single expense by name
function searchExpense() {
    const query = searchInput.value.trim().toLowerCase();
    const result = expenses.find(exp => exp.name.toLowerCase() === query);

    searchResult1.innerHTML = "";

    if (!result) {
        searchResult1.innerHTML = "<p>No expense found</p>";
        return;
    }

    const div = document.createElement("div");
    div.className = "expense-item";
    div.innerHTML = `
        <strong>${result.name}</strong><br>
        Amount: $${parseFloat(result.amount).toFixed(2)}<br>
        Date: ${result.date}
    `;

    searchResult1.appendChild(div);
}

// Calculate total expenses for an item in a specific month
function totalExpense() {
    const query = itemName.value.trim().toLowerCase();
    const monthValue = monthInput.value;

    if (!query || !monthValue) {
        alert("Please enter an item name and select a month.");
        return;
    }

    const selectedDate = new Date(monthValue);
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    let total = 0;

    expenses.forEach(exp => {
        const expenseDate = new Date(exp.date);
        const expMonth = expenseDate.getMonth();
        const expYear = expenseDate.getFullYear();

        if (
            exp.name.toLowerCase() === query &&
            expMonth === selectedMonth &&
            expYear === selectedYear
        ) {
            total += exp.amount;
        }
    });

    total_expense.innerHTML = "";

    if (total === 0) {
        total_expense.innerHTML = "<p>No expense found for this item in the selected month</p>";
        return;
    }

    const div = document.createElement("div");
    div.className = "expense-item";
    div.innerHTML = `
        <strong>${itemName.value}</strong><br>
        Total Amount for ${monthValue.slice(0, 7)}: $${total.toFixed(2)}
    `;

    total_expense.appendChild(div);
}
