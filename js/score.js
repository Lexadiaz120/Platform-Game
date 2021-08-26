class ScoreText{
    constructor(ctx, canvasWidth, canvasHeight){ 
        this.ctx = ctx
        this.width = canvasWidth
        this.height = canvasHeight
        this.score = `Score:`
       
    }
    draw(diamonds){

        this.ctx.font = '48px serif';
        this.ctx.fillStyle = `gold`
        this.ctx.fillText(`${this.score}`+`${diamonds}`,this.width, 60)

    }
}
