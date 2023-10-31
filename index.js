function Question (questiontext,questionNo){

    this.questiontext = questiontext;
    this.questionNo = questionNo;

}

const q1 = new Question("JavaScript supports?", 1);
const q2 = new Question("Which language is used for styling Web pages?", 2);
const q3 = new Question("Which is not a JavaScript Framework?", 3);
const q4 = new Question("Which is used for connect to Database?", 4);
const q5 = new Question("JavaScript is a?", 5);

function Answer(answerText){
    this.answerText= answerText;
}

function QuestionAnswerpair(questionObj,multipleOptionsObj,CorrectAnswerObj)
{
    this.questionObj = questionObj;
    this.multipleOptionsObj = multipleOptionsObj;
    this.CorrectAnswerObj = CorrectAnswerObj;

    this.checkAnswer = function (userAnswerText){

        if(CorrectAnswerObj.answerText === userAnswerText){
            console.log(`Answer is correct`);
            return true;
        }
        else {
            console.log(`Answer is wrong`);
            return false;
        }
    }

}

const aFunctions = new Answer("Functions");
const aHTML = new Answer("HTML");
const aCSS  = new Answer("CSS");

const qaPair1 = new QuestionAnswerpair(q1,
    [aFunctions,new Answer("XHTML"),aCSS,
    aHTML],
aFunctions
); 

const aJQuery = new Answer("JQuery");
const qaPair2 = new QuestionAnswerpair(q2,
    [aHTML,aJQuery,aCSS,
new Answer("XML")
],
aCSS
); 

const aPythonScript = new Answer("Python Script");
const qaPair3 = new QuestionAnswerpair(q3,
    [aPythonScript,aJQuery,new Answer("Django"),
new Answer("node JS")
],
aPythonScript
); 

const aPHP = new Answer("PHP");
const aALL = new Answer("ALL")
const qaPair4 = new QuestionAnswerpair(q4,
    [aPHP,aHTML,new Answer("JS"),
new Answer("All")
],
aPHP
); 

const aProgrammingLanguage = new Answer("Programming Language");
const qaPair5 = new QuestionAnswerpair(q5,
    [new Answer("Language"),aProgrammingLanguage,new Answer("Development"),
aALL
],
aProgrammingLanguage
); 

function QuestionProgressBar (pageIndex , totalNoOfQuestions){

    this.pageIndex = pageIndex;
    this.totalNoOfQuestions = totalNoOfQuestions;

    this.getprogressText = function(){

        const progressText = `Question ${pageIndex + 1} of ${totalNoOfQuestions}`;
        return progressText;
    }
}

function ResultPage (score,markspercentage){

    this.score = score;
    this.markspercentage = markspercentage;

    this.getContent = function(){

        const content = `Your Score : ${score}.Mark Percentage is ${markspercentage} %`;
        return content;
    }

    this.display = function(){

        const content = this.getContent();

        const htmlFragment = 
        
        `
        <h1>Result<h1>
        <h3 id='score'>${content}</h3>
        `;
        
        const quizElement = document.getElementById("quiz");
        quizElement.innerHTML = htmlFragment;

    }
}

function QuizPage(pageIndex,qapair, qaPairArray) {

    this.pageIndex = pageIndex;
    this.qapair = qapair;
    this.qaPairArray = qaPairArray;

    this.display = function(){

        //update the question

        const questionElement = document.getElementById("question");
        questionElement.innerHTML =
         qapair.questionObj.questiontext;

        //update all the answer choices

        for(let index = 0 ; index < qapair.multipleOptionsObj.length; index ++){

            const answerObj = qapair.multipleOptionsObj[index];

            const choiceId = "choice" + index ;
            const answerChoiceElement = document.getElementById(choiceId);
            answerChoiceElement.innerHTML = answerObj.answerText;
        }

        //update question progress bar

        const progressElement = document.getElementById("progress");

        const progressBarObj = new QuestionProgressBar(this.pageIndex,qaPairArray.length);

        progressElement.innerHTML =  progressBarObj.getprogressText();

    }
}

function QuizApplication (qaPairArray) {

    this.qaPairArray = qaPairArray;
    this.score = 0;
    this.pageIndex = 0;

    this.start = function(){
         
        this.registerListeners();
        this.displayQuizPage();
    }

    this.registerListeners = function(){

        const currentQuizAppObject = this;

        //To do 
        const buttonsCount = qaPairArray[this.pageIndex].multipleOptionsObj.length;
      
        for (let index=0 ; index < buttonsCount ; index ++){

        const buttonId = `btn${index}`;
        const buttonElement = document.getElementById(buttonId);

        console.log("Invoked Successfully");

        this.associateEventListner(buttonElement,currentQuizAppObject);

      }
    }

    this.associateEventListner = function(buttonElement,currentQuizAppObject){
    buttonElement.onclick = function(event){

        //this.handleUserAnswerSelection(event);
        currentQuizAppObject.handleUserAnswerSelection(event);

      }

    }


    this.handleUserAnswerSelection = function(event){
        // Get the user-response(answer)
        const target = event.currentTarget;
        const userAnswerText = target.children[0].innerText;

        // Check whether the user-response(answer) is correct or not
        

        const qapair = qaPairArray[this.pageIndex];

        const outcome = qapair.checkAnswer(userAnswerText);
        if (outcome){
            this.incrementScore();
        }

        this.nextPage();

        //Increment the score
    }

    this.getScore = function(){
      return this.score;

    }
    
    this.incrementScore = function () {
        this.score ++;
    }


    this.getmarksPercentage = function(){

        // (2 / 5) * 100

        const percentage = (this.getScore() / this.qaPairArray.length) * 100;
        return percentage;
    }

    this.nextPage = function(){

        //Quiz Page
        if(this.pageIndex == qaPairArray.length - 1){
            console.log("Display Result page");

            const resultPage = new ResultPage(this.getScore(),this.getmarksPercentage());
            resultPage.display();
          
        }else{
           this.initPage();
        }

        // Result Page
    }

    this.initPage = function(){

        this.pageIndex = this.pageIndex + 1;
        this.registerListeners();
        this.displayQuizPage();
    }

       this.displayQuizPage = function() {

        console.log("Display Quiz page");
             
             const qapair = this.qaPairArray[this.pageIndex];
             const quizPage = new QuizPage(this.pageIndex,qapair,this.qaPairArray);
             quizPage.display();
       }
}

const quizApp = new QuizApplication(
    [qaPair1,qaPair2,qaPair3,qaPair4,qaPair5]
);

quizApp.start();