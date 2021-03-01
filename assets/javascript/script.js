const start = document.getElementById('start')
const questionContainerEl = document.getElementById('questionContainer')
const questionEl = document.getElementById('question')
const answerButtonEl = document.getElementById('answerButtons')
const questionNumber = document.getElementById('questionNumber')
const highScores = document.getElementById('highScores')
const quizScore = document.getElementById('quizScore')
const result = document.getElementById('correct')
const submitScoreEl = document.getElementById('submitScore')
const scoreNameInput = document.querySelector('#scoreName')

start.addEventListener('click', startGame)
submitScoreEl.addEventListener('click', submitScore)

let score = 0
let shuffledQuestions, CurrentQuestionIndex

function startGame() {
    score = 0
    start.classList.add('hide')
    questionContainerEl.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    CurrentQuestionIndex = 0
    nextQuestion()
}

function nextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[CurrentQuestionIndex])
}

function showQuestion(question) {
    questionNumber.textContent = `Question ${CurrentQuestionIndex+1}`
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonEl.appendChild(button)
    })

}

function resetState() {
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    console.log(correct)
    if (correct) {
        score++;
        result.textContent = "Correct!"
        result.classList.remove('hide')
     } else {
        result.textContent = "Incorrect"
        result.classList.remove('hide')
     }
    setStatusClass(document.body, correct)
    Array.from(answerButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
      })
    if (shuffledQuestions.length > CurrentQuestionIndex +1) {
        CurrentQuestionIndex++
        nextQuestion()
    } else {
        result.classList.add('hide')
        quizOver()
    }

}

function quizOver() {
    questionContainerEl.classList.add('hide')
    quizScore.textContent = `You have a score of ${score}`
    highScores.classList.remove('hide')

}
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function submitScore (event) {
    event.preventDefault();
    let user = {
        scoreName: scoreNameInput.value.trim(),
        score: score
    }

    localStorage.setItem('user', JSON.stringify(user))
}






















const questions = [
    {
        question:`What does HTML stand for?`,
        answers: [
            { text: `Home Tool Markup Language`, correct: false},
            { text: `Hyper Text Markup Language`, correct: true},
            { text: `Hyperlinks and Text Markup Language`, correct: false},
            { text: `Hit me baby one more time!`, correct: false}
        ]
    },
    {
        question:`Who is making the Web standards?`,
        answers: [
            { text: `Google`, correct: true},
            { text: `Microsoft`, correct: false},
            { text: `Brian Duimstra`, correct: false},
            { text: `The World Wide Web Consortium`, correct: false}
        ]
    },
    {
        question:`How can you open a link in a new tab/browser window?`,
        answers: [
            { text: `<a href = "url"new>`, correct: true},
            { text: `<a href = "url" target="new">`, correct: false},
            { text: `<a href="url" target="_blank">`, correct: false},
            { text: `<a href="url" target="Bonkers"`, correct: false}
        ]
    },
    {
        question:`Who is making the Web standards?`,
        answers: [
            { text: `Google`, correct: true},
            { text: `Microsoft`, correct: false},
            { text: `Brian Duimstra`, correct: false},
            { text: `The World Wide Web Consortium`, correct: false}
        ]
    },
    {
        question:`Who is making the Web standards?`,
        answers: [
            { text: `Google`, correct: true},
            { text: `Microsoft`, correct: false},
            { text: `Brian Duimstra`, correct: false},
            { text: `The World Wide Web Consortium`, correct: false}
        ]
    },
    {
        question:`Who is making the Web standards?`,
        answers: [
            { text: `Google`, correct: true},
            { text: `Microsoft`, correct: false},
            { text: `Brian Duimstra`, correct: false},
            { text: `The World Wide Web Consortium`, correct: false}
        ]
    },
]