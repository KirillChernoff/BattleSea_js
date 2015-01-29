var playerMap;
var aiMap;

var pole_x = 10, pole_y = 10;

function Init(){
	var mas = [];
	
	for (var i = 0; i < pole_x; i++){
		
		mas[i] = [];
		
		for (var j = 0; j < pole_y; j++){
		
			mas[i][j] = '~';
		}
	}
	
	playerMap = aiMap = mas;
}

function CreateField(){

	SetShip(playerMap);
	SetShip(playerMap);
	SetShip(playerMap);
	SetShip(playerMap);

	var playerField = document.querySelector('#playerField');
	var aiField = document.querySelector('#aiField');

	for (var i = 0; i < pole_x; i++){
		for (var j = 0; j < pole_y; j++){
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

function IsCellEmpty(map, x, y){
	
	var empty = false;
	
	var min_x;
	var max_x;
	var min_y;
	var max_y
	
	min_x = x - 1;
	max_x = x + 1;
	min_y = y - 1;
	max_y = y + 1;
	
	if(min_x < 0) min_x = 0;
	if(min_y < 0) min_y = 0;
	if(max_x > 9) max_x = 9;
	if(max_y > 9) max_y = 9;
	
	for(var i = min_x; i <= max_x; i++){
		for(var j = min_y; j <= max_y; j++){
			if(map[i][j] == '~')	{
				empty = true;
			}else{
				empty = false;
			}
		}
	}
	return empty;
}

function SetShip(map){
	
	var set_x;
	var set_y;
	var exit = false;
	
	while(!exit){
		set_x = getRandomInt(0, pole_x - 1);
		set_y = getRandomInt(0, pole_x - 1);
		
		if(IsCellEmpty(map, set_x, set_y)){
			map[set_x][set_y] = 'ship';
			
			console.log("ship", set_x, set_y);
			
			exit = true;
		}
	}
}

function getRandomInt(min, max){
	return Math.floor((Math.random() * max) + min);
}
