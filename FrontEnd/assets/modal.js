// Ouvrir la modale lorsque je clique sur le bouton "Modifier"
document.getElementById('Modifie').addEventListener('click', () => {
  document.getElementById('modalOverlay').style.display = 'block';
});

// Fermer la modale lorsque je clique sur la croix
document.querySelector('.btn-close').addEventListener('click', () => {
  closeModal();
});

// Fermer la modale lorsque je clique en dehors de la modale
document.getElementById('modalOverlay').addEventListener('click', (event) => {
  if (event.target === document.getElementById('modalOverlay')) {
    closeModal();
  }
});

// Fonction pour fermer la modale
function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

// Appel les fonctions de showImages() et deleteImage()





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
















// Modale 2 Ajout Photo
document.addEventListener('DOMContentLoaded', function () {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalAddPhoto = document.getElementById('modalAddPhoto');
  const btnAddPhoto = document.querySelector('.add');
    const closeModalBtn1 = document.querySelector('.btn-close');
    const btnCloseAddPhoto = modalAddPhoto.querySelector('.btn-close');
    const inputTitre = modalAddPhoto.querySelector('input[type="text"]');
    const selectCategorie = document.getElementById('selectCategorie');
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


    // Événements pour ouvrir et fermer la modale "Ajout photo"
    btnAddPhoto.addEventListener('click', openAddPhotoModal);
    btnCloseAddPhoto.addEventListener('click', closeAddPhotoModal);


    // Fermer la modale "Ajout photo" lorsqu'on clique en dehors de celle-ci
    modalOverlay.addEventListener('click', function (event) {
      if (event.target === modalOverlay) {
        closeModal();
      }
    });
  });






  
// Récupérer l'élément de prévisualisation d'image
const previewImage = document.getElementById('previewImage');

// Récupérer l'input de type file
const photoInp = document.getElementById('photoInput');

// Afficher l'image sélectionnée dans l'élément de prévisualisation d'image
photoInp.addEventListener('change', function () {
  const file = photoInp.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      previewImage.src = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    previewImage.src = ''; // Effacer l'image si aucun fichier n'est sélectionné
  }
});

// Ajouter un événement pour ouvrir la modale d'ajout de photo lorsque l'on clique sur le bouton "Ajouter une photo"
document.querySelector('.add').addEventListener('click', () => {
  document.getElementById('modalAddPhoto').style.display = 'block'; // Afficher la modale d'ajout de photo
});

// Ajouter un événement pour fermer la modale d'ajout de photo lorsque l'on clique sur le bouton "Retour"
document.querySelector('.btn-return').addEventListener('click', () => {
  document.getElementById('modalAddPhoto').style.display = 'none'; // Masquer la modale d'ajout de photo
  document.getElementById('modalOverlay').style.display = 'block'; // Afficher la modale principale
});

// Fonction pour ajouter une photo
document.querySelector('.validate').addEventListener('click', async () => {
  const apiUrl = 'http://localhost:5678/api/works';
  const formData = new FormData();
  
  const token = window.sessionStorage.getItem('token');

  // Récupérer les valeurs saisies
  const imageUrl = previewImage.src;
  const title = document.getElementById('inputTitre').value;
  const categoryId = parseInt(document.getElementById('selectCategorie').value);

  formData.append('image', photoInp.files[0]);
  formData.append('title', title);
  formData.append('category', categoryId);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout de l\'élément à la galerie');
    }

    // Fermer la modale "Ajout photo"
    document.getElementById('modalAddPhoto').style.display = 'none';
    // Mettre à jour la galerie des images
    showImages();
  } catch (error) {
    console.log(error.message);
  }
});









// Permet de voir l'image affiché sur notre input

  document.addEventListener('DOMContentLoaded', function () {
    const photoInput = document.getElementById('photoInput');
    const previewImage = document.getElementById('previewImage');
    const photoP = document.querySelector('.photoP');
    const textP = document.querySelector('.textP');

    photoInput.addEventListener('change', function () {
      const file = photoInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function () {
          previewImage.src = reader.result;
          previewImage.style.display = 'block'; // Afficher l'image sélectionnée

          // Passer les balises <a> et <p> en z-index -1 (derrière l'image)
          photoP.style.zIndex = -1;
          textP.style.zIndex = -1;
          // Mettre l'image au-dessus des balises <a> et <p>
          previewImage.style.zIndex = 25;
        };
        reader.readAsDataURL(file);
      } else {
        previewImage.src = '';
        previewImage.style.display = 'none'; // Masquer l'image s'il n'y a pas de sélection de fichier

        // Passer les balises <a> et <p> en z-index 25
        photoP.style.zIndex = 25;
        textP.style.zIndex = 25;
        // Remettre l'image en arrière-plan
        previewImage.style.zIndex = -1;
      }
    });
  });









// Fonction pour supprimer une image
async function deleteImage() {
  const deleteIcons = document.querySelectorAll('.delete-icon');
  console.log('deleteImage() a été appelée');
  
  deleteIcons.forEach((deleteIcon) => {
    // Supprimer l'ancien écouteur d'événements s'il existe
    deleteIcon.removeEventListener('click', onDeleteImage);

    // Ajouter un nouvel écouteur d'événements
    deleteIcon.addEventListener('click', onDeleteImage);
  });
}

// Fonction de suppression d'image pour l'écouteur d'événements
async function onDeleteImage(e) {
  e.preventDefault();

  const deleteIcon = e.target;
  const imageContainer = deleteIcon.closest('.image-contain');
  const id = deleteIcon.getAttribute('data-id');
  const token = window.sessionStorage.getItem('token');

  // Appeler l'API pour supprimer l'image avec l'ID correspondant
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("La suppression de l'image a échoué.");
    }

    // Mettre à jour dynamiquement la galerie après la suppression
    showImages();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image :", error);
  }
}













// Fonction pour afficher les images
async function showImages() {
  const apiUrl = 'http://localhost:5678/api/works';
  const divGallery = document.querySelector('.gallery-modal');

  if (!divGallery) {
    console.error("L'élément avec la classe 'gallery-modal' n'a pas été trouvé.");
    return;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Impossible de récupérer les images.");
    }

    const apiData = await response.json();

    // Effacer les anciennes images avant d'afficher les nouvelles
    divGallery.innerHTML = '';

    apiData.forEach((element) => {
      const jimElement = document.createElement('figure');
      const imgElement = document.createElement('img');
      imgElement.src = element.imageUrl;
      imgElement.alt = element.title;

      // Créer une div pour contenir l'image et l'icône de poubelle
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-contain');
      imageContainer.dataset.id = element.id;

      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
      deleteIcon.dataset.id = element.id;

      imageContainer.appendChild(imgElement);
      imageContainer.appendChild(deleteIcon);

      jimElement.appendChild(imageContainer);

      const captionElement = document.createElement('figcaption');
      captionElement.innerText = 'éditer';

      jimElement.appendChild(captionElement);

      divGallery.appendChild(jimElement);
    });

    // Attachez l'événement de suppression aux nouvelles icônes de suppression
    deleteImage();
  } catch (error) {
    console.error("Erreur lors de l'affichage des images :", error.message);
  }
}

// Appel la fonction showImages au chargement de la page
window.onload = showImages;




  // Pour que quand je clique sur ma balise A et P ça exécute le input
  function photoInput() {
    // Récupérer l'input de type file
    const photoInput = document.getElementById('photoInput');

    // Simuler un clic sur l'input de type file
    photoInput.click();
  }

