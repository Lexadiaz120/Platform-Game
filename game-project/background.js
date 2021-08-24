class Background{
   constructor(ctx,w,h,imgPath, x = 0, y = 0) {
       this.ctx = ctx;
       this.width = w;
       this.height = h ;
       this.imgPath = `/img/${imgPath}`;
       this.position = {x: x, y: y}; 
       this.speed = 3;
       // No forget 
       this.init()
       
    
   }
   init(){
       
       this.img = new Image(); 
       this.img.src = this.imgPath;
   }
   draw(){
       this.ctx.drawImage(this.img,this.position.x,this.position.y,this.width,this.height)
       this.ctx.drawImage(this.img,this.position.x,this.position.y - this.height, this.width,this.height)
   }
   move(){
    this.position.y += this.speed
    this.position.y %= this.height
   }
}