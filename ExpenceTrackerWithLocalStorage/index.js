//====================================================================
// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Get the entered values
  const amount = document.getElementById("amount").value;
  const desc = document.getElementById("description").value;
  const cat = document.getElementById("category").value;

  // Create a new list item to display the details of expense
  const li = document.createElement("li");
  li.textContent = `${amount}-${desc}-${cat}`;

  // Append the new list item to the unordered list
  const expenseList = document.getElementById("expenseList");
  expenseList.appendChild(li);

  // Store user details in local storage
  const expenseDetails = {
    amount: amount,
    desc: desc,
    cat: cat,
  };

  // Retrieve existing expenses from local storage
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  // Add the new expense details to the array
  expenses.push(expenseDetails);
  // Store the updated expenses array back to local storage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // empty the input field

  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";

  // added delete and edit button
  // Create a delete button for the user
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    // Remove the user details from the list and local storage
    li.remove();
    // removeFromLocalStorage(expenseDetails);
    localStorage.removeItem(amount);
  });

  // Append the delete button to the list item
  li.appendChild(deleteButton);

  // Create an edit button for the expense
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", function () {
    // Implement edit functionality here
    // For simplicity, you can clear the form and pre-fill it with the expense details for editing
    document.getElementById("amount").value = amount;
    document.getElementById("description").value = desc;
    document.getElementById("category").value = cat;
    // After editing, remove the old expense and update with the edited one
    li.remove();
    removeFromLocalStorage(expenseDetails);
  });
  // Append the edit button to the list item
  li.appendChild(editButton);

  // till here
}

// Function to load expenses from local storage and display them
function loadExpenses() {
  const expenseList = document.getElementById("expenseList");
  // Retrieve expenses from local storage
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  // Loop through each expense and create list items to display them
  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.textContent = `${expense.amount}-${expense.desc}-${expense.cat}`;

    // Create a delete button for the expense
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      // Remove the expense details from the list and local storage
      li.remove();
      removeFromLocalStorage(expense);
    });
    // Append the delete button to the list item
    li.appendChild(deleteButton);

    // Create an edit button for the expense
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      // Implement edit functionality here
      // For simplicity, you can clear the form and pre-fill it with the expense details for editing
      document.getElementById("amount").value = expense.amount;
      document.getElementById("description").value = expense.desc;
      document.getElementById("category").value = expense.cat;
      // After editing, remove the old expense and update with the edited one
      li.remove();
      removeFromLocalStorage(expense);
    });
    // Append the edit button to the list item
    li.appendChild(editButton);

    expenseList.appendChild(li);
  });
}

// Function to remove expense from local storage
function removeFromLocalStorage(expense) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  // Find the index of the expense to remove
  const index = expenses.findIndex(
    (exp) =>
      exp.amount === expense.amount &&
      exp.desc === expense.desc &&
      exp.cat === expense.cat
  );
  if (index !== -1) {
    // Remove the expense from the array
    expenses.splice(index, 1);
    // Update the expenses array in local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
}

// Call loadExpenses when the page loads to display previously saved expenses
window.onload = loadExpenses;
