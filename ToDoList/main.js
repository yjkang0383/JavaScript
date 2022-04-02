let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div") //querySelectorAll 는 ""조건에 맞는 값을 다 가져 오겠다.
let mode = "all";
let filterList = [];

addButton.addEventListener("click",addTask);
taskInput.addEventListener("focus",function(){taskInput.value=""});

for(let i = 1; i < tabs.length; i++) //.task-tabs div 리스트중 [1]번째 
{
    tabs[i].addEventListener("click",function(event){filter(event)})
}

function addTask(){
    if(taskInput.value != ""){
        let task = { //필요한 관련 정보를 여러개 만들어준다.
            id: randomIDGenerate(), //랜덤 유니크 아이디 생성하는 함수 호출
            taskContent: taskInput.value,
            isComplete:false 
        };
        taskList.push(task);
        render();
        taskInput.value="";
    }else{
        taskInput.value="내용을 입력해주세요";
    }
}

function render(){
    let list=[];

    if(mode == "all"){
        list = taskList;
    }else if(mode =="ongoing" || mode == "done"){
        list = filterList;
    }

    let resultHTML = "";
    for(let i = 0 ; i < list.length ; i++){
        if(list[i].isComplete == true){
             resultHTML += `<div class ="task">
            <div class = "task-done"> ${list[i].taskContent} </div>
                    <div>
                            <button onclick = "toggleComplete('${list[i].id}')"> + </button>
                            <button onclick = "toggleDelete('${list[i].id}')"> - </button>
                    </div>
            </div>`;}
            else{
                resultHTML += `<div class ="task">
                <div> ${list[i].taskContent} </div>
                    <div>
                            <button onclick = "toggleComplete('${list[i].id}')"> + </button>
                            <button onclick = "toggleDelete('${list[i].id}')"> - </button>
                    </div>
            </div>`;}
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i = 0; i < taskList.length ; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete; //현재 값의 반대 값을 넣어줌(스위치)
            break;
        }
    }
    render();

}

function toggleDelete(id){
    for(let i = 0; i < taskList.length ; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1); 
            break;
        }
    }
    render();
}

function filter(event){
    mode = event.target.id;
    filterList = [];

    document.getElementById("under-line").style.width = event.target.offsetWidth + "px";
    document.getElementById("under-line").style.top = event.target.offsetTop + event.target.offsetHeight + "px";
    document.getElementById("under-line").style.left = event.target.offsetLeft + "px";


    if(mode =="all"){
        render();
    }else if(mode =="ongoing"){
        for(let i = 0 ; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        render();
    }else if(mode == "done"){
        for(let i = 0 ; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

function randomIDGenerate(){ //랜덤 유니크 아이디 생성하는 함수
    return '-'+Math.random().toString(36).substr(2,9);
}