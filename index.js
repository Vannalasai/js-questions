const apiKey = '7e999e00cb623676105620aca76f3059'; // Replace with your OpenWeatherMap API key

const getWeatherButton = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const loadingSpinner = document.getElementById("loadingSpinner");
const forecastContainer = document.getElementById("forecastContainer");

getWeatherButton.addEventListener("click", function() {
    const city = cityInput.value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    // Show the spinner while data is being fetched
    loadingSpinner.style.display = 'block';
    forecastContainer.innerHTML = ""; // Clear any previous forecast

    // Fetch data from the weather API
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=7e999e00cb623676105620aca76f3059`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
            // Hide the spinner
            loadingSpinner.style.display = 'none';

            // Extract relevant data for 5 days
            const forecastList = data.list.filter(item => item.dt_txt.includes("12:00:00"));

            // Display the weather forecast for 5 days
            forecastList.forEach(day => {
                const date = new Date(day.dt * 1000);
                const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

                const weatherDescription = day.weather[0].description;
                const temperature = (day.main.temp - 273.15).toFixed(1); // Convert Kelvin to Celsius

                const weatherCard = document.createElement("div");
                weatherCard.classList.add("weather-card");

                weatherCard.innerHTML = `
                    <h3>${dateString}</h3>
                    <p>${weatherDescription}</p>
                    <p><strong>${temperature}°C</strong></p>
                `;

                forecastContainer.appendChild(weatherCard);
            });
        })
        .catch(error => {
            loadingSpinner.style.display = 'none';
            // alert("Failed to fetch weather data. Please try again later.");
        });
});
