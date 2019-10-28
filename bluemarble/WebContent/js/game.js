$(document).ready(function() {
	// 준비 완료 
	console.log("ready");
	
	// 변수 초기화 
	let beforePoint = 1;
	let afterPoint = 1;
	
	// 플레이 버튼 클릭 
	$("#play").click( function() {
		// 두개 주사위 굴리기
		let ran1 = Math.floor((Math.random() * 6)+1);	//1~6
		let ran2 = Math.floor((Math.random() * 6)+1);	//1~6
		
		// 수 랜덤으로 뽑아 value값에 넣기
		$("#dice1").val(ran1);
		$("#dice2").val(ran2);
		
		console.log($("#dice1").attr("value"))
		console.log($("#dice2").attr("value"))
		// 두 주사위의 수 합 
		let sum = ran1+ran2;
		// 40이 넘으면 다시 1부터 
		if (beforePoint + sum < 41) {
			afterPoint = beforePoint + sum;
		} else {
			afterPoint = beforePoint + sum - 40;
		}
		
		$("#point").val(afterPoint);
		console.log($("#point").attr("value"))
		// 말을 이동시킵니다.
		let afterId = "#p" + afterPoint;
		$(afterId).append('<b class="horses">🎠</b>');

		let beforeId = "#p" + beforePoint;
		$(beforeId).empty();

		beforePoint = afterPoint;
	});
	
})	