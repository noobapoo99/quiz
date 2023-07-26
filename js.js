/* /* const remove = document.getElementsByClassName(main-contents)
remove.remove() */
/* 
const element = document.getElementById('quiz');


element.addEventListener('click', function() {
  
  this.style.display = '';
});


const questiondiv = document.createElement('div');
questiondiv.id ='question';
document.getElementById('quiz').appendChild(questiondiv)
for(let i=0;i<4;i++){
    const optionbutton = document.createElement('button')
    optionButton.classList.add('option');
  document.getElementById('quiz').appendChild(optionButton);

} */
/* const button = document.getElementById('button');
const mainContentsDiv = document.getElementById('quiz');

button.addEventListener('click', function() {
  mainContentsDiv.style.display = '';
}); */ const time_div = document.getElementById("time")
const startBtn = document.getElementById("start_btn")
const start_div = document.getElementById("start_div")
const quiz_div = document.getElementById("quiz_div")
const quiz_content = document.getElementById("quiz_content")
const option_list = document.getElementById("option")
const incorrect = document.getElementById("incorrect")
const failed_div = document.getElementById("failed")
const play_againBtn = document.getElementById("play_againBtn")
const result_div = document.getElementById("result")
const finalScore = document.getElementById("finalScore")
const highScoreBtn = document.getElementById("leaderboard")
const highScoreDiv = document.getElementById('highScore')


const questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts",
    },
    {
        questionText: "Arrays in JavaScript can be used to store ______.",
        options: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above",
        ],
        answer: "4. all of the above",
    },
    {
        questionText:
            "String values must be enclosed within _____ when being assigned to variables.",
        options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        answer: "3. quotes",
    },
    {
        questionText:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log",
        ],
        answer: "4. console.log",
    },
    {
        questionText:
            "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        options: ["1. break", "2. stop", "3. halt", "4. exit"],
        answer: "1. break",
    },
];
let queIndex = 0
let wrongAnswers = 0;
let time;
let timerId;


// function for decreasing time, 50 sec to 0sec
const timer = () => {
    let i = 50;
    const countdown = () => {
        if (i - (wrongAnswers * 10) >= 0) {
            time = i - (wrongAnswers * 10);
            time_div.innerHTML = `Time: ${time}`;

            if (i > 0) {
                timerId = setTimeout(() => {
                    i--;
                    countdown();
                }, 1000);
            } 
        } else {
            time_div.innerHTML = `Time: 0`;
            quiz_div.style.display = 'none'
            failed_div.style.display = 'block'
        }
    };

    countdown();
};

const stopTimer = () => {
    clearTimeout(timerId);
    result_div.style.display = 'block'
    finalScore.innerHTML = `Your Final Score is: <b>${time} </b>`
};

const startQuiz = () => {
    start_div.style.display = "none"
    quiz_div.style.display = "block"
    showQuestion(queIndex)
    timer()
    highScoreBtn.innerHTML = ''
}

startBtn.addEventListener("click", startQuiz)

function showQuestion(index) {
    quiz_content.innerHTML = `
        <h1>${questions[index].questionText}</h1>
        <div id="option" class="option">
            <div class="options">${questions[index].options[0]}</div>
            <div class="options">${questions[index].options[1]}</div>
            <div class="options">${questions[index].options[2]}</div>
            <div class="options">${questions[index].options[3]}</div>
        </div>
    `
    const option = document.querySelectorAll(".options");
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }

}


function optionSelected(answer) {
    let userAns = answer.textContent;
    let correctAns = questions[queIndex].answer
    if (userAns === correctAns) {
        incorrect.style.display = "none"
        queIndex++
        if (queIndex < questions.length) {
            showQuestion(queIndex)
        } else {
            stopTimer()
            quiz_div.style.display = "none"
        }

    } else {
        wrongAnswers++
        incorrect.style.display = "block"
    }

}


function playAgain() {
    window.location.reload();
}



const form = document.getElementById('nameForm')
const scoreList = document.getElementById("scoreList")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const nameInp = document.getElementById("userName")
    const userName = nameInp.value
    const date = new Date().toLocaleDateString()
    let storedData = localStorage.getItem("userData");
    if (storedData) {
        storedData = JSON.parse(storedData);
    } else {
        storedData = [];
    }
    const userData = {
        "userName": userName,
        "score": time,
        "date": date
    }
    storedData.push(userData)
    localStorage.setItem("userData", JSON.stringify(storedData));
    window.location.reload();
})


const scoreData = JSON.parse(localStorage.getItem("userData"))
highScoreBtn.addEventListener("click", () => {
    start_div.style.display = 'none'
    highScoreDiv.style.display = "block"
    scoreList.innerHTML = ""
    if (scoreData === null) {
        scoreList.innerHTML = "<b>Empty</b>"
    } else {
        scoreData.sort((a, b) => b.score - a.score); 

        const topScores = scoreData.slice(0, 5); 
        
        topScores.forEach(data => {
            const li = document.createElement("li");
            li.innerHTML = ` <span>${data.userName}</span>  <span>${data.date}</span> <span><b>${data.score}</b></span> `;
            scoreList.appendChild(li);
        });
    }
})

const clearHighScore = () => {
    if (confirm("Clear your high scores?") === true) {
        localStorage.clear()
        window.location.reload();
    }
}
