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
    const fetchedCategories = await fetchData('http://localhost:5678/api/categories');
    categories.push({ id: 0, name: 'Tous' }, ...fetchedCategories);

    const fetchedJimmy = await fetchData('http://localhost:5678/api/works');
    jimmy.push(...fetchedJimmy);

    const filterContainer = document.getElementById('filtres');
    categories.forEach((category) => {
      const button = document.createElement('button');
      button.textContent = category.name;
      button.dataset.categoryId = category.id;
      button.addEventListener('click', () => {
        filterjimmyByCategory(parseInt(button.dataset.categoryId));
        document.querySelectorAll('#filtres button').forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
      });
      
      filterContainer.appendChild(button);
    });

    generateGallery(jimmy);
  } catch (error) {
    console.log('Erreur lors de la récupération des données');
  }
});


//Partie texte Login => Logout, Si token affiche Logout et enlève les filtres si non, Affiche Login et les filtres.
document.addEventListener('DOMContentLoaded', function() {
  const loginLink = document.querySelector('.login1');
  const logoutLink = document.querySelector('.logout');
  const editModeLink = document.createElement('a');
  const projectFilters = document.querySelector('#filtres');
  const editionSection = document.querySelector('.edition');
  const modificationSpan = document.querySelector('.modification');
  const penIcon = document.querySelector('.fa-pen-to-square'); // Sélectionnez la balise i avec la classe "fa-pen-to-square"

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
