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