const { getItems } = require("../../server");

const submit_button = document.getElementById('loginForm').addEventListener('submit', async function (event) {
    // Get input values
    event.preventDefault();
    var users = await getItems("users");
    const username = document.getElementById('username-box').value.trim();
    const password = document.getElementById('password-box').value.trim();
    var currentUser = null;
    users.forEach(u => {
        if((u.username == username || u.email == username) && u.password == password){
            currentUser = u;
            throw {};           
        }
    });
    console.log(currentUser);
    if (currentUser != null) {
        //route to index
        window.location.href = '/index';
    }
    else {
        messageElement.textContent = 'Invalid username or password.';
        messageElement.style.color = 'red';
        window.location.href = '/login';
      }
    });