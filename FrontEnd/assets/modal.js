// Modale
const openModalBtn = document.getElementById('Modifie');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.querySelector('.btn-close');
const addBtn = document.querySelector('.add');
const removeBtn = document.querySelector('.remove');

// Ouvrir la modale lorsque je clique sur le bouton "Modifier"
openModalBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'block';
});

// Fermer la modale lorsque je clique sur la croix
closeModalBtn.addEventListener('click', () => {
  closeModal();
});

// Fermer la modale lorsque je clique en dehors de la modale
modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

// Fonction pour afficher les images

const apiCall = async() => {
  await fetch('http://localhost:5678/works')
  .then((response) => response.json())
  .then((data) => (apiData = data))

  function editGallery(apiData){
    apiData.forEach(element => {
      const divGallery = document.querySelector('gallery-modal');

      const jimElement = document.createElement('figure');

      const imgElement = document.createElement('img');
      imgElement.src= element.imageUrl;
      imgElement.alt = element.title;

      deleteFigure = document.createElement('button');
      deleteFigure.setAttribute('data', element.id);
      deleteFigure.innerText = 'supp';
      deleteFigure.classList.add("delete");

      const captionElement = document.createElement('figcaption');
      captionElement.innerText = 'éditer';

      divGallery.appendChild(jimElement);
      jimElement.appendChild(imgElement);
      jimElement.appendChild(captionElement);
      jimElement.appendChild(deleteFigure);
    });
  };

  editGallery(apiData);

}

apiCall();


// Fonction pour supprimer une image
function deleteImage() {
  const suppButtons = document.querySelectorAll('.delete');
  const suppFigure = document.querySelectorAll('figure');

  suppButtons.forEach((suppButton, index) => {
    suppButton.addEventListener('click', (e) =>{
      e.preventDefault();
      
      const suppId = suppButton.dataset.id;
      const figure = suppButton.parentNode;
      const token = localStorage.getItem('token');
    
    
    })
  })


}

// Fonction pour fermer la modale
function closeModal() {
  modalOverlay.style.display = 'none';
}

// Modale 2 Ajout Photo
document.addEventListener('DOMContentLoaded', function () {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalAddPhoto = document.getElementById('modalAddPhoto');
  const btnAddPhoto = document.querySelector('.add');
  const closeModalBtn1 = document.querySelector('.btn-close');
  const btnCloseAddPhoto = modalAddPhoto.querySelector('.btn-close');
  const inputTitre = modalAddPhoto.querySelector('input[type="text"]');
  const selectCategorie = document.getElementById('selectCategorie');
  const btnValider = modalAddPhoto.querySelector('.validate');

  // Fonction pour ouvrir la modale "Ajout photo"
  function openAddPhotoModal() {
    modalAddPhoto.style.display = 'block';
  }

  // Fonction pour fermer la modale "Ajout photo"
  function closeAddPhotoModal() {
    modalAddPhoto.style.display = 'none';
  }

  // Fermer la modale lorsque je clique sur la croix
  closeModalBtn1.addEventListener('click', () => {
    closeModal();
  });

  // Fonction pour vérifier les saisies dans les champs
  function checkInputs() {
    const titreValue = inputTitre.value.trim();
    const categorieValue = selectCategorie.value;

    if (titreValue === '' || categorieValue === '') {
      alert('Veuillez remplir tous les champs.');
      btnValider.disabled = true;
    } else {
      btnValider.disabled = false;
    }
  }

  // Événements pour ouvrir et fermer la modale "Ajout photo"
  btnAddPhoto.addEventListener('click', openAddPhotoModal);
  btnCloseAddPhoto.addEventListener('click', closeAddPhotoModal);

  // Événements pour vérifier les saisies à chaque changement dans les champs
  inputTitre.addEventListener('input', checkInputs);
  selectCategorie.addEventListener('change', checkInputs);

  // Fermer la modale "Ajout photo" lorsqu'on clique en dehors de celle-ci
  modalOverlay.addEventListener('click', function (event) {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
});

// Affichage des images dans l'input de type file
document.addEventListener('DOMContentLoaded', function () {
  const photoInput = document.getElementById('photoInput');
  const previewImage = document.getElementById('previewImage');

  photoInput.addEventListener('change', function () {
    const file = photoInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        previewImage.src = reader.result;
        previewImage.style.display = 'block'; // Afficher l'image sélectionnée
      };
      reader.readAsDataURL(file);
    } else {
      previewImage.src = '';
      previewImage.style.display = 'none'; // Masquer l'image s'il n'y a pas de sélection de fichier
    }
  });
});

// Appeler la fonction pour afficher les images au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
  displayImages();
});

// Récupérer les éléments des deux modales
const modalOver = document.getElementById('modalOverlay');
const modalAddPhoto = document.getElementById('modalAddPhoto');

// Récupérer le bouton "Retour" dans la modale d'ajout de photo
const btnReturnAddPhoto = modalAddPhoto.querySelector('.btn-return');

// Ouvrir la modale d'ajout de photo lorsque l'on clique sur le bouton "Ajouter une photo"
// Ouvrir la modale d'ajout de photo lorsque l'on clique sur le bouton "Ajouter une photo"
const adderBtn = document.querySelector('.add');
adderBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Empêcher le comportement par défaut du lien
  modalAddPhoto.style.display = 'block'; // Afficher la modale d'ajout de photo
});


// Fermer la modale d'ajout de photo lorsque l'on clique sur le bouton "Retour"
btnReturnAddPhoto.addEventListener('click', () => {
  modalAddPhoto.style.display = 'none'; // Masquer la modale d'ajout de photo
  modalOver.style.display = 'block'; // Afficher la modale principale
});

// Pour que quand je clique sur ma balise A et P ça exécute le input
function photoInput() {
  // Récupérer l'input de type file
  const photoInput = document.getElementById('photoInput');

  // Simuler un clic sur l'input de type file
  photoInput.click();
}



// Appeler la fonction pour afficher les images au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
  displayImages();
});
