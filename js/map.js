class Map {
    constructor() {
        this.map = [
            [1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 'F', 1, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0]
        ];
        this.container;
    }

    getMap() {
        return JSON.parse(JSON.stringify(this.map));
    }

    render() {
        this.container = document.getElementById('container');
        this.map.forEach(rowData => {
            let row = document.createElement('div');
            row.classList.add('row');
            rowData.forEach(columnData => {
                let column = document.createElement('div');
                column.classList.add('column');
                column.innerHTML = columnData;
                row.appendChild(column);
            });
            this.container.appendChild(row);
        });
    }
}

export {Map};