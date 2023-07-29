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
const apiCall = async () => {
  await fetch('http://localhost:5678/api/works')
    .then((response) => response.json())
    .then((data) => editGallery(data)); // Utilisez directement "data" ici au lieu de "apiData"

    function editGallery(apiData) {
      const divGallery = document.querySelector('.gallery-modal');
    
      if (!divGallery) {
        console.error("L'élément avec la classe 'gallery-modal' n'a pas été trouvé.");
        return;
      }
    
      apiData.forEach((element) => {
        const jimElement = document.createElement('figure');
        const imgElement = document.createElement('img');
        imgElement.src = element.imageUrl;
        imgElement.alt = element.title;
    
        // Créer une div pour contenir l'image et l'icône de poubelle
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-contain');
    
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
        deleteIcon.setAttribute('data-id', element.id); // Stocker l'ID de l'image dans l'attribut data-id

        imageContainer.appendChild(imgElement);
        imageContainer.appendChild(deleteIcon);
    
        jimElement.appendChild(imageContainer);
    
        const captionElement = document.createElement('figcaption');
        captionElement.innerText = 'éditer';
    
        jimElement.appendChild(captionElement);
    
        divGallery.appendChild(jimElement);
      });
    }
    
};

apiCall();


function deleteImage() {
  const deleteIcons = document.querySelectorAll('.delete-icon');

  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener('click', async (e) => {
      e.preventDefault();

      const id = deleteIcon.getAttribute('data-id');
      const figure = deleteIcon.parentNode;
      const token = localStorage.getItem('token');

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

        // Supprimer l'image de la galerie modale
        figure.remove();

        // Vous pouvez également mettre à jour la galerie dans votre backend pour refléter la suppression
      } catch (error) {
        console.error("Erreur lors de la suppression de l'image :", error);
      }
    });
  });
}



deleteImage();






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











