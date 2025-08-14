// ===================== CONFIGURAÇÃO =====================
const apiKey = "SUA_CHAVE_AQUI"; // Substitua pela sua chave da WeatherAPI

// Elementos da interface
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherResult = document.getElementById("weather-result");
const errorMessage = document.getElementById("error-message");

// Campos de exibição
const cityNameEl = document.getElementById("city-name");
const localTimeEl = document.getElementById("local-time");
const weatherIconEl = document.getElementById("weather-icon");
const temperatureEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind-speed");
const pressureEl = document.getElementById("pressure");
const visibilityEl = document.getElementById("visibility");
const uvIndexEl = document.getElementById("uv-index");

// ===================== FUNÇÕES =====================

// Monta a URL da API
function buildApiUrl(city) {
    return `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=pt`;
}

// Mostra os dados no card
function displayWeather(data) {
    cityNameEl.innerText = `${data.location.name} - ${data.location.country}`;
    localTimeEl.innerText = `Horário local: ${data.location.localtime}`;
    weatherIconEl.src = `https:${data.current.condition.icon}`;
    temperatureEl.innerText = `${data.current.temp_c}°C`;
    conditionEl.innerText = data.current.condition.text;
    feelsLikeEl.innerText = `${data.current.feelslike_c}°C`;
    humidityEl.innerText = `${data.current.humidity}%`;
    windSpeedEl.innerText = `${data.current.wind_kph} km/h`;
    pressureEl.innerText = `${data.current.pressure_mb} hPa`;
    visibilityEl.innerText = `${data.current.vis_km} km`;
    uvIndexEl.innerText = data.current.uv;

    weatherResult.classList.remove("hidden");
    errorMessage.classList.add("hidden");
}

// Mostra mensagem de erro
function showError(message = "Não foi possível carregar os dados.") {
    errorMessage.querySelector("p").innerText = message;
    errorMessage.classList.remove("hidden");
    weatherResult.classList.add("hidden");
}

// Busca os dados do clima
async function fetchWeather(city) {
    try {
        const response = await fetch(buildApiUrl(city));

        if (!response.ok) {
            throw new Error("Cidade não encontrada");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError("Cidade não encontrada. Tente novamente.");
    }
}

// Lida com a busca
function handleSearch() {
    const city = cityInput.value.trim() || "Arapiraca";
    fetchWeather(city);
}

// ===================== EVENTOS =====================
searchBtn.addEventListener("click", handleSearch);

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

// ===================== INICIALIZAÇÃO =====================
fetchWeather("Arapiraca");
