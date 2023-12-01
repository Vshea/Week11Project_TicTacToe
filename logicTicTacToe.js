let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

let highlightWinner = getComputedStyle(document.body).getPropertyValue('--winning-line'); //highlights winning lines


const textO = "O";
const textX = "X";
let currentPlayer = textX;
let spaces = Array(9).fill(null); //makes boxes empty

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', clickedBox));
}

function clickedBox(e) { //this function runs when the box is clicked
    const id = e.target.id; //targets the ID of the box clicked

    if(!spaces[id]){ //If the space is equal to null (as in, a space not yet filled)...
        spaces[id] = currentPlayer; //fills the space with the currentPlayer
        e.target.innerText = currentPlayer; //When you click on the target (the box), the inner text becomes the currentPlayer which...
  
        if (currentPlayer == textX){
            playerTurn.innerHTML = "X's Turn!";
         }else{
            playerTurn.innerHTML = "O's Turn!";
         } 

        if(playerWON() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`;
            let winning_blocks = playerWON();

            winning_blocks.map( box => boxes[box].style.backgroundColor=highlightWinner);
            return
        }

        currentPlayer = currentPlayer == textX ? textO : textX 
        //If currentPlayer == textX then change it to textO. Else, change it to textX. 
    }
}

const winningLines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerWON() {
    for (const condition of winningLines) {
        let [a, b, c] = condition;

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){ //if space a is equal to space b and c (as in they are all  X or all O)
            return [a,b,c] //user has won
        }   

    }
    return false //no one has won
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);
    boxes.forEach( box => {
        box.innerText = '';
        box.style.backgroundColor='';
    })

    playerText.innerHTML = 'Tic-Tac-Toe';
    playerTurn.innerHTML = "It is X's turn!"

    currentPlayer = textX;
}
startGame()