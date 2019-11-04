console.log("functions ready");

//게임 시작 
function gameStart(players) {
	console.log((players+1)+"인 게임 스타트! ")
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
	turnCount = [0, 0, 0, 0];
	
	// n인 스타트 ! 알림
	$("#playersTurn").empty();
	$("#playersTurn").append("<strong class='text-danger'>"+(maxState+1)+"인 게임 스타트!!!</strong>");	
}

function rollDice() {
	
	// 두개 주사위 굴리기
	let ran1 = Math.floor((Math.random() * 6)+1);	//1~6
	let ran2 = Math.floor((Math.random() * 6)+1);	//1~6
	
	// 수 랜덤으로 뽑아 value값에 넣기
	$("#dice1").val(ran1);
	$("#dice2").val(ran2);		
	console.log("현재 현황",point[1])
	return ran1, ran2;
}

// 무인도 검사 
function atDesertIsland(ran1, ran2){
	
	// 무인도에 있는지 검사 
	console.log("atDesertIsland ")
	
	// 해당 플레이어의 무인도에 머문 턴수 증가
	turnCount[state]++;
	
	// 무인도에 더블로 들어온 경우
	if(ran1==ran2 && turnCount[state]<2){		
		console.log("더블이 떴는데 무인도 도착.. ㅜ");
		return true;
	}
	if(ran1 != ran2 && turnCount[state] <4){
		// 더블이 아니고 턴수가 충족되지 않으면  여전히 무인도에 
		console.log("더블도 아니고 3턴도 지나지 않았군요. 한턴 쉽니다. 무인도에 머문 턴수: "+turnCount[state]);
		return true;
	}
	if(ran1==ran2 && turnCount[state]>=2){
		turnCount[state] = 0;
		console.log("더블이다!!! 무인도 탈출 !");
		return false;
	}
	
	turnCount[state] =0;
	console.log("무인도 탈출~!");		
	return false;
	
	
}

// 알림창에 정보 입력 
function insertLandInfo(landNum, state) {
	// 배열을 불러올때 배열은 0부터 시작하므로 함수에 값을 넣어줄 때 변수에서 반드시 1을 뺀 값이 들어올 수 있도록 해줄 것!!!
	console.log(lands[landNum]);
	
	// 글자 비우기
	$("#landName").empty();
	$("#landPrice").empty();
	$("#house1Price").empty();
	$("#house2Price").empty();
	$("#buildingPrice").empty();
	$("#hotelPrice").empty();
	$("#remainMoney").empty();
	$("#landModal-footer").empty();
	
	
	// 값 출력
	$("#landName").text(lands[0][landNum]);
	$("#landPrice").text(lands[1][landNum]);
	$("#house1Price").text(lands[2][landNum]);
	$("#house2Price").text(lands[3][landNum]);
	$("#buildingPrice").text(lands[4][landNum]);
	$("#hotelPrice").text(lands[5][landNum]);
	
	console.log("잔액: " ,money[state]);
	$("#remainMoney").text(money[state]);
	
	if(lands[6][landNum] <=0){
		$("#landModal-footer").append("<button type='button' class='btn btn-block btn-danger' data-dismiss='modal'>아무것도 안할래요.(내 차례 넘기기) </button>");
	}
	
}

// 주사위 굴려 게임 진행하기
function letsMove(ran1, ran2) {	
	console.log("letsMove")


	
	$("#playersTurn").empty();
	$("#playersTurn").append("<strong class='text-primary'>플레이어"+(state+1)+"</strong>님 차례입니다!");	
	
	// 두 주사위의 수 합 
	let sum = ran1+ran2;
	
	// 40이 넘으면 다시 1부터 
	if (point[0][state] + sum < 41) {
		point[1][state] = point[0][state] + sum;
	} else {
		point[1][state] = point[0][state] + sum - 40;
//		round[state]++;
		$("#playersTurn").append("<p class='text-success italic bold' style='margin-top:8px; font-style:italic'>플레이어"+state+"님에게 월급지급!</p>");
		money[state] +=20;
	}

	console.log("결과:",point[1][state])
	$("#point").val(point[1][state]);
	
	// 무인도 검사
	if( point[0][state] == 11 && atDesertIsland(ran1, ran2)){
		console.log("!!!무인도에 있음!!!");	
	}else{
		// 말 지우기
		$("#p"+point[0][state]).children("b").remove("#"+(state+1)+"p");
		// 말을 이동시킵니다.
		let afterId = "#p" + point[1][state];
		$(afterId).append(player[state]);
		point[0][state] = point[1][state];
		// 말을 움직이고 무인도 확인.
		if(point[1][state] == 11){
			setTimeout(function() {
				alert("무인도 입니다! 갇히셨어요! :( ");
				atDesertIsland(ran1, ran2);
			}, 300)	
			state++;
			checkMax();
			return;
		}
	}
	
	// 더블이면 한번 더 
	if(ran1 == ran2){
		console.log("더블이다! 한번더!");
		if(point[1][state] == 11 || point[0][state] == 11){
			console.log("취소")
			return;
		}
		state--;
		$("#playersTurn").append("<p class='text-warning italic' style='margin-top:8px; font-style:italic'>더블입니다! 한번 더!</p>");
		
	}
	
	console.log("도착한 곳 : ",lands[0][point[1][state]-1]);
	
	if(point[1][state] == 1){ //출발지점에 정착시 월급만 줄 것.
		$("#playersTurn").append("<p class='text-success italic bold' style='margin-top:8px; font-style:italic'>플레이어"+state+"님에게 월급지급!</p>");
		money[state] +=20;
	}else if(lands[0][point[1][state]-1] === "🔑 황금열쇠"){
		console.log("황금 열쇠를 뽑습니다.!")
	}else{
		// 토지 정보 알림창에 입력
		insertLandInfo(point[1][state]-1, state);
		// 알림창 출력
		 $("#landConfirm").modal({backdrop: 'static'});
	}
	
	// 턴수 증가 
	state++;
	
	checkMax();
	
}

function checkMax() {
	console.log("checkMax")
	if(this.state > this.maxState){
		this.state = 0; 
		// 진행된 턴수 증가 
		this.turn ++;
		console.log("턴증가! ",this.turn,"state = "+this.state);
	}
}


