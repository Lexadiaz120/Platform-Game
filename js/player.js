class Player{
  constructor(ctx,w,h,imgPath, x = 250, keys) {
     
    this.ctx = ctx;
    this.canvasSize = {w : w, h: h}; 
      this.width = 80;
      this.height = 120;
      this.imgPath = `img/${imgPath}`;
      this.position = {x: x, y: this.canvasSize.h - this.height - 20 }; 
      this.posY0 = this.position.y 
      // If position of our player is equal to position of our player
      this.speedY = 3
      this.speedX = 1
      this.gravity = 0.4
      this.keys = keys
      this.setListerners();
      // No forget  
      
      this.init();   
       
  } 
  init(){
      
      this.img = new Image();  
      this.img.src = this.imgPath; 
  }
  draw(){
      this.ctx.drawImage(this.img,this.position.x,this.position.y,this.width,this.height)
     // this.ctx.drawImage(this.img,this.position.x,this.position.y, this.width,this.height)
      
  }
  move(){ // Preguntar  
    //console.log("gravity", this.posY0)
    if(this.position.y < this.posY0){
      this.position.y += this.speedY
      this.speedY += this.gravity
    }else{
      this.position.y = this.posY0
      this.speedY = 5
   }
} 

setListerners(){
    document.addEventListener("keydown", e => {
      
        switch (e.keyCode) {
          // case this.keys.TOP:
          //   this.move();
          //   break;
          case this.keys.SPACE:
            this.jump()  
            break;
          case this.keys.ArrowLeft:
            if(this.isOnPlatform || (Game.checkPlayerCollision2(-1) === false && Game.checkPlayerCollision(-1) === false)){
              this.moveLeft();
            }
            break;
          case this.keys.ArrowRight:
            if(this.isOnPlatform || (Game.checkPlayerCollision2(1) === false && Game.checkPlayerCollision(1) === false)) {
              this.moveRight();
            }
            break;
        }
      });

     
}   

jump() {
    if (this.isOnPlatform || this.position.y >= this.posY0) {
      this.position.y -= 40;
      this.speedY -= 8;
    } 
  }
  moveRight(){
   if(this.position.x <= this.canvasSize.w - 20){

     this.speedX += 5
     this.position.x += 10
     
   }else{
    this.position.x = 10
   }
  }

  moveLeft(){
    if(this.position.x >= 0){
    this.position.x -= 10
    this.speedX -= 5
  }else{
    this.position.x = this.canvasSize.w -30
   }
  }




}