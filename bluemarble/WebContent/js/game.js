// 플레이어별 말 목록
let player=["<b class='horses' id='1p'>🎠</b>",
			"<b class='horses' id='2p'>🚀</b><br>",
			"<b class='horses' id='3p'>🛫</b>",
			"<b class='horses' id='4p'>🚁</b>" ];

//말이 원래 있었던 장소의 번호 배열 초기화 최대 4개 까지 
let beforePoint = [1, 1, 1, 1];
// 말이 움직일 장소의 번호 배열 초기화 최대 4개까지 
let afterPoint = [1, 1, 1, 1];
//턴 수
let turn = 0;
// 다음턴이 오기까지 
let maxState = 0;
let state = 1;
//무인도에 있을 때 셀 턴수 무인도 도착시 0으로 초기화 
let turnCount = 0;

$(document).ready(function() {
	// 준비 완료 
	console.log("ready");

	// 2인 플레이 
	$("#2people").click( function() {		
		let player = maxState = 2;
		console.log("2인 스타트!");
		alert("2인 스타트!");
		gameStart(player);
	});
	
	// 3인 플레이
	$("#3people").click( function() {
		let player = maxState = 3;
		console.log("3인 스타트!");
		alert("3인 스타트!");
		gameStart(player);
	});
	
	// 4인 플레이
	$("#4people").click( function() {
		let player = maxState = 4;
		console.log("4인 스타트!");
		alert("4인 스타트!");
		gameStart(player);
	});
	
	
	// 플레이 버튼 클릭 
	$("#play").click( function() {
		// 두개 주사위 굴리기
		let ran1 = Math.floor((Math.random() * 6)+1);	//1~6
		let ran2 = Math.floor((Math.random() * 6)+1);	//1~6
		
		// 수 랜덤으로 뽑아 value값에 넣기
		$("#dice1").val(ran1);
		$("#dice2").val(ran2);
		console.log(beforePoint[state])
		// 두 주사위의 수 합 
		let sum = ran1+ran2;
		// 40이 넘으면 다시 1부터 
		if (beforePoint[state] + sum < 41) {
			afterPoint[state] = beforePoint[state] + sum;
			console.log(afterPoint[state])
		} else {
			afterPoint[state] = beforePoint[state] + sum - 40;
		}
		
		$("#point").val(afterPoint[state]);
		console.log($("#point").attr("value"))
		
		// 말을 이동시킵니다.
		let afterId = "#p" + afterPoint[state];
		$(afterId).append(player[state]);
		
		//말을 지움
		let beforeId = "#p" + beforePoint;

		beforePoint[state] = afterPoint[state];
		state ++;
		
		if(state == maxState){
			state = 1; 
			turn ++;
			turnCount ++;
		}
	});
	
})	


//게임 시작 
function gameStart(palyer) {
	$("#gameAlert").addClass("no_hover");
//	console.log(this)	
	$("#p1").empty();
	for (var i = 0; i < palyer; i++) {
//		console.log(player[i]);
		$("#p1").append(player[i]);
	}
	
	
}