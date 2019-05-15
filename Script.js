var squareClass = document.getElementsByClassName("square");	/*класс игрового поля (класс квадрата)*/
var whiteCheckerClass = document.getElementsByClassName("white_checker");	/*класс белых шашек*/
var blackCheckerClass = document.getElementsByClassName("black_checker");	/*класс чёрных шашек*/
var table = document.getElementById("table");	/*таблица*/
var score = document.getElementById("score");	/*счёт партии*/
var blackBackground = document.getElementById("blackBackground");
var moveSound = document.getElementById("moveSound");	/*звук передвежения шашки (после 5 минут игры жутко раздражает...)*/
var winSound = document.getElementById("winSound");		/*победная мелодия (проигрывается после окончании партии)*/
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;	/*высота экрана*/
var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;		/*ширина экрана*/
var moveLength = 80;	/*длина хода (на сколько смещается шашка)*/
var moveDeviation = 10;	/*отклонение (нужен при изменении длины хода шашки)*/
var Dimension = 1;	
var selectedPiece, selectedPieceindex;	
var upRight, upLeft, downLeft, downRight; /*булевая переменная необходимая для проверки движения шашек*/
var contor = 0, gameOver = 0;
var bigScreen = 1;	
var block = [];		/*массив блоков (квадратов) поля*/
var whiteСhecker = [];	/*массив белых шашек*/
var blackChecker = [];	/*массив чёрных шашек*/
var theChecker;		/*активная шашка*/
var oneMove;	/*булевая переменная необходима для отображения только одного доступного хода шашки*/
var anotherMove;	/*булевая переменная необходимая для отображения доступных ходов шашки*/
var mustAttack = false;		/*булевая переменная необходимой атаки (при значении true любые другие шаги шашки отменяются)*/
var multiplier = 1		/*Сколько игроков*/
var tableLimit, reverseTableLimit, moveUpLeft, moveUpRight, moveDownLeft, moveDownRight, tableLimitLeft, tableLimitRight;

	getDimension();
	if(windowWidth > 640){
		moveLength = 80;
		moveDeviation = 10;
	}
	else{
		moveLength = 50;
		moveDeviation = 6;
	}


/**
 * Инициализация игрового поля
 * @method square_p
 * @param {int} square - квадрат (площадь) поля
 * @param {int} index - индекс квадрата, с которым будем работать
 * @return null
 */
var square_p = function(square,index){
	this.id = square;
	this.ocupied = false;
	this.pieceId = undefined;
	/**
     * Функция обработки нажатия пользователем на свободную зону, для перемещения шашки
     * @method onclick
     * @return null
     */
	this.id.onclick = function() {
		makeMove(index);
	}
}

/**
 * Инициализация шашки на игровом поле
 * @method checker
 * @param {int} piece - идентификатор "стороны" игрового поля, которое мы инициализируем (белых/чёрных)
 * @param {string} color - цвет шашки
 * @param {int} square - квадрат на котором располагается шашка
 * @return null
 */
var checker = function(piece,color,square) {
	this.id = piece;
	this.color = color;
	this.king = false;
	this.ocupied_square = square;
	this.alive = true;
	this.attack = false;
	if(square%8){
		this.coordX= square%8;
		this.coordY = Math.floor(square/8) + 1 ;
	}
	else{
		this.coordX = 8;
		this.coordY = square/8 ;
	}
	/**
     * Функция обработки нажатия пользователем на свободную зону, для отображения возможных ходов шашки
     * @method onclick
     * @return 
     */
	this.id.onclick = function  () {
		showMoves(piece);	
	}
}

/**
 * Задание координат для шашки
 * @method setCoord
 * @param {int} X - положение шашки игрока по оси абсцисс
 * @param {int} Y - положение шашки игрока по оси ординат
 * @return null
 */
checker.prototype.setCoord = function(X,Y){
	var x = (this.coordX - 1  ) * moveLength + moveDeviation;
	var y = (this.coordY - 1 ) * moveLength  + moveDeviation;
	this.id.style.top = y + 'px';
	this.id.style.left = x + 'px';
}

/**
 * Изменение координат шашки
 * @method changeCoord
 * @param {int} X - положение шашки игрока по оси абсцисс
 * @param {int} Y - положение шашки игрока по оси ординат
 * @return null
 */
checker.prototype.changeCoord = function(X,Y){
	this.coordY +=Y;
	this.coordX += X;
}

/**
 * Проверка является ли шашка дамкой
 * @method checkIfKing
 * @return null
 */
checker.prototype.checkIfKing = function () {
	if(this.coordY == 8 && !this.king &&this.color == "white"){
		this.king = true;
		this.id.style.border = "4px solid #FFFF00";
	}
	if(this.coordY == 1 && !this.king &&this.color == "black"){
		this.king = true;
		this.id.style.border = "4px solid #FFFF00";
	}
}



for (var i = 1; i <=64; i++)
	block[i] =new square_p(squareСlass[i],i);




for (var i = 1; i <= 4; i++){
	whiteСhecker[i] = new checker(whiteСheckerСlass[i], "white", 2*i -1 );
	whiteСhecker[i].setCoord(0,0);
	block[2*i - 1].ocupied = true;
	block[2*i - 1].pieceId =whiteСhecker[i];
}

for (var i = 5; i <= 8; i++){
	whiteСhecker[i] = new checker(whiteСheckerСlass[i], "white", 2*i );
	whiteСhecker[i].setCoord(0,0);
	block[2*i].ocupied = true;
	block[2*i].pieceId = whiteСhecker[i];
}

for (var i = 9; i <= 12; i++){
	whiteСhecker[i] = new checker(whiteСheckerСlass[i], "white", 2*i - 1 );
	whiteСhecker[i].setCoord(0,0);
	block[2*i - 1].ocupied = true;
	block[2*i - 1].pieceId = whiteСhecker[i];
}

for (var i = 1; i <= 4; i++){
	blackChecker[i] = new checker(blackСheckerСlass[i], "black", 56 + 2*i  );
	blackChecker[i].setCoord(0,0);
	block[56 +  2*i ].ocupied = true;
	block[56+  2*i ].pieceId =blackChecker[i];
}

for (var i = 5; i <= 8; i++){
	blackChecker[i] = new checker(blackСheckerСlass[i], "black", 40 +  2*i - 1 );
	blackChecker[i].setCoord(0,0);
	block[ 40 + 2*i - 1].ocupied = true;
	block[ 40 + 2*i - 1].pieceId = blackChecker[i];
}

for (var i = 9; i <= 12; i++){
	blackChecker[i] = new checker(blackСheckerСlass[i], "black", 24 + 2*i  );
	blackChecker[i].setCoord(0,0);
	block[24 + 2*i ].ocupied = true;
	block[24 + 2*i ].pieceId = blackChecker[i];
}




theChecker = whiteСhecker;

/**
 * Отрисовка "обычного" перемещения шашки по полю (без атаки противника)
 * @method showMoves
 * @param {int} piece - идентификатор "стороны" игрового поля (белых/чёрных)
 * @return bool
 */
function showMoves (piece) {
	var match = false;
	mustAttack = false;
	if(selectedPiece){
			erase_roads(selectedPiece);
	}
	selectedPiece = piece;
	var i,j; 
	for ( j = 1; j <= 12; j++){
		if(theChecker[j].id == piece){
			i = j;
			selectedPieceindex = j;
			match = true;
		}
	}

	if(oneMove && !attackMoves(oneMove)){
		changeTurns(oneMove);
		oneMove = undefined;
		return false;
	}
	if(oneMove && oneMove != theChecker[i] ){
		return false;
	}

	if(!match) {
	 return 0 ; 
	}

	if(theChecker[i].color =="white"){
		tableLimit = 8;
		tableLimitRight = 1;
		tableLimitLeft = 8;
		moveUpRight = 7;
		moveUpLeft = 9;
		moveDownRight = - 9;
		moveDownLeft = -7;
	}
	else{
		tableLimit = 1;
		tableLimitRight = 8;
		tableLimitLeft = 1;
		moveUpRight = -7;
		moveUpLeft = -9;
		moveDownRight = 9;
		moveDownLeft = 7;
	}


		attackMoves(theChecker[i]); 
	


 	if(!mustAttack){
 	  downLeft = checkMove( theChecker[i] , tableLimit , tableLimitRight , moveUpRight , downLeft);
		downRight = checkMove( theChecker[i] , tableLimit , tableLimitLeft , moveUpLeft , downRight);
		if(theChecker[i].king){
			upLeft = checkMove( theChecker[i] , reverseTableLimit , tableLimitRight , moveDownRight , upLeft);
			upRight = checkMove( theChecker[i], reverseTableLimit , tableLimitLeft , moveDownLeft, upRight)
		}
	}
	if(downLeft || downRight || upLeft || upRight){
			return true;
		}
	return false;
	
}


/**
 * Закрашивание квадрата в стандартный цвет при перемещении шашки
 * @method erase_roads
 * @param {int} piece - идентификатор "стороны" игрового поля (белых/чёрных). Если переменная равна 0, движение шашки не происходит.
 * @return null
 */
function erase_roads(piece){
	if(downRight) block[downRight].id.style.background = "#BA7A3A";
	if(downLeft) block[downLeft].id.style.background = "#BA7A3A";
	if(upRight) block[upRight].id.style.background = "#BA7A3A";
	if(upLeft) block[upLeft].id.style.background = "#BA7A3A";
}
		

/**
 * Выполнить перемешение шашки на указанный квадрат
 * @method makeMove
 * @param {int} index - индекс квадрата, с которым будем работать 
 * @return null
 */
function makeMove (index) {
	var isMove = false;
	if(!selectedPiece) 
		return false;
	if(index != upLeft && index != upRight && index != downLeft && index != downRight){
		erase_roads(0);
		selectedPiece = undefined;
		return false;
	}

	if(theChecker[1].color=="white"){
		cpy_downRight = upRight;
		cpy_downLeft = upLeft;
		cpy_upLeft = downLeft;
		cpy_upRight = downRight;
	}
	else{
		cpy_downRight = upLeft;
		cpy_downLeft = upRight;
		cpy_upLeft = downRight;
		cpy_upRight = downLeft;
	}  

	if(mustAttack)  
		multiplier = 2;
	else
		multiplier = 1;


		if(index == cpy_upRight){
			isMove = true;		
			if(theChecker[1].color=="white"){
				executeMove( multiplier * 1, multiplier * 1, multiplier * 9 );
				if(mustAttack) eliminateCheck(index - 9);
			}
			else{
				executeMove( multiplier * 1, multiplier * -1, multiplier * -7);
				if(mustAttack) eliminateCheck( index + 7 );
			}
		}

		if(index == cpy_upLeft){
	
			isMove = true;
			if(theChecker[1].color=="white"){
				executeMove( multiplier * -1, multiplier * 1, multiplier * 7);
			 	if(mustAttack)	eliminateCheck(index - 7 );				
			}
			else{
				executeMove( multiplier * -1, multiplier * -1, multiplier * -9);
				if (mustAttack) eliminateCheck( index + 9 );
			}
		}

		if(theChecker[selectedPieceindex].king){

			if(index == cpy_downRight){
				isMove = true;
				if(theChecker[1].color=="white"){
					executeMove( multiplier * 1, multiplier * -1, multiplier * -7);
					if(mustAttack) eliminateCheck ( index  + 7) ;
				}
				else{
					executeMove( multiplier * 1, multiplier * 1, multiplier * 9);
					if(mustAttack) eliminateCheck ( index  - 9) ;
				}
			}

		if(index == cpy_downLeft){
			isMove = true;
				if(theChecker[1].color=="white"){
					executeMove( multiplier * -1, multiplier * -1, multiplier * -9);
					if(mustAttack) eliminateCheck ( index  + 9) ;
				}
				else{
					executeMove( multiplier * -1, multiplier * 1, multiplier * 7);
					if(mustAttack) eliminateCheck ( index  - 7) ;
				}
			}
		}

	erase_roads(0);
	theChecker[selectedPieceindex].checkIfKing();
	if (isMove) {
			playSound(moveSound);
			anotherMove = undefined;
		 if(mustAttack) {
			 	anotherMove = attackMoves(theChecker[selectedPieceindex]);
		 }
		if (anotherMove){
			oneMove = theChecker[selectedPieceindex];
			showMoves(oneMove);
		}
		else{
			oneMove = undefined;
		 	changeTurns(theChecker[1]);
		 	gameOver = checkIfLost();
		 	if(gameOver) { setTimeout( declareWinner(),3000 ); return false};
		 	gameOver = checkForMoves();
		 	if(gameOver) { setTimeout( declareWinner() ,3000) ; return false};
		}
	}
}

/**
 * Выполнить движение шашки по координатам
 * @method executeMove
 * @param {int} X - положение шашки игрока по оси абсцисс
 * @param {int} Y - положение шашки игрока по оси ординат
 * @param {int} nSquare - движение по квадрату
 * @return null
 */
function executeMove (X,Y,nSquare){
	theChecker[selectedPieceindex].changeCoord(X,Y); 
	theChecker[selectedPieceindex].setCoord(0,0);
	block[theChecker[selectedPieceindex].ocupied_square].ocupied = false;
	block[theChecker[selectedPieceindex].ocupied_square + nSquare].ocupied = true;
	block[theChecker[selectedPieceindex].ocupied_square + nSquare].pieceId = 	block[theChecker[selectedPieceindex].ocupied_square ].pieceId;
	block[theChecker[selectedPieceindex].ocupied_square ].pieceId = undefined; 	
	theChecker[selectedPieceindex].ocupied_square += nSquare;

}

/**
 * Проверка возможности перемещения шашки
 * @method checkMove
 * @param {int} Apiece - идентификатор "стороны" игрового поля (белых/чёрных)
 * @param {int} tLimit - предел для движения шашки по вертикали
 * @param {int} tLimit_Side - предел для движения шашки по горизонтали
 * @param {int} moveDirection - направление движения
 * @param {int} theDirection - куда совершается движение
 * @return theDirection - куда совершается движение
 */
function checkMove(Apiece,tLimit,tLimit_Side,moveDirection,theDirection){
	if(Apiece.coordY != tLimit){
		if(Apiece.coordX != tLimit_Side && !block[ Apiece.ocupied_square + moveDirection ].ocupied){
			block[ Apiece.ocupied_square + moveDirection ].id.style.background = "#704923";
			theDirection = Apiece.ocupied_square + moveDirection;
		}
	else
			theDirection = undefined;
	}
	else
		theDirection = undefined;
	return theDirection;
}

/**
 * Проверка возможности атаки соперника
 * @method checkAttack
 * @param {int} check
 * @param {int} X - положение шашки игрока по оси абсцисс
 * @param {int} Y - положение шашки игрока по оси ординат
 * @param {int} negX - положение шашки противника по оси абсцисс
 * @param {int} negY - положение шашки противника по оси ординат
 * @param {int} squareMove - движение по квадрату
 * @param {int} direction - направление движения шашки
 * @return direction
 */
function  checkAttack( check , X, Y , negX , negY, squareMove, direction){
	if(check.coordX * negX >= 	X * negX && check.coordY *negY <= Y * negY && block[check.ocupied_square + squareMove ].ocupied && block[check.ocupied_square + squareMove].pieceId.color != check.color && !block[check.ocupied_square + squareMove * 2 ].ocupied){
		mustAttack = true;
		direction = check.ocupied_square +  squareMove*2 ;
		block[direction].id.style.background = "#704923";
		return direction ;
	}
	else
		direction =  undefined;
		return direction;
}

/**
 * Устранить проверку. Используется в ситуации, когда игрок должен бить шашку противника. Все остальные движения в таком случае невозможны
 * @method eliminateCheck
 * @param {int} indexx - индекс квадрата, с которым будем работать
 * @return 
 */
function eliminateCheck(indexx){
	if(indexx < 1 || indexx > 64)
		return  0;

	var x =block[ indexx ].pieceId ;
	x.alive =false;
	block[ indexx ].ocupied = false;
	x.id.style.display  = "none";
}

 	
/**
 * Атака шашки соперника
 * @method attackMoves
 * @param {int} ckc - количество ходов
 * @return bool
 */
function attackMoves(ckc){

 		upRight = undefined;
 		upLeft = undefined;
 		downRight = undefined;
 		downLeft = undefined;

 	if(ckc.king ){
 		if(ckc.color == "white"){
			upRight = checkAttack( ckc , 6, 3 , -1 , -1 , -7, upRight );
			upLeft = checkAttack( ckc, 3 , 3 , 1 , -1 , -9 , upLeft );
		}
		else{
	 		downLeft = checkAttack( ckc , 3, 6, 1 , 1 , 7 , downLeft );
			downRight = checkAttack( ckc , 6 , 6 , -1, 1 ,9 , downRight );		
		}
	}
	if(ckc.color == "white"){
	 	downLeft = checkAttack( ckc , 3, 6, 1 , 1 , 7 , downLeft );
		downRight = checkAttack( ckc , 6 , 6 , -1, 1 ,9 , downRight );
	}
	else{
		upRight = checkAttack( ckc , 6, 3 , -1 , -1 , -7, upRight );
		upLeft = checkAttack( ckc, 3 , 3 , 1 , -1 , -9 , upLeft );
	}
 	
 	if(ckc.color== "black" && (upRight || upLeft || downLeft || downRight ) ) {
	 	var p = upLeft;
	 	upLeft = downLeft;
	 	downLeft = p;

	 	p = upRight;
	 	upRight = downRight;
	 	downRight = p;

	 	p = downLeft ;
	 	downLeft = downRight;
	 	downRight = p;

	 	p = upRight ;
	 	upRight = upLeft;
	 	upLeft = p;
 	}
 	if(upLeft != undefined || upRight != undefined || downRight != undefined || downLeft != undefined){
 		return true;

 	}
 	return false;
}

/**
 * Изменить направление движения шашки
 * @method changeTurns
 * @param {int} ckc - количество ходов
 * @return null
 */
function changeTurns(ckc){
		if(ckc.color=="white")
	theChecker = blackChecker;
else
	theChecker = whiteСhecker;
 }

/**
 * Проверка на проигрыш в партии
 * @method checkIfLost
 * @return bool
 */
function checkIfLost(){
	var i;
	for(i = 1 ; i <= 12; i++)
		if(theChecker[i].alive)
			return false;
	return true;
}

/**
 * Объявление победителя партии
 * @method declareWinner
 * @return null
 */
function  checkForMoves(){
	var i ;
	for(i = 1 ; i <= 12; i++)
		if(theChecker[i].alive && showMoves(theChecker[i].id)){
			erase_roads(0);
			return false;
		}
	return true;
}

/**
 * Description
 * @method declareWinner
 * @return 
 */
function declareWinner(){
	playSound(winSound);
	blackBackground.style.display = "inline";
	score.style.display = "block";
if(theChecker[1].color == "white")
	score.innerHTML = "Black wins";
else
	score.innerHTML = "Red wins";
}

/**
 * Проигрывание музыки
 * @method playSound
 * @param {var} sound
 * @return null
 */
function playSound(sound){
	if(sound) sound.play();
}

/**
 * Получение размеров игрового поля
 * @method getDimension
 * @return null
 */
function getDimension (){
	contor ++;
	windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;  ;
	windowWidth =  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}
/**
 * Получение всех элементов находящихся в теге <body>
 * @method onresize
 * @return null
 */
document.getElementsByTagName("BODY")[0].onresize = function(){

	getDimension();
	var cpyBigScreen = bigScreen ;

if(windowWidth < 650){
		moveLength = 50;
		moveDeviation = 6; 
		if(bigScreen == 1) bigScreen = -1;
	}
if(windowWidth > 650){
		moveLength = 80;
		moveDeviation = 10; 
		if(bigScreen == -1) bigScreen = 1;
	}

	if(bigScreen !=cpyBigScreen){
	for(var i = 1; i <= 12; i++){
		blackChecker[i].setCoord(0,0);
		whiteСhecker[i].setCoord(0,0);
	}
	}
}