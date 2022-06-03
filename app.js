var origBoard;

const humanPlayer = 'O';
const aiPlayer = 'X';
const winningCombonations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]

]

const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {
    document.querySelector('.endGame').style.display = 'none';
    origBoard = Array.from(Array(9).keys());
    // Remove X/Os from board
    for (var i = 0; i<cells.length; i++){
        cells[i].innerText ='';
        cells[i].style.removeProperty('background-color'); 
        cells[i].addEventListener('click',turnClick,false);
    }


}

function turnClick(square){
    
    // Check open spot
    if(typeof origBoard[square.target.id] == 'number'){
        console.log(square.target.id)
        turn(square.target.id, humanPlayer);
        if(!checkTie()) turn(bestSpot(),aiPlayer);
    }

}
 

// Mark the cell with the player's marker
function turn(squareId,player){
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard,player)
    if (gameWon) gameOver(gameWon);
}

function checkWin(board,player){
    let plays = board.reduce((a,e,i) =>(e === player) ? a.concat(i) : a,[]);  // huh?
    let gameWon = null;
    for(let [index, win] of winningCombonations.entries()){
        if(win.every(elem=>plays.indexOf(elem)>-1)){
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    
    //highlight winning combo
    for (let index of winningCombonations[gameWon.index]) {
        
        const element = gameWon[index];
        document.getElementById(index).style.backgroundColor = gameWon.player == humanPlayer ? "blue" : "red";
       
    }
    // Remove click ability
    for(var i = 0; i < cells.length; i++){
        cells[i].removeEventListener('click',turnClick,false);
    }
    delcareWinner(gameWon.player == humanPlayer ? "You Win" : "You Lose");
}

function delcareWinner(who){
    document.querySelector('.endGame').style.display = "block";
    document.querySelector('.endGame').innerText = who;
}
function checkTie(){
    if(emptySquares().length==0){
        for(var i = 0; i<cells.length; i++){
            cells[i].style.backgroundColor="green";
            cells[i].removeEventListener('click',turnClick,false);
        }
        delcareWinner("Tie Game");
        return true;
    }
    return false;
}

function emptySquares(){
    return origBoard.filter( s => typeof s == 'number');
}
function bestSpot(){
    console.log("best spot");
    return emptySquares()[0];


}

