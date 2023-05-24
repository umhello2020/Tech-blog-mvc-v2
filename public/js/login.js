const loginFormHandler = async (event) => {
    event.preventDefault();
  
    
    // Collect values from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      try {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
  
        // If successful, redirect the browser to the profile page
      
        document.location.replace('/dashboard');
      } catch (error) {
        console.error(error);
        alert('Failed to log in');
      }
    }
  };
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  