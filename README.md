# tamagotchi
Equipo 4:
1. Izam Morales Muñoz.
2. Iker García Gutiérrez.
3. Juan Ignacio Martín Fernández.
4. Carlos Maroto Delgado.

Reparto funciones Master:
- Conectar Cliente
- Iniciar Partida
- Mover Cliente -> Iker (por terminar comentarios)
- manageShift() -> Carlos (por terminar comentarios)
  * manageBattles() -> Carlos (terminado)
  * restoreLife() -> Carlos (terminado)
  * killPlayer() -> Carlos (por terminar comentarios)
- endgame() -> Carlos (por terminar comentarios)

Client Izam: 
- Mover Cliente (en desarrollo)
  * dealClients()
  * movePlayer()
  * showMap()
  * refreshMap -> por terminar
- Lucha
- Cliente Muerto
- Final

Master.js
- Se ha añadido al init (Carlos)
  * this.config = config; // Se ha guardado el config en una variable de clase
  * this.map[this.config.height/2][this.config.width/2].endPoint = true; // Se ha indicado en el mapa la bandera
  * this.flag = this.map[this.config.height/2][this.config.width/2]; // Se ha guardado la bandera en una variable de clase

Inicio.js
- Se ha añadido al json (Carlos)
  * lifeTakenDamage : 10, lifeRestoredBurrow : 10, lifeRestoredAlone : 2
  
 Index.html (Izam)
 -  <div id="info"></div>
    <div id="map"></div>
    <div id="clients"></div>
    
 Index.js(Izam)
 - Se ha añadido el if(data.tipo === "deadPlayer")
