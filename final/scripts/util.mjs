export function fillDialog(html) {
    console.log("filling dialog");
    let dialog = document.querySelector("dialog");
    dialog.innerHTML = "";
    dialog.innerHTML = `<button id="close-dialog"></button>${html}`;
    document.querySelector("#close-dialog").addEventListener("click", function () {
        document.querySelector("dialog").close();
    });
    dialog.showModal();

}
export function getLocation() {
    return window.location.href.split("?")[0].split("/")[window.location.href.split("?")[0].split("/").length - 1];

}