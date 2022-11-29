class Master{
    init(){
        console.log("Soy master");

        let size = document.getElementById('size');
        let number = document.getElementById('number');
        let button = document.getElementById('button');
        button.addEventListener("click", send);
        
        
        function send(){
            let hide = document.getElementById('form');
            hide.style.display = "none";
            let map = [];
            let div = document.getElementById('map');
            let goal = Math.trunc(size.value / 2);
            for (let i = 0; i < size.value; i++) {
                map.push([]);
                for (let j = 0;  j < size.value; j++) {
                    let space = document.createElement('div');
                    let box = {
                        "tipo":0,
                        "jugador":[],
                    };
                    if (i == goal && j == goal){
                        space.setAttribute("class" , "goal");
                        box.tipo = 5;
                    }else{
                        space.setAttribute("class" , "space");
                    };
                    div.appendChild(space);
                    map[i][j] = box;
                } 
                div.appendChild(document.createElement('br'));
            }
        }
    }
}
export {Master};

class Client{
    init(){
        let hide = document.getElementById('form');
        hide.style.display = "none";
        console.log("Soy cliente");
        // let map = [];
        // let div = document.getElementById('map');
        // let goal = Math.trunc(form.size / 2);
        // for (let i = 0; i < form.size; i++) {
        //     map.push([]);
        //     for (let j = 0;  j < form.size; j++) {
        //         let space = document.createElement('div');
        //         let box = {
        //             "tipo":0,
        //             "jugador":[],
        //         };
        //         if (i == goal && j == goal){
        //             space.setAttribute("class" , "goal");
        //             box.tipo = 5;
        //         }else{
        //             space.setAttribute("class" , "space");
        //         };
        //         div.appendChild(space);
        //         map[i][j] = box;
        //     } 
        //     div.appendChild(document.createElement('br'));
        // }
    }
}

export {Client};

