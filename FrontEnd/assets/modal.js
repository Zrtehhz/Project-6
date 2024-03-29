// Partie Filtres
let url = 'http://localhost:5678/api/works';




//Partie texte Login => Logout, Si token affiche Logout et enlève les filtres si non, Affiche Login et les filtres.
document.addEventListener('DOMContentLoaded', function() {
  const loginLink = document.querySelector('.login1');
  const logoutLink = document.querySelector('.logout');
  const editModeLink = document.createElement('a');
  const projectFilters = document.querySelector('#filtres');
  const editionSection = document.querySelector('.edition');
  const modificationSpan = document.querySelector('.modification');
  const penIcon = document.getElementById('icone'); // Sélectionnez la balise i avec la classe "fa-pen-to-square"


  const token = window.sessionStorage.getItem('token');

  if (token) {
    loginLink.style.display = 'none';
    logoutLink.style.display = 'inline';
    projectFilters.style.display = 'none';
    editionSection.style.display = 'flex';
    modificationSpan.style.display = 'flex';
    penIcon.style.display = 'inline'; // Affichez la balise i lorsque l'utilisateur est connecté

    logoutLink.addEventListener('click', function() {
      window.sessionStorage.removeItem('token');
      loginLink.style.display = 'inline';
      logoutLink.style.display = 'none';
      projectFilters.style.display = 'flex';
      projectFilters.style.justifyContent = 'center';
      projectFilters.style.gap = '10px';
      editionSection.style.display = 'none';
      modificationSpan.style.display = 'none';
      penIcon.style.display = 'none'; // Masquez la balise i lors de la déconnexion de l'utilisateur


    });

    document.querySelector('nav ul').appendChild(editModeLink);
  } else {
    loginLink.style.display = 'inline';
    logoutLink.style.display = 'none';
    projectFilters.style.display = 'flex';
    editionSection.style.display = 'none';
    modificationSpan.style.display = 'none';
    penIcon.style.display = 'none'; // Masquez la balise i lorsque l'utilisateur n'est pas connecté
  


  }
});










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
});document.addEventListener('DOMContentLoaded', function() {

  const titleInput = document.getElementById('inputTitre');
  const categorySelect = document.getElementById('selectCategorie');
  const validateButton = document.querySelector('.validate');
  const photoInp = document.getElementById('photoInput');

  // Fonction pour vérifier si le bouton doit être affiché ou caché
  function checkInputs() {
      if (titleInput.value.trim() !== "" && categorySelect.value !== "") {
        validateButton.style.display = 'block'; // Afficher le bouton

      }
  }

  // Remplir automatiquement le champ inputTitre avec le nom du fichier sans son extension
  photoInp.addEventListener('change', function() {
    const fullFilename = this.files[0].name;
    const filenameWithoutExtension = fullFilename.replace(/\.[^/.]+$/, "");
    titleInput.value = filenameWithoutExtension;
    checkInputs(); 
});


  // Attachement des écouteurs d'événements pour vérifier les entrées
  titleInput.addEventListener('input', checkInputs);
  categorySelect.addEventListener('change', checkInputs);

  // Cacher le bouton au chargement initial de la page
  validateButton.style.display = 'none';

















  function resetModal() {
    // Vider l'aperçu de l'image
    document.getElementById('previewImage').src = '#';
    previewImage.style.display = 'none';
    previewImage.src = '';

    // Réinitialiser le champ d'entrée du fichier
    document.querySelector('.photoP').style.display = 'block';
    document.querySelector('.textP').style.display = 'block';
    document.getElementById('photoInput').value = '';

    // Vider le champ du titre
    document.getElementById('inputTitre').value = '';

    // Réinitialiser la valeur du sélecteur de catégorie
    document.getElementById('selectCategorie').selectedIndex = 0;
}












  // Fonction pour ajouter une photo
  validateButton.addEventListener('click', async (event) => {
      event.preventDefault();

      const formData = new FormData();

      const token = window.sessionStorage.getItem('token');

      const title = titleInput.value;
      const categoryId = parseInt(categorySelect.value);

      formData.append('image', photoInp.files[0]);
      formData.append('title', title);
      formData.append('category', categoryId);

      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
              body: formData,
          });

          if (!response.ok) {
              throw new Error('Erreur lors de l\'ajout de l\'élément à la galerie');
          }
          showImages();
          resetModal();

      } catch (error) {
          console.log(error.message);
      }
  });

});



async function GalerieRefresh() {
  // Fonction pour récupérer les données
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    return await response.json();
  };

  try {
    // Récupérer les nouvelles données
    const fetchedCategories = await fetchData('http://localhost:5678/api/categories');
    const fetchedItems = await fetchData('http://localhost:5678/api/works');

    // Mise à jour des tableaux globaux
    items.length = 0;
    categories.length = 0;
    
    categories.push({ id: 0, name: 'Tous' }, ...fetchedCategories);
    items.push(...fetchedItems);

    // Remplissage de la galerie
    displayItems(items);

    // (Optionnel) Si vous voulez également mettre à jour les filtres
    const filterContainer = document.getElementById('filtres');
    filterContainer.innerHTML = '';

    categories.forEach(category => {
      const button = document.createElement('button');
      button.textContent = category.name;
      button.dataset.categoryId = category.id;

      button.addEventListener('click', () => {
        filterByCategory(parseInt(button.dataset.categoryId));
        filterContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });

      filterContainer.appendChild(button);
    });

  } catch (error) {
    console.log('Erreur lors de la récupération des données:', error.message);
  }
}

// Appel initial lors du chargement de la page
document.addEventListener('DOMContentLoaded', GalerieRefresh);



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
  const image_Container = deleteIcon.closest('.image-contain');
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

    if (image_Container) {
      image_Container.remove();
    }

    const index = items.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
    items.splice(index, 1);
  } 

    // Mettre à jour dynamiquement la galerie après la suppression
    showImages();
    GalerieRefresh();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image :", error);
  }
}


// Fonction pour afficher les images
async function showImages() {
  const divGallery = document.querySelector('.gallery-modal');

  if (!divGallery) {
    console.error("L'élément avec la classe 'gallery-modal' n'a pas été trouvé.");
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Impossible de récupérer les images.");
    }

    const apiData = await response.json();

    divGallery.innerHTML = '';

    apiData.forEach((element) => {
      const jimElement = document.createElement('figure');
      const imgElement = document.createElement('img');
      imgElement.src = element.imageUrl;
      imgElement.alt = element.title;

      // Créer une div pour contenir l'image et l'icône de poubelle
      const image_Container = document.createElement('div');
      image_Container.classList.add('image-contain');
      image_Container.dataset.id = element.id;

      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
      deleteIcon.dataset.id = element.id;

      const hoverIcon = document.createElement('i');
      hoverIcon.classList.add('fa-solid', 'fa-arrows-up-down-left-right', 'hover-icon');

      image_Container.appendChild(imgElement);
      image_Container.appendChild(deleteIcon);
      image_Container.appendChild(hoverIcon);


      jimElement.appendChild(image_Container);

      const captionElement = document.createElement('figcaption');
      captionElement.innerText = 'éditer';

      jimElement.appendChild(captionElement);

      divGallery.appendChild(jimElement);
    });

    // Attachez l'événement de suppression aux nouvelles icônes de suppression
    deleteImage();
    GalerieRefresh();
  } catch (error) {
    console.error("Erreur lors de l'affichage des images :", error.message);
  }
}






// Appel la fonction showImages au chargement de la page
window.onload = showImages;



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
      photoP.style.zIndex = 26;
      textP.style.zIndex = 27;
    }
  });
});




  // Pour que quand je clique sur ma balise A et P ça exécute le input
  function photoInput() {
    // Récupérer l'input de type file
    const photoInput = document.getElementById('photoInput').click();    ;

    // Simuler un clic sur l'input de type file
    photoInput.click();
    
  }