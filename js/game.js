var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var myUp = false;
var myDown = false;
var myRight = false;

var yourUp = false;
var yourDown = false;
var yourLeft = false;

var enter = true;

var x = width / 2;
var y = height / 2;
var spdX = 0;
var spdY = 0;
const radious = 20;
var speedUpCount = 0;

const myBarWidth = 10;
const myBarHeight = 100;
var myBarY = (height / 2) - myBarHeight / 2;
var myBarSpeed = 3;

const yourBarWidth = 10;
const yourBarHeight = 100;
var yourBarY = (height / 2) - yourBarHeight / 2;
var yourBarSpeed = 3;

var myScore = 0;
var yourScore = 0;

var refresh;
var refreshVsComputer;
function init() {
   x = width / 2;
   y = height / 2;

   myBarY = (height / 2) - myBarHeight / 2;
   // myBarSpeed = 3;

   yourBarY = (height / 2) - yourBarHeight / 2;
   // yourBarSpeed = 3;
   speedUpCount = 0;
   myScore = 0;
   yourScore = 0;

   var update = function () {
      if (speedUpCount === 0) {
         firstBall();
      }
      ctx.clearRect(0, 0, width, height);
      drawBall();
      moveArc();
      myBar();
      moveBar();
      crash();
      checkScore();
      showScore();
      chooseWinner();
      speedUpCount++;
      if (speedUpCount % 1000 === 0) {
         speedUp();
      }
   }
   var firstBall = function () {
      var randomDirection = Math.random();
      if (randomDirection >= 0.75) {
         spdX = 3;
         spdY = 3;
      } else if (randomDirection >= 0.5) {
         spdX = -3;
         spdY = 3;
      } else if (randomDirection >= 0.25) {
         spdX = 3;
         spdY = -3;
      } else {
         spdX = -3;
         spdY = -3;
      }
   }

   var drawBall = function () {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(x, y, radious, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
      ctx.fill();
   }
   var moveArc = function () {
      x += spdX;
      y += spdY;
   }

   var myBar = function () {
      ctx.fillStyle = "blue";
      ctx.fillRect(0, myBarY, myBarWidth, myBarHeight)
      ctx.fillStyle = "red";
      ctx.fillRect(width - yourBarWidth, yourBarY, yourBarWidth, yourBarHeight);
   }
   var moveBar = function () {
      if (myUp) {
         myBarY -= myBarSpeed;
      } else if (myDown) {
         myBarY += myBarSpeed;
      }
      if (yourUp) {
         yourBarY -= yourBarSpeed;
      } else if (yourDown) {
         yourBarY += yourBarSpeed;
      }
      if (myBarY <= 0) {
         myBarY = 0;
      }
      if (myBarY + myBarHeight >= height) {
         myBarY = height - myBarHeight;
      }
      if (yourBarY <= 0) {
         yourBarY = 0;
      }
      if (yourBarY + yourBarHeight >= height) {
         yourBarY = height - yourBarHeight;
      }
   }

   var crash = function () {
      if (x - radious <= myBarWidth && x - radious >= myBarWidth + spdX && y >= myBarY - radious && y <= myBarY + myBarHeight + radious) {
         spdX = -spdX;
         if (myUp) {
            spdY -= 0.5;
            if (spdY <= -5) {
               spdY = -5;
            }
         } else if (myDown) {
            spdY += 0.5;
            if (spdY >= 5) {
               spdY = 5;
            }
         }
      } else if (x + radious >= width - yourBarWidth && x + radious < width - yourBarWidth + spdX && y >= yourBarY - radious && y <= yourBarY + yourBarHeight + radious) {
         spdX = -spdX;
         if (yourUp) {
            spdY -= 0.5;
            if (spdY <= -5) {
               spdY = -5;
            }
         } else if (yourDown) {
            spdY += 0.5;
            if (spdY >= 5) {
               spdY = 5;
            }
         }
      }
      if (y >= height - radious || y <= radious) {
         spdY = -spdY;
      }
   }


   var checkScore = function () {
      if (x < 0) {
         yourScore++;
         x = width - yourBarWidth - radious;
         y = yourBarY + (yourBarHeight / 2);
         spdX = -3
         var randomY = Math.random();
         if (randomY >= 0.5) {
            spdY = 3
         } else {
            spdY = -3;
         }
         update();
      } else if (x > width) {
         myScore++;
         x = myBarWidth + radious;
         y = myBarY + (myBarHeight / 2);
         spdX = 3
         var randomY = Math.random();
         if (randomY >= 0.5) {
            spdY = 3
         } else {
            spdY = -3;
         }
         update();
      }
   }
   var showScore = function () {
      ctx.font = "30px Arial";
      ctx.fillStyle = "black";
      ctx.fillText("Blue : " + myScore, 30, 30);
      ctx.fillText("Red : " + yourScore, 1360, 30);
   }
   var chooseWinner = function () {
      if (myScore >= 5) {
         blueWin();
      } else if (yourScore >= 5) {
         redWin();
      }
   }
   var speedUp = function () {
      if (spdX >= 0) {
         spdX += 0.1;
      } else {
         spdX -= 0.1;
      }
      if (spdX >= 5) {
         spdX = 5;
      } else if (spdX <= -5) {
         spdX = -5;
      }
      myBarSpeed = Math.abs(spdX);
      yourBarSpeed = Math.abs(spdX);
   }
   refresh = setInterval(update, 1);
}



function vsComputer() {
   function computer() {
      if (y < myBarY + myBarHeight / 2) {
         myBarY -= myBarSpeed;
      }
      if (y > myBarY + myBarHeight / 2) {
         myBarY += myBarSpeed;
      }
      if (myBarY <= 0) {
         myBarY = 0;
      }
      if (myBarY + myBarHeight >= height) {
         myBarY = height - myBarHeight;
      }

      // if (y < yourBarY + yourBarHeight / 2) {
      //    yourBarY -= myBarSpeed;
      // }
      // if (y > yourBarY + yourBarHeight / 2) {
      //    yourBarY += yourBarSpeed;
      // }
      // if (yourBarY <= 0) {
      //    yourBarY = 0;
      // }
      // if (yourBarY + yourBarHeight >= height) {
      //    yourBarY = height - yourBarHeight;
      // }
   }
   refreshVsComputer = setInterval(computer, 1);
}

function blueWin() {
   ctx.clearRect(width / 2 - 1, 0, 2, height);
   ctx.font = "150px Arial";
   ctx.fillStyle = "blue";
   ctx.fillText("Blue wins!", width / 2 - 320, height / 2);
   ctx.font = "80px Arial";
   ctx.fillStyle = "black";
   ctx.fillText("1 VS 1 : Enter", 200, height / 1.5);
   ctx.fillText("VS 컴퓨터 : C", 780, height / 1.5);
   clearInterval(refresh);
   clearInterval(refreshVsComputer);
   enter = true;
}
function redWin() {
   ctx.clearRect(width / 2 - 1, 0, 2, height);
   ctx.font = "150px Arial";
   ctx.fillStyle = "red";
   ctx.fillText("Red wins!", width / 2 - 300, height / 2);
   ctx.font = "80px Arial";
   ctx.fillStyle = "black";
   ctx.fillText("1 VS 1 : Enter", 200, height / 1.5);
   ctx.fillText("VS 컴퓨터 : C", 780, height / 1.5);
   clearInterval(refresh);
   clearInterval(refreshVsComputer);
   enter = true;
}
function firstScreen() {
   ctx.fillStyle = "snow";
   ctx.fillRect(0, 0, width, height);
   ctx.fillStyle = "skyblue";
   ctx.fillRect(0, 60, width / 2, 260);
   ctx.fillStyle = "pink";
   ctx.fillRect(width / 2, 60, width / 2, 260);
   ctx.font = "140px Arial";
   ctx.fillStyle = "blue";
   ctx.fillText("Tennis", width / 2 - 430, 250);
   ctx.fillStyle = "red";
   ctx.fillText("Crash", width / 2 + 20, 250);
   ctx.font = "80px Arial";
   ctx.fillStyle = "black";
   ctx.fillText("1 VS 1 : Enter", 210, 410);
   ctx.fillText("VS 컴퓨터 : C", 780, 410);
   ctx.font = "40px Arial";
   ctx.fillStyle = "grey";
   ctx.fillText("Blue 조작키 : 위 w 아래 s", 270, 500);
   ctx.fillText("Red 조작키 : 위 ↑ 아래 ↓", 780, 500);
   ctx.fillText("공을 비껴치면 각도 조정됩니다", 490, 580);
   ctx.fillStyle = "purple";
   ctx.fillText("게임 종료 : ESC", 600, 660);
   enter = true;
};
firstScreen();
document.onkeydown = function (event) {   // 키보드가 눌렸을 때 호출되는 함수
   if (event.keyCode === 83)   // s가 눌린 경우
      myDown = true;
   if (event.keyCode === 87) // w가 눌린 경우
      myUp = true;
   if (event.keyCode === 40) {
      yourDown = true;
      event.preventDefault();
   }
   if (event.keyCode === 38) {
      yourUp = true;
      event.preventDefault();
   }

   if (event.keyCode === 13 && enter) {
      init();
      enter = false;
   }
   if (event.keyCode === 67 && enter) {
      init();
      vsComputer();
      enter = false;
   }
   if (event.keyCode === 27) {
      clearInterval(refresh);
      clearInterval(refreshVsComputer);
      firstScreen();
   }
}

document.onkeyup = function (event) {  // 키보드가 눌렸다가 풀린 경우 호출되는 함수
   if (event.keyCode === 83)   // s인 경우
      myDown = false;
   if (event.keyCode === 87) // w인 경우
      myUp = false;
   if (event.keyCode === 40) {
      yourDown = false;
      event.preventDefault();
   }
   if (event.keyCode === 38) {
      yourUp = false;
      event.preventDefault();
   }
}