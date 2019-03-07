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