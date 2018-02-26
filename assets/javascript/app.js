
 //  Our trivia clock object.
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
  count: function() {
    console.log('function-Count()');
    //  decrement time by 1.
    clock.time -= 1;
    clock.display = clock.timeConverter(clock.time);
    $("#time-display").text(clock.display);
    console.log('Count :' + clock.display);
    if (clock.time < 0)
    {
        console.log('Time-Out-Reset');
        clock.reset();
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

window.onload = function() {
  console.log('window-onload()');

  //  Click event
  $("#start").click(clock.start);
  console.log('window-loaded');
};
