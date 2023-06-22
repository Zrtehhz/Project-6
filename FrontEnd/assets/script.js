const images = [
	{
		"image":"assets/images/abajour-tahina.png",
		"tagLine":"Abajour Tahina"
	},
	{
		"image":"assets/images/appartement-paris-v.png",
		"tagLine":"Appartement Paris V"
	},
	{
		"image":"assets/images/restaurant-sushisen-londres.png",
		"tagLine":"Restaurant Sushisen - Londres"
	},
	{
		"image":"assets/images/la-balisiere.png",
		"tagLine":"Villa “La Balisiere” - Port Louis"
	},
    {
		"image":"assets/images/structures-thermopolis.png",
		"tagLine":"Structures Thermopolis"
	},
	{
		"image":"assets/images/appartement-paris-x.png",
		"tagLine":"Appartement Paris X"
	},
	{
		"image":"assets/images/le-coteau-cassis.png",
		"tagLine":"Pavillon “Le coteau” - Cassis"
	},
	{
		"image":"assets/images/villa-ferneze.png",
		"tagLine":"Villa Ferneze - Isola d’Elba"
	},
    {
		"image":"assets/images/appartement-paris-xviii.png",
		"tagLine":"Appartement Paris XVIII"
	},
	{
		"image":"assets/images/bar-lullaby-paris.png",
		"tagLine":"Bar “Lullaby” - Paris"
	},
	{
		"image":"assets/images/hotel-first-arte-new-delhi.png",
		"tagLine":"Hotel First Arte - New Delhi"
	}
];




let btn = document.getElementsByTagName('button');
let bannerImg = document.createElement('.ChoixImg');
let Text = document.createElement('figcaption');

let hotel = document.querySelector('#hotel');
let appart = document.querySelector('#appart');
let object = document.querySelector('#object');

function AfficheObjets() {
    bannerImg.forEach(function (image) {
        image.classList.remove('hidden');
    });
}

function MasqueObjets() {
    bannerImg.forEach(function (image) {
        image.classList.add('hidden');
    });
}

object.addEventListener('click', function () {
	console.log('Objet ');
    MasqueObjets();
});


hotel.addEventListener('click', function () {
	console.log('Hotel ');

    MasqueObjets();
});

appart.addEventListener('click', function () {
	console.log('Appart ');

    MasqueObjets(-1);
});

Array.from(btn).forEach(function (button) {
    button.addEventListener('click', MasqueObjets);
});