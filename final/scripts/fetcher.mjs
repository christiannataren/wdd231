const api_url = "https://api.thecatapi.com/v1";
const api_key = "live_ddhEL32ozSG4mKF2qv7GiURNcKWMEb6KAuwJT80whiNIZChhi7fyrV090y8zxAsX";


function defaultAPIValues() {
    return `?api_key=${api_key}`;
}
function setUrlApi(endpoint, values) {
    let url = `${api_url}${endpoint}${defaultAPIValues()}`;
    Object.keys(values).forEach(key => {
        url = `${url}&${key}=${values[key]}`
    });
    return url

}
export async function sendRequest(endpoint, data, callback) {
    let url = setUrlApi(endpoint, data);
    try {
        let response = await fetch(url);
        let data = await response.json();
        callback(data);
    } catch (error) {
        console.log(error);
    }
}