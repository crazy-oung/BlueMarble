$(document).ready(function() {
	// 준비 완료 
	console.log("ready");
	
	// 변수 초기화 
	let beforePoint = 1;
	let afterPoint = 1;
	
	// 플레이 버튼 클릭 
	$("#play").click( function() {
		let ran = Math.floor((Math.random() * 6)+1);	//1~6
		console.log(ran);
		$("#dice").val(ran);
		console.log($("#dice").attr("value"))
		if (beforePoint + ran < 41) {
			afterPoint = beforePoint + ran;
		} else {
			afterPoint = beforePoint + ran - 40;
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