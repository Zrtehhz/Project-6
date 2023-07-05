// Partie Filtres

const jimmy = [];
const categories = [];

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Ha il a pas récupérer les données là');
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
};

const generateGallery = (filteredjimmy) => {
  const divGallery = document.querySelector('.gallery');
  divGallery.innerHTML = '';

  filteredjimmy.forEach((jim) => {
    const jimElement = document.createElement('figure');
    const imgElement = document.createElement('img');
    imgElement.src = jim.imageUrl;
    imgElement.alt = jim.title;
    const captionElement = document.createElement('figcaption');
    captionElement.textContent = jim.title;

    jimElement.appendChild(imgElement);
    jimElement.appendChild(captionElement);
    divGallery.appendChild(jimElement);
  });
};

const filterjimmyByCategory = (categoryId) => {
  const filteredjimmy = categoryId === 0 ? jimmy : jimmy.filter((jim) => jim.category.id === categoryId);
  generateGallery(filteredjimmy);
};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    categories.push({ id: 0, name: 'Tous' },...(await fetchData('http://localhost:5678/api/categories')));
    jimmy.push(...(await fetchData('http://localhost:5678/api/works')));

    const filterContainer = document.getElementById('filtres');
    categories.forEach((category) => {
      const button = document.createElement('button');
      button.textContent = category.name;
      button.dataset.categoryId = category.id;
      button.addEventListener('click', () => {
        console.log('Il prend bien les données');
        filterjimmyByCategory(parseInt(button.dataset.categoryId));
        document.querySelectorAll('.filter-button').forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
      });
      filterContainer.appendChild(button);
    });

    generateGallery(jimmy);
  } catch (error) {
    console.log('Il prend pas les données');
  }
});




// Partie Login

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
      // Utilisateur non connecté, effectuer la connexion
      const email = prompt('Email:');
      const password = prompt('Password:');

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
        body: JSON.stringify(loginData)
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
    }
  });
}

handleLogin();