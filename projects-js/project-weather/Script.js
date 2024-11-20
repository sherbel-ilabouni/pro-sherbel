const countriesData = {
  "תל אביב": {
    country: "ישראל",
    flag: "🇮🇱",
    timezone: "Asia/Jerusalem",
    coordinates: [32.0853, 34.7818],
    weather: {
      temp: 28,
      feelsLike: 30,
      condition: "שמשי",
      icon: "☀️",
      humidity: 65,
      windSpeed: 12,
      rainfall: 0,
    },
  },
  "ניו יורק": {
    country: 'ארה"ב',
    flag: "🇺🇸",
    timezone: "America/New_York",
    coordinates: [40.7128, -74.006],
    weather: {
      temp: 22,
      feelsLike: 24,
      condition: "שמשי",
      icon: "☀️",
      humidity: 65,
      windSpeed: 12,
      rainfall: 0,
    },
  },
  לונדון: {
    country: "בריטניה",
    flag: "🇬🇧",
    timezone: "Europe/London",
    coordinates: [51.5074, -0.1278],
    weather: {
      temp: 18,
      feelsLike: 17,
      condition: "מעונן",
      icon: "☁️",
      humidity: 75,
      windSpeed: 15,
      rainfall: 2.5,
    },
  },
  טוקיו: {
    country: "יפן",
    flag: "🇯🇵",
    timezone: "Asia/Tokyo",
    coordinates: [35.6762, 139.6503],
    weather: {
      temp: 25,
      feelsLike: 27,
      condition: "גשום",
      icon: "🌧️",
      humidity: 80,
      windSpeed: 8,
      rainfall: 15,
    },
  },
  פריז: {
    country: "צרפת",
    flag: "🇫🇷",
    timezone: "Europe/Paris",
    coordinates: [48.8566, 2.3522],
    weather: {
      temp: 20,
      feelsLike: 21,
      condition: "מעונן חלקית",
      icon: "⛅",
      humidity: 70,
      windSpeed: 10,
      rainfall: 0,
    },
  },
  סידני: {
    country: "אוסטרליה",
    flag: "🇦🇺",
    timezone: "Australia/Sydney",
    coordinates: [-33.8688, 151.2093],
    weather: {
      temp: 23,
      feelsLike: 25,
      condition: "נאה",
      icon: "🌤️",
      humidity: 65,
      windSpeed: 18,
      rainfall: 0,
    },
  },
  דובאי: {
    country: "איחוד האמירויות",
    flag: "🇦🇪",
    timezone: "Asia/Dubai",
    coordinates: [25.2048, 55.2708],
    weather: {
      temp: 38,
      feelsLike: 42,
      condition: "שמשי",
      icon: "🌞",
      humidity: 45,
      windSpeed: 14,
      rainfall: 0,
    },
  },
  מוסקבה: {
    country: "רוסיה",
    flag: "🇷🇺",
    timezone: "Europe/Moscow",
    coordinates: [55.7558, 37.6173],
    weather: {
      temp: 15,
      feelsLike: 13,
      condition: "מושלג",
      icon: "🌨️",
      humidity: 85,
      windSpeed: 20,
      rainfall: 8,
    },
  },
  ברלין: {
    country: "גרמניה",
    flag: "🇩🇪",
    timezone: "Europe/Berlin",
    coordinates: [52.52, 13.405],
    weather: {
      temp: 19,
      feelsLike: 20,
      condition: "מעונן חלקית",
      icon: "⛅",
      humidity: 70,
      windSpeed: 15,
      rainfall: 0,
    },
  },
  בנגקוק: {
    country: "תאילנד",
    flag: "🇹🇭",
    timezone: "Asia/Bangkok",
    coordinates: [13.7563, 100.5018],
    weather: {
      temp: 32,
      feelsLike: 35,
      condition: "גשום",
      icon: "🌧️",
      humidity: 85,
      windSpeed: 8,
      rainfall: 20,
    },
  },
  קהיר: {
    country: "מצרים",
    flag: "🇪🇬",
    timezone: "Africa/Cairo",
    coordinates: [30.0444, 31.2357],
    weather: {
      temp: 33,
      feelsLike: 35,
      condition: "שמשי",
      icon: "☀️",
      humidity: 40,
      windSpeed: 16,
      rainfall: 0,
    },
  },
  רומא: {
    country: "איטליה",
    flag: "🇮🇹",
    timezone: "Europe/Rome",
    coordinates: [41.9028, 12.4964],
    weather: {
      temp: 24,
      feelsLike: 26,
      condition: "שמשי",
      icon: "☀️",
      humidity: 60,
      windSpeed: 10,
      rainfall: 0,
    },
  },
  מדריד: {
    country: "ספרד",
    flag: "🇪🇸",
    timezone: "Europe/Madrid",
    coordinates: [40.4168, -3.7038],
    weather: {
      temp: 26,
      feelsLike: 28,
      condition: "שמשי",
      icon: "☀️",
      humidity: 55,
      windSpeed: 12,
      rainfall: 0,
    },
  },
  אמסטרדם: {
    country: "הולנד",
    flag: "🇳🇱",
    timezone: "Europe/Amsterdam",
    coordinates: [52.3676, 4.9041],
    weather: {
      temp: 18,
      feelsLike: 17,
      condition: "גשום",
      icon: "🌧️",
      humidity: 80,
      windSpeed: 22,
      rainfall: 5,
    },
  },
  סיאול: {
    country: "דרום קוריאה",
    flag: "🇰🇷",
    timezone: "Asia/Seoul",
    coordinates: [37.5665, 126.978],
    weather: {
      temp: 24,
      feelsLike: 26,
      condition: "מעונן חלקית",
      icon: "⛅",
      humidity: 65,
      windSpeed: 12,
      rainfall: 0,
    },
  },
  טורונטו: {
    country: "קנדה",
    flag: "🇨🇦",
    timezone: "America/Toronto",
    coordinates: [43.6532, -79.3832],
    weather: {
      temp: 15,
      feelsLike: 14,
      condition: "מושלג",
      icon: "🌨️",
      humidity: 75,
      windSpeed: 20,
      rainfall: 10,
    },
  },
  "ריו דה ז׳נרו": {
    country: "ברזיל",
    flag: "🇧🇷",
    timezone: "America/Sao_Paulo",
    coordinates: [-22.9068, -43.1729],
    weather: {
      temp: 28,
      feelsLike: 30,
      condition: "שמשי",
      icon: "☀️",
      humidity: 70,
      windSpeed: 10,
      rainfall: 0,
    },
  },
  אתונה: {
    country: "יוון",
    flag: "🇬🇷",
    timezone: "Europe/Athens",
    coordinates: [37.9838, 23.7275],
    weather: {
      temp: 27,
      feelsLike: 29,
      condition: "שמשי",
      icon: "☀️",
      humidity: 60,
      windSpeed: 15,
      rainfall: 0,
    },
  },
  סטוקהולם: {
    country: "שוודיה",
    flag: "🇸🇪",
    timezone: "Europe/Stockholm",
    coordinates: [59.3293, 18.0686],
    weather: {
      temp: 16,
      feelsLike: 15,
      condition: "מעונן",
      icon: "☁️",
      humidity: 70,
      windSpeed: 18,
      rainfall: 2,
    },
  },
  מומבאי: {
    country: "הודו",
    flag: "🇮🇳",
    timezone: "Asia/Kolkata",
    coordinates: [19.076, 72.8777],
    weather: {
      temp: 31,
      feelsLike: 34,
      condition: "גשום",
      icon: "🌧️",
      humidity: 85,
      windSpeed: 12,
      rainfall: 25,
    },
  },
};

// יצירת המפה
const map = L.map("map").setView([30, 0], 2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// הוספת סמנים למפה
Object.entries(countriesData).forEach(([city, data]) => {
  if (data.coordinates) {
    const marker = L.marker(data.coordinates)
      .bindPopup(
        `
                        <div class="map-popup">
                            <div>${data.flag}</div>
                            <div class="map-popup-temp">${data.weather.temp}°C</div>
                            <div class="map-popup-city">${city}</div>
                        </div>
                    `
      )
      .addTo(map);

    marker.on("click", () => {
      countrySelect.value = city;
      updateWeather(city);
    });
  }
});

const countrySelect = document.getElementById("countrySelect");

// מילוי רשימת המדינות
Object.entries(countriesData).forEach(([city, data]) => {
  const option = document.createElement("option");
  option.value = city;
  option.textContent = `${data.flag} ${city}, ${data.country}`;
  countrySelect.appendChild(option);
});

function getLocalTime(timezone) {
  return new Date().toLocaleTimeString("he-IL", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
  });
}

function updateWeather(city) {
  const data = countriesData[city];
  if (!data) return;

  // עדכון פרטי המיקום
  document.getElementById("countryFlag").textContent = data.flag;
  document.getElementById(
    "locationName"
  ).textContent = `${city}, ${data.country}`;
  document.getElementById("localTime").textContent = getLocalTime(
    data.timezone
  );

  // עדכון נתוני מזג האוויר
  document.getElementById("temperature").textContent = `${data.weather.temp}°`;
  document.getElementById("weatherIcon").textContent = data.weather.icon;
  document.getElementById("weatherCondition").textContent =
    data.weather.condition;
  document.getElementById("humidity").textContent = `${data.weather.humidity}%`;
  document.getElementById(
    "windSpeed"
  ).textContent = `${data.weather.windSpeed} קמ"ש`;
  document.getElementById(
    "rainfall"
  ).textContent = `${data.weather.rainfall} מ"מ`;
  document.getElementById(
    "feelsLike"
  ).textContent = `${data.weather.feelsLike}°`;

  // התמקדות במפה
  if (data.coordinates) {
    map.setView(data.coordinates, 6);
  }
}

// מאזין אירועים לשינוי בחירת מדינה
countrySelect.addEventListener("change", (e) => {
  updateWeather(e.target.value);
});

// עדכון שעה כל דקה
setInterval(() => {
  if (countrySelect.value) {
    document.getElementById("localTime").textContent = getLocalTime(
      countriesData[countrySelect.value].timezone
    );
  }
}, 60000);
