const cells = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('.reset');
const currentTurn = document.querySelector('.current-turn');
const player1score = document.querySelector('.score1');
const player2score = document.querySelector('.score2');
const draw = document.querySelector('.draw');
const messageContent = document.querySelector('.content');
const overlay =  document.getElementById('overlay');
const closeBtn = document.getElementById('close');

const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


let turn = true;

let usedCells = [];

let winner =false;

let ties = 0;

let player1 = {
    Symbol: '<i class="fa fa-close "></i>' ,
    played: [],
    score: 0
}

let player2 = {
    Symbol: '<i class="fa fa-circle-o"></i> ',
    played: [],
    score: 0
}

checkTurn();

for(let i=0; i<9 ;i++){
    cells[i].addEventListener('click', () => {
        if (isEmpty(i)){
        if(turn){
            addSymbol(player1, i);
            turn = false;
            checkWin(player1);
            checkTurn();
        }else{
            addSymbol(player2, i);
            checkWin(player2);
            turn= true;
            checkTurn();
    }  }else
    alert('choose an empty cell')  ;
    
    })
}

function addSymbol(player ,i){
    cells[i].innerHTML =player.Symbol;
    player.played.push(i);
    usedCells.push(i);

}

function checkWin(player){
    if(!winner){
    winCombos.some(combo => {
        if(combo.every(index => player.played.includes(index))){
            winner = true;
            setTimeout(ShowMessage,500,player,winner);
            player.score++;
            showScore();
            reset();
    }})}
if (!winner && usedCells.length == 9){
    ties++;
    showScore();
    setTimeout(ShowMessage,500);
}}



function isEmpty(i){
    if(usedCells.includes(i)){
        return false;
    }
    return true;

}

function reset(){
    cells.forEach(cell => {
        cell.innerHTML = '';
    }) 
    winner = false;
    usedCells = [];
    player1.played = [];
    player2.played = [];
    turn = true;
    checkTurn();
}

resetBtn.addEventListener('click' , reset);

function checkTurn(){
    if(turn){
        currentTurn.innerHTML = player1.Symbol;
    }else{
        currentTurn.innerHTML = player2.Symbol;
    }
}

function showScore(){
    player1score.innerHTML = player1.score;
    player2score.innerHTML = player2.score;
    draw.innerHTML = ties;

}



closeBtn.addEventListener('click', () =>{
    overlay.style.display = 'none' ;
})

function ShowMessage(player,winner){
    overlay.style.display ='flex';
    if(winner){
    messageContent.innerHTML = player.Symbol + ' is the <h2>Winner</h2>';
    }else{
        messageContent.innerHTML = 'It is a <h2>Draw</h2>';
    }
    reset();
}
