var playerMap;
var aiMap;

var pole = 10;

function init(){
    playerMap = [];
    aiMap = [];
	
	for (var i = 0; i < pole; i++){
		
	    playerMap[i] = [];
	    aiMap[i] = [];
		
		for (var j = 0; j < pole; j++){
		
		    playerMap[i][j] = '~';
		    aiMap[i][j] = '~';
		}
	}

    createField();
}

function createField(){

    setShips(playerMap);
    setShips(aiMap);
    
	var playerField = document.querySelector('#playerField');
	var aiField = document.querySelector('#aiField');

	for (var i = 0; i < pole; i++){
		for (var j = 0; j < pole; j++){
			divPl = document.createElement('div');
			divPl.id = i + '_' + j, divPl.className = playerMap[i][j] =='deck' ? 'deck' : 'sea';
			playerField.appendChild(divPl);
			
			divAi = document.createElement('div');
            divAi.id = i + '_' + j, divAi.className = aiMap[i][j] == 'deck' ? 'deck' : 'sea';
			divAi.onclick = function() {
			    if (playerShoot(this)) {
			        aiGame();
			    }
			}
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

                map[tX][tY] = 'deck';
            }
        }
    } while (!canset)
}

function getRandomInt(min, max){
	return Math.floor(min + Math.random()*(max - min + 1));
}

function playerShoot(elem) {
    if (elem.className == 'hit' || elem.className == 'o') {
        return false;
    }

    elem.className = elem.className == 'deck' ? 'hit' : 'o';

    if (document.querySelectorAll('#aiField .deck').length === 0) {
        alert("You win!");

        return false;
    }

    if (elem.className == 'o') {
        return true;
    }

    return false;
}

function aiShoot(dX, dY) {

    var element = document.getElementById(dX + '_' + dY);

    if (element.className == 'deck') {
        element.className = 'hit';
        return true;
    } else {
        if (element.className == 'sea') {
            element.className = 'o';
        }
        return false;
    }
}

//функция проверяет клетку на наличие выстрела по ней
function checkCellToFire(cX, cY) {
    var element = document.getElementById(cX + '_' + cY);

    if (element.className == 'hit' || element.className == 'o') {
        return false;
    } else {
        return true;
    }
}

var aiState = 0;
var memX, memY;

function aiGame() {

    var sX, sY;

    switch (aiState) {
        case 0:
            do {
                sX = getRandomInt(0, pole - 1);
                sY = getRandomInt(0, pole - 1);
            } while (!checkCellToFire(sX, sY));

            if (aiShoot(sX,sY)) {
                memX = sX;
                memY = sY;
                aiState = 1;
                lastIndex = 0;
                aiGame();
            }
            break;
        case 1:
            if (findDeckDirection(memX, memY)) {
                aiState = 2;
                aiGame();
            }
            break;

        case 2:
            aiFire();
            break;
    }
}

var lastIndex;
var findArr = [[-1, 0], [0, 1], [1, 0], [0, -1]];
var foundDirection;

function findDeckDirection(fX, fY) {
    for (var i = lastIndex; i < findArr.length; i++) {
        lastIndex = i;

        var tempX = fX + findArr[i][0];
        var tempY = fY + findArr[i][1];

        if (cellAbroadField(tempX, tempY) || !checkCellToFire(tempX, tempY)) {
            continue;
        } else {
            if (!aiShoot(tempX, tempY)) {
                return false;
            } else {
                foundDirection = i;

                memX = tempX;
                memY = tempY;

                return true;
            }
        }
    }

    if ((lastIndex == findArr.length - 1) && aiState == 1) {
        aiState = 0;
    }
}

function aiFire() {

    if (document.querySelectorAll('#playerField .deck').length === 0) {
        alert("You lost!");
    } else {

        do {
            memX = memX + findArr[foundDirection][0];
            memY = memY + findArr[foundDirection][1];

            //console.log("memX: ", memX, "memY: ", memY);
        } while (!cellAbroadField(memX, memY) && aiShoot(memX, memY))

    }
    aiState = 0;
}

function cellAbroadField(abX, abY) {
    if (abX < 0 || abX > 9 || abY < 0 || abY > 9) return true;
    else return false;
}