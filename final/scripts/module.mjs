import { sendRequest } from "./fetcher.mjs";



function addCat(cat) {
    console.table(cat["breeds"][0]["temperament"]);
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
    <button class="button primary-btn" data-id="">See more</button>
    </div>
    
    `;
    return div;


    // let img = document.createElement('img');
    // img.setAttribute("src", cat.url);
    // img.setAttribute("loading", "lazy");
    // let div = document.createElement("div");
    // div.classList.add("kitty-container");
    // div.appendChild(img);
    // return div;
}

function loadHomeCats(data) {
    // console.table(data[0]["breeds"][0]);
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
}

function loadinCats() {
    fillingLoading();
    getData("/images/search", { limit: 20, has_breeds: true }, loadHomeCats);
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
prepareButtons();
loadinCats();


