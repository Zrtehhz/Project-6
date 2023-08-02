// Partie Filtres

// Initialisation de tableaux vides pour stocker les données
const items = [];
const categories = [];

// Fonction pour générer la galerie en fonction du tableau filtré (filteredItems) passé en argument
const generateGallery = (filteredItems) => {
  const divGallery = document.querySelector('.gallery');
  divGallery.innerHTML = '';

  // Parcours de chaque élément item dans le tableau filteredItems et création d'éléments figure pour chacun
  filteredItems.forEach((item) => {
    const itemElement = document.createElement('figure');
    const imgElement = document.createElement('img');
    imgElement.src = item.imageUrl;
    imgElement.alt = item.title;
    const captionElement = document.createElement('figcaption');
    captionElement.textContent = item.title;

    itemElement.appendChild(imgElement);
    itemElement.appendChild(captionElement);
    divGallery.appendChild(itemElement);
  });
};

// Fonction pour filtrer les éléments items par catégorie en fonction de l'identifiant de catégorie (categoryId)
const filterItemsByCategory = (categoryId) => {
  // Si l'identifiant de catégorie est égal à 0, on affiche tous les éléments items, sinon on filtre par identifiant de catégorie
  const filteredItems = categoryId === 0 ? items : items.filter((item) => item.category.id === categoryId);
  generateGallery(filteredItems);
};

// Attente de chargement du document avant d'exécuter le code
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Récupération des catégories depuis l'API et ajout de l'option "Tous" au début du tableau
    const fetchedCategories = await fetchData('http://localhost:5678/api/categories');
    categories.push({ id: 0, name: 'Tous' }, ...fetchedCategories);

    // Récupération des éléments depuis l'API
    const fetchedItems = await fetchData('http://localhost:5678/api/works');
    items.push(...fetchedItems);

    // Création des boutons de filtrage en fonction des catégories disponibles
    const filterContainer = document.getElementById('filtres');
    categories.forEach((category) => {
      const button = document.createElement('button');
      button.textContent = category.name;
      button.dataset.categoryId = category.id;
      button.addEventListener('click', () => {
        // Au clic sur un bouton de filtre, on filtre les éléments items en fonction de l'identifiant de catégorie associé au bouton
        filterItemsByCategory(parseInt(button.dataset.categoryId));
        // On retire la classe 'active' de tous les autres boutons et on l'ajoute au bouton cliqué pour le mettre en surbrillance
        document.querySelectorAll('#filtres button').forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
      });
      
      filterContainer.appendChild(button);
    });

    // Génération de la galerie avec tous les éléments items au chargement de la page
    generateGallery(items);
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
