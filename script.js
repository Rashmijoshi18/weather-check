async function getWeather() {
  const city = document.getElementById("cityInput").value.trim() || "Delhi";
  const apiKey = "8079686a360f41ffc2b2eae222ee239f";
  const weatherDiv = document.getElementById("weather");
  const errorDiv = document.getElementById("error");

  weatherDiv.innerHTML = "";
  errorDiv.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found or API error");

    const data = await response.json();

    const groupedData = {};
    data.list.forEach(entry => {
      const date = entry.dt_txt.split(" ")[0];
      if (!groupedData[date]) groupedData[date] = [];
      groupedData[date].push(entry);
    });

    const firstDate = Object.keys(groupedData)[0];
    const entries = groupedData[firstDate];
    const mainEntry = entries.find(e => e.dt_txt.includes("12:00:00")) || entries[0];
    const weather = mainEntry.weather[0];
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

    const hourlyHtml = entries.map(entry => {
      const time = new Date(entry.dt_txt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      const icon = `https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`;
      return `
        <div class="hour-block">
          <strong>${time}</strong>
          <img src="${icon}" alt="${entry.weather[0].description}">
          <div>${entry.weather[0].main}</div>
          <div>${entry.main.temp}°C</div>
        </div>
      `;
    }).join("");

    weatherDiv.innerHTML = `
      <div class="card">
        <h3>${new Date(firstDate).toDateString()}</h3>
        <p><strong>${weather.main}</strong> - ${weather.description}</p>
        <p>🌡️ ${mainEntry.main.temp}°C | 💧 ${mainEntry.main.humidity}% | 🌬️ ${mainEntry.wind.speed} m/s</p>
        <div class="hourly-horizontal">${hourlyHtml}</div>
      </div>
    `;

  } catch (error) {
    errorDiv.innerText = error.message;
  }
}
