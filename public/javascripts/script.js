const submit_button = document.getElementById('sumbit-button').addEventListener('click', function () {
    // Get input values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    // Find matching user in database
    
    const user = mockUsers.find(
        u => u.username === username && u.password === password
      );  

      //Display feedback to user
      const messageElement = document.getElementById('message');
      if (user) {
        messageElement.textContent = 'Login successful!';
        messageElement.style.color = 'green';
        // Redirect or perform further actions
      } else {
        messageElement.textContent = 'Invalid username or password.';
        messageElement.style.color = 'red';
      }
    });
async function getUsers() {
    return await getItems("users");
  }