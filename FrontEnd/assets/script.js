let bouton = document.querySelectorAll('.project button');
let images = document.querySelectorAll('.gallery figure');

const url = 'http://localhost:5678/api/categories';

const fetchData = async () => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      bouton.forEach((button) => {
        button.addEventListener('click', () => {
          let category = button.id;
          filtrerParCategorie(category, data);
        });
      });
    } else {
      throw new Error('Erreur lors de la récupération des données');
    }
  } catch (error) {
    console.log(error);
  }
};

const filtrerParCategorie = (category, data) => {
  images.forEach((image) => {
    let imageId = image.querySelector('img').id;
    let match = data.find((item) => item.id.toString() === imageId);
    image.style.display = match && match.category === category || category === 'tous' ? 'block' : 'none';
  });
};

fetchData().catch(console.error);
