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
      FUNCIONES       ESTADO      NECESIDADES
  * deadClients() -> Terminado  (content.name)
  * movePlayer()  -> Terminado  (Nada, se llama al iniciar la partida)
  * showMap()     -> Terminado  (content.width, content.burrow, content.energy, content.x, content.y)
  * refreshMao()  -> Terminado  (content.energy, content.x, content.y)
  * moreEnergy()  -> Terminado  (content.energy)
  * deadPlayer()  -> Terminado  (Nada, ya que solo limpio el body y muestro el mensaje de que ha perdido)
  * actions()     -> Terminado  (content.action)

Master.js
- Se ha añadido al init (Carlos)
  * this.config = config; // Se ha guardado el config en una variable de clase
  * this.map[this.config.height/2][this.config.width/2].endPoint = true; // Se ha indicado en el mapa la bandera
  * this.flag = this.map[this.config.height/2][this.config.width/2]; // Se ha guardado la bandera en una variable de clase

Inicio.js
- Se ha añadido al json (Carlos)
  * lifeTakenDamage : 10, lifeRestoredBurrow : 10, lifeRestoredAlone : 2
  
 Index.html (Izam)
-   div id="health"
    div id="info"
    div id="map"
    div id="clients"
    
 Index.js(Izam)
 - Se ha añadido el if(data.tipo === "deadPlayer")
