/* Barre et Bouton de recherche */
const body = document.querySelector("body");
/* const value = document.querySelector("barre").value; */
const input = document.querySelector("#barre");
/* console.log(input.value) */
const button = document.querySelector("#recherche");
const grid = document.querySelector(".grid");
const container = document.querySelector(".container");
const paragraphe = document.querySelector(".p");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modalContent");
const closeBtn = modal.querySelector(".closeBtn");



const myProm = () => {
    return new Promise ((reussi, rejete) => {
        reussi("Ok");
        rejete("Error");
    });
};
button.addEventListener("click", () => {
const myFetch = async () => {
    let inpute = input.value.trim();
    const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${inpute}`
    );
console.log(res);
/* modalContent.innerHTML = ""; */
grid.innerHTML = "";
let data;
if (res.ok){
    data = await res.json();
    console.log(data.meals);
if (data.meals) {
    paragraphe.textContent = `These are the results for: "${inpute}"`;}
    else {
        paragraphe.textContent = `No results found for: "${inpute}"`;
        }
    
const infosUtiles = data.meals.forEach(element => {
        /* console.log(element.strMeal);
        console.log(element.strMealThumb);
        console.log(element.strInstructions); */
    const carte = document.createElement("div");
    carte.classList.add("carte");

    const img = document.createElement("img");
    img.src = element.strMealThumb; 

    const titre = document.createElement("h3");
    titre.textContent = element.strMeal;

    carte.appendChild(img);
    carte.appendChild(titre);
    grid.appendChild(carte);

carte.addEventListener("click", () => {
    /* modalContent.innerHTML = ""; */
    modal.style.display = "block";
    modalContent.querySelectorAll("h3, ul, p, img").forEach((el) => el.remove());
    const modalImg = document.createElement("img");
    modalImg.classList.add("modalImg");
    modalImg.src = element.strMealThumb;

    const modalTitre = document.createElement("h3");
    modalTitre.classList.add("modalTitre");
    modalTitre.textContent = `${element.strMeal}`;

    const modalListe = document.createElement("ul");
    modalListe.classList.add("modalListe");
    for (let i=1; i<=20; i++){
        if (element[`strMeasure${i}`] && element[`strIngredient${i}`]){
            const li = document.createElement("li");
            li.textContent = `${element[`strMeasure${i}`] +" "+ element[`strIngredient${i}`]}`;
            modalListe.appendChild(li);
    }};

    const modalInstructions = document.createElement("p");
    modalInstructions.classList.add ("modalInstructions");
    modalInstructions.textContent = `${element.strInstructions}`;


        
        modalContent.appendChild(modalImg);
        modalContent.appendChild(modalTitre);
        modalContent.appendChild(modalListe);
        modalContent.appendChild(modalInstructions);

});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});



});

} 
};
myFetch(); });

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      button.click(); // Simule un clic sur le bouton "Rechercher"
    }
});