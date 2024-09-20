const quizData = [
  {
    question: "What is the primary cause of ozone depletion?",
    options: ["Carbon dioxide", "Chlorofluorocarbons (CFCs)", "Methane", "Nitrous oxide"],
    correctAnswer: 1,
    explanation: "Chlorofluorocarbons (CFCs) are the primary cause of ozone depletion. When CFCs reach the stratosphere, they are broken down by ultraviolet radiation, releasing chlorine atoms that destroy ozone molecules."
  },
  {
    question: "Which international treaty was established to protect the ozone layer?",
    options: ["Kyoto Protocol", "Montreal Protocol", "Paris Agreement", "Vienna Convention"],
    correctAnswer: 1,
    explanation: "The Montreal Protocol, signed in 1987, is an international treaty designed to protect the ozone layer by phasing out the production of numerous substances responsible for ozone depletion."
  },
  {
    question: "In which layer of the atmosphere is the ozone layer located?",
    options: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"],
    correctAnswer: 1,
    explanation: "The ozone layer is located in the stratosphere, which is the second major layer of Earth's atmosphere, lying above the troposphere and below the mesosphere."
  },
  {
    question: "What is the main function of the ozone layer?",
    options: ["Regulate temperature", "Filter UV radiation", "Produce oxygen", "Control air pressure"],
    correctAnswer: 1,
    explanation: "The main function of the ozone layer is to filter out harmful ultraviolet (UV) radiation from the sun, protecting life on Earth from its harmful effects."
  },
  {
    question: "Which of the following is NOT a consequence of ozone depletion?",
    options: ["Increased UV radiation", "Skin cancer", "Global warming", "Damage to marine ecosystems"],
    correctAnswer: 2,
    explanation: "While ozone depletion and global warming are both environmental issues, they are separate problems. Ozone depletion doesn't directly cause global warming. The other options are direct consequences of ozone depletion."
  },
  {
    question: "When was the ozone hole over Antarctica first discovered?",
    options: ["1950s", "1970s", "1980s", "1990s"],
    correctAnswer: 2,
    explanation: "The ozone hole over Antarctica was first discovered in the 1980s. Specifically, it was reported in a paper by British Antarctic Survey scientists in 1985."
  },
  {
    question: "Which gas has replaced CFCs in many applications to help protect the ozone layer?",
    options: ["Hydrofluorocarbons (HFCs)", "Carbon dioxide", "Methane", "Nitrogen"],
    correctAnswer: 0,
    explanation: "Hydrofluorocarbons (HFCs) have replaced CFCs in many applications. While they don't deplete the ozone layer, they are potent greenhouse gases and are now also being phased out."
  },
  {
    question: "What percentage of the ozone layer was estimated to be depleted by the 1990s?",
    options: ["About 1-3%", "About 5-6%", "About 10-12%", "About 20-25%"],
    correctAnswer: 1,
    explanation: "By the 1990s, it was estimated that about 5-6% of the ozone layer had been depleted globally, with much higher percentages in certain areas, particularly over the poles."
  },
  {
    question: "Which of these everyday products historically contained ozone-depleting substances?",
    options: ["Light bulbs", "Refrigerators", "Batteries", "Plastic bags"],
    correctAnswer: 1,
    explanation: "Refrigerators historically contained CFCs as refrigerants. CFCs were also used in air conditioners, aerosol sprays, and as blowing agents for foams and packing materials."
  },
  {
    question: "By which year do scientists predict the ozone layer could recover to 1980 levels?",
    options: ["2030", "2050", "2070", "2100"],
    correctAnswer: 1,
    explanation: "Scientists predict that with continued adherence to the Montreal Protocol, the ozone layer could recover to 1980 levels by around 2050 over much of the planet, and by 2070 over the poles."
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function loadQuestion() {
  const questionData = quizData[currentQuestion];
  document.getElementById('question-number').textContent = `Question ${currentQuestion + 1}`;
  document.getElementById('question-text').textContent = questionData.question;
  
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';
  questionData.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.onclick = () => selectAnswer(index);
    optionElement.innerHTML = `
      <span class="option-btn"></span>
      <span class="option-text">${option}</span>
    `;
    optionsContainer.appendChild(optionElement);
  });

  selectedAnswer = null;
  document.getElementById('explanation').style.display = 'none';
  updateActionButton();
}

function selectAnswer(index) {
  const options = document.querySelectorAll('.option');
  options.forEach((option, i) => {
    if (i === index) {
      option.classList.add('selected');
    } else {
      option.classList.remove('selected');
    }
  });
  selectedAnswer = index;
  updateActionButton();
}

function updateActionButton() {
  const actionButton = document.getElementById('action-btn');
  if (document.getElementById('explanation').style.display === 'block') {
    actionButton.textContent = currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question';
  } else {
    actionButton.textContent = 'Submit Answer';
  }
  actionButton.disabled = selectedAnswer === null && actionButton.textContent === 'Submit Answer';
}

function handleAction() {
  const actionButton = document.getElementById('action-btn');
  if (actionButton.textContent === 'Submit Answer') {
    showExplanation();
  } else if (actionButton.textContent === 'Next Question') {
    currentQuestion++;
    loadQuestion();
  } else {
    showResult();
  }
}

function showExplanation() {
const questionData = quizData[currentQuestion];
const explanationElement = document.getElementById('explanation');
explanationElement.style.display = 'block';

const selectedOption = document.querySelector('.option.selected');

if (selectedAnswer === questionData.correctAnswer) {
score++;
explanationElement.innerHTML = `<p class="correct">Correct!</p>`;
selectedOption.classList.add('correct'); // Add 'correct' class to the selected option
} else {
explanationElement.innerHTML = `<p class="incorrect">Incorrect. The correct answer is: ${questionData.options[questionData.correctAnswer]}.</p>`;
selectedOption.classList.add('incorrect'); // Add 'incorrect' class to the selected option

// Highlight the correct option with tick mark
const correctOption = document.querySelectorAll('.option')[questionData.correctAnswer];
correctOption.classList.add('correct'); // Add 'correct' class to the correct option
}

explanationElement.innerHTML += `<p>${questionData.explanation}</p>`;

updateActionButton();
}



function showResult() {
document.getElementById('quiz-content').style.display = 'none';
document.getElementById('result-container').style.display = 'block';

const correctCount = document.getElementById('correct-count');
const totalQuestions = document.getElementById('total-questions');
const suggestionsList = document.getElementById('suggestions-list');

correctCount.textContent = score;
totalQuestions.textContent = quizData.length;

// Display tips based on the score
const tips = getTipsBasedOnScore(score);
suggestionsList.innerHTML =  tips;

// Draw marks out of 10 in circular progress
drawMarksCircle(score, quizData.length);


}

function getTipsBasedOnScore(score) {
if (score === quizData.length) {
return `
  <li class="suggestion">Excellent! You have a great understanding of ozone depletion.</li>
  <li class="suggestion">Continue spreading awareness to others about the importance of protecting the ozone layer.</li>
  <li class="suggestion">Consider supporting initiatives that aim to reduce ozone-depleting substances.</li>
`;
} else if (score >= quizData.length * 0.7) {
return `
  <li class="suggestion">Good job! You have a solid understanding of ozone depletion.</li>
  <li class="suggestion">Stay informed about environmental treaties and participate in eco-friendly activities.</li>
  <li class="suggestion">Reduce the use of products that release harmful chemicals into the atmosphere.</li>
`;
} else if (score >= quizData.length * 0.4) {
return `
  <li class="suggestion">You're on the right track, but there’s more to learn.</li>
  <li class="suggestion">Try to research more about the impacts of ozone depletion.</li>
  <li class="suggestion">Start using ozone-friendly products, such as those that do not contain CFCs or HFCs.</li>
`;
} else {
return `
  <li class="suggestion">It seems like you could benefit from learning more about ozone depletion.</li>
  <li class="suggestion">Consider reading articles or watching documentaries on the effects of ozone-depleting substances.</li>
  <li class="suggestion">Switch to eco-friendly products and encourage others to do the same.</li>
`;
}
}

// Update to draw marks instead of percentage
function drawMarksCircle(score, totalQuestions) {
const canvas = document.getElementById('scoreCanvas');
const ctx = canvas.getContext('2d');
const radius = canvas.width / 2;
const lineWidth = 10;

ctx.clearRect(0, 0, canvas.width, canvas.height);

// Background circle
ctx.beginPath();
ctx.arc(radius, radius, radius - lineWidth, 0, 2 * Math.PI);
ctx.strokeStyle = '#1a1a1a';
ctx.lineWidth = lineWidth;
ctx.stroke();

// Foreground progress circle
const endAngle = (score / totalQuestions) * 2 * Math.PI;
ctx.beginPath();
ctx.arc(radius, radius, radius - lineWidth, -Math.PI / 2, endAngle - Math.PI / 2);
ctx.strokeStyle = '#4CAF50';
ctx.lineWidth = lineWidth;
ctx.stroke();

// Marks text (x/10)
ctx.font = '24px Arial';
ctx.fillStyle = 'white';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText(`${score}/${totalQuestions}`, radius, radius); // Display score out of total
}


function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById('quiz-content').style.display = 'block';
  document.getElementById('result-container').style.display = 'none';
  loadQuestion();
}

// Start the quiz
loadQuestion();