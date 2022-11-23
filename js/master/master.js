import { Box } from "../client/box.js";

class Master {
    constructor() {
        this.table = [];
    }

    createTable(number) {
        if (number % 2 == 0) {
            number += 1;
        }
        let goalPosition = Math.trunc(number / 2);
        let type;
        for (let i = 0; i < number; i++) {
            let row = [];
            for (let j = 0; j < number; j++) {
                if (i == goalPosition && j == goalPosition) {
                    type = 9;
                } else {
                    type = 0;
                }
                row.push(new Box(type));
            }
            this.table.push(row);
        }

        this.drawTable();
    }

    drawTable() {
        this.table.forEach(row => {
            let rowTable = document.createElement('div');
            rowTable.classList.add('row');
            row.forEach(col => {
                let columnTable = document.createElement('div');
                columnTable.innerHTML = col.type;
                rowTable.appendChild(columnTable);
            });
            document.getElementById('container').appendChild(rowTable);
        });
    }
}

export {Master};