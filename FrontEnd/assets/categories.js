// Partie Filtres

// Initialisation de tableaux vides pour stocker les données
const items = [];
const categories = [];

// Fonction pour afficher les items
const displayItems = (filteredItems) => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  filteredItems.forEach(item => {
    const itemElement = document.createElement('figure');
    const imgElement = document.createElement('img');
    imgElement.src = item.imageUrl;
    imgElement.alt = item.title;
    const captionElement = document.createElement('figcaption');
    captionElement.textContent = item.title;

    itemElement.appendChild(imgElement);
    itemElement.appendChild(captionElement);
    gallery.appendChild(itemElement);
  });
};

// Filtrage par catégorie
const filterByCategory = (categoryId) => {
  const filteredItems = categoryId === 0 ? items : items.filter(item => item.category.id === categoryId);
  displayItems(filteredItems);
};

document.addEventListener('DOMContentLoaded', async () => {
  // Récupérer les données depuis l'API
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    return await response.json();
  };

  try {
    const fetchedCategories = await fetchData('http://localhost:5678/api/categories');
    categories.push({ id: 0, name: 'Tous' }, ...fetchedCategories);

    const fetchedItems = await fetchData('http://localhost:5678/api/works');
    items.push(...fetchedItems);

    const filterContainer = document.getElementById('filtres');

    categories.forEach(category => {
      const button = document.createElement('button');
      button.textContent = category.name;
      button.dataset.categoryId = category.id;

      button.addEventListener('click', () => {
        filterByCategory(parseInt(button.dataset.categoryId));
        filterContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });

      filterContainer.appendChild(button);
    });

    // Afficher tous les items par défaut
    displayItems(items);
  } catch (error) {
    console.log('Erreur lors de la récupération des données:', error.message);
  }
});
