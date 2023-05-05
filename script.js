var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {


    board = [
        [2, 2, 2, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if(num > 0) {
        tile.innerText = num.toString();
        if(num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }                
    }
}

document.addEventListener("keyup", (e) => {
    if(e.code == "Arrowleft") {
        slideLeft();
    }
})

function filterZero() {
    return row.filter(num => num != 0)
}

function slide() {
    row = filterZero(row);
}

function slideLeft() {
    for(let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
    }
}




//https://www.youtube.com/watch?v=XM2n1gu4530