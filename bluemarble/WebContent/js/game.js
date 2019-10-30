

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
let turnCount = 0;
// 돈 초기화
let money = [0,0,0,0];
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
	
	
	// 플레이 버튼 클릭 
	$("#play").click( function() {		
		if(turn>6){
			alert("게임 종료!! 승자는 누구입니다.");
			return;
		}
			
		
		
		$("#p"+point[0][state]).children("b").remove("#"+(state+1)+"p");
		console.log("일단 지우고 append")
		
		console.log((state+1)+"p 가 주사위 던짐!");
		// 두개 주사위 굴리기
		let ran1 = Math.floor((Math.random() * 6)+1);	//1~6
		let ran2 = Math.floor((Math.random() * 6)+1);	//1~6
		
		// 수 랜덤으로 뽑아 value값에 넣기
		$("#dice1").val(ran1);
		$("#dice2").val(ran2);
		console.log("현재 현황",point[1])

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
		state ++;
		
		// 더블이면 한번 더 
		if(ran1 == ran2){
			alert("더블! 한번 더 굴릴 수 있어요!")
			state--;
		}
		
		if(state > maxState){
			state = 0; 
			turn ++;
			turnCount ++;
			console.log("다음턴! ",turn,"state = "+state);
		}
		
		$("#playersTurn").empty();
		$("#playersTurn").append("<h4><b>플레이어"+(state+1)+"님 차례입니다!</b></h4>");
		
	});
	
})	


//게임 시작 
function gameStart(palyer) {
	console.log("게임 스타트!!! ")
	$("#gameAlert").addClass("no_hover");
//	console.log(this)	
	$("span").empty();
	if(player<3){
		money = [ (2830000*2) , (2830000*2), 0, 0];
	}else{
	money = [ 2830000 , 2830000, 2830000, 2830000];
	}
	for (var i = 0; i <= palyer; i++) {
//		console.log(player[i]);
		$("#p1").append(player[i]);
		$("#"+(i+1)+"pMoney").text(money[i])
		$("#"+(i+1)+"pRound").text(round[i])
	}
	//초기화
	state = turn = turnCount = 0;
	point = [[1, 1, 1, 1], [1,1,1,1]];
	
}