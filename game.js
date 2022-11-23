class Game{
    init(config){
        let map=[
            [1,2,3],
            [4,5,6],
        ];
        for (let i = 0; i < map.length; i++) {
           for (let j = 0; j < map[i].length; j++) {
            console.log(map[i][j]);
           }
        }
    }
}

export {Game};
