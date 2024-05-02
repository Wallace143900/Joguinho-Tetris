const boardWidth = 10;
const boardHeight = 20;

const board = [];
const soundGame = document.createElement('audio');
const breakGame = document.createElement('audio');
const dropGame = document.createElement('audio');
let totatedShape;

soundGame.setAttribute('src', './video/Original Tetris theme (1).mp3');
soundGame.muted = true;

breakGame.setAttribute('src', './video/descida tetris fundo (1).mp3');
soundGame.muted = true;

dropGame.setAttribute('src', './video/quebra-de-linha-tetris (1).mp3');
soundGame.muted = true;

for(let i = 0; i < boardHeight; i++){
    board[i] = [];
    for(let j = 0; j < boardHeight; j++){
        board[i][j] = 0;
    }
}

const tetromínoes = [
    {
        shape: [
            [1,1],
            [1,1]
        ],
        color: '#ffd800',
    },
    {
       shape: [
        [0,2,0],
        [2,2,2],
       ],
       color: "#7925dd", 
    },
    {
        shape: [
            [0,3,3],
            [3,3,0]
        ],
        color: 'orange'
    },
    {
        shape: [
            [4,4,0],
            [0,4,4]
        ],
        color: 'red'
    }, 
    {
        shape: [
            [5,0,0],
            [5,5,5]
        ],
        color: 'green'
    },
    {
        shape: [
            [0,0,6],
            [6,6,6]
        ],
        color: "#ff6400",
    }, 
    {
        shape: [[7,7,7,7]],
        color: "#00b5ff",
    },
];

function randomTetromico(){
    const index = Math.floor(Math.random() * tetromínoes.length);

    const tetromino = tetromínoes[index];
    return {
        shape : tetromino.shape,
        color : tetromino.color,
        i : 0,
        j : Math.floor(Math.random() * (boardWidth - tetromino.shape[0].length + 1))
    };
}

let currentTetromico = randomTetromico();
let currenteGhostTetromino;

function drawTetromino() {
    const shape = currentTetromico.shape;
    const color = currentTetromico.color;
    const i = currentTetromico.i;
    const j = currentTetromico.j;

    for(let r = 0; r < shape.length; r++){
        for(let c = 0; c < shape[r].length; c++){
            if(shape[r][c]){
                const block = document.createElement('div');
                block.classList.add('block');
                block.style.backgroundColor = color;
                block.style.top = (i + r) * 24 + 'px';
                block.style.left = (j+c) *24 + 'px';
                block.setAttribute('id', `block-${i + r}-${j + c}`);
                document.getElementById("game_board").appendChild(block);
            }
        }
    }
}

function erasetetromino() {
    for(let l = 0; l< currentTetromico.shape.length; l++){
        for(let m = 0; m < currentTetromico.shape[l].length; m++){
            if(currentTetromico.shape[l][m] !== 0){
                let i = currentTetromico.i + l;
                let j = currentTetromico.j + m;
                let block = document.getElementById(`block-${i}-${j}`);

                if(block){
                    document.getElementById('game_board').removeChild(block);
                }
            }
        }
    }
}

function canTetrominoMove(rowOffset, colOffset){
    for(let x = 0; x < currentTetromico.shape.length; x++){
        for(let z = 0; z < currentTetromico.shape[x].length; z++){
            if(currentTetromico.shape[x][z] !== 0){
                let row = currentTetromico.row + x + rowOffset;
                let col = currentTetromico.col + z + colOffset;

                if(row >= boardHeight || col < 0 || col >= boardWidth || (row >= 0 && board[row][col])){
                  return false;  
                }
            }
        }
    }
    return true;
}


function lockTetromico (){
    for(let i = 0; i < currentTetromico.shape.length; i++){
        for(let j = 0; j < currentTetromico.shape[i].length; j++){
            if(curr)
        }
    }
}

function rotateTetromico(){
    rotatedShape = [];
    for(let n = 0; n < currentTetromico.shape[0].length; n++){
        let row = [];
        for(let o = currentTetromico.shape.length -1; o >= 0; o--){
            row.push(currentTetromico.shape[o][n]);
        }
        rotatedShape.push[row];
    }

    erasetetromino();
    currentTetromico.shape = rotatedShape;
    drawTetromino();
}

function movetetromico(direction){
    let i = currentTetromico.i;
    let j = currentTetromico.j;

    if(direction === 'left'){
        if(canTetrominoMove(0,-1)){
            erasetetromino();
            j -= 1;
            currentTetromico.j = j;
            currentTetromico.i = i;
            drawTetromino();
        }
    }else if(direction === "right"){
        if(canTetrominoMove(0,1)){
            erasetetromino();
            j += 1;
            currentTetromico.j = j;
            currentTetromico.i = i;
            drawTetromino();
        }
    }else{
        erasetetromino();
        i++;
        currentTetromico.j = j;
        currentTetromico.i = i;
        drawTetromino();
    }
}

drawTetromino();
setInterval(movetetromico, 500);

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event){
    switch(event.keyCode){
        case 37: //left arrow
            movetetromico("left");
            break;
        case 39: //right arrow
            movetetromico("right");
            break;
        case 40: //down arrow
            movetetromico("down");
            break;   
        case 38: //up arrow
            rotateTetromico();
            break; 
        case 32: //space bar
            movetetromico("left");
            break;
    }
}