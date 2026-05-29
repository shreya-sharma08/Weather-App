async function getWeather() {

    let city = document.getElementById("city").value.trim();
    let resultDiv = document.getElementById("weatherResult");

    // Input validation
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    resultDiv.innerHTML = "<p>Loading weather data...</p>";

    try {

        let response = await fetch(`https://wttr.in/${city}?format=j1`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        let data = await response.json();

        // Extract nested JSON values
        let temp = data.current_condition[0].temp_C;
        let humidity = data.current_condition[0].humidity;
        let description = data.current_condition[0].weatherDesc[0].value;
        let windSpeed = data.current_condition[0].windspeedKmph;

        resultDiv.innerHTML = `
            <h3>Weather in ${city}</h3>
            <p><strong>Temperature:</strong> ${temp} °C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Condition:</strong> ${description}</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
        `;

    } catch (error) {
        resultDiv.innerHTML = `<p style="color:red;">Error: Unable to fetch weather data.</p>`;
        console.error(error);
    }
}