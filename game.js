    //Objeto que contiene todo nuestro juego
const Game = {
    //Define el tamaño del canvas
    canvas: undefined,
    // Fija el contexto donde se van a dibujar los elementos
    ctx: undefined,
    // Ancho de referencia del contexto
    width: undefined,
    // Alto de referencia del contexto
    height: undefined, 
    // Variable que define cual va a ser el fondo y sus caracteristicas
    background: undefined, 
    // Variable que define cual va a ser nuestro jugador y sus caracteristicas
    player: undefined, 
    score: undefined,
    diamondCounter: 0,  
    // Intervalo de tiempo en el que se repite una accion
    timeInterval: 20,  
    // Array vacio que almacenara las plataformas
    platformhorizontal: [],  
    // Array vacio que almacenara las plataformas
    platforms: [],     
    diamonds: [], 
    puddles: [], 
    //
    finaldoor: undefined, 
    // Variable que almacenara el conjunto de teclas que utilizaremos en nuestro juego
    keys: {
        TOP: 38, 
        SPACE: 32,
        ArrowLeft: 37, 
        ArrowRight: 39
    },
    
    // Metodo que incializa nuestro juego con los parametros y elementos definidos     
    init(id) {
        // Almacenamiento de la referencia de id dentro de la variable canvas predefinida como 'undefined'
        this.canvas = document.getElementById(id)
        // Almacenamiento dentro de la variable ctx de la referencia de dontexto del canvas
        this.ctx = this.canvas.getContext("2d") 
        // Invocacion el metodo que fija las dimensiones de nuestro juego
        this.setDimensions();
        this.score = new ScoreText(this.ctx,this.width/3,200);
        // Llamamos a la variable player(undefined) y creamos una nuevo player(clase) y le asignamos los valores de nuestro jugador
        this.player = new Player(this.ctx, this.width, this.height, `watergirl.png` , 50, this.keys);
        // Llamamos a la variable background(undefined) y creamos una nuevo background(clase) y le asignamos los valores de nuestro background
        this.background = new Background(this.ctx, this.width, this.height, `newbackground.png`,);
     
       this.finaldoor = new Door(this.ctx, 90, 80,'waterdoor.JPG');
        // Invocamos al metodo que crea las plataformas al iniciar el juego
        this.creatPlatforms();   
        // Invocamos al metodo que empieza nuestro juego
        
        this.score.draw()
        this.start() 
    },

    // Fija las dimensiones de nuestro juego
    setDimensions(){
        //Añade un atributo a el canvas llamado width y le da de referencia el ancho de la pantalla
        this.canvas.setAttribute("width",window.innerWidth)
        //Añade un atributo a el canvas llamado height y le da de referencia la altura de la pantalla
        this.canvas.setAttribute("height",window.innerHeight)
        // Le da a la variable width(undefined) la refencia del ancho de la pantalla
        this.width = window.innerWidth; 
        // Le da a la variable height(undefined) la refencia del ancho de la pantalla
        this.height = window.innerHeight; 
    },

    //Comienza nuestro juego
    start(){
        // Intervalo de repeticion desues de un rango de tiempo
         setInterval(() => {

             // Refresca los elementos y parametros en el contexto del canvas
            this.clearAll()
            // Dibuja los elementos en el contexto del canvas
            this.drawAll() 
            //comprueba si el jugador caera en una plataforma segun su speedY
            this.checkPlayerCollision(0, 5) 
            //comprueba si el jugador caera en una plataforma segun su speedY
            this.checkPlayerCollision2(0, 5) 
            // mueve los elementos por el contexto del canvas
            this.checkDiamondCollision() 
            this.checkDoorCollition();
             this.moveAll()
           // this.endGame()
         }, this.timeInterval);
        
    }, 
    // Comprueba si el jugador ha colisionado y devuelve un true si alguna de las colisiones se ha cumplido
    checkPlayerCollision2(step){
    // Itera sobre el array mediante el metodo some buscando si alguna de las condiciones se cumple, si es asi devuelve true
    return this.platformhorizontal.some(platforms2 => {
        // Comprobacion de la colision lateral derecha
        const rightBorderCol = this.player.position.x + step <= platforms2.positionX + platforms2.widthPlatform
        // Comprobacion de la colision lateral izquierda
        const leftBorderCol = this.player.position.x + this.player.width + step >= platforms2.positionX
        // Comprobacion de la colision superior
        const topBorderCol = this.player.position.y + this.player.height  >= platforms2.positionY 
        // Comprobacion de la colision inferior
        const bottomBorderCol = this.player.position.y <= platforms2.positionY + platforms2.heightPlatform 
       
        // Condicional del conjunto de colisiones que deben cumplirse para que el player este encima de la puerta
        if(rightBorderCol && leftBorderCol && topBorderCol && bottomBorderCol) {
            this.isOnPlatform(platforms2)
            return true
        } else {
            this.isOffPlatform()
        }
    })
},
     // Comprueba si el jugador ha colisionado y devuelve un true si alguna de las colisiones se ha cumplido
    checkPlayerCollision(step){
    // Itera sobre el array mediante el metodo some buscando si alguna de las condiciones se cumple, si es asi devuelve true
    return this.platforms.some(platforms2 => {
        // Comprobacion de la colision lateral derecha
        const rightBorderCol = this.player.position.x + step <= platforms2.positionX + platforms2.widthPlatform
         // Comprobacion de la colision lateral izquierda
        const leftBorderCol =  this.player.position.x + this.player.width + step >= platforms2.positionX
         // Comprobacion de la colision superior
        const topBorderCol = this.player.position.y + this.player.height >= platforms2.positionY
         // Comprobacion de la colision inferior
        const bottomBorderCol = this.player.position.y <= platforms2.positionY + platforms2.heightPlatform 
        
        // Condicional del conjunto de colisiones que deben cumplirse para que el player este encima de la puerta
        if(rightBorderCol && leftBorderCol && topBorderCol && bottomBorderCol) {
            this.isOnPlatform(platforms2)
            return true
        } else {
            this.isOffPlatform()
        }
    })
},
//comprueba colision
checkDiamondCollision(){
    return this.diamonds.some((diamond, idx) =>{
        const rightBorderCol = this.player.position.x < diamond.position.x + diamond.width
        const leftBorderCol = this.player.position.x + this.player.width > diamond.position.x
        const topBorderCol = this.player.position.y + this.player.height > diamond.position.y
        const bottomBorderCol = this.player.position.y < diamond.position.y + diamond.height
        
        //si hay alguna colision
        if(rightBorderCol&&leftBorderCol&&topBorderCol && bottomBorderCol){
            //borra el diamante
            this.diamonds.splice(idx,1);
           // console.log("is collision !!");
            this.diamondCounter ++
        } 
      
    })
},  

checkDoorCollition(){
   if(this.player.position.x  < this.finaldoor.position.x  + this.finaldoor.width &&
    this.player.position.x + this.player.width > this.finaldoor.position.x &&
    this.player.position.y +  this.player.height > this.finaldoor.position.y &&
    this.player.position.y < this.finaldoor.position.y + this.finaldoor.height){
           console.log('Hello')
   }else{
       console.log('Bye');
   }
}, 

// Comprueba si el player esta en la plataforma
    isOnPlatform(platforms2){
        if(this.player.position.y + this.player.height > platforms2.positionY - 10 && this.player.position.y + this.player.height <  platforms2.positionY + platforms2.heightPlatform){
             this.player.posY0 = platforms2.positionY - this.player.height
            this.player.speedY = 3
            this.player.position.y = platforms2.positionY - this.player.height 
            this.player.isOnPlatform = true
    } 
},

// Comprueba si el jugador esta fuera de la plataforma
    isOffPlatform() {
     
            this.player.isOnPlatform = true
            this.player.posY0 = this.height - this.player.height
        
    },
    // Metodo que te crea las plataformas y las introduce dentro de un array   
    creatPlatforms(){
        for(let i = 0;i < 10;i++){
            let desplazamiento = this.width/10
            this.platforms.push(new Platform(this.ctx, desplazamiento*i,this.height - 65 * i)); 
            if(i%3==0) {

                this.diamonds.push(new Diamond(this.ctx, 80, 40, 'diamond.png',  desplazamiento*i,this.height - 90 * i ));
            }
        } 
        for(let i = 0; i < 10; i++){ 
            const desplazamiento = this.height/8;
            this.platformhorizontal.push(new Platform(this.ctx, 220*i+90,desplazamiento*i)); 
          if(i%2==0||i%5==0) {
            this.diamonds.push(new Diamond(this.ctx, 80, 40, 'diamond.png' , 220 * i + 90, desplazamiento * i -80));
          }
        }    
    }, 
     
 

    //Metodo que limpia todo el contexto del canvas
    clearAll(){
        this.ctx.clearRect(0,0,this.width, this.height)
    },
    
    // Metodo que dibuja todos los elementos del canvas
    drawAll(){
        this.background.draw();
        this.drawPlatforms();    
        this.finaldoor.draw();    
        this.player.draw(); 
        this.player.move() 
        this.score.draw(this.diamondCounter); 
        this.diamonds.forEach(diamond => diamond.draw());
       
      
        
    }, 
   // Metodo que dibuja las plataformas
    drawPlatforms(){
        
        this.platforms.forEach(platform => platform.draw());
        this.platformhorizontal.forEach(platform => platform.draw());

    },
    // Metodo que mueve los elementos del contexto
    moveAll(){
        this.background.move()
    }

}
