var playerMap;
var aiMap;

var x = 10, y = 10;

function Init(){
	var mas = [];
	
	for (var i = 0; i < x; i++){
		
		mas[i] = [];
		
		for (var j = 0; j < y; j++){
		
			mas[i][j] = '~';
		}
	}
	
	playerMap = aiMap = mas;
		
}

function CreateField(){

	var playerField = document.querySelector('#playerField');
	var aiField = document.querySelector('#aiField');

	for (var i = 0; i < x; i++){
		for (var j = 0; j < y; j++){
			divPl = document.createElement('div');
			divPl.id = i + '_' + j, divPl.className = playerMap[i][j] =='ship' ? 'ship' : 'sea';
			playerField.appendChild(divPl);
			
			divAi = document.createElement('div');
			divAi.className = aiMap[i][j] == 'ship' ? 'ship' : 'sea';
			// divAi.onclick =
			aiField.appendChild(divAi);
		}
	}
}