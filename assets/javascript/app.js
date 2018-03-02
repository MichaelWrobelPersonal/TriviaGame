// Trivia Data
let questions = ['The fellows name on 1st base is?', 'The guys name on 2nd base is?', 'The 3rd baseman is?', 'Tell me the name of the pitcher.', 'Who is playing catcher?', 'The shortstop is?', 'The man in left field?', 'The center fielder is?' ]
let answers =   ['Who',   'What',     'I Dont Know', 'Tommorrow', 'Today', 'I Dont Care', 'Why',  'Because', ]
let choiceA =   ['Who',   'Nobody',   'I Dont Care', 'Yesterday', 'Today', 'No One',      'What', 'I Dunno', ]
let choiceB =   ['What',  'Somebody', 'I Dont Know', 'Today',     'Never', 'I Dont Know', 'Who',  'Because', ]
let choiceC =   ['Where', 'What',     'Naturally',  'Tommorrow', 'Maybe', 'I Dont Care',  'Why',  'Naturally', ]
let numQA = 0;

$("#questions").hide();   // Initially hide the questions
$("#results").hide();     // Initially hode the results

 //  Trivia clock object.
let clock = {

  time: 0,
  running: false,
  timerId: undefined,
  display: "00:00",
  startOnReset: true, // Always set to true

  reset: function() {
    if(clock.running)
    {
        clearInterval(clock.timerId);
        clock.running = false;
    }
    if (this.startOnReset)
    {
        clock.start();
    }
  },

  start: function() {
      if (!clock.running) {
        clearInterval(clock.timerId);
        clock.timerId = setInterval(clock.count,1000);
        clock.running = true;
        clock.time = 120;
        $("#start").hide();  // Hide the start button once it is clicked
        $("#baseball-logo").hide();  // And the Logo
        $("#questions").show();   // Then show the questions
        $("#results").hide(); // Hide results until finished
      }
  },
  stop: function()
  {
    if (clock.running) {
      clearInterval(clock.timerId);
      clock.running = false;
    }
  },
  count: function()
  {
    //  decrement time by 1.
    clock.time -= 1;
    clock.display = clock.timeConverter(clock.time);
    $("#time-display").text(clock.display);
    //  console.log('Count :' + clock.display);
    if (clock.time < 0)
    {
        clock.stop();
        $("#time-display").text("You Lost!!!");
        $("#questions").hide();
        $("#results").show();
    }
  },

  //  Convert time to soemthing pretty
  timeConverter: function(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};

function updateQuestionAndAnswers(i) {
  // Update the display wiht the selected Q and A
  $("#question-display").text(questions[i]);
  $("#choiceA-display").text("A) " + choiceA[i]);
  $("#choiceB-display").text("B) " + choiceB[i]);
  $("#choiceC-display").text("C) " + choiceC[i]);
};

function checkA() {
  checkAnswer( answers[numQA], choiceA[numQA] );
};

function checkB() {
  checkAnswer( answers[numQA], choiceB[numQA] );
};

function checkC() {
  checkAnswer( answers[numQA], choiceC[numQA] );
};

function checkAnswer(answer,choice)
{
  if ( choice === answer )
  {
    numQA += 1; // Go to the next question
    if (numQA < answers.length )
    {
      updateQuestionAndAnswers(numQA); // Display the next question 
      clock.reset(); // Reset the clock for next question
    }
    else
    {
      $("#time-display").text("You Won!!!");
      $("#questions").hide();
      $("#results").show();
      clock.stop();     
    }
  }
};

window.onload = function() {

  //  Click event start
  $("#start").click(clock.start);

  //  Click event choices
  $("#choiceA-display").click(checkA);
  $("#choiceB-display").click(checkB);
  $("#choiceC-display").click(checkC);

  // Trivia display intialization
  updateQuestionAndAnswers(0);
    
};
