class Master {
    container = null;
    containerForm = null;
    board = null;
    fil = 0;
    col = 0;
    init() {
        this.container = document.getElementById('container');
        this.createForm();
        this.createFormUI();
    }
    createForm() {
        this.containerForm = document.createElement("form");
        this.containerForm.setAttribute("action", "createBoard");

        let elem = document.createElement("input");
        elem.setAttribute("id", "inputText0");
        elem.setAttribute("type", "text");
        this.containerForm.appendChild(elem);

        elem = document.createElement("input");
        elem.setAttribute("id", "inputText1");
        elem.setAttribute("type", "text");
        this.containerForm.appendChild(elem);

        elem = document.createElement("input");
        elem.setAttribute("id", "inputButton0");
        elem.setAttribute("type", "button");
        this.containerForm.appendChild(elem);
    }
    createFormUI() {
        let elem = document.createElement("div");
        elem.setAttribute("id", "inputText0");
        this.container.appendChild(elem);

        elem = document.createElement("div");
        elem.setAttribute("id", "inputText1");
        this.container.appendChild(elem);

        elem = document.createElement("div");
        elem.setAttribute("id", "inputButton0");
        this.container.appendChild(elem);
    }
    createBoard() {
        this.board = new Array(this.fil);
        for(let i=0; i<this.board.length; i++) {
            this.board[i] = new Array(this.col);
        }
    }
}

export {Master};