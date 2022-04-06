let news =[]

//버튼만들기
let menus = document.querySelectorAll(".menus button"); // 버튼 가져오기
menus.forEach(menu => 
    menu.addEventListener("click",(event)=>getNewsByTopic(event))
    );

//키워드별 보기 
let searchButton = document.getElementById("search-button");

const getLatestNews = async() => {
    let url = new URL(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`
        );

    let header = new Headers({
        "x-api-key":"0v5vhAdVSOVgqDOZm72dUoJOan0o3jHvih8FtO0b4tQ",
    });

    let response = await fetch(url, {headers:header}); //ajax, http, fetch
    //fetch : 서버와 통신하는 애라 기다려야함
    //await : 강제로 fetch라는 함수를 기다려줌 
    //async : await을 사용하려면 함수를 async로 만들어준다

    let data = await response.json() //서버통신에 가장 많이 사용되는 데이터타입 (객체 타입 같은 역할을 함), 통째로 외우는게 좋음

    news = data.articles
    console.log(news);

    render();
};


//버튼만들기 함수
const getNewsByTopic = async (event)=>{
    console.log(event.target.textContent);
    let topic = event.target.textContent.toLowerCase();
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`)

    let header = new Headers({
        "x-api-key":"0v5vhAdVSOVgqDOZm72dUoJOan0o3jHvih8FtO0b4tQ",
    });
    let response = await fetch(url, {headers:header}); //ajax, http, fetch
    let data = await response.json()

    //필터링된 데이터를 뽑아 낸다.
    news=data.articles;
    render();
};

//키워드 가져오기 
const getNewsByKeyword = async ()=>{

    //1. 검색 키워드 읽어오기
    //2. url 검색 키워드 부치기
    //3. 헤더준비
    //4. url 부르기
    //5. 데이터 가져오기
    //6. 데이터 불러오기 

    let keyword = document.getElementById("search-input").value; 
    let url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`);


    let header = new Headers({
        "x-api-key":"0v5vhAdVSOVgqDOZm72dUoJOan0o3jHvih8FtO0b4tQ",
    });

    let response = await fetch(url, {headers:header}); //ajax, http, fetch
    //fetch : 서버와 통신하는 애라 기다려야함
    //await : 강제로 fetch라는 함수를 기다려줌 
    //async : await을 사용하려면 함수를 async로 만들어준다

    let data = await response.json() //서버통신에 가장 많이 사용되는 데이터타입 (객체 타입 같은 역할을 함), 통째로 외우는게 좋음
    news = data.articles;
    render();
};

const render = () => {
    //배열 news 원소를 하나하나 꺼내어서 붙여넣기 해야함
    let newsHTML = "";    
    newsHTML=news.map((news)=>{
        return `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src = "${news.media ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                //사진이 없다면 No Image 사진 넣기
            }" />
        </div>
        
        <div class="col-lg-8">
            <h2> "${news.title}" </h2>
            <P>
            "${news.summary == null || news.summary == "" ? "내용없음" 
                : news.summary.length > 200 ? news.summary.substring(0, 200) + "..." : news.summary}"
            </P>    
            <div> ${news.rights || "no source"}  ${moment(news.published_date).fromNow()}</div>     
            
        </div>
    </div>`;

    }).join(''); //map은 배열이기 때문에 ','콤마까지 출력하기 때문에 array를 String 타입으로 해줘야함. -> Array.prototype.join() 함수 사용

    document.getElementById("news-board").innerHTML=newsHTML;
};

//키워드별 보기
searchButton.addEventListener("click",getNewsByKeyword);

getLatestNews();