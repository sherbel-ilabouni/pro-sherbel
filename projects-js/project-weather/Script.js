        const API_KEY = "d2a68009cacf0c91bbb5c0fb53c8f5c5";
        const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;
        let timeInterval;
        let map;
        let marker;

        function initMap() {
            if (!map) {
                map = L.map('map').setView([0, 0], 2);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '© OpenStreetMap contributors'
                }).addTo(map);
            }
        }

        function updateMap(lat, lon, cityName) {
            if (!map) {
                initMap();
            }

            if (marker) {
                map.removeLayer(marker);
            }

            map.setView([lat, lon], 13);
            marker = L.marker([lat, lon])
                .addTo(map)
                .bindPopup(cityName)
                .openPopup();

            const mapContainer = document.getElementById('mapContainer');
            mapContainer.style.display = 'block';

            setTimeout(() => {
                mapContainer.classList.add('visible');
                map.invalidateSize();
            }, 10);
        }

        function updateLocalTime(timezone) {
            if (timeInterval) {
                clearInterval(timeInterval);
            }

            function updateTime() {
                const localDate = new Date();
                const cityTime = new Date(localDate.getTime() + (timezone * 1000) + (localDate.getTimezoneOffset() * 60000));

                const timeElement = document.querySelector('#localTime .time');
                const dateElement = document.querySelector('#localTime .date');

                timeElement.textContent = cityTime.toLocaleTimeString('he-IL', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });

                dateElement.textContent = cityTime.toLocaleDateString('he-IL', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }

            updateTime();
            timeInterval = setInterval(updateTime, 1000);
        }

        async function getWeather(city) {
            const weatherInfo = document.getElementById('weatherInfo');
            const mapContainer = document.getElementById('mapContainer');

            weatherInfo.style.display = 'none';
            weatherInfo.classList.remove('visible');
            mapContainer.style.display = 'none';
            mapContainer.classList.remove('visible');

            try {
                document.getElementById('errorMessage').textContent = '';

                if (!city) {
                    throw new Error('אנא הכנס שם עיר');
                }

                const response = await fetch(WEATHER_API_URL + city);
                if (!response.ok) {
                    throw new Error('העיר לא נמצאה');
                }

                const data = await response.json();

                document.getElementById('city').textContent = data.name;
                document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
                document.getElementById('description').textContent = data.weather[0].description;
                document.getElementById('humidity').textContent = `${data.main.humidity}%`;
                document.getElementById('wind').textContent = `${Math.round(data.wind.speed)} m/s`;
                document.getElementById('feels-like').textContent = `${Math.round(data.main.feels_like)}°C`;
                document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;

                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                document.getElementById('weatherIcon').src = iconUrl;

                updateLocalTime(data.timezone);
                updateMap(data.coord.lat, data.coord.lon, data.name);

                weatherInfo.style.display = 'block';
                setTimeout(() => {
                    weatherInfo.classList.add('visible');
                }, 10);

            } catch (error) {
                document.getElementById('errorMessage').textContent = error.message;
                weatherInfo.style.display = 'none';
                mapContainer.style.display = 'none';
                if (timeInterval) {
                    clearInterval(timeInterval);
                }
            }
        }

        document.getElementById('inputCity').addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                getWeather(this.value);
            }
        });

        // אתחול המפה בטעינת הדף
        document.addEventListener('DOMContentLoaded', initMap);
