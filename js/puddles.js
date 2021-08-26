class Puddles{
    constructor(ctx,w,h ,imgPath, x , y ) {
        this.ctx = ctx;
        this.width = w;
        this.height = h ;
        this.imgPath = `img/${imgPath}`;
        this.position = {x: x, y: y}; 
        // No forget 
        this.init(); 
        
     
    }
    init(){
        
        this.img = new Image(); 
        this.img.src = this.imgPath;
    }
    draw(){
        this.ctx.drawImage(this.img,this.position.x,this.position.y,this.width,this.height);
    }
  }