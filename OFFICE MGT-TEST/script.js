//DOM Element
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

//Quiz Data
const quizQuestions =[
    {
        question: "Office Management is mainly concerned with?",
        answers: [ 
            { text: "Producing goods", correct: false },
            { text: "Selling products", correct: false },
            { text: "Organizing people, information, and technology", correct: true },
            { text: "Advertising services", correct: false }
        ]
    },

    {
        question: "Which staff member manages computer systems in the office?",
        answers: [
            { text: "Clerk", correct: false },
            { text: "Secretary", correct: true },
            { text: "IT Officer", correct: false },
            { text: "Receptionist", correct: false }
        ]
    },

    {
        question: "The major aim of records management is to'?",
        answers: [
            { text: "Increase paperwork", correct: false },
            { text: "Waste time", correct: false },
            { text: "Ensure legal compliance and efficiency", correct: true },
            { text: "Reduce staff", correct: false }
        ]
    },

    {
        question: "The main benefit of office automation is?",
        answers: [
            { text: "Increased paperwork", correct: false },
            { text: "Reduced speed", correct: false },
            { text: "Improved efficiency", correct: true },
            { text: "More staff", correct: false }
        ]
    },

    {
        question: "Storing office files online for access anywhere is called?",
        answers: [
            { text: "Local storage", correct: false },
            { text: "Manual storage", correct: false },
            { text: "Cloud computing", correct: true },
            { text: "Archiving", correct: false }
        ]
    },

    {
        question: "Which of the following is a threat to office data?",
        answers: [
            { text: "Encryption", correct: false },
            { text: "Backups", correct: false },
            { text: "Malware", correct: true },
            { text: "Antivirus", correct: false }
        ]
    },

    {
        question: "The security principle that ensures only authorized users access data is?",
        answers: [
            { text: "Integrity", correct: false },
            { text: "Availability", correct: false },
            { text: "Confidentiality", correct: true },
            { text: "Accuracy", correct: false }
        ]
    },

    {
        question: "Ensuring that data is correct and not altered is known as?",
        answers: [
            { text: "Confidentiality", correct: false },
            { text: "Integrity", correct: true },
            { text: "Availability", correct: false },
            { text: "Privacy", correct: false }
        ]
    },

    {
        question: "Making sure data is accessible when needed is?",
        answers: [
            { text: "Confidentiality", correct: false },
            { text: "Integrity", correct: false },
            { text: "Availability", correct: true },
            { text: "Security", correct: false }
        ]
    },

    {
        question: "Incorporation papers and property deeds are classified as?",
        answers: [
            { text: "Useful records", correct: false },
            { text: "Important records", correct: false },
            { text: "Vital records", correct: true },
            { text: "Non-essential records", correct: false }
        ]
    },

    {
        question: "Records that can be destroyed after use are called?",
        answers: [
            { text: "Vital records", correct: false },
            { text: "Important records", correct: false },
            { text: "Useful records", correct: false },
            { text: "Non-essential records", correct: true }
        ]
    },

    {
        question: "A good filing system should be?",
        answers: [
            { text: "Complex", correct: false },
            { text: "Confusing", correct: false },
            { text: "Simple and flexible", correct: true },
            { text: "Expensive", correct: false }
        ]
    },

];

//Quiz State Variables
let currentQuestionIndex = 0;
let score = 0; 
let answersDisabled = false;

//Initialize Quiz
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    //reset variables
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion(){
    // reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    //clear previous answers
    answersContainer.innerHTML = "";

    //display new answers
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event){
    if(answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    });


    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        // check if there are more questions or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if(percentage === 100){
    resultMessage.textContent = "Perfect Score! Excellent work!";
}else if(percentage >= 80){
    resultMessage.textContent = "Great job! You have a strong knowledge.";
}else if(percentage >= 60){
    resultMessage.textContent = "Good effort! But there's room for improvement.";
}else if(percentage >= 40){
    resultMessage.textContent = "You might want to study a bit more.";
}else{
    resultMessage.textContent = "Better luck next time! Don't give up!";
}

}

function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}