let url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json"





const container = document.querySelector("#cards")
const displayProphets = (data) => {
    console.table(data);
    data.forEach(prophet => {
        let section = document.createElement("section");
        let fullName = document.createElement("h2");
        let textFullName = `${prophet.name} ${prophet.lastname}`;
        fullName.textContent = textFullName;
        let portrait = document.createElement("img");
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${textFullName}`);
        portrait.setAttribute("width", `60%`);
        section.appendChild(fullName);
        let dob = document.createElement("p");
        let pob = document.createElement("p");
        dob.textContent = `Date of birth: ${prophet.birthdate}`;
        dob.classList.toggle("tag")
        section.appendChild(dob);
        pob.textContent = `Place of birth: ${prophet.birthplace}`;
        pob.classList.toggle("tag")
        section.appendChild(pob);
        portrait.setAttribute("height", `auto`);
        
        section.appendChild(portrait);
        container.appendChild(section);

    });
}

let data = async () => {
    let response = await fetch(url);
    let data = await response.json();
    displayProphets(data.prophets);
};



data();

// console.log(data()["promiseresult"]);