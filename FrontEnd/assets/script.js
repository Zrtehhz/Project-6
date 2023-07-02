 let bouton = document.querySelectorAll('.project button');
let images = document.querySelectorAll('.gallery figure');
let url = 'http://localhost:5678/api/categories';
let gallery = document.querySelector("gallery");
let figure = document.createElement('figure');
let img = document.createElement('img');
let figcaption = document.createElement('figcaption');



let filtrerParCategorie = (url) => {

  images.forEach((image) => {
    let imageId = image.querySelector('img').id;
    image.style.display = imageId === category || category === '' ? 'block' : 'none';
  });
};


bouton.forEach((button) => {
  button.addEventListener('click', () => {
    let url = button.id; 
    filtrerParCategorie(category);
  });
});


// Partie login

