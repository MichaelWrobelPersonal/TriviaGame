// Trivia Data
let questions = ['Who plays 1st base?', 'Who plays 2nd base?', 'Who plays 3rd base?', 'When is our pitcher?', 'Today is catching Tommorrow', 'What about the shortstop', 'Who is in right field?', 'Why is the center fielder?' ]
let answers =   ['Who',   'What',     'I Dont Know', 'Tommorrow', 'Today', 'I Dont Care', 'Why',  'Because', ]
let choiceA =   ['Who',   'Nobody',   'I Dont Care', 'Yesterday', 'Today', 'No One',      'What', 'I Dunno', ]
let choiceB =   ['What',  'Somebody', 'I Dont Know', 'Today',     'Never', 'I Dont Know', 'Who',  'Because', ]
let choiceC =   ['Where', 'What',     'I Know Who',  'Tommorrow', 'Maybe', 'I Dont Care', 'Why',  'Huh', ]
let numQA = 0;

 //  Trivia clock object.
let clock = {

  time: 0,
  running: false,
  timerId: undefined,
  display: "00:00",
  startOnReset: true, // Always set to true

  reset: function() {
    console.log('function-Reset()');
    if(clock.running)
    {
        console.log('Running');
        clearInterval(clock.timerId);
        clock.running = false;
        console.log('Stopped');
    }
    if (this.startOnReset)
    {
        console.log('AutoStart');
        clock.start();
    }
  },

  start: function() {
      console.log('function-Start()');
      if (!clock.running) {
        console.log('Starting');
        clearInterval(clock.timerId);
        clock.timerId = setInterval(clock.count,1000);
        clock.running = true;
        clock.time = 120;
        console.log('Started');
        $("#start").hide();  // Hide the start button once it is clicked
      }
  },
  stop: function()
  {
    console.log('function-Stop()');
    if (clock.running) {
      console.log('Stopping');
      clearInterval(clock.timerId);
      clock.running = false;
      console.log('Stopped');
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
        console.log('Time-Out-Reset');
        clock.stop();
        $("#time-display").text("You Lost!!!"); 
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
  console.log('updateQandA');
  // Update the display wiht the selected Q and A
  $("#question-display").text(questions[i]);
  $("#choiceA-display").text("A) " + choiceA[i]);
  $("#choiceB-display").text("B) " + choiceB[i]);
  $("#choiceC-display").text("C) " + choiceC[i]);
};

function checkA() {
  console.log('checkA');
  checkAnswer( answers[numQA], choiceA[numQA] );
};

function checkB() {
  console.log('checkB');
  checkAnswer( answers[numQA], choiceB[numQA] );
};

function checkC() {
  console.log('checkC');
  checkAnswer( answers[numQA], choiceC[numQA] );
};

function checkAnswer(answer,choice)
{
  console.log('checkAnswer');
  console.log('choice :' + choice);
  console.log('answer :' + answer);
  if ( choice === answer )
  {
    console.log('Correct');
    numQA += 1; // Go to the next question
    if (numQA < answers.length )
    {
      updateQuestionAndAnswers(numQA); // Display the next question 
      clock.reset(); // Reset the clock for next question
    }
    else
    {
      $("#time-display").text("You Won!!!");
      clock.stop();     
    }
  }
};

window.onload = function() {
  console.log('window-onload()');

  //  Click event start
  $("#start").click(clock.start);
  console.log('window-loaded');

  //  Click event choices
  $("#choiceA-display").click(checkA);
  $("#choiceB-display").click(checkB);
  $("#choiceC-display").click(checkC);

  console.log('window-loaded');

  // Trivia display intialization
  updateQuestionAndAnswers(0);
    
};
