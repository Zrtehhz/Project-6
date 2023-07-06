// Partie Login

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4';

// Fonction de gestion de la connexion
function handleLogin() {
  // Récupérer l'élément du lien "Login"
  const loginLink = document.querySelector('.login');

  // Ajouter un gestionnaire d'événement au clic sur le lien "Login"
  loginLink.addEventListener('click', function (event) {
    event.preventDefault();

    // Vérifier si l'utilisateur est connecté ou non
    const token = window.sessionStorage.getItem('token');
    if (token) {
      // Utilisateur connecté, effectuer la déconnexion
      window.sessionStorage.removeItem('token');
      loginLink.textContent = 'Login';
    } else {
      // Créer l'objet de données à envoyer
      const loginData = {
        email: 'sophie.bluel@test.tld',
        password: 'S0phie'
      };

      // Envoyer la demande de connexion
      fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'string',
          password: 'string'
        })
      })      
        .then((response) => {
          if (response.ok) {
            // Connexion réussie, stocker le token et mettre à jour le texte du lien
            response.json().then((data) => {
              window.sessionStorage.setItem('token', data.token);
              loginLink.textContent = 'Logout';
              // Rediriger vers la page d'accueil
              window.location.href = '/';
            });
          } else {
            // Connexion échouée, afficher un message d'erreur
            alert('Identifiants incorrects');
          }
        })
        .catch((error) => {
          console.log('Une erreur est survenue lors de la connexion:', error);
        });
    }
  });
}

handleLogin();
event.preventDefault();
