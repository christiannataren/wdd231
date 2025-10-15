import { sendRequest } from "./fetcher.mjs";
import * as Util from "./util.mjs";

let currentCats = {};
let limit = 21;
function addCat(cat) {
    let breeds = cat["breeds"][0];
    let fav_btn = "";
    let fav_cat = window.localStorage.getItem('favorite');
    if (fav_cat == null) {
        fav_btn = `<button aria-label="FavoriteButton" data-id="${breeds.id}" data-name="${breeds.name}" class="favorite"></button>
        `;
    } else {
        if (fav_cat == breeds.id) {
            fav_btn = `<button aria-label="FavoriteButton" data-id="${breeds.id}" data-name="${breeds.name}" class="favorite liked"></button>
        `;
        } else {
            fav_btn = `<button  aria-label="FavoriteButton" data-id="${breeds.id}" data-name="${breeds.name}"class="favorite"></button>
        `;
        }

    }

    fav_btn = fav_btn + `<p class="fav-message ocultar">${breeds.name} cat has become your favorite breed.</p>`;
    let div = `
    
    <div class="img-container"><img src="${cat.url}" alt="photo of ${breeds.name}" loading="lazy" ></div>
    <div class="cat-data">
    ${fav_btn}
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

function resetFavorite() {
    let favs = document.querySelectorAll(".favorite");
    favs.forEach(fav => {
        if (window.localStorage.getItem("favorite") == fav.getAttribute("data-id")) {
            fav.classList.add("liked")
        } else {
            fav.classList.remove("liked");
        }
    });

}

function clickFavoriteButton(button) {

    if (button.classList.contains("liked")) {
        return;
    }
    button.parentElement.parentElement.classList.add("coloring-red");
    // button.parentElement.parentElement.querySelector(".fav-message").classList.add("show-second");
    button.parentElement.parentElement.querySelector(".fav-message").classList.remove("ocultar");

    // button.classList.add("liked");
    window.localStorage.setItem("favorite", button.getAttribute("data-id"));
    window.localStorage.setItem("favorite-name", button.getAttribute("data-name"));
    resetFavorite();
    setTimeout(function () {
        button.parentElement.parentElement.querySelector(".fav-message").classList.add("ocultar");
        button.parentElement.parentElement.classList.remove("coloring-red");
        console.log("Erasing p");

    }, 3000);
}
function clickButton(event) {
    if (event.target.classList.contains("favorite")) {
        clickFavoriteButton(event.target);
        return;
    }
    let id = event.target.getAttribute("data-id");
    Util.fillDialog(addCat(currentCats[id]));

}
function setButtons() {
    let container = document.querySelector("#cat-container");
    container.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", clickButton)
    });
}
function saveCurrentCats(data) {
    data.map(gato => currentCats[gato.id] = gato);

}

function loadHomeCats(data) {
    saveCurrentCats(data);
    let container = document.querySelector("#cat-container");
    container.innerHTML = "";
    let h2 = document.createElement("h2");
    switch (Util.getLocation()) {
        case "":
        case "index.html":
            h2.textContent = "Random Cats";


            break;
        case "my-favorite.html":
            if (getFavoriteBreed() == null) {
                h2.textContent = "You have not selected a favorite breed, showing Random cats";
            } else {
                h2.innerHTML = `Showing only <span class="bold">${window.localStorage.getItem("favorite-name")}</span> cats.`;
            }


            break;
    }

    container.appendChild(h2);
    let cats = data.map((cat) => {
        let div = document.createElement("div");
        div.classList.add("kitty-container");
        div.innerHTML = addCat(cat);
        container.appendChild(div);

    });
    setButtons();
}

function getBreeds(data) {
    data.forEach(breed => {
        console.table(`${breed.name} - ${breed.id}`);
    })

}


function getFavoriteBreed() {
    return window.localStorage.getItem("favorite");
}
export function loadinCats() {
    let url = Util.getLocation();
    switch (url) {
        case "":
        case "index.html":
            fillingLoading();
            getData("/images/search", { limit: limit, has_breeds: true }, loadHomeCats);
            break;
        case "my-favorite.html":
            fillingLoading();
            if (getFavoriteBreed() != null) {
                getData("/images/search", { limit: limit, has_breeds: true, breed_ids: getFavoriteBreed() }, loadHomeCats);
            } else {
                getData("/images/search", { limit: limit, has_breeds: true }, loadHomeCats);
            }
            // 

            break;
    }

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
export function prepareButtons() {
    let show = document.querySelector("#show");
    if (show != undefined) {
        show.addEventListener("click", function () {
            window.scrollTo(0, 0);
            loadinCats();

        });
    }

}



