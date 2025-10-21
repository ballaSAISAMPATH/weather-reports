import React, { useState } from "react";

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setError("");
    setWeather(null);
    if (!location) {
      setError("Please enter a location");
      return;
    }
    try {
      const apiKey = "ecccb542eff9bfa02d09dbfe2409f480";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setWeather({
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          city: data.name,
          country: data.sys.country,
          icon: data.weather[0].icon,
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch weather data");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div
      style={{
        maxWidth: 450,
        margin: "50px auto",
        padding: "30px 25px",
        borderRadius: 15,
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        color: "#333",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 30, color: "#0d47a1" }}>
        Weather App
      </h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            flexGrow: 1,
            padding: "10px 15px",
            borderRadius: 25,
            border: "none",
            outline: "none",
            fontSize: 16,
          }}
        />
        <button
          onClick={fetchWeather}
          style={{
            padding: "10px 20px",
            borderRadius: 25,
            border: "none",
            backgroundColor: "#0d47a1",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(13, 71, 161, 0.5)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#093973")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0d47a1")}
        >
          Get Weather
        </button>
      </div>

      {error && (
        <p style={{ color: "#b71c1c", fontWeight: "bold", textAlign: "center" }}>
          {error.charAt(0).toUpperCase() + error.slice(1)}
        </p>
      )}

      {weather && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            borderRadius: 20,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2>
            {weather.city}, {weather.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
            alt={weather.description}
            style={{ width: 100, height: 100 }}
          />
          <p style={{ fontSize: 48, fontWeight: "bold", margin: "10px 0" }}>
            {Math.round(weather.temp)}°C
          </p>
          <p style={{ fontSize: 20, fontStyle: "italic", marginBottom: 10 }}>
            {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
          </p>
          <p>Feels Like: {Math.round(weather.feels_like)}°C</p>
          <p>Humidity: {weather.humidity} %</p>
          <p>Wind Speed: {weather.wind} m/s</p>
        </div>
      )}
      <footer style={{ marginTop: 40, fontSize: 14, color: "#555", textAlign: "center" }}>
        Powered by OpenWeatherMap API
      </footer>
    </div>
  );
};

export default WeatherApp;
