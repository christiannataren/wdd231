const burguer = document.querySelector("#burguer");



burguer.addEventListener("click", function () {
    document.querySelector("nav").classList.toggle("hide");
    burguer.classList.toggle("open");
})