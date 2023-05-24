async function signUp (e) {
    e.preventDefault();
    const username = document.querySelector("#username-signup").value;
    const password = document.querySelector("#password-signup").value;

    if (username && password) {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert(response.statusText);
        }
      }
}

document
  .querySelector('.signup-form')
  .addEventListener('submit', signUp);