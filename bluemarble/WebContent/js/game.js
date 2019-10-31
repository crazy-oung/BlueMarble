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
let state = 0;
//무인도에 있을 때 셀 턴수 무인도 도착시 0으로 초기화 
let turnCount = [0, 0, 0, 0];
// 돈 초기화
let money = [0,0,0,0];
// 출발지점 + 국가 이름, 땅 값, 별장1 값, 별장2 값, 빌딩 , 호텔 값 초기화
let lands = [[	"출발지점!",
					"타이베이","황금열쇠","베이징","마닐라","제주","싱가포르","화금열쇠","카이로","이스탄불","무인도",
					"아테네","황금열쇠","코펜하겐","스톡홀름","콩코드여객기","베른","황금열쇠","베를린","오타와","사회복지기금 접수처",
					"부에노스아이레스","황금열쇠","상파올루","시드니","부산","하와이","리스본","퀸엘리자베스호","마드리드","우주여행",
					"도쿄","컬럼비아호","파리","로마","황금열쇠","런던","뉴욕","사회복지기금","서울"
				],
				[	20,	// 땅값 출발지점은 월급을 준다.
					5, 0, 8, 8,20, 10, 0, 10, 12, 0,
					14, 0, 16, 16, 20, 18, 0, 18, 20, 0,
					22, 0, 24, 24, 50, 26, 26, 30, 28, 20,
					30, 45, 32, 32, 0, 35, 35, 15 ,100
				],
				[	0, 	//별장1
					5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 
					5, 5, 5, 5, 6, 6, 6, 6, 6, 6,
					6, 6, 6, 6, 7, 7, 7, 7, 7, 7,
					7, 7, 7, 7, 7, 7, 7, 7, 7
				],
				[	0,	//별장2
					5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 
					5, 5, 5, 5, 6, 6, 6, 6, 6, 6,
					6, 6, 6, 6, 7, 7, 7, 7, 7, 7,
					7, 7, 7, 7, 7, 7, 7, 7, 7
				],
				[	0,	//빌딩
					18, 0, 18, 18, 18, 18, 18, 18, 18, 0, 
					25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 
					30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 
					35, 35, 35, 35, 35, 35, 35, 35, 35, 
				],
				[	0,	//호텔
					35, 35, 35, 35, 35, 35, 35, 35, 35, 35,
					50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 
					75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 
					75, 75, 75, 100, 100, 100, 105, 105, 110
				],
				[	
					
				]
];

$(document).ready(function() {
	// 준비 완료 
	console.log("ready");

	// 2인 플레이 
	$("#2people").click( function() {		
		let player = maxState = 1;
		console.log("2인 스타트!");
		alert("2인 스타트!");
		gameStart(player);
	});
	
	// 3인 플레이
	$("#3people").click( function() {
		let player = maxState = 2;
		console.log("3인 스타트!");
		alert("3인 스타트!");
		gameStart(player);
	});
	
	// 4인 플레이
	$("#4people").click( function() {
		let player = maxState = 3;
		console.log("4인 스타트!");
		alert("4인 스타트!");
		gameStart(player);
	});
	
	
	// 플레이 버튼 클릭 click!!!!
	$("#play").click( function() {		
		if(turn>50){
			alert("게임 종료!! 승자는 누구입니다.");
			return;
		}
		
		
		console.log((state+1)+"p 가 주사위 던짐!");
		// 두개 주사위 굴리기
		let ran1 = Math.floor((Math.random() * 6)+1);	//1~6
		let ran2 = Math.floor((Math.random() * 6)+1);	//1~6
		
		// 수 랜덤으로 뽑아 value값에 넣기
		$("#dice1").val(ran1);
		$("#dice2").val(ran2);		
		console.log("현재 현황",point[1])
		
		// 무인도에 있는지 검사 
		if(point[0][state] == 11){
			console.log("무인도에 있습니다. 검사합니다. ")
			
			// 더블이 아니면 리턴
			if(ran1 != ran2 && turnCount[state] <4){
				turnCount[state]++;
				////// 표시!!
				if(state > maxState){
					state = 0; 
					turn ++;
					console.log("다음턴! ",turn,"state = "+state);
				}
				// 다음 플레이어로 타자 이동
				state ++;
				return;
			}
			turnCount[state] =0;
			console.log("더블이 나오거나 3턴째를 지났음 ㅎㅎㅎ");
		}
		
		$("#p"+point[0][state]).children("b").remove("#"+(state+1)+"p");
		console.log("erase and move")
		// 두 주사위의 수 합 
		let sum = ran1+ran2;
		// 40이 넘으면 다시 1부터 
		if (point[0][state] + sum < 41) {
			point[1][state] = point[0][state] + sum;
		} else {
			point[1][state] = point[0][state] + sum - 40;
		}

		console.log("결과:",point[1][state])
		$("#point").val(point[1][state]);
		
		// 말을 이동시킵니다.
		let afterId = "#p" + point[1][state];
		$(afterId).append(player[state]);
		point[0][state] = point[1][state];
		
		
		
		
		$("#playersTurn").empty();
		$("#playersTurn").append("플레이어"+(state+1)+"님 차례입니다!");
		
		// 무인도 도착시 더블 효과 실행 안함. 
		if(point[1][state] == 11 ){
			console.log("!!!무인도!!!");
			alert("무인도에요!")
			turnCount[state]++;
			console.log(turnCount[state]+"턴째! 무인도에 서식중 ..");
			if(turnCount[state]>3){
				turnCount[state]=0;
				
			}
			return;
		}
		
		// 더블이면 한번 더 
		if(ran1 == ran2){
			// alert("더블! 한번 더 굴릴 수 있어요!")
			return;
		}
		state++;
		if(state >= maxState){
			state = 0; 
			turn ++;
			console.log("다음턴! ",turn,"state = "+state);
		}
		
	});
	
})	

function buy(n){
	
}




//게임 시작 
function gameStart(players) {
	console.log("게임 스타트!!! ")
	$("#gameAlert").addClass("no_hover");
//	console.log(this)	
	$("span").empty();
	if(players == 1){
		money = [ (283*2) , (283*2), 0, 0];
	}else if(players == 3){
		money = [ 283 , 283, 283, 283];
	}else{
		money = [ 283 , 283, 283, 0];
	}
	for (var i = 0; i <= players; i++) {
//		console.log(player[i]);
		$("#p1").append(player[i]);
		$("#"+(i+1)+"pMoney").text(money[i])
		$("#"+(i+1)+"pRound").text(round[i])
	}
	//초기화
	state = turn = turnCount = 0;
	point = [[1, 1, 1, 1], [1,1,1,1]];
	
}