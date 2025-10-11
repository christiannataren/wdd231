import { sendRequest } from "./fetcher.mjs";



function addCat(cat) {
    let img = document.createElement('img');
    img.setAttribute("src", cat.url);
    img.setAttribute("loading", "lazy");
    let div = document.createElement("div");
    div.classList.add("kitty-container");
    div.appendChild(img);
    return div;
}

function loadHomeCats(data) {
    let container = document.querySelector("#cat-container");
    container.innerHTML = "";

    console.table(data[0]);
    let h2 = document.createElement("h2");
    h2.innerHTML = "Ramdom Cats";
    container.appendChild(h2);
    data.map((photo) => {
        container.appendChild(addCat(photo));

    });
}

function loadinCats() {
    fillingLoading();
    getData("/images/search", { limit: 20 }, loadHomeCats);
}

async function getData(endpoint, parameters, callback) {
    await sendRequest(endpoint, parameters, callback);
    // callback(sendRequest("/images/search", { limit: 1 }, getGatos));
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
        div.classList.add("loading")
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


