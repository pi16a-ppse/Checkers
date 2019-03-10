/*=========Глобальные переменные=========================*/


var squareClass = document.getElementsByClassName("square");
var whiteCheckerClass = document.getElementsByClassName("white_checker");
var blackCheckerClass = document.getElementsByClassName("black_checker");
var table = document.getElementById("table");
var score = document.getElementById("score");
var blackBackground = document.getElementById("black_background");
var moveSound = document.getElementById("moveSound");
var winSound = document.getElementById("winSound");
var windowHeight = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;  ;
var windowWidth =  window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
var moveLength = 80 ;
var moveDeviation = 10;
var Dimension = 1;
var selectedPiece,selectedPieceindex;
var upRight,upLeft,downLeft,downRight;  // все возможные варианты для дамки
var contor = 0 , gameOver = 0;
var bigScreen = 1;
var block = [];
var wChecker = [];
var bChecker = [];
var theChecker ;
var oneMove;
var anotherMove;
var mustAttack = false;
var multiplier = 1
var tableLimit, reverseTableLimit ,  moveUpLeft,moveUpRight, moveDownLeft,moveDownRight , tableLimitLeft, tableLimitRight;
/*===============получить размерность=================*/
	getDimension();
	if(windowWidth > 640){
		moveLength = 80;
		moveDeviation = 10;
	}
	else{
		moveLength = 50;
		moveDeviation = 6;
	}
/*================объявление класса=========*/
var square_p = function(square,index){
	this.id = square;
	this.ocupied = false;
	this.pieceId = undefined;
	this.id.onclick = function() {
		makeMove(index);
	}
}
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
	this.id.onclick = function  () {
		showMoves(piece);	
	}
}
checker.prototype.setCoord = function(X,Y){
	var x = (this.coordX - 1  ) * moveLength + moveDeviation;
	var y = (this.coordY - 1 ) * moveLength  + moveDeviation;
	this.id.style.top = y + 'px';
	this.id.style.left = x + 'px';
}
checker.prototype.changeCoord = function(X,Y){
	this.coordY +=Y;
	this.coordX += X;
}
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
/*===============Инициализация игровых полей=================================*/
for (var i = 1; i <= 65; i++)
	block[i] =new square_p(square_class[i],i);
/*================Инициализация дамки=================================*/

	//Белая дамка 
for (var i = 1; i <= 4; i++){
	w_checker[i] = new checker(white_checker_class[i], "white", 2*i -1 );
	w_checker[i].setCoord(0,0);
	block[2*i - 1].ocupied = true;
	block[2*i - 1].pieceId =w_checker[i];
}

for (var i = 5; i <= 8; i++){
	w_checker[i] = new checker(white_checker_class[i], "white", 2*i );
	w_checker[i].setCoord(0,0);
	block[2*i].ocupied = true;
	block[2*i].pieceId = w_checker[i];
}

for (var i = 9; i <= 12; i++){
	w_checker[i] = new checker(white_checker_class[i], "white", 2*i - 1 );
	w_checker[i].setCoord(0,0);
	block[2*i - 1].ocupied = true;
	block[2*i - 1].pieceId = w_checker[i];
}

//Чёрная дамка
for (var i = 1; i <= 4; i++){
	b_checker[i] = new checker(black_checker_class[i], "black", 56 + 2*i  );
	b_checker[i].setCoord(0,0);
	block[56 +  2*i ].ocupied = true;
	block[56+  2*i ].pieceId =b_checker[i];
}

for (var i = 5; i <= 8; i++){
	b_checker[i] = new checker(black_checker_class[i], "black", 40 +  2*i - 1 );
	b_checker[i].setCoord(0,0);
	block[ 40 + 2*i - 1].ocupied = true;
	block[ 40 + 2*i - 1].pieceId = b_checker[i];
}

for (var i = 9; i <= 12; i++){
	b_checker[i] = new checker(black_checker_class[i], "black", 24 + 2*i  );
	b_checker[i].setCoord(0,0);
	block[24 + 2*i ].ocupied = true;
	block[24 + 2*i ].pieceId = b_checker[i];
}
/*================ВЫБОР ЧАСТИ==============*/
the_checker = w_checker;
