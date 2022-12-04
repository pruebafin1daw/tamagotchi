import { Box } from "./box.js";

class Board {
    constructor(config) {
        this.communication = config.communication;
        this.width;
        this.height;
        this.board = null;
        this.emptyBox = 0;
        this.burrow = 1;
        this.goal = 2;

        this.setDimensions(config.width, config.height);
        this.setBoard();
        this.drawBoard();
    }

    setDimensions(width, height) {
        if (!width % 2 == 0) width++;
        if (!height % 2 == 0) height++;
        [this.width, this.height] = [width, height];
    }

    setBoard() {
        this.board = Array(this.width).fill(Array(this.height).fill(new Box(this.emptyBox)));
        this.setBurrows();
        this.setGoal();
    }

    setBurrows() {
        this.board = this.board.map((row, index) => {
            return row.map(box => {
                if (Math.random() < 0.2) {
                    return new Box(this.burrow);
                }
                return box;
            });
        })
    }

    setGoal() {
        let [x, y] = [Math.floor(this.width / 2), Math.floor(this.height / 2)];
        this.board[x][y] = new Box(this.goal);
    }

    drawBoard() {
        let board = JSON.parse(JSON.stringify(this.board));
        let container = document.querySelector('.container');
        let fragment = document.createDocumentFragment();
        board.forEach(rowData => {
            let row = document.createElement('div');
            row.classList.add('row');
            rowData.forEach(boxData => {
                let box = document.createElement('div');
                box.classList.add('box');
                if (boxData.type == this.emptyBox) box.classList.add('empty');
                else if (boxData.type == this.burrow) box.classList.add('burrow');
                else if (boxData.type == this.goal) box.classList.add('goal');
                row.appendChild(box);
            });
            fragment.appendChild(row);
        });
        container.appendChild(fragment);
    }
}

export {Board};