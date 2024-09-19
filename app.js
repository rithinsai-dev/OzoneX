function submitQuiz() {
    const totalQuestions = 3;
    let score = 0;
  
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
  
    if (q1 && q1.value === 'correct') score++;
    if (q2 && q2.value === 'correct') score++;
    if (q3 && q3.value === 'correct') score++;
  
    const percentage = (score / totalQuestions) * 100;
    document.getElementById('score').textContent = `${percentage}%`;
  
    let feedback = '';
    if (percentage === 100) {
      feedback = 'Excellent! You are very informed about ozone protection. Keep up the great work!';
    } else if (percentage >= 66) {
      feedback = 'Good job! You know a lot, but there’s always room to learn more. Consider reducing aerosol use and saving energy.';
    } else {
      feedback = 'It looks like you need to learn more about protecting the ozone. Avoid products with CFCs and conserve energy wherever possible.';
    }
  
    document.getElementById('feedback').textContent = feedback;
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
  }
  
  function restartQuiz() {
    document.getElementById('quiz-form').reset();
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('result-container').classList.add('hidden');
  }
  