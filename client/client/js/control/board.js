const squareType = 0;
const burrowType = 1;
const playerType = 2;

class Board {
    socket = null;

    init(table) {
        this.drawBoard(table);
    }

    drawBoard(table) {
        let content = document.getElementById('content');

        let tableHTML = document.getElementById('tableHTML');
        tableHTML.innerHTML = table;
        
        content.appendChild(tableHTML);
    }
}

export { Board }