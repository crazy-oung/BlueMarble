console.log()
// 전역 변수 선언 
// 플레이어별 말 목록
let player=["<b class='horses' id='1p'>🎠</b>",
			"<b class='horses' id='2p'>🚀</b>",
			"<b class='horses' id='3p'>🛫</b>",
			"<b class='horses' id='4p'>🚁</b>" ];

let round = [0,0,0,0];
//말이 원래 있었던 장소의 번호 배열 초기화 최대 4개 까지 & 말이 움직일 장소의 번호 배열 초기화 최대 4개까지 
let point = [[1, 1, 1, 1], [1,1,1,1]];
// 
//턴 수
let turn = 0;
// 인원수
let maxState = 0;
// 플레이어 차례
let state = 0;
//무인도에 있을 때 셀 턴수 무인도 도착시 0으로 초기화 
let turnCount = [0, 0, 0, 0];
// 돈 초기화
let money = [0,0,0,0];
// 기부금 초기화
let donation = 0;
// 출발지점 + 국가 이름, 땅 값, 별장1 값, 별장2 값, 빌딩 , 호텔 값 초기화
let lands = [[	"🏁 출발지점!",		// 0번  칸 이름 
					"타이베이","🔑 황금열쇠","베이징","마닐라","🗻 제주","싱가포르","🔑 황금열쇠","카이로","이스탄불","무인도",
					"아테네","🔑 황금열쇠","코펜하겐","스톡홀름","콩코드여객기","베른","🔑 황금열쇠","베를린","오타와","사회복지기금 접수처",
					"부에노스아이레스","🔑 황금열쇠","상파올루","시드니","부산","하와이","리스본","퀸엘리자베스호","마드리드","우주여행",
					"도쿄","컬럼비아호","파리","로마","🔑 황금열쇠","런던","뉴욕","사회복지기금","서울"
				],
				[	"출발지점 월급을 받습니다.",	// 토지  출발지점은 월급을 준다.	1번
					5, 0, 8, 8, 20, 10, 0, 10, 12, 0,
					14, 0, 16, 16, 20, 18, 0, 18, 20, 0,
					22, 0, 24, 24, 50, 26, 26, 30, 28, 20,
					30, 45, 32, 32, 0, 35, 35, 15 ,100
				],
				[	0, 	//별장1		2번
					5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 
					5, 5, 5, 5, 6, 6, 6, 6, 6, 6,
					6, 6, 6, 6, 7, 7, 7, 7, 7, 7,
					7, 7, 7, 7, 7, 7, 7, 7, 7
				],
				[	0,	//별장2		3번
					5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 
					5, 5, 5, 5, 6, 6, 6, 6, 6, 6,
					6, 6, 6, 6, 7, 7, 7, 7, 7, 7,
					7, 7, 7, 7, 7, 7, 7, 7, 7
				],
				[	0,	//빌딩		4번
					18, 0, 18, 18, 18, 18, 18, 18, 18, 0, 
					25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 
					30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 
					35, 35, 35, 35, 35, 35, 35, 35, 35, 
				],
				[	0,	//호텔		5번
					35, 35, 35, 35, 35, 35, 35, 35, 35, 0,
					50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 
					75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 
					75, 75, 75, 100, 100, 100, 105, 105, 110
				],
				[	0,	// 소유자 저장 		6번!
					0,99,0,0,0,0,99,0,0,0,
					0,99,0,0,0,0,99,0,0,0,
					0,99,0,0,0,0,0,0,0,0,
					0,0,0,0,99,0,0,0,0
				]
];
// 황금 열쇠 
let goldenKey = [ "축하합니다 ! 장학금 20만원을 받게 되었어요 !!",
	"이런! 밀렸던 세금을 내야 합니다. 15만원을 지불하세요.", "출발지점으로 가서 월급 20만원을 받으세요. 야호!"	
];

// 게임 진행 코드 시작
$(document).ready(function() {
	
	// 준비 - 자바스크립트 로드  
	console.log("document ready");
	$.getScript("/bluemarble/js/functions.js");	
	console.log("환영합니다.");
	
	// 2인 플레이 
	$("#2people").click( function() {		
		let player = maxState = 1;
		gameStart(player);
	});
	
	// 3인 플레이
	$("#3people").click( function() {
		let player = maxState = 2;
		gameStart(player);
	});
	
	// 4인 플레이
	$("#4people").click( function() {
		let player = maxState = 3;
		gameStart(player);
	});
	
	
	// 구매- 대지 버튼 
	$("#buyLand").click( function() {
		
		let landNum = point[1][state-1] - 1 ;
		console.log((landNum+1)+"칸에 도착! 수정할 lands배열 인덱스 번호: "+landNum);
		console.log(state+"플레이어의 돈 : "+money[state]);
		console.log("대지 구입! 지불비용: "+ lands[1][landNum] );
		
		money[state] -= lands[1][landNum];
		
		console.log("잔액: "+money[state]);
		
		$("#"+(state)+"pMoney").text(money[state])
		
		// 토지 소유주 지정
		lands[6][landNum] = state-1;
		console.log(lands[6][landNum]);
		
		console.log("새로운 토지 소유자 플레이어"+(state)+"님!!! "+lands[0][landNum]+"의 소유주(players배열 인덱스번호:"+lands[6][landNum]+")가 되셨습니다 ~!");
		$("#landConfirm").modal("hide"); // 구입창 닫기	
	});

	// 구매- 별장1 버튼 클릭시
	$("#buyHouse1").click( function() {
		console.log("별장1 구입!");
		
		$("#landConfirm").modal("hide"); //닫기 
	});
	
	// 구매- 별장2 버튼 클릭시
	$("#buyHouse2").click( function() {
		console.log("별장2 구입!");
		
		$("#landConfirm").modal("hide"); //닫기 
	});
	
	// 구매- 빌딩 버튼 클릭시
	$("#buyBuilding").click( function() {
		console.log("빌딩 구입!");
		
		$("#landConfirm").modal("hide"); //닫기 
	});
	
	// 구매- 호텔 버튼 클릭시
	$("#buyHotel").click( function() {
		console.log("호텔 구입!");
		
		$("#landConfirm").modal("hide"); //닫기 
	});
	
	// 건너뛰기- 대지 버튼 클릭시
	$("#cancelBuy").click( function() {
		$("#landConfirm").modal("hide"); //닫기 
		
	});
	
	
	// 플레이 버튼 클릭 click!!!!
	$("#play").click( function() {		
		
		console.log("주사위를 굴렸습니다!");
		rollDice();	// 랜덤으로 수를 뽑는 함수
		
		$("#playersTurn").empty();
		$("#playersTurn").append("<strong class='text-primary'>플레이어"+(state+1)+"</strong>님의 턴이 지났어요!");	
		
		console.log("다음 차례인 플레이어 출력!")
		console.log((state+1)+"p 가 주사위 던짐!");
		// 턴 검사
//		if(turn>20){
//			alert("게임 종료!! 승자는 누구입니다.");
//			return;
//		}	

		// 게임 진행 
		letsMove(ran1, ran2);
		
		console.log("다음 플레이어로 차례가 넘어갔습니다.");
		state++;
		checkMax();
		
	});
	
	
	
	//무인도 테스트용 버튼	
	$("#gotoIsland").click( function() {		
		console.log((state+1)+"p 가 주사위 던짐! 무인도 테스트"); 
		
		// 두개 주사위 굴리기
		let ran1 = 5;	 
		let ran2 = 5;	 
		 
		$("#dice1").val(ran1);
		$("#dice2").val(ran2);		
		console.log("현재 현황",point[1])
		
		// 게임 진행 
		letsMove(ran1, ran2);
		
	});
	
	//우주여행 테스트용 버튼	
	$("#goSpaceTravel").click( function() {		
		console.log((state+1)+"p 가 주사위 던짐! 우주여행 테스트");  
		
		// 두개 주사위 굴리기
		let ran1 = 20;	 
		let ran2 = 10;	 
		 
		$("#dice1").val(ran1);
		$("#dice2").val(ran2);		
		console.log("현재 현황",point[1])
		
		// 게임 진행 
		letsMove(ran1, ran2);
		
	});
	
})	

