// Spotlight effect on hover
const cardContainer = document.getElementById('card-container');

cardContainer.addEventListener('mousemove', (e) => {
  const rect = cardContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  cardContainer.style.setProperty('--mouseX', `${x}px`);
  cardContainer.style.setProperty('--mouseY', `${y}px`);
});

// Array of quotes
const quotes = [
  "Ozone is essential for life on Earth.",
  "Help save the ozone by making eco-friendly choices.",
  "Protect the ozone today for a better tomorrow.",
  "The ozone layer is Earth's natural sunscreen.",
  "Every little step counts in protecting our ozone.",
  "A healthier planet starts with protecting the ozone."
];

// Function to display a random quote
function displayRandomQuote() {
  const quoteElement = document.getElementById("quote");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteElement.textContent = quotes[randomIndex];
}

// Call the function when the page loads
window.onload = displayRandomQuote;

function startQuiz() {
  window.location.href = "quiz.html";
}

const API_KEY = '51e5f115b96013be9ce21e45d627051d'; // Replace with your actual OpenWeatherMap API key

async function getAirQuality(lat, lon) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    return null;
  }
}

function getAQIDescription(aqi) {
  const descriptions = [
    'Good',
    'Fair',
    'Moderate',
    'Poor',
    'Very Poor'
  ];
  return descriptions[aqi - 1] || 'Unknown';
}

function displayAirQuality(data) {
  const container = document.getElementById('air-quality-container');
  container.innerHTML = '';

  if (data && data.list && data.list[0]) {
    const aqi = data.list[0].main.aqi;
    const components = data.list[0].components['o3'];

    const aqiCard = document.createElement('div');
    aqiCard.className = 'aqi-card';
    aqiCard.innerHTML = `
      <h3>Ozone Quality</h3>
      <div class="aqi-value">${components}</div>
      <div class="aqi-description">${getAQIDescription(aqi)}</div>
    `;
    container.appendChild(aqiCard);

    for (const [key, value] of Object.entries(components)) {
      const componentCard = document.createElement('div');
      componentCard.className = 'aqi-card';
      componentCard.innerHTML = `
        <h3>${key.toUpperCase()}</h3>
        <div class="aqi-value">${value.toFixed(2)}</div>
        <div class="aqi-description">μg/m³</div>
      `;
      container.appendChild(componentCard);
    }
  } else {
    container.innerHTML = '<p>Unable to fetch air quality data. Please try again later.</p>';
  }
}

// Function to get user's location and fetch air quality data
function getUserLocationAndAirQuality() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const airQualityData = await getAirQuality(latitude, longitude);
        displayAirQuality(airQualityData);
      },
      (error) => {
        console.error('Error getting user location:', error);
        document.getElementById('air-quality-container').innerHTML = '<p>Unable to get your location. Please enable location services and try again.</p>';
      }
    );
  } else {
    document.getElementById('air-quality-container').innerHTML = '<p>Geolocation is not supported by your browser. Unable to fetch local air quality data.</p>';
  }
}

// Call the function when the page loads
window.onload = () => {
  displayRandomQuote();
  getUserLocationAndAirQuality();
};