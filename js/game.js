class Game {
    maps = null;
    init(box) {
        var map = this.maps;
        map = new Array(7);
        for (var i = 0; i < map.length; i++) {
            map[i] = new Array(7);
        }

        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 7; j++) {
                map[i][j] = box;
            }
            map[i] = box;
        }
        
        for (var i in map) {
            console.log("row " + i);
            for (var j in map[i]) {
                console.log(" " + map[i][j]);
            }
        }
    }
}
export {Game};