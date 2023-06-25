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


// Partie login

const login = "http://localhost:5678/api/users/login";
const inputEmail = document.getElementById('email');
const inputPass = document.getElementById('password');
const submitButton = document.querySelector("input[type='submit']");
const form = document.querySelector('login_form');

const User = {
  email: 'string', 
  password:'string'
}; 


form.addEventListener('submit', (e) => {
  e.preventDefault();
  loginUser();

});


input.addEventListener('input', (e) => {
  inputEmail.reportValidity();
  User.email = e.target.value;

});


input.addEventListener('input', (e) => {
  inputPass.reportValidity();
  User.password = e.target.value;


});