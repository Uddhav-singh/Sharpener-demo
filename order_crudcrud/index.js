// =================================================

document.addEventListener("DOMContentLoaded", () => {
  const apiEndpoit = 'https://crudcrud.com/api/49f0a4e4e5b34b13998bcd114ba2ae3f/orders';
  const orderForm = document.getElementById('orderForm');
  const table1 = document.getElementById('table1');
  const table2 = document.getElementById('table2');
  const table3 = document.getElementById('table3');

  orderForm.addEventListener('submit', handleFormSubmit);

  // Fetch and display order on page load
  fetchOrders();

  function handleFormSubmit(event){
    event.preventDefault();

    const price = document.getElementById('price').value;
    const dish = document.getElementById('dish').value;
    const table = document.getElementById('table').value;

    const order = {price, dish, table};

    //Post new order to cfrud crud
    axios.post(apiEndpoit, order).then(response => {
      displayOrder(response.data);
      saveOrderToLocal(response.data);
      orderForm.reset();
    })
    .catch(error => {
      console.error('The error adding the order:', error);
    });
  }

  function fetchOrders(){
    //fetch from localstorage
    const localOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const localOrderIds = new Set(localOrders.map(order => order._id));

    localOrders.forEach(order => {
      displayOrder(order, false)
    });

    //Fetch from crudcrud
    axios.get(apiEndpoit)
    .then(response => {
      const fetchedOrders = response.data;
      const newOrders = fetchedOrders.filter(order => !localOrderIds.has(order._id));

      newOrders.forEach(order => {
        displayOrder(order, true);
      });
    })
    .catch(error => {
      console.error('There was an error fetching the orders', error);
    });
  }

  function displayOrder(order, saveToLocal){
    const orderDiv = document.createElement('div');
    orderDiv.classList.add('order');
    orderDiv.setAttribute('data-id', order._id);
    orderDiv.innerHTML = `
    <p>Price: ${order.price}</p>
    <p>Dish: ${order.dish}</p>
    <button class="delete-btn">Delete</button>
  `;

    const deleteBtn = orderDiv.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', ()=>deleteOrder(order._id, orderDiv));

    if (order.table === 'table1'){
      table1.appendChild(orderDiv);
    } else if(order.table === 'table2'){
      table2.appendChild(orderDiv);
    } else if (order.table === 'table3'){
      table3.appendChild(orderDiv);
    }

    if(saveToLocal){
      saveOrderToLocal(order);
    }
  }

  function saveOrderToLocal(order){
    const localOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderExists = localOrders.some(localOrder => localOrder._id === order._id);

    if(!orderExists){
      localOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(localOrders));
    }
  }

  function deleteOrder(orderId, orderDiv){
    axios.delete(`${apiEndpoit}/${orderId}`)
    .then(()=>{
      orderDiv.remove();
      deleteOrderFromLocalStorage(orderId);
    })
    .catch(error => {
      console.error('There was an error deleting the order', error)
    })
  }

  function deleteOrderFromLocalStorage(orderId){
    let localOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localOrders = localOrders.filter(order => order._id !== orderId);
    localStorage.setItem('orders', JSON.stringify(localOrders));
  }
});