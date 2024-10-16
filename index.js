const inputEl = document.getElementById("input_el");
const buttonEL = document.getElementById("button_el");
const city = document.getElementById("city");
const country = document.getElementById('country');
const temperature = document.getElementById('temperature');
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "fd48bdf8a8b87b3c140f17625f4e2d57";

async function getDataByCity(cityName) {
    
        const fetchData = await fetch(`${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
        const data = await fetchData.json();

        if (fetchData.ok) {
            city.innerText = data.name || "N/A";
            country.innerText = data.sys.country || "N/A";
            temperature.innerText = data.main.temp !== undefined ? `${data.main.temp} C` : "N/A";
            inputEl.value = ''; 
        } else {
            alert("City not found. Please try again.");
            city.innerText = '';
            country.innerText = '';
            temperature.innerText = '';
            inputEl.value = ''
        }
  
}

async function getDataByCoords(lat, lon) {
    try {
        const fetchData = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await fetchData.json();

        if (fetchData.ok) {
            city.innerText = data.name || "N/A";
            country.innerText = data.sys.country || "N/A";
            temperature.innerText = data.main.temp !== undefined ? `${data.main.temp} C` : "N/A";
        } else {
            alert("Location not found. Please try again.");
            city.innerText = '';
            country.innerText = '';
            temperature.innerText = '';
        }
    } catch (err) {
        alert("An error occurred. Please try again.");
    }
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getDataByCoords(lat, lon);
        }, (error) => {
            alert("Unable to retrieve your location. Please enter a city manually.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

buttonEL.addEventListener("click", () => {
    const inputValue = inputEl.value.trim(); 
    if (inputValue) {
        getDataByCity(inputValue); 
    } else {
        alert("Please enter a city name.");
    }
});


window.addEventListener("load", () => {
    getUserLocation(); 
});



