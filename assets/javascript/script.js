const start = document.getElementById('start')
const questionContainerEl = document.getElementById('questionContainer')
const questionEl = document.getElementById('question')
const answerButtonEl = document.getElementById('answerButtons')
const questionNumber = document.getElementById('questionNumber')
const quizScore = document.getElementById('quizScore')
const result = document.getElementById('correct')
const submitScoreEl = document.getElementById('submitScore')
const scoreNameInput = document.querySelector('#scoreName')
const home = document.getElementById('title')
const highScores = document.getElementById('highScores')
const submission = document.getElementById('submission')
const clearScoresEl = document.getElementById('clearScore') 
const highScoresEl = document.getElementById('high')

home.addEventListener('click', goHome)
start.addEventListener('click', startGame)
submitScoreEl.addEventListener('click', submitScore)
highScoresEl.addEventListener('click', highscorePage)

let score = 0
let timer = 60
let shuffledQuestions, CurrentQuestionIndex, gameTime, timeRemaining

//lets user go back to the homepage of the quiz
function goHome() {
    start.classList.remove('hide')
    questionContainerEl.classList.add('hide')
    highScores.classList.add('hide')
    submission.classList.add('hide')
    quizTimer(false)
    document.getElementById('timer').innerText = timer
    score = 0
}

//brings user to the highscore page
function highscorePage() {
    start.classList.add('hide')
    quizScore.classList.add('hide')
    questionContainerEl.classList.add('hide')
    highScores.classList.remove('hide')
    submission.classList.add('hide')
    quizTimer(false)
    document.getElementById('timer').innerText = timer
    printHighscores()
    score = 0
}

//clears high score
clearScoresEl.addEventListener('click',() => {
    localStorage.removeItem('highscoreList')
    printHighscores()
}, false)

//sets up the HTML for 
function startGame() {
    timeRemaining = timer
    score = 0
    start.classList.add('hide')
    questionContainerEl.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    CurrentQuestionIndex = 0
    quizTimer(true)
    nextQuestion()

}

//runs the timer for the quiz
const quizTimer = (enable, penalty = 0) => {
    clearInterval(gameTime)
    if (enable) {
        timeRemaining = timeRemaining - penalty
        if ( timeRemaining> 0 ){
            document.getElementById('timer').innerText = timeRemaining
            gameTime = setInterval( () => {
                timeRemaining -= 1
                document.getElementById('timer').innerText = timeRemaining
                if (timeRemaining <= 0 ) {
                    document.getElementById('timer').innerText = '0'
                    clearInterval(gameTime)
                    quizOver()
                }
            }, 1000)
        } else {
            document.getElementById('timer').innerText = '0'
            quizOver()
        } 

    }
}

//loads next question for the quiz
function nextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[CurrentQuestionIndex])
}

//brings up the next question in the list and displays the answers
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

//clears the answer pool
function resetState() {
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    }
}

//checks to see if the correct answer is chosen and tells the user if they are correct or incorrect
function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (correct) {
        score++;
        result.textContent = "Correct!"
        result.classList.remove('hide')
        setTimeout(() => {
            result.classList.add('hide')
        }, 1000); 
     } else {
        result.textContent = "Incorrect"
        quizTimer(true, 5)
        result.classList.remove('hide')
        setTimeout(() => {
            result.classList.add('hide')
        }, 1000); 
     }
    if (shuffledQuestions.length > CurrentQuestionIndex +1) {
        CurrentQuestionIndex++
        nextQuestion()
    } else {
        result.classList.add('hide')
        quizTimer(false)
        quizOver()
    }

}

//brings user to the high score page
function quizOver() {
    questionContainerEl.classList.add('hide')
    quizScore.textContent = `You have a score of ${score}`
    highScores.classList.remove('hide')
    quizScore.classList.remove('hide')
    printHighscores()
    if (score > 0){
    submission.classList.remove('hide')
    }
}

//lets user submit their high score
function submitScore () {
    userName = scoreNameInput.value.trim()

    if (userName && score > 0) {

        let scoreTable = JSON.parse(localStorage.getItem('highscoreList')) || []
        
        let finalScore = {
            name: userName,
            score
        }
        scoreTable.push(finalScore)
        scoreTable.sort(function(val1, val2){
            return val2.score - val1.score;
        })

        scoreTable = scoreTable.filter(function(score, index) {
            return index < 10;
        })
        localStorage.setItem("highscoreList", JSON.stringify(scoreTable))
    }
    quizScore.classList.add('hide')
    submission.classList.add('hide')
    printHighscores()
}

//prints the high scores on the high score page
function printHighscores() {
    let scoreTable = JSON.parse(localStorage.getItem('highscoreList')) || []
    if (scoreTable.length > 0 ){
    tableString = '<table><tr><th>Rank</th><th>Name</th><th>Score</th></tr>'
    for (var i = 0; i < scoreTable.length; i++) {
        tableString += `<tr><td>${i+1}</td><td>${scoreTable[i].name}</td><td>${scoreTable[i].score}</td></tr>`
    }

    document.getElementById('records').innerHTML =  tableString + '</table>' 
    } else {
        document.getElementById('records').textContent =  'No Scores Found'
    }
 }


const questions = [
    {
        question:`What does HTML stand for?1`,
        answers: [
            { text: `Home Tool Markup Language`, correct: false},
            { text: `Hyper Text Markup Language`, correct: true},
            { text: `Hyperlinks and Text Markup Language`, correct: false},
            { text: `Hit me baby one more time!`, correct: false}
        ]
    },
    {
        question:`Who is making the Web standards?2`,
        answers: [
            { text: `Google`, correct: false},
            { text: `Microsoft`, correct: false},
            { text: `Brian Duimstra`, correct: false},
            { text: `The World Wide Web Consortium`, correct: true}
        ]
    },
    {
        question:`How can you open a link in a new tab/browser window`,
        answers: [
            { text: `<a href = "url"new>`, correct: false},
            { text: `<a href = "url" target="new">`, correct: false},
            { text: `<a href="url" target="_blank">`, correct: true},
            { text: `<a href="url" target="Bonkers"`, correct: false}
        ]
    },
    {
        question:`Choose the correct HTML element for the largest heading:`,
        answers: [
            { text: `<h1>`, correct: true},
            { text: `<heading>`, correct: false},
            { text: `<h6>`, correct: false},
            { text: `<head>`, correct: false}
        ]
    },
    {
        question:`How can you make a numbered list?`,
        answers: [
            { text: `<dl>`, correct: false},
            { text: `<ol>`, correct: true},
            { text: `<list>`, correct: false},
            { text: `<ul>`, correct: false}
        ]
    },
    {
        question:`Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?`,
        answers: [
            { text: `londesc`, correct: false},
            { text: `src`, correct: false},
            { text: `alt`, correct: true},
            { text: `title`, correct: false}
        ]
    },
    {
        question:`Which doctype is correct for HTML5?`,
        answers: [
            { text: `<!DOCTYPE HTML PUBLIC" -NOT THIS ANSWER`, correct: false},
            { text: `<!DOCTYPE HTML5>`, correct: false},
            { text: `<!DACTYPE html>`, correct: false},
            { text: `<!DOCTYPE html>`, correct: true}
        ]
    },
    {
        question:`In HTML, onblur and onfocus are:`,
        answers: [
            { text: `Style attributes`, correct: false},
            { text: `HTML elements`, correct: false},
            { text: `Event`, correct: true},
            { text: `Fun Elements`, correct: false}
        ]
    },
    {
        question:`The HTML <canvas> element is used to:`,
        answers: [
            { text: `display database records`, correct: false},
            { text: `draw graphics`, correct: true},
            { text: `create draggable elements`, correct: false},
            { text: `manipulate data in MySQL`, correct: false}
        ]
    },
    {
        question:`Which input type defines a slider control?`,
        answers: [
            { text: `range`, correct: true},
            { text: `controls`, correct: false},
            { text: `search`, correct: false},
            { text: `slider`, correct: false}
        ]
    },
]