import {questions} from "./questions-js.js";

let score;
let currentQuestion;
let scoreImages;
$(document).ready(function()
{
    setTitle();
    handleTitleButtonClick();
    handleQuestionButtons();
    handleContinueButton();
    handleRestartButton();
    currentQuestion = 0;
    score = new Array(10);
    setImages();
    renderScore();
    //setResult("c");

});

function restart()
{
    renderScore();
    setTitle();
}

/*---------------------------------HANDLERS------------------------------------------ */
function handleRestartButton()
{
    $('.restartButton-js').on('click',function(event)
    {
        event.preventDefault();
        currentQuestion = 0;
        score = new Array(10);
        restart();
    });
}

function handleTitleButtonClick()
{
    $('.startButton-js').on('click',function(event)
    {
        event.preventDefault();
        setQuestion();
    });
}

function handleQuestionButtons()
{
    $('.question-js').on('click','.answerButton-js',function(event)
    {
        console.log("answer " + $(this).attr("value") + " clicked.");
        setResult($(this).attr("value"));
    });
}

function handleContinueButton()
{
    $('.questionResult-js').on('click','.continueButton-js',function(event)
    {
        console.log("continue button clicked");
        if(currentQuestion <9)
        {
            currentQuestion++;
            setQuestion();
        }
        else
        {
            setFinalResult();
        }
    });
}
/*-----------------------------------SET-------------------------------------*/

function setImages()
{
    let scoreBox = document.getElementById("scoreHeader");//$(".scoreHeader-js");
    scoreImages = {
        correct : "./img/correct.png",
        incorrect : "./img/incorrect.png",
        pending : "./img/pending.png"
    };

    for(let i = 0; i < score.length; i++)
    {
        let img = new Image();
        img.src = scoreImages.pending;
        scoreBox.appendChild(img);
    }
}

function setTitle()
{
    // hides anything not affiliated with title page and shows anything that is.
    $(".scoreHeader-js").hide();
    $(".question-js").hide();
    $(".questionResult-js").hide();
    $(".mainPage-js").show();
    $(".finalResult-js").hide();

}
function setQuestion()
{
    // hide title, show question elements
    $(".scoreHeader-js").show();
    $(".question-js").show();

    $(".questionResult-js").hide();
    $(".mainPage-js").hide();
    $(".finalResult-js").hide();
    renderQuestion();
}
function setResult(chosenAnswer)
{
    $(".scoreHeader-js").show();
    $(".question-js").hide();
    $(".mainPage-js").hide();
    $(".finalResult-js").hide();
    $(".questionResult-js").show();

    renderResult(chosenAnswer);
}

function setFinalResult()
{
    $(".scoreHeader-js").hide();
    $(".question-js").hide();
    $(".mainPage-js").hide();
    $(".questionResult-js").hide();

    renderFinalResult();

}

/*----------------------------------RENDERERS-------------------------------- */

function renderFinalResult()
{
    let count = 0;
    for(let i = 0; i < score.length; i++)
    {
        if(!isNaN(score[i]))
            count += score[i];
    }
    $(".score-js").html(count + "/10");
    const finalScore = document.getElementById("finalScore");
    
    for(let i = 0; i < score.length; i++)
    {
        let img = new Image();
        if(score[i] == 1)
            img.src = scoreImages.correct;
        else
            img.src = scoreImages.incorrect;
        finalScore.appendChild(img);
    }
    $(".finalResult-js").show();
}

function renderResult(chosenAnswer)
{
    let ans = 0;
    if(questions[currentQuestion].answer.includes(chosenAnswer))
    {
        console.log("correct");
        ans = "CORRECT";
        score[currentQuestion] = 1;
    }
    else
    {
        console.log("incorrect");
        ans = "INCORRECT";
        score[currentQuestion] = 0;
    }
    renderScore();
    let string = "<h1 id = 'resultHeader'>"+ans+"</h1>";
    string += "<div id = 'reasoning'>";
    string += "<h2>Answer: "+questions[currentQuestion].answer+"</h2>";
    string += "<p>"+questions[currentQuestion].reason+"</p>";
    string += "</div>";
    string += "<button type='button' id = 'continueButton' class = 'continueButton-js'>Continue</button>";
    $(".questionResult-js").html(string);
}

function renderScore()
{
    let count = 0;
    $(".scoreHeader-js img").each(function(index)
    {
        if(score[count] == 1)
        {
            $(this).attr("src",scoreImages.correct);
        }
        if(score[count] == 0)
        {
            $(this).attr("src",scoreImages.incorrect);
        }
        if(isNaN(score[count]))
        {
            $(this).attr("src",scoreImages.pending);
        }
        count++;
    });
   /* for(let i = 0; i < score.length; i++)
    {
        if(score[i] == 1)
        {

            count++;
        }
    }
    */
    //$(".scoreHeader-js").html("<p>Score: " + count + "</p>");
}

function renderQuestion()
{
    const curQuestion = questions[currentQuestion];
    let string = " <h1 id = 'questionNum'>Question "+curQuestion.number+"</h1>";
    string += "<blockquote>"+curQuestion.question+"</blockquote>";
    string += "<main id = 'menu'>";
    string += "<ul id='options' class = 'options-js'>";
    for(var k in curQuestion.options)
    {
        string +=  "<li><button type = 'button' id = 'answerButton' class = 'answerButton-js' value = "+k+">"+k+".) "+curQuestion.options[k]+"</button></li>";
    }
    string += "</ul>";
    string += "<figure id='questionImage'><img src = "+curQuestion.image+"></figure>";
    string += "</main>";
    $(".question-js").html(string);
}

