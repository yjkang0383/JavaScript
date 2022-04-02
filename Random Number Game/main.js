// 랜덤 번호 지정

let computerNum = 0;
let play_button = document.getElementById("play-button");
let user_input = document.getElementById("user-input");
let result_area = document.getElementById("result-area");
let chance_area = document.getElementById("chance-area");
let reset_button = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let history = []

play_button.addEventListener("click",play);
reset_button.addEventListener("click",reset);
user_input.addEventListener("focus", function(){user_input.value = ""});

function PickRandomNum(){ //랜덤 숫자를 뽑는 함수
    computerNum = Math.floor(Math.random() * 100) + 1; // 1~100 범위의 랜던 숫자를 뽑는 함수
    console.log("정답",computerNum);
}

function play(){ //사용자의 숫자를 받아오는 함수
    let userValue = user_input.value;
    
    if(userValue <= 0 || userValue == "" || userValue > 100 ){
        result_area.textContent = "번호를 다시 입력해주세요";
        ++chances;
        chance_area.textContent = `남은기회 : ${chances} 번`;
    }

    if(history.includes(userValue)){
        result_area.textContent="이미 입력한 숫자 입니다. 다른 숫자를 입력하시오"
        return;
    }
    
    chances--;
    chance_area.textContent = `남은기회 : ${chances} 번`;
    
    if(userValue > 0 && userValue < computerNum){
        result_area.textContent = "UP";

    }else if(userValue > 0 && userValue > computerNum){
        result_area.textContent = "DOWN";

    }else if(userValue == computerNum){
        result_area.textContent = "Correct";

    }

    history.push(userValue)

    if(chances < 1){
        gameOver = true;
    }
    if(gameOver == true){
        play_button.disabled = true;
    }
}

function reset(){
    user_input.value = "";
    result_area.textContent = "결과 값이 이곳에 나옵니다.";
    PickRandomNum();
}

PickRandomNum();