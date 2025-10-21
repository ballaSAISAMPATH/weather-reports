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
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          timezone: data.timezone,
          date: new Date((data.dt + data.timezone) * 1000),
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

  const formatDate = (date) =>
    date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  const formatTime = (date) =>
    date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        padding: 40,
        background:
          "linear-gradient(145deg, #536976 0%, #292e49 100%)",
        boxSizing: "border-box",
        color: "#e0e6f1",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto"
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          borderRadius: 20,
          backgroundColor: "rgba(57, 66, 99, 0.9)",
          padding: 30,
          boxShadow: "0 15px 40px rgba(0,0,0,0.8)",
          display: "flex",
          flexDirection: "column",
          minHeight: "80vh",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: 30,
            fontWeight: "900",
            fontSize: 34,
            userSelect: "none",
          }}
        >
          Weather Forecast
        </h1>
        <div style={{ display: "flex", gap: 15, marginBottom: 25 }}>
          <input
            type="text"
            placeholder="Enter city"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              flex: 1,
              padding: "14px 20px",
              borderRadius: 30,
              border: "none",
              outline: "none",
              fontSize: 18,
              boxShadow: "inset 3px 3px 6px #4a5270, inset -3px -3px 6px #5e6a92",
              backgroundColor: "#42506c",
              color: "#f0f4ff",
            }}
          />
          <button
            onClick={fetchWeather}
            style={{
              padding: "14px 28px",
              borderRadius: 30,
              border: "none",
              backgroundColor: "#f76c6c",
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              cursor: "pointer",
              boxShadow: "0 6px 12px rgba(247,108,108,0.7)",
              transition: "background-color 0.25s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f82a2a")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#f76c6c")}
          >
            Get Weather
          </button>
        </div>

        {error && (
          <p
            style={{
              backgroundColor: "#f44336",
              padding: "10px 15px",
              borderRadius: 12,
              color: "white",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: 20,
              userSelect: "none",
            }}
          >
            {error.charAt(0).toUpperCase() + error.slice(1)}
          </p>
        )}

        {weather && (
          <div
            style={{
              backgroundColor: "#2c355f",
              borderRadius: 20,
              padding: 25,
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              color: "#dde4fc",
              userSelect: "none",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: 30, fontWeight: "bold" }}>
                {weather.city}, {weather.country}
              </h2>
              <p style={{ fontSize: 16, fontWeight: "500", marginTop: 4 }}>
                {formatDate(weather.date)} | Local Time: {formatTime(weather.date)}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 30,
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  backgroundColor: "#f7b733",
                  borderRadius: "50%",
                  width: 140,
                  height: 140,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 8px 20px #f7b733aa",
                }}
              >
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                  alt={weather.description}
                  style={{ width: 100, height: 100 }}
                  draggable={false}
                />
              </div>

              <div style={{ color: "#fff", textAlign: "left" }}>
                <p style={{ fontSize: 50, margin: 0, fontWeight: "900" }}>
                  {Math.round(weather.temp)}°C
                </p>
                <p style={{ fontSize: 22, fontStyle: "italic", marginTop: 6 }}>
                  {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
                </p>
                <p style={{ marginTop: 20 }}>
                  Feels Like: <b>{Math.round(weather.feels_like)}°C</b>
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                fontSize: 18,
                color: "#d1d9ff",
              }}
            >
              <div>
                <p>Humidity</p>
                <p style={{ fontWeight: "bold", fontSize: 20 }}>{weather.humidity}%</p>
              </div>
              <div>
                <p>Wind Speed</p>
                <p style={{ fontWeight: "bold", fontSize: 20 }}>{weather.wind} m/s</p>
              </div>
              <div>
                <p>Sunrise</p>
                <p style={{ fontWeight: "bold", fontSize: 20 }}>
                  {formatTime(new Date((weather.sunrise + weather.timezone) * 1000))}
                </p>
              </div>
              <div>
                <p>Sunset</p>
                <p style={{ fontWeight: "bold", fontSize: 20 }}>
                  {formatTime(new Date((weather.sunset + weather.timezone) * 1000))}
                </p>
              </div>
            </div>
          </div>
        )}

        <footer
          style={{
            marginTop: 40,
            fontSize: 14,
            color: "#8391a1",
            textAlign: "center",
            userSelect: "none",
          }}
        >
          Powered by{" "}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#f76c6c", textDecoration: "none", fontWeight: "bold" }}
          >
            OpenWeatherMap
          </a>
        </footer>
      </div>
    </div>
  );
};

export default WeatherApp;
