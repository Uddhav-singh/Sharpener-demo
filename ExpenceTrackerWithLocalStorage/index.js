// Creating a function to handle form submission

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior

  //   get the entered values
  const amount = document.getElementById("amount").value;
  const desc = document.getElementById("description").value;
  const cat = document.getElementById("category").value;

  // Create a new list item to display the details of expense
  const li = document.createElement("li");
  li.textContent = `${amount}-${desc}-${cat}`;

  // Append the new list item to the unordered list
  const expenseList = document.getElementById('expenseList');
  expenseList.appendChild(li);

  // Store user details in local storage
  const expenseDetails = {
    amount : amount,
    desc : desc,
    cat : cat
  };

  // Retrieve existing expense from local storage
  let expense = JSON.parse(localStorage.getItem("expense")) || [];
  // Add the new user details to the array
  expense.push(expenseDetails);

   // Store the updated users array back to local storage
   localStorage.setItem(amount, JSON.stringify(expense));

   // Create a delete button for the user
   const deleteButton = document.createElement('button');
   deleteButton.textContent = 'Delete';
   deleteButton.addEventListener('click', function(){
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

};


