burguer.addEventListener("click", function () {
    document.querySelector("nav").classList.toggle("hide");
    document.querySelector("#burguer").classList.toggle("open");
});

let contact_info = {
    name: "New York Chamber of Commerce",
    address: "125 Oakwood Ave",
    state: "New York",
    zipcode: "NY 10001",
    email: "info@newyorkchamberofcommerce.org",
    phone: "7165553321"

};


function createCardGrid(member) {
    // console.log(member.name);
    let card = `<section class="grid">
     <div class="card-header"> <h2>${member.name} </h2>
     <p>${member.bussines_tag}</p>
     </div>
     <div class="image-container"><img src="${member.image}" alt="logo of ${member.name}" loading="lazy"></div>
     <div class="member-info"><div class="values"><span class="tag-name">EMAIL:</span>
     <span class="tag-value">${member.email}</span></div>
     <div class="values"><span class="tag-name">PHONE:</span>
     <span class="tag-value">${member.phone}</span></div>
     <div class="values"><span class="tag-name">URL:</span>
     <span class="tag-value">${member.url}</span></div></div>
     </section>`;
    return card;

}
function createCardList(member) {
    // console.log(member.name);
    let card = `<section class="list">
    <span>
    ${member.name}
    </span>
    <span>
    ${member.phone}
    </span>
    <span>
    ${member.url}
    </span>
     </section>`;
    return card;

}

function loadChamberMembers(members, grid = true) {
    let membersDiv = document.querySelector("#members");
    membersDiv.innerHTML = "";
    let cards = undefined;
    if (grid) {
        cards = members.map(member => createCardGrid(member));
        membersDiv.classList.add("grid-members");
    } else {
        cards = members.map(member => createCardList(member));
        membersDiv.classList.remove("grid-members");
        cards.unshift(`<section class="list">
    <span>
    Name
    </span>
    <span>
    Phone
    </span>
    <span>
    URL
    </span>
     </section>`);
    }
    membersDiv.innerHTML = cards.join("");
}

async function retrieveChamberMembers(grid = true) {
    let data = await getHttpResponse("data/members.json");
    if (grid) {
        loadChamberMembers(data.members);
    } else {

        loadChamberMembers(data.members, false);
    }

}
async function getHttpResponse(url) {
    let response = await fetch(url);
    return await response.json();
}


// loadChamberMembers();

function handleButtons() {
    document.querySelector("#grid-button").addEventListener("click", () => {
        retrieveChamberMembers(true);

    });
    document.querySelector("#list-button").addEventListener("click", () => {
        retrieveChamberMembers(false);

    });
}

if (window.location.href.includes("directory.html")) {
    retrieveChamberMembers();
    handleButtons();
}


function load_chamber_info() {
    let contact_div = document.querySelector("#contact-info");
    let info = `
    <p class="name">${contact_info.name}</p>
    <p>${contact_info.address}</p>
    <p>${contact_info.state}, ${contact_info.zipcode}</p>
    <p>${contact_info.email}</p>
    <p>${contact_info.phone}</p>
    `;
    contact_div.innerHTML = info;
}

load_chamber_info();