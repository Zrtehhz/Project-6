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

