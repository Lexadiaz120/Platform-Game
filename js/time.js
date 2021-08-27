class TimeText{
    constructor(ctx, canvasWidth, canvasHeight){ 
        this.ctx = ctx
        this.width = canvasWidth
        this.height = canvasHeight
        this.time = `Time:`
       
    }
    draw(timeCounter){

        this.ctx.font = '48px serif';
        this.ctx.fillStyle = `gold`
        this.ctx.fillText(`${this.time}`+`${timeCounter}`,this.width, 60)

    }
}
