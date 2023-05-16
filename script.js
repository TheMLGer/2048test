var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {


    //array in einem array mit welchem wir das speilfeld hardcoden
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    //generiere das spielfeld
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString(); //schreibe die id in die html elemente, damit die farben stimmen
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    //erstelle zwei teile um das spiel zu beginnen
    setTwo();
    setTwo();

}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //entferne alle zugeordneten klassen
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {                              //sollte man unter 4096 sein, verändern sich farben und klassen
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");        //alles ab 8192 ist egal die klasse bleint gleich und farbe auch
        }                
    }
}

//bewegungen tasten zuordnen

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();

    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;     //score wird gändert 
})

function filterZero(row){
    return row.filter(num => num != 0); //neuer array mit allen nums != 0
}

function slide(row) {
    //[0, 2, 2, 2] 
    row = filterZero(row); //[2, 2, 2] filtert die 0 heraus
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } //[4, 0, 2] addiert die zwei zahlen
    row = filterZero(row); //[4, 2] nimmt erneut die null heraus
    //füge die neuen nullen hinzu, welche mit einbedacht werden müssen
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];         
        row.reverse();             
        row = slide(row)          
        board[r] = row.reverse(); 
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);


        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];


        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();


        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];


        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //suche zufällige zeile und spalte und füge die zwei ein
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");   //wir können gleich die 2 als klassenliste adden
            found = true;
        }
    }
}

//finde heraus ob es leere teile gibt

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //mindestens eine null im spielboard
                return true;
            }
        }
    }
    return false;
}

const botbtn = document.getElementById("#bot");
botworking = false;

if(botworking === false) {
    botbtn.addEventListener("click", function() {
        botworking = true;
        botbtn.innerText = "stop bot";
        console.log(botworking);
    
    }); 
}   else {
    console.log("bot already working");
}

