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
    phone: "7165553321",
    lat: "40.709130",
    long: "-74.002138"

};
const base_url = "https://openweathermap.org"
const api_url = "https://api.openweathermap.org/data/2.5"
const api_key = "87c34ca3fc3f32fa4c4ea0cc7cf23556"

function createCardGrid(member, isHome = false) {
    // console.log(member.name);
    let card = `<section class="grid">
     <div class="card-header"> <h2>${member.name} </h2>
     <p>${member.bussines_tag}</p>
     </div>
     <div class="image-container"><img src="${member.image}" alt="logo of ${member.name}" loading="lazy"></div>
     <div class="member-info">`;

    if (!isHome) {
        card += `<div class="values"><span class="tag-name">EMAIL:</span><span class="tag-value">${member.email}</span></div>`;
    } else {
        card += `<div class="values"><span class="tag-name">Address:</span><span class="tag-value">${member.address}</span></div>`;
    }
    card += `<div class="values"><span class="tag-name">PHONE:</span><span class="tag-value">${member.phone}</span></div>
     <div class="values"><span class="tag-name">URL:</span><span class="tag-value">${member.url}</span></div>`

    if (isHome) {
        card += `<div class="values"><span class="tag-name">Membership Level:</span><span class="tag-value">${member.level}</span></div>`;
    }
    card += `</div></section>`;
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

function loadMembersHome(members) {
    let n_chosen = 3;
    let chosen = [];
    members = members.filter(member => member.level > 1);
    while (chosen.length < n_chosen) {
        // console.log(chosen);
        let el = Math.floor(Math.random() * members.length);
        if (!chosen.includes(el)) {
            chosen.push(el);
        }
    }

    let membersDiv = document.querySelector("#home-members");
    let selected = [];
    chosen.forEach(n => {
        selected.push(members[n]);
    });
    let cards = selected.map(member => createCardGrid(member, true));


    // console.log(cards);
    membersDiv.innerHTML = cards.join("");

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

async function retrieveChamberMembers(target, grid = true) {
    let data = await getHttpResponse("data/members.json");
    if (grid) {
        target(data.members);
    } else {

        target(data.members, false);
    }

}
async function getHttpResponse(url) {
    let response = await fetch(url);
    return await response.json();
}


// loadChamberMembers();


function handleButtons() {
    document.querySelector("#grid-button").addEventListener("click", () => {
        retrieveChamberMembers(loadChamberMembers, true);

    });
    document.querySelector("#list-button").addEventListener("click", () => {
        retrieveChamberMembers(loadChamberMembers, false);

    });
}


function getStringHour(date) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return formatter.format(date).toLowerCase();


}
function getIconUrl(icon) {
    return `${base_url}/img/wn/${icon}@2x.png`;
}
function setCurrentWeather(data) {
    let section = document.querySelector("#w-values");
    let img = document.querySelector("#w-image");
    img.setAttribute("src", getIconUrl(data.weather[0].icon));
    let spans = [];
    spans.push(`<span class="bold">${Math.floor(data.main.temp)}°</span> C`);
    spans.push(`${data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.substring(1)}`);
    spans.push(`High: ${Math.floor(data.main.temp_min)}°`);
    spans.push(`Low: ${Math.floor(data.main.temp_max)}°`);
    spans.push(`Humidity: ${data.main.humidity}%`);
    let sunriseDate = new Date(data.sys.sunrise * 1000);
    let sunsetDate = new Date(data.sys.sunset * 1000);
    spans.push(`Sunrise: ${getStringHour(sunriseDate)}`);
    spans.push(`Sunset: ${getStringHour(sunsetDate)}`);
    spans.forEach(line => {
        let span = document.createElement("span");
        span.innerHTML = line;
        section.appendChild(span);
    });


}

function populateCurrentWeather(data) {
    setCurrentWeather(data)
}

function getDateDayName(date) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
}
function populateForecast(data) {
    let forecast = document.querySelector("#forecast");
    let days = [];
    days.push(data.list[0]);
    let c_day = new Date(data.list[0].dt_txt).getDate();
    for (let i = 1; i < data.list.length; i++) {
        let current = new Date(data.list[i].dt_txt).getDate();
        if (c_day != current) {
            c_day = current;
            days.push(data.list[i]);
        }
    }
    let spans = [];
    spans.push(`Today: <span class="bold">${Math.floor(days[0].main.temp)}°C</span>`);
    spans.push(`${getDateDayName(new Date(days[1].dt_txt))}: <span class="bold">${Math.floor(days[1].main.temp)}°C</span>`);
    spans.push(`${getDateDayName(new Date(days[2].dt_txt))}: <span class="bold">${Math.floor(days[2].main.temp)}°C</span>`);
    spans.forEach(line => {
        let span = document.createElement("span");
        span.innerHTML = line;
        forecast.appendChild(span);
    });

}

async function getForeCast() {
    let data = { "endpoint": "/forecast", "parameters": { "cnt": 30, "lat": contact_info.lat, "lon": contact_info.long } };
    await getDataFromApi(data, populateForecast)
}
async function getWeather() {
    await getDataFromApi({ "endpoint": "/weather", "parameters": { "lat": contact_info.lat, "lon": contact_info.long } }, populateCurrentWeather);


}
function requestError(error) {
    console.log(error);
}
function defaultAPIValues() {
    return `?units=metric&appid=${api_key}`;
}
function setUrlApi(endpoint, values) {
    let url = `${api_url}${endpoint}${defaultAPIValues()}`;
    Object.keys(values).forEach(key => {
        url = `${url}&${key}=${values[key]}`
    });
    return url

}
async function getDataFromApi(data, callback) {
    ////data is carrying the data for request data: enpoint and data: parameters
    let compose = setUrlApi(data.endpoint, data.parameters);
    try {
        // let compose = {lat=${lat}&lon=${long}`;
        let response = await fetch(compose);
        if (response.ok) {
            data = await response.json();
            callback(data);
        } else {
            throw Error(await response.text());
        }

    } catch (error) {
        requestError(error);
    }
}


if (window.location.href.includes("directory.html")) {
    retrieveChamberMembers(loadChamberMembers);
    handleButtons();
} else if (window.location.href.includes("index.html")) {
    retrieveChamberMembers(loadMembersHome);
    getWeather();
    getForeCast();

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