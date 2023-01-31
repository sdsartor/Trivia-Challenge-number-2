

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainer = document.getElementById('question-container')
const question = document.getElementById('question')
const answerselections = document.getElementById('answerselection')

let shuffledQuestions, currentQuestionIndex


function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
      seconds = parseInt(timer % 60, 10);

      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
          timer = duration;
      }
  }, 1000);
}

window.onload = function () {
  var oneminute = 60 * 10,
      display = document.querySelector('#time');
  startTimer(oneminute, display);
 
};

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainer.classList.remove('hide')
  setNextQuestion()
}


function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  console.log(question)
  question.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerselections.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answers.firstChild) {
    answerselections.removeChild(answer.firstChild)
  }
}

function selectAnswer(l) {
  const selectedButton = l.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerselections.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


const questions = [
  {
    question: 'Commonly used data types DO NOT include:',
    answers: [
      { text: 'strings', correct: false},
      { text: 'booleans', correct: false},
      { text: 'alerts', correct: true},
      { text: 'numbers', correct: false}
    ]
  },
  {
    question: 'The condition in an if / else statement is enclosed within ____.',
    answers: [
      { text: 'parentheses', correct: true},
      { text: 'curly brackets', correct: false},
      { text: 'square brackets', correct: false},
      { text: 'quotes', correct: false}
    ]
  },
  {
    question: 'Arrays in JavaScript can be used to store ____.',
    answers:[
    { text: 'numbers and strings', correct: false},
    { text: 'other arrays', correct: false},
    { text: 'booleans', correct: false},
    { text: 'all of the above', correct: true}
    ]
  },
  {
    question:
      'String values must be enclosed within ____ when being assigned to variables.',
    answers: [
    { text: 'commas', correct: false},
    { text: 'curly brackets', correct: false},
    { text: 'quotes', correct: true},
    { text: 'parentheses', correct: false}
    ]
  },
  {
    question:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    answers: [
    { text: 'JavaScript', correct: false},
    { text: 'terminal / bash', correct: false},
    { text: 'for loops', correct: false},
    { text: 'console.log', correct: true}
    ]
  },
]
 