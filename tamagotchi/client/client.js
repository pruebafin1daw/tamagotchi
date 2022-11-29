let num = 7;
//Esto deberia ser el tamaño que nos manda el servidor pero 
//todavia no se hacerlo asi que meto un tamaño y ya lo arregtlaré
let position = [0, 0];//Este array me lo mandaria el servidor al conectarme 
//para saber mi posicion inicial

let div = document.getElementById("map");
let map = [];
let goal = Math.trunc(num / 2);
for (let i = 0; i < num; i++) {
  map.push([]);
  for (let j = 0; j < num; j++) {
    let space = document.createElement('div');
    let box = {
        "tipo":0,
        "jugador":[],
    };
    if (i == goal && j == goal){
        space.setAttribute("class" , "goal");
        box.tipo = 5;
    }else if(i == position[0] && j == position[1]){
      space.setAttribute("class" , "player");
      space.setAttribute("id" , "player");
      box.tipo = 1;
      box.jugador[0] = 1;
      listener(i, j);
    }else{
        space.setAttribute("class" , "space");
    };
    div.appendChild(space);
    map[i][j] = box;
  }
  div.appendChild(document.createElement('br'));
}


function listener(x, y){
  document.addEventListener("keyup", (e) => {
    let box = {
      "tipo":0,
      "jugador":[],
    };
    map[y][x] = box;
    switch (e.key) {
        case "ArrowLeft":
            box.tipo = 1;
            map[y][x-1] = box;
        break;
        case "ArrowRight":
          box.tipo = 1;
          map[y][x+1] = box;
        break;
        case "ArrowUp":
          box.tipo = 1;
          map[y-1][x] = box;
        break;
        case "ArrowDown":
          box.tipo = 1;
          map[y+1][x] = box;
        break;
        default:
            break;
    } 
    console.log(map);
  });
}