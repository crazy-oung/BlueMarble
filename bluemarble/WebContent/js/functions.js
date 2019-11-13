console.log("functions ready");

//게임 시작 
function gameStart(players) {
	console.log((players+1)+"인 게임 스타트! ")
	$("#gameAlert").addClass("no_hover");
//	console.log(this)	
	$("span").empty();
	switch (players){
    case 1 :
    	money = [ (283*2) , (283*2), 0, 0];
        break;
    case 2 :
    	money = [ 283 , 283, 283, 0];
        break;
    case 3 :
    	money = [ 283 , 283, 283, 283];
        break;
    default :
    	alert("오류!!!게임을 다시 시작해주세요 ");
	}
	
	for (var i = 0; i <= players; i++) {
//		console.log(player[i]);
		$("#p1").append(player[i]);
		$("#"+(i+1)+"pMoney").text(money[i])
		$("#"+(i+1)+"pRound").text(round[i])
	}
	
	//초기화
	state = turn = donation = 0;	// 차례, 진행된 턴, 기부금
	point = [[1, 1, 1, 1], [1,1,1,1]];	// 방문 땅
	turnCount = round = [0, 0, 0, 0];	// 무인도 잔류 턴수, 돌은 바퀴수 
	console.log("초기화: "+state, turn, donation, point, turnCount, round);
	
	// n인 스타트 ! 알림
	$("#playersTurn").empty();
	$("#playersTurn").append("<strong class='text-danger'>"+(maxState+1)+"인 게임 스타트!!!</strong><br>");	
	$("#playersTurn").append("<strong class='text-primary'>플레이어"+(state+1)+"</strong>님 차례입니다!");	
}

// 주사위 굴림 함수 
function rollDice() {
	console.log("rolled Dice!!");
	
	// 두개 주사위 굴리기
	ran1 = Math.floor((Math.random() * 6)+1);	//1~6
	ran2 = Math.floor((Math.random() * 6)+1);	//1~6
	
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
	
	// 더블이 아니고 턴수가 충족되지 않으면  무인도에 잔류
	if(ran1 != ran2 && turnCount[state] <4){ 
		console.log("더블도 아니고 3턴도 지나지 않았군요. 한턴 쉽니다. 무인도에 머문 턴수: "+turnCount[state]);
		return true;
	}
	
	// 더블이 나오고 1턴 이상 잔류 했을 시 탈출.
	if(ran1==ran2 && turnCount[state]>=2){
		turnCount[state] = 0;
		console.log("더블이다!!! 무인도 탈출 !");
		return false;
	}
	
	// 4턴이상 잔류했을 때 탈출한다.
	turnCount[state] = 0;
	console.log("무인도 탈출~!");		
	return false;
	
	
}

// 우주여행 함수 
function moveTo() {
	console.log("우주여행 떠날 곳 고르는 중...");
	
	// 알림창 출력
	 $("#spaceTravelAlert").modal({backdrop: 'static'});
	
	return;
}

// 월급 지급 함수
function getSalary() {
	console.log("getSalary 월급을 받습니다.")
	
	$("#playersTurn").append("<p class='text-success italic bold' style='margin-top:8px; font-style:italic'>플레이어"+(state+1)+"님에게 월급지급!</p>");
	money[state] +=20;	// 월급 지급 
	console.log("잔고: "+money[state]);
	resetPlayerMoney(state);
	return;
}

 

// 주사위 굴려 게임 진행하기
function letsMove(ran1, ran2) {	
	console.log("letsMove")
	
	// 두 주사위의 수 합 
	let sum = ran1+ran2;
	
	// 40이 넘으면 다시 1부터 
	if (point[0][state] + sum < 41) {
		point[1][state] = point[0][state] + sum;
	} else {
		point[1][state] = point[0][state] + sum - 40;
		round[state]++;
		getSalary();	// 월급 지급 
	}

	console.log("결과:",point[1][state])
	$("#point").val(point[1][state]);
	
	// 무인도에 있으면 턴과 더블 검사를 통해 탈출할지 말지 결정. 더블 나오면 탈출.
	if( point[0][state] == 11 && atDesertIsland(ran1, ran2)){
		console.log("!!!무인도에 있음!!!");	
		state++;
		return;
	}
	
	// 우주여행 칸에 있으면 칸을 선택하게 함.
	if(point[0][state] == 31){
		alert(" 방문 하고 싶은 곳을 선택하세요 !");
		moveTo();
		return;
	}
	
	
	// 말 이동 -> 1. 말 제거 2. 도착 한 칸에 말 출력
	$("#p"+point[0][state]).children("b").remove("#"+(state+1)+"p"); 
	let afterId = "#p" + point[1][state];
	$(afterId).append(player[state]);
	point[0][state] = point[1][state];
	
	// 도착한 곳?
	let arrived = lands[0][point[1][state]-1];
	console.log("도착한 곳 : ",arrived,"플레이어: ", state+1);
	
	// 플레이어가 도착한 지점 검사 
	switch (point[1][state]) {
	
		// 출발지점
		case 1:
			alert("출발 지점이에요 ! 월급을 받았어요 :) \n 현재 나의 잔고에는 "+money[state]+"만원이 있어요");	// 주사위 굴리면서 월급을 지급했음. 여기서는 월급 지급할 필요 없음.
			checkDouble(ran1, ran2);
			return; 
			
		// 무인도 
		case 11:
			 // 도착한 곳이 무인도 이면 리턴.
			setTimeout(function() {	// 말이 무인도로 이동한 모습을 보여주고 알림
				alert("무인도 입니다! 갇히셨어요! :( ");
				atDesertIsland(ran1, ran2);
			}, 150)	 
			checkMax();
			return; 
			
		// 접수처
		case 21:
			alert("복지기금 접수처 입니다. 모든 기부금을 기부 받습니다 !");
			console.log("받을금액: ",donation,", 현재 잔액: ",money[state]);
			money[state] += donation;
			donation = 0;
			console.log("기부금액: ",donation,", 현재 잔액: ",money[state]);
			resetPlayerMoney(state);// 머니 정보 갱신 
			checkDouble(ran1, ran2);
			return;
			
		// 기부
		case 39:
			alert("기부 해야 합니다. ! 20만원을 사회에 기부하세요. \n 좋은일을 하시는군요? :D");
			console.log("잔액: "+money[state]);
			donation+=20;
			money[state] -= 20;
			console.log("누적 기부금액 : "+donation+"지불 후 잔액: "+money[state]);
			resetPlayerMoney(state)
			checkDouble(ran1, ran2);
			break;
		
		case 31:
			alert("우주여행 도착!! 다음 턴에 원하는 곳으로 이동 할 수 있어요 !");
			return; 
			
		default:
			if(arrived === "🔑 황금열쇠"){
				alert("🔑황금 열쇠를 뽑습니다.!")
				let gkcard = Math.floor(Math.random() * goldenKey.length);// 0~ 황금열쇠크기
				alert(goldenKey[gkcard]);
				
				checkDouble(ran1, ran2); 
				return;
			}
			break;
	}

	
	
	// 토지 정보 알림창에 입력
	insertLandInfo(point[1][state]-1, state); 
	// 알림창 출력
	 $("#landConfirm").modal({backdrop: 'static'});
	 
	 checkDouble(ran1, ran2);
	
}

//알림창에 정보 입력 
function insertLandInfo(landNum, state) {
	// 배열을 불러올때 배열은 0부터 시작하므로 함수에 값을 넣어줄 때 변수에서 반드시 1을 뺀 값이 들어올 수 있도록 해줄 것!!!
	console.log(lands[0][landNum]+"에 도착 !");
	
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
	
	if(lands[6][landNum] == 0 ){
		$("#landModal-footer").append("<button type='button' class='btn btn-block btn-danger' data-dismiss='modal' style='font-style: italic;'>아무것도 안할래요.(내 차례 넘기기) </button>");
	}else{
		// 주인에게 통행료 지불.
	}
	
}

// Max state 검사
function checkMax() {
	console.log("checkMax")
	if(state > maxState){
		state = 0; 
		// 진행된 턴수 증가 
		turn ++;
		console.log("턴증가! ",turn,"state = "+state);
	}
}

// 특정 플레이어 돈 정보 갱신
function resetPlayerMoney(state){
	console.log((state+1)+"플레이어 머니정보 갱신");
	$("#"+(state+1)+"pMoney").text(money[state]);
}

// 더블 검사 
function checkDouble(ran1, ran2){
	if(ran1 == ran2){
		state--;
		$("#playersTurn").append("<p class='text-warning italic' style='margin-top:8px; font-style:italic'>더블입니다! 한번 더!</p>");
	}
}


func


