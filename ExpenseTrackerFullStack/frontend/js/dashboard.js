// Add event listener to form submission
document.getElementById("expenseForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  try {
      const token = localStorage.getItem("token");
      await axios.post(
          "http://localhost:3000/user/expenses",
          { amount, description, category },
          {
            headers: {
                "Authorization": token, // JWT token directly
                "Content-Type": "application/json",
            },
        }
      );
      loadExpense();
      document.getElementById("amount").value = '';
      document.getElementById("description").value = '';
  } catch (error) {
      console.error("error in posting data " + error);
  }
});

// Load expenses on page load
async function loadExpense() {
  try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
          "http://localhost:3000/user/expenses",
          { headers: { "Authorization": token } }
      );
      const expenses = response.data;

      const expenseList = document.getElementById("expenseList");
      expenseList.innerHTML = "";
      expenses.forEach((expense) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;
          expenseList.appendChild(listItem);
          const editBtn = document.createElement("button");
          editBtn.textContent = "Edit";
          editBtn.addEventListener('click', ()=>editExpense(expense));
          expenseList.appendChild(editBtn);

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.addEventListener('click', ()=> deleteExpense(expense.id));
          expenseList.appendChild(deleteBtn);
      });
  } catch (error) {
      console.error("Error loading expenses: " + error);
  }
}

// Delete expense function
async function deleteExpense(expenseId){
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/user/expenses/${expenseId}`,{
            headers:{Authorization: token},
        });
        loadExpense()
    } catch (error) {
        console.error("Error deleting Expense",error)
    }
}

// Edit expense function
function editExpense(expense){
    document.getElementById("amount").value = expense.amount;
    document.getElementById("description").value = expense.description;
    document.getElementById("category").value = expense.category;

  // Optionally, you can delete the expense immediately after editing
    deleteExpense(expense.id);
}

// Event listener for the Razorpay payment button
document.getElementById('buyPremiumBtn').addEventListener('click', async () => {
  try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/payment/create-order', {}, {
          headers: {
              'Authorization': token,
              'Content-Type': 'application/json',
          },
      });

      const order = response.data;

      const options = {
          key: 'rzp_test_DUVm7xQwKRRlSY', // Replace with your actual Key ID
          amount: order.amount,
          currency: order.currency,
          name: 'VYAY',
          description: 'Premium Subscription',
          order_id: order.id,
          handler: async function (response) {
              try {
                  await axios.post('http://localhost:3000/api/payment/verify-payment', {
                      payment_id: response.razorpay_payment_id,
                      order_id: response.razorpay_order_id,
                      signature: response.razorpay_signature,
                  }, {
                      headers: {
                          'Authorization': token,
                          'Content-Type': 'application/json',
                      },
                  });

                  alert('Payment Successful');
                  // Remove the "Buy Premium" button
                  document.getElementById('buyPremiumBtn').style.display = 'none';
              } catch (error) {
                  console.error('Error verifying payment:', error);
              }
          },
        //   prefill: {
        //     //   name: 'John Doe', // Replace with actual user data
        //       email: email,
        //       contact: contact,
        //   },
          theme: {
              color: '#F37254',
          },
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
  } catch (error) {
      console.error('Error creating order:', error);
  }
});

// Check if the user is a premium user on page load
window.onload = async function() {
  const token = localStorage.getItem('token');
  try {
      const response = await axios.get('http://localhost:3000/api/user', {
          headers: {
              'Authorization': token,
              'Content-Type': 'application/json',
          },
      });
      const userData = response.data;
        const isPremiumUser = userData.isPremiumUser;

        // Update UI based on premium status
        if (isPremiumUser) {
            document.getElementById("isPremiumUser").textContent =
                "You are a premium user!";
            document.getElementById('buyPremiumBtn').style.display = 'none';
        } else {
            document.getElementById("isPremiumUser").textContent =
                "Upgrade to premium for exclusive benefits.";
        }
    //   if (response.data.isPremiumUser) {
    //       document.getElementById('buyPremiumBtn').style.display = 'none';
          
          
    //   }
  } catch (error) {
      console.error('Error fetching user data:', error);
  }
};

// Load expenses on page load
loadExpense();


