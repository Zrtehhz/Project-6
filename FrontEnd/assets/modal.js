

//Modale
const openModalBtn = document.getElementById('Modifie');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.querySelector('.btn-close');
const addBtn = document.querySelector('.add');
const removeBtn = document.querySelector('.remove');

// Ouvrir la modale lorsque l'on clique sur le bouton "Modifier"
openModalBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'block';
});

// Fermer la modale lorsque l'on clique sur la croix
closeModalBtn.addEventListener('click', () => {
  closeModal();
});

// Fermer la modale lorsque l'on clique en dehors de la modale
modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});



// Fonction pour fermer la modale
function closeModal() {
  modalOverlay.style.display = 'none';
}


//Modale 2 Ajout Photo
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

  // Fermer la modale lorsque l'on clique sur la croix
closeModalBtn1.addEventListener('click', () => {
  closeModal();
});

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




//Display des images dans le input type file

document.addEventListener('DOMContentLoaded', function() {
  const photoInput = document.getElementById('photoInput');
  const previewImage = document.getElementById('previewImage');

  photoInput.addEventListener('change', function() {
    const file = photoInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function() {
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
