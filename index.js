const inputEl = document.getElementById("input_el")
const buttonEL = document.getElementById("button_el")
const city = document.getElementById("city")
const country = document.getElementById('country')
const temperature = document.getElementById('temperature')
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "fd48bdf8a8b87b3c140f17625f4e2d57";


async function getData (inputValue) {
 try {
const fetchData = await fetch(`${API_URL}${inputValue}&appid=${API_KEY}&units=metric`)
const data = await fetchData.json()
city.innerText = data.name
country.innerText = data.sys.country
temperature.innerText = data.main.temp
console.log(data)}catch (err ) {
alert("this country is not defind")
}
}


buttonEL.addEventListener("click", () => {getData(inputEl.value)}) 
