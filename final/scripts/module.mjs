import * as Views from "./catViews.mjs";
import * as Util from "./util.mjs";

Views.prepareButtons();
Views.loadinCats();





const burguer = document.querySelector("#burguer");

burguer.addEventListener("click", function () {
    document.querySelector("nav").classList.toggle("hide-menu");
    burguer.classList.toggle("open");
});

document.querySelector("nav").addEventListener("click", function (event) {
    if (event.target.tagName == "LI") {
        let a = event.target.querySelector("a");
        if (a != undefined) {
            a.click();
        }
    }

});

function fillThankYou() {
    if (Util.getLocation() == "receiving.html") {
        let data = new URLSearchParams(window.location.href);
        data.forEach((value, key) => {
            console.log(value);
            console.log(key);
        });
    }
}

fillThankYou();