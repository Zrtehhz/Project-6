let bouton = document.querySelectorAll('.project button');
let images = document.querySelectorAll('.gallery figure');


let filtrerParCategorie = (category) => {

  images.forEach((image) => {
    let imageId = image.querySelector('img').id;
    image.style.display = imageId === category || category === '' ? 'block' : 'none';
  });
};


bouton.forEach((button) => {
  button.addEventListener('click', () => {
    let category = button.id; 
    filtrerParCategorie(category);
  });
});
