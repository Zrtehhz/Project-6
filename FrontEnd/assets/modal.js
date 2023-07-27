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
function displayImages() {
  // URL de l'API pour récupérer les images
  const imagesURL = 'http://localhost:5678/api/works';

  // Appeler l'API pour récupérer les images
  fetch(imagesURL)
    .then((response) => response.json())
    .then((data) => {
      // Vérifier si les données sont sous forme de tableau
      if (Array.isArray(data)) {
        // Récupérer le conteneur des catégories
        const categoriesContainer = document.querySelector('.categories');
        // Effacer le contenu actuel avant d'ajouter les nouvelles images
        categoriesContainer.innerHTML = '';

        // Regrouper les images par catégorie
        const imagesByCategory = {};
        data.forEach((image) => {
          if (!imagesByCategory[image.categoryId]) {
            imagesByCategory[image.categoryId] = [];
          }
          imagesByCategory[image.categoryId].push(image);
        });

        // Afficher les images dans chaque catégorie
        Object.keys(imagesByCategory).forEach((categoryId) => {
          const categoryImages = imagesByCategory[categoryId];
          const categoryDiv = document.createElement('div');
          categoryDiv.className = 'category';

          categoryImages.forEach((image) => {
            // Créer un élément de div pour chaque image
            const imageDiv = document.createElement('div');
            imageDiv.className = 'image-item';

            // Créer un élément image pour chaque image
            const imageElement = document.createElement('img');
            imageElement.src = image.imageUrl;
            imageElement.setAttribute('data-id', image.id); // Ajouter l'attribut data-id avec la valeur de l'ID de l'image
            imageElement.setAttribute('data-category-id', categoryId);

            // Créer un élément icône de poubelle
            const deleteIcon = document.createElement('i');
            deleteIcon.className = 'fas fa-trash-can delete-icon';
            deleteIcon.dataset.id = image.id; // Ajouter l'attribut data-id

            deleteIcon.addEventListener('click', () => {
              // Appeler la fonction pour supprimer l'image lorsque l'icône de poubelle est cliquée
              deleteImage(image.id);
            });

            // Ajouter l'image et l'icône de poubelle à l'élément d'image
            imageDiv.appendChild(imageElement);
            imageDiv.appendChild(deleteIcon);

            // Ajouter l'élément d'image à la div de catégorie
            categoryDiv.appendChild(imageDiv);
          });

          // Ajouter la div de catégorie à la div des catégories
          categoriesContainer.appendChild(categoryDiv);
        });
      } else {
        console.error('Aucune image trouvée ou format de données invalide.');
      }
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des images :', error);
    });
}

// Fonction pour supprimer une image
function deleteImage(id) {
  const deleteURL = `http://localhost:5678/works/${id}`;
  const imageDiv = document.querySelector(`[data-id="${id}"]`);
  const categoryId = imageDiv.getAttribute('data-category-id');

  // Appeler l'API pour supprimer l'image
  fetch(deleteURL, { method: 'DELETE' })
    .then((response) => response.json())
    .then((data) => {
      console.log('Image supprimée avec succès:', data);
      // Mettre à jour les images affichées après suppression
      displayImages();
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression de l\'image :', error);
    });
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

// Événement de changement sur l'input de type file
photoInput.addEventListener('change', () => {
  // Ici, vous pouvez accéder au fichier sélectionné par l'utilisateur avec photoInput.files[0]
  // Par exemple, pour afficher le nom du fichier sélectionné :
  console.log('Fichier sélectionné :', photoInput.files[0].name);
});

// Appeler la fonction pour afficher les images au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
  displayImages();
});

// ... (votre code existant)
