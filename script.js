async function getWeather() {
    const ApiKey = "2d88cfd3788ab7929c78dad3897f67f0"; 
    const city = document.getElementById('city').value.trim();
    
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const URL = `http://api.weatherstack.com/current?access_key=${ApiKey}&query=${city}`;

    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

        if (data.error) throw new Error(data.error.info);

        // Extract weather data
        const temperature = data.current.temperature;
        const humidity = data.current.humidity;
        const windSpeed = data.current.wind_speed;
        const condition = data.current.weather_descriptions[0];

        // Update UI elements
        document.getElementById('temperature').innerText = `${temperature}°C`;
        document.getElementById('city-name').innerText = `${data.location.name}`;
        document.getElementById('humidity').innerText = `${humidity}% Humidity`;
        document.getElementById('wind-speed').innerText = `${windSpeed} km/h WIND SPEED`;

        // Set weather image based on temperature
        const weatherIcon = document.getElementById('weather-icon');
        if (temperature <= 10) {
            weatherIcon.src = "cloudy.png"; 
        } else if (temperature > 10 && temperature <= 30) {
            weatherIcon.src = "rainy.png"; 
        } else {
            weatherIcon.src = "sunny.png"; 
        }

    } catch (error) {
        alert(error.message);
        document.getElementById('temperature').innerText = "--°C";
        document.getElementById('city-name').innerText = "City Name";
        document.getElementById('humidity').innerText = "--% Humidity";
        document.getElementById('wind-speed').innerText = "-- km/h WIND SPEED";
    }
}
