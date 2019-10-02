var show_explain = document.getElementById("show_explain");
function explain(param) {
   var el = param;
   if (el.id === "erase") {
      show_explain.innerHTML = "한 글자씩 삭제";
   } else if (el.id === "clear") {
      show_explain.innerHTML = "화면 초기화";
   } else if (el.id === "plus") {
      show_explain.innerHTML = "더하기";
   } else if (el.id === "times") {
      show_explain.innerHTML = "곱하기";
   } else if (el.id === "minus") {
      show_explain.innerHTML = "빼기";
   } else if (el.id === "divide") {
      show_explain.innerHTML = "나누기";
   } else if (el.id === "Brace") {
      show_explain.innerHTML = "괄호(열고 닫기 자동 변환)";
   } else if (el.id === "hist") {
      show_explain.innerHTML = "계산 기록 보기";
   } else if (el.id === "equal") {
      show_explain.innerHTML = "계산 결과";
   } else if (el.id === "dot") {
      show_explain.innerHTML = "소수점";
   }
}
function eraseDisplay() {
   document.getElementById("show_explain").innerHTML = "";
}

var display = document.getElementById("display");
var duplicate_sign = '';
var sign_before_num = 'yes';
function num(input) {        // 숫자와 연산자를 입력 받음
   if (display.innerHTML === '') {
      sign_before_num = 'yes';
   }
   if (input === '*' || input === '+' || input === '/' || input === '-') {
      if (sign_before_num === 'yes') {
         show_explain.innerHTML = "숫자 먼저 입력하세요";
      } else {
         if (duplicate_sign === 'yes') {
            show_explain.innerHTML = "기호 중복 입력";
         } else {
            show_explain.innerHTML = "두 줄까지 입력";
            display.innerHTML += input;
            duplicate_sign = 'yes';
         }
      }
   } else {
      display.innerHTML += input;
      duplicate_sign = 'no';
      sign_before_num = 'no';
   }
}
function erase() {
   display.innerHTML = display.innerHTML.slice(0, -1);
   duplicate_sign = 'no';
   var last_char = display.innerHTML[display.innerHTML.length - 1];
   if (last_char === '*' || last_char === '/' || last_char === '+' || last_char === '-') {
      duplicate_sign = 'yes';
   }
}
function c() {
   display.innerHTML = '';
}
var hist = [];
function answer() {
   if (Number(display.innerHTML[display.innerHTML.length - 1]) >= 0) {
      var answer = eval(display.textContent);
      display.innerHTML += '=' + answer;
      hist.push(display.innerHTML);
   }
}
function brace() {
   if (!isNaN(display.innerHTML[display.innerHTML.length - 1]) || display.innerHTML[display.innerHTML.length - 1] === ")") {
      display.innerHTML += ")";
   } else {
      display.innerHTML += "(";
   }
}
function show_history() {
   display.innerHTML = '';
   for (x of hist.entries()) {
      display.innerHTML += "<" + (Number(x[0]) + 1) + "번째 계산> <br>" + x[1] + '<br>';
   }
}