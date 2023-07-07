// Fonction de gestion de la connexion
function handleLogin() {
  // Récupérer l'élément du lien "Login"
  const loginLink = document.querySelector('.login_form');
  
  // Écouter l'événement de clic sur le lien "Login"
  loginLink.addEventListener('click', () => {
    // Récupérer les valeurs du formulaire de connexion
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const email = emailInput.value;
    const password = passwordInput.value;

    // Envoyer la demande de connexion
    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((response) => {
      if (response.ok) {
        // Connexion réussie, stocker le token et mettre à jour le texte du lien
        response.json().then((data) => {
          window.sessionStorage.setItem('token', data.token);
          loginLink.textContent = 'Logout';
          // Rediriger vers la page d'accueil
          window.location.href = 'index.html';
        });
      } else {
        // Connexion échouée, afficher un message d'erreur
        alert('Identifiants incorrects');
      }
    })
    .catch((error) => {
      console.log('Une erreur est survenue lors de la connexion:', error);
    });
  });
}

handleLogin();
