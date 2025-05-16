async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "7a16bd82a508ed509d62540dc80ac752";
    const weatherDiv = document.getElementById("weather");
    const errorDiv = document.getElementById("error");
    weatherDiv.innerHTML = "";
    errorDiv.innerHTML = "";

    if (!city) {
        errorDiv.innerText = "Please enter a city name.";
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        weatherDiv.innerHTML = `
          <h3>${data.name}</h3>
          <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
          <p><strong>Weather:</strong> ${data.weather[0].description}</p>
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
        `;
    } catch (err) {
        errorDiv.innerText = err.message;
    }
}
const apiKey = "3554ad2281b3b3954ffde7d3f9445fac";