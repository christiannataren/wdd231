import { places } from "../data/places.mjs"
// console.log(places);


function createElement(element, textContent) {
    let el = document.createElement(element);

    el.textContent = textContent;

    return el;
}


function lastVisit() {
    let difference = Date.now() - new Date(parseInt(window.localStorage.getItem("last-visit")));
    console.log(difference);
    let day = Math.round(difference / 1000 / 60 / 60 / 24);
    let par = document.createElement("span");
    par.innerHTML = `You last visited <span class="bold red">${day}</span> days ago.`;
    console.log(par.outerHTML);
    document.querySelector("#last-visit").appendChild(par);
    let button = document.createElement("button");
    button.textContent = "❌";
    document.querySelector("#last-visit").appendChild(button);
    window.localStorage.setItem("last-visit", Date.now());
    button.addEventListener("click", function () {
        document.querySelector("#last-visit").classList.add("ocultar");
    })
}

function buildingSection(place) {
    let section = document.createElement("section");
    let img = document.createElement("img");
    img.setAttribute("alt", `photo of ${place.title}`);
    img.setAttribute("src", "images/" + place.photo_url);
    img.setAttribute("loading", "lazy");
    section.appendChild(img);
    section.appendChild(createElement("h2", place.title))
    section.appendChild(createElement("address", place.address));
    section.appendChild(createElement("p", place.description));
    return section;

}



function fillSections() {
    let container = document.querySelector("#discovery-container");
    // console.log(container.childNodes);
    places.map(place => container.appendChild(buildingSection(place)));

}



fillSections();
lastVisit();