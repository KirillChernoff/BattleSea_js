var playerMap;
var aiMap;

var pole_x = 10, pole_y = 10;

function init(){
	var mas = [];
	
	for (var i = 0; i < pole_x; i++){
		
		mas[i] = [];
		
		for (var j = 0; j < pole_y; j++){
		
			mas[i][j] = '~';
		}
	}
	
	playerMap = aiMap = mas;
}

function createField(){

    setShips(playerMap);
    
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

function isCellEmpty(map, x, y){
	
	var empty = false;
	
	var minX;
	var maxX;
	var minY;
	var maxY;
	
	minX = x - 1;
	maxX = x + 1;
	minY = y - 1;
	maxY = y + 1;
	
	if(minX < 0) minX = 0;
	if(minY < 0) minY = 0;
	if(maxX > 9) maxX = 9;
	if(maxY > 9) maxY = 9;
	
	for(var i = minX; i <= maxX; i++){
		for(var j = minY; j <= maxY; j++){
			if(map[i][j] == '~')	{
				empty = true;
			}else{
				return false;
			}
		}
	}
	return empty;
}

function setShips(map) {

    for (var i = 4; i > 0; i--) {
        for (var j = 0; j <= 4 - i; j++) {
            setShip(map, i);
        }
    }
}

function setShip(map, deckNum){
	
    var tempXy = [deckNum * 2];
    var canset;
	
	var fX, fY, direction;
    var tY, tX;

    do {
        canset = true;

        direction = getRandomInt(0, 1);
        //console.log("direction: ", direction);

        // если direction = 0, то идем вверх, иначе влево
        if (direction == 0) {
            fX = getRandomInt(deckNum - 1, 9);
            fY = getRandomInt(0, 9);
            //console.log("fx: ", fX, "fy: ", fY);
            
            for (var i = 0; i < deckNum; i++) {

                canset = canset && isCellEmpty(map, fX - i, fY);

                if (canset == false) {
                    break;
                }

                tempXy[i * 2] = fX - i;
                tempXy[i * 2 + 1] = fY;
            }
        } else {
            fX = getRandomInt(0, 9);
            fY = getRandomInt(deckNum - 1, 9);
            //console.log("fx: ", fX, "fy: ", fY);

            for (var i = 0; i < deckNum; i++) {

                canset = canset && isCellEmpty(map, fX, fY - i);

                if (canset == false) {
                    break;
                }

                tempXy[i * 2] = fX;
                tempXy[i * 2 + 1] = fY - i;
            }
        }

        if (canset) {
            for (var i = 0; i < deckNum; i++) {
                tX = tempXy[i * 2];
                tY = tempXy[i * 2 + 1];
                //console.log("x: ", tX, "y: ", tY);

                map[tX][tY] = 'ship';
            }
        }
    } while (!canset)
}

function getRandomInt(min, max){
	return Math.floor(min + Math.random()*(max - min + 1));
}
