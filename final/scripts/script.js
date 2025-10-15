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

