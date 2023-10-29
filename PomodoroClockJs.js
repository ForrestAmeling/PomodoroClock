//run jquery
$(document).ready(function() {

  //variables  
  var workClock;
  var breakClock;
  var workTime;
  var breakTime;
  var sound = new Audio('https://www.soundjay.com/button/beep-07.mp3');
  var sound2 = new Audio('https://www.soundjay.com/button/beep-02.mp3')
  //set breakTime and workTime by converting string to integer
  breakTime = parseInt($("#breakTime").html() * 60);
  workTime = parseInt($("#workTime").html() * 60);

  //Work clock
  workClock = $('.workClock').FlipClock(workTime, {
    //creates a minute and seconds clock
    clockFace: "MinuteCounter",
    autoPlay: false,
    autoStart: false,
    //counts down instead of up
    countdown: true,
    callbacks: {
      interval: function() {
        //When workClock hits zero the breakClock will set based on the value and start 
        if (workClock.getTime().time === 0) {
          breakClock.setTime(parseInt($("#breakTime").html() * 60));
          breakClock.start();
          sound2.play();
        }
      }
    }
  });

  //Break clock
  breakClock = $('.breakClock').FlipClock(breakTime, {
    clockFace: "MinuteCounter",
    autoPlay: false,
    autoStart: false,
    countdown: true,
    callbacks: {
      interval: function() {
        //Work clock will set and run when breakClock hits zero
        if (breakClock.getTime().time === 0) {
          sound.play();
          workClock.setTime(parseInt($("#workTime").html() * 60));
          workClock.start();
          sound.play();
        }

      }
    }

  });

  //Start Stop and Reset 

  $("#start").click(function() {
    workClock.setTime(parseInt($("#workTime").html() * 60));
    breakClock.setTime(parseInt($("#breakTime").html() * 60));
    workClock.start();
    sound.play();

  });

  $("#stop").click(function() {
    workClock.stop();
    breakClock.stop();
  });

  $("#reset").click(function() {
      workClock.setTime(parseInt($("#workTime").html() * 60));
      breakClock.setTime(parseInt($("#breakTime").html() * 60));
      breakClock.stop();
      workClock.stop();
      

    });
    //add time to the duration of the workClock
  $("#plusWork").click(function() {
    workTime = parseInt($("#workTime").html());
    $("#workTime").html(workTime + 1);
    workClock.setTime(parseInt($("#workTime").html()) * 60);

  });

  //subtracts time to the duration of the workClock
  $("#minusWork").click(function() {
    workTime = parseInt($("#workTime").html());
    $("#workTime").html(workTime - 1);
    if (workTime === 1) {
      $("#workTime").html(1);
    }
    workClock.setTime(parseInt($("#workTime").html()) * 60);

  });

  //add time to the duration of the breakClock
  $("#plusBreak").click(function() {
    breakTime = parseInt($("#breakTime").html());
    $("#breakTime").html(breakTime + 1);
    breakClock.setTime(parseInt($("#breakTime").html()) * 60);

  });

  //subtract time to the duration of the breakClock
  $("#minusBreak").click(function() {
    breakTime = parseInt($("#breakTime").html());
    $("#breakTime").html(breakTime - 1);
    if (breakTime === 1) {
      $("#breakTime").html(1);
    }
    breakClock.setTime(parseInt($("#breakTime").html()) * 60);

  });

});
