document.addEventListener('DOMContentLoaded', function() {
  function handleLogin() {
    const loginForm = document.querySelector('#login_Form');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const loginLink = document.querySelector('.login');

    loginForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const email = emailInput.value;
      const password = passwordInput.value;

      try {
        const response = await fetch('http://localhost:5678/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });

        if (response.ok) {
          const data = await response.json();
          window.sessionStorage.setItem('token', data.token);
          loginForm.reset();
          window.location.href = 'index.html';

        } else {
          alert('Identifiants incorrects');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  } // Fermeture de la fonction handleLogin
  handleLogin(); // Appel de la fonction handleLogin pour configurer l'écouteur d'événements

});

