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




//Partie texte Login => Logout, Si token affiche Logout et enlève les filtres si non, Affiche Login et les filtres.
document.addEventListener('DOMContentLoaded', function() {
  const loginLink = document.querySelector('.login1');
  const logoutLink = document.querySelector('.logout');
  const editModeLink = document.createElement('a');
  const projectFilters = document.querySelector('#filtres');
  const editionSection = document.querySelector('.edition');
  const modificationSpan = document.querySelector('.modification');
  const penIcon = document.getElementById('icone'); // Sélectionnez la balise i avec la classe "fa-pen-to-square"


  const token = window.sessionStorage.getItem('token');

  if (token) {
    loginLink.style.display = 'none';
    logoutLink.style.display = 'inline';
    projectFilters.style.display = 'none';
    editionSection.style.display = 'flex';
    modificationSpan.style.display = 'flex';
    penIcon.style.display = 'inline'; // Affichez la balise i lorsque l'utilisateur est connecté

    logoutLink.addEventListener('click', function() {
      window.sessionStorage.removeItem('token');
      loginLink.style.display = 'inline';
      logoutLink.style.display = 'none';
      projectFilters.style.display = 'flex';
      projectFilters.style.justifyContent = 'center';
      projectFilters.style.gap = '10px';
      editionSection.style.display = 'none';
      modificationSpan.style.display = 'none';
      penIcon.style.display = 'none'; // Masquez la balise i lors de la déconnexion de l'utilisateur


    });

    document.querySelector('nav ul').appendChild(editModeLink);
  } else {
    loginLink.style.display = 'inline';
    logoutLink.style.display = 'none';
    projectFilters.style.display = 'flex';
    editionSection.style.display = 'none';
    modificationSpan.style.display = 'none';
    penIcon.style.display = 'none'; // Masquez la balise i lorsque l'utilisateur n'est pas connecté
  


  }
});