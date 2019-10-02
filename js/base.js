var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.fillStyle = "lime";
setInterval(clear, 500);
setInterval(draw, 1000);
setInterval(time, 500);
function time() {
   var date = new Date();
   var h = date.getHours(); // 0 - 23
   var m = date.getMinutes(); // 0 - 59
   var s = date.getSeconds(); // 0 - 59

   h = (h < 10) ? "0" + h : h;
   m = (m < 10) ? "0" + m : m;
   s = (s < 10) ? "0" + s : s;
   document.getElementById("hour").innerText = h;
   document.getElementById("min").innerText = m;
   document.getElementById("sec").innerText = s;

}
function clear() {
   ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
function draw() {
   ctx.fillRect(120, 70, 10, 10);
   ctx.fillRect(120, 105, 10, 10);
   ctx.fillRect(220, 70, 10, 10);
   ctx.fillRect(220, 105, 10, 10);
}