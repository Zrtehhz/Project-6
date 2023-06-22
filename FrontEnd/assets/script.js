

let page = await fetch("http://localhost:5678/api/works");
let categories = await fetch('http://localhost:5678/api/categories');

const PageReponse = await page.json();
const CategoriesReponse = await categories.json();