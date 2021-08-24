const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined, 
    background: undefined, 
    player: undefined, 
    timeInterval: 20,
    
    platformhorizontal: [],  
    platforms: [], 
    keys: {
        TOP: 38, 
        SPACE: 32,
        ArrowLeft: 37, 
        ArrowRight: 39
    }, 
   
    init(id) {
        
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext("2d") 
        this.setDimensions();
        this.player = new Player(this.ctx, this.width, this.height, `watergirl.png` , 250, this.keys);
        this.background = new Background(this.ctx, this.width, this.height, `newbackground.png`,); 
        this.creatPlatforms();  
        this.start() 
    },

    setDimensions(){
        this.canvas.setAttribute("width",window.innerWidth)
        this.canvas.setAttribute("height",window.innerHeight)
        this.width = window.innerWidth; 
        this.height = window.innerHeight; 
    },
    start(){
         setInterval(() => {
            this.clearAll()
            this.drawAll() 
        this.isCollisionHorizontal() 
        this.isCollisionVertical(); 
        if(this.isCollisionVertical()){
            console.log('is collision vertical');
        }
        if(this.isCollisionHorizontal() ){
            console.log("is collision"); 
        }
            // this.cleanObjects()
             this.moveAll()
           // this.endGame()
         }, this.timeInterval);
        
    }, 
    isCollisionHorizontal(){
        return this.platformhorizontal.some(platforms => {
            return (
                this.player.position.x + this.player.width >= platforms.positionX &&
                this.player.position.x <= platforms.positionX + platforms.widthPlatform &&
                this.player.position.y <= platforms.positionY + platforms.heightPlatform &&
                this.player.position.y + this.player.height >= platforms.positionY
             )
         })
    },  

isCollisionVertical(){

    return this.platforms.some(platforms2 => {
        console.log(this.player.position.x + this.player.width >= platforms2.positionX &&
            this.player.position.x <= platforms2.positionX + platforms2.widthPlatform &&
            this.player.position.y <= platforms2.positionY + platforms2.heightPlatform)
        return (
            this.player.position.x + this.player.width >= platforms2.positionX &&
            this.player.position.x <= platforms2.positionX + platforms2.widthPlatform &&
            this.player.position.y <= platforms2.positionY + platforms2.heightPlatform &&
            this.player.position.y + this.player.height >= platforms2.positionY
        )
    })
    
},

    //Add Event Listener to move player with keyboard


    creatPlatforms(){
        
        for(let i = 0;i < 10;i++){
            let desplazamiento = this.width/10
            this.platforms.push(new Platform(this.ctx, desplazamiento*i,this.height - 65 * i));  
        } 

        for(let i = 0; i < 10; i++){
        
            const desplazamiento = this.height/6;
            this.platformhorizontal.push(new Platform(this.ctx, 220*i+100,desplazamiento*i )); 
            // this.height  -= 150  
           
            
        }    
  


        
      //  for(let i = 0; i < 4; i++){
        //    let newWidth = this.width 
          //  this.platforms.push(new Platform(this.ctx,newWidth,this.height)); 
         //   this.height  -= 150 
            
       // }  
    },
    clearAll(){
        this.ctx.clearRect(0,0,this.width, this.height)
    },
    drawAll(){
        this.background.draw();
        this.drawPlatforms();       
        this.player.draw(); 
        this.player.move()
        //this.platforms.draw()
        
    }, 
   
    drawPlatforms(){
        
        this.platforms.forEach(platform => platform.draw());
        this.platformhorizontal.forEach(platform => platform.draw());

    },

    moveAll(){
        this.background.move()
    }




}
