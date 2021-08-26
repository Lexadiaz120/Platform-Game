// Tipo de clase
class Win{
    // Conjunto de parametros que recibe la clase
   constructor(ctx,w,h,imgPath, x = 0, y = 0) {
       this.ctx = ctx;  
       this.width = w;
       this.height = h ;
       this.imgPath = `img/${imgPath}`;
       this.position = {x: x, y: y}; 
       // No forget 
       this.init()
       
    
   }
   // Metodo que carga la imagen  y su path
   init(){
       
       this.img = new Image(); 
       this.img.src = this.imgPath;
   }
   // Metodo que dibuja la imagen
   draw(){ 
      
       this.ctx.drawImage(this.img,this.position.x,this.position.y,this.width,this.height);
   }

}