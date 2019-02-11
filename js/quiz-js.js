import {questions} from "./questions-js.js";

let score;
let currentQuestion;
$(document).ready(function()
{
    setTitle();
    handleTitleButtonClick();
    currentQuestion = 0;
    score = new Array(10);

});

function setTitle()
{
    // hides anything not affiliated with title page and shows anything that is.
    $(".scoreHeader-js").hide();
    $(".question-js").hide();

    $(".mainPage-js").show();

}

function handleTitleButtonClick()
{
    $('.startButton-js').on('click',function(event)
    {
        event.preventDefault();
        renderQuestionMenu();
        setQuestion();
    });
}

function renderQuestionMenu()
{
    $('.answerButton-js').on('click',function(event)
    {
        console.log("answer" + $(this).attr("value") + " clicked.");
        setResult();
    });
}

function setQuestion()
{
    // hide title, show question elements
    $(".scoreHeader-js").show();
    $(".question-js").show();

    $(".mainPage-js").hide();
    renderQuestion();
}

function renderQuestion()
{
    const curQuestion = questions[currentQuestion];
    $("#questionNum").text("Question " +curQuestion.number);
    $("blockquote").text(curQuestion.question);
    for(var k in curQuestion.options)
    {
        $("button[type='button'][value="+k+"]").text(k + ".) "+curQuestion.options[k]);
        //console.log(k, curQuestion.options[k]);
    }
    $("img").attr("src",curQuestion.image);
  
}

function setResult()
{
    $(".scoreHeader-js").hide();
    $(".question-js").hide();
    $(".mainPage-js").hide();
}