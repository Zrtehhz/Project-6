// Partie Filtres

// Initialisation de tableaux vides pour stocker les données
const jimmy = [];
const categories = [];

// Fonction pour générer la galerie en fonction du tableau filtré (filteredjimmy) passé en argument
const generateGallery = (filteredjimmy) => {
  const divGallery = document.querySelector('.gallery');
  divGallery.innerHTML = '';

  // Parcours de chaque élément jim dans le tableau filteredjimmy et création d'éléments figure pour chacun
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

// Fonction pour filtrer les éléments jimmy par catégorie en fonction de l'identifiant de catégorie (categoryId)
const filterjimmyByCategory = (categoryId) => {
  // Si l'identifiant de catégorie est égal à 0, on affiche tous les éléments jimmy, sinon on filtre par identifiant de catégorie
  const filteredjimmy = categoryId === 0 ? jimmy : jimmy.filter((jim) => jim.category.id === categoryId);
  generateGallery(filteredjimmy);
};

// Attente de chargement du document avant d'exécuter le code
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Récupération des catégories depuis l'API et ajout de l'option "Tous" au début du tableau
    const fetchedCategories = await fetchData('http://localhost:5678/api/categories');
    categories.push({ id: 0, name: 'Tous' }, ...fetchedCategories);

    // Récupération des éléments jimmy depuis l'API
    const fetchedJimmy = await fetchData('http://localhost:5678/api/works');
    jimmy.push(...fetchedJimmy);

    // Création des boutons de filtrage en fonction des catégories disponibles
    const filterContainer = document.getElementById('filtres');
    categories.forEach((category) => {
      const button = document.createElement('button');
      button.textContent = category.name;
      button.dataset.categoryId = category.id;
      button.addEventListener('click', () => {
        // Au clic sur un bouton de filtre, on filtre les éléments jimmy en fonction de l'identifiant de catégorie associé au bouton
        filterjimmyByCategory(parseInt(button.dataset.categoryId));
        // On retire la classe 'active' de tous les autres boutons et on l'ajoute au bouton cliqué pour le mettre en surbrillance
        document.querySelectorAll('#filtres button').forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
      });
      
      filterContainer.appendChild(button);
    });

    // Génération de la galerie avec tous les éléments jimmy au chargement de la page
    generateGallery(jimmy);
  } catch (error) {
    console.log('Erreur lors de la récupération des données');
  }
});

// Fonction pour récupérer des données à partir de l'URL spécifiée
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
};


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