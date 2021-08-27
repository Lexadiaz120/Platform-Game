class Platform{

    constructor(ctx,width, height){
        
        this.ctx = ctx
        this.widthPlatform = 220
        this.heightPlatform = 25
        this.positionX = width + 10;
        this.positionY = height ;
    }

    draw(){
        this.ctx.fillStyle  = '#6B5D22';
        this.ctx.fillRect(this.positionX,this.positionY,this.widthPlatform,this.heightPlatform);
           
       }

        
    }
