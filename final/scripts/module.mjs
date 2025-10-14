import { sendRequest } from "./fetcher.mjs";

let currentCats = {};

function addCat(cat) {
    // console.table(cat);
    // console.table(cat["breeds"][0]["temperament"]);
    let breeds = cat["breeds"][0];
    let div = `
    <img src="${cat.url}" alt="photo of ${breeds.name}" loading="lazy" >
    <div class="cat-data">
    <span class="cat-field">
    Breed: 
    </span>
    <span class="cat-value">
${breeds.name}
    </span>
    <span class="description">${breeds.description}</span>
    <span class="cat-field">
    Origin: 
    </span>
    <span class="cat-value">
${breeds.origin}
    </span>
    <span class="cat-field">
    Temperament: 
    </span>
    <span class="cat-value">
${breeds.temperament}
    </span>
    <button class="button primary-btn" data-id="${cat.id}">See more</button>
    </div>
    `;
    return div;
}


function fillDialog(cat) {
    console.log("filling dialog");
    let dialog = document.querySelector("dialog");
    dialog.innerHTML = "";
    dialog.innerHTML = `<button id="close-dialog"></button>${addCat(cat)}`;
    document.querySelector("#close-dialog").addEventListener("click", function () {
       document.querySelector("dialog").close();
    });
    dialog.showModal();

}

function clickButtonMore(event) {
    let id = event.target.getAttribute("data-id");
    fillDialog(currentCats[id]);

}
function setMoreButtons() {
    let container = document.querySelector("#cat-container");
    container.querySelectorAll("button").forEach((button) => {
        // console.log(button);
        button.addEventListener("click", clickButtonMore)
    });
}
function saveCurrentCats(data) {
    // console.table(data[0]);
    data.map(gato => currentCats[gato.id] = gato);
    // console.table(currentCats);

}

function loadHomeCats(data) {
    // console.table(data[0]["breeds"][0]);
    saveCurrentCats(data);

    let container = document.querySelector("#cat-container");
    container.innerHTML = "";
    let h2 = document.createElement("h2");
    h2.innerHTML = "Ramdom Cats";
    container.appendChild(h2);
    let cats = data.map((cat) => {
        let div = document.createElement("div");
        div.classList.add("kitty-container");
        div.innerHTML = addCat(cat);
        container.appendChild(div);

    });
    setMoreButtons();
}

function getBreeds(data) {
    data.forEach(breed => {
        console.table(`${breed.name} - ${breed.id}`);
    })
    
}

function loadinCats() {
    fillingLoading();
    // getData("/images/search", { limit: 20, has_breeds: true,breed_ids:"ocic" }, loadHomeCats);
    getData("/images/search", { limit: 20, has_breeds: true}, loadHomeCats);
}

async function getData(endpoint, parameters, callback) {
    await sendRequest(endpoint, parameters, callback);
}

function fillingLoading() {

    let container = document.querySelector("#cat-container");
    container.innerHTML = "";
    let h2 = document.createElement("h2");
    h2.innerHTML = "Loading...";
    container.appendChild(h2);

    let divs = 15;
    for (let i = 0; i < divs; i++) {
        let div = document.createElement("div");
        div.classList.add("loading");

        container.appendChild(div);
    }

}
function prepareButtons() {
    let show = document.querySelector("#show");
    show.addEventListener("click", function () {
        window.scrollTo(0, 0);
        loadinCats();

    });
}

// fillingLoading();

getData("/breeds", { limit: 100}, getBreeds);
prepareButtons();
loadinCats();


