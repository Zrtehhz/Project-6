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

  const token = window.sessionStorage.getItem('token');

  if (token) {
    loginLink.style.display = 'none';
    logoutLink.style.display = 'inline';
    projectFilters.style.display = 'none';

    logoutLink.addEventListener('click', function() {
      window.sessionStorage.removeItem('token');
      loginLink.style.display = 'inline';
      logoutLink.style.display = 'none';
      projectFilters.style.display = 'flex';
      projectFilters.style.justifyContent = 'center';
      projectFilters.style.gap = '10px';
    });

    editModeLink.textContent = 'Mode Édition';
    editModeLink.href = '#';
    editModeLink.classList.add('edit-mode');
    editModeLink.style.display = 'inline';

    document.querySelector('nav ul').appendChild(editModeLink);
  } else {
    loginLink.style.display = 'inline';
    logoutLink.style.display = 'none';
    projectFilters.style.display = 'flex';
  }
});