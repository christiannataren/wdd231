const current = document.querySelector("#current-temp");
const icon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector('figcaption');

const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=87c34ca3fc3f32fa4c4ea0cc7cf23556&";



function getIconUrl(icon) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}



function procesing(data) {
    let temperature = data.main.temp;
    current.textContent = `${Math.round(temperature)} °C`;
    let icon_url = getIconUrl(data.weather[0].icon);
    let description = data.weather[0].description;
    icon.setAttribute("src", icon_url);
    icon.setAttribute("alt", description);
    captionDesc.textContent = description.charAt(0).toUpperCase() + description.substring(1);
}

function requestError(error) {
    console.log(error);
    current.textContent = "API ERROR"
}
async function getDataWeather(lat, long) {
    let data = '';
    try {
        let response = await fetch(`${url}lat=${lat}&lon=${long}`);
        if (response.ok) {
            data = await response.json();
            procesing(data);
        } else {
            throw Error(await response.text());
        }

    } catch (error) {
        requestError(error);
    }
}


getDataWeather("49.730358", "6.637383");
