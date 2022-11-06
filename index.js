const canvas= document.querySelector('canvas');
const  c= canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player{
    constructor() {

        //player speed
        this.velocity ={
            x:0,
            y:0
        }

        // for player
        const image = new Image();
        image.src = './img/Space_Jet.png'
        image.onload = () =>{
            const scale = 0.25
            this.image=image
            this.width =image.width * scale;
            this.height = image.height * scale;

            //player Location and Adjust center of canvas
            this.position={
                x: canvas.width / 2 - this.width/2,
                y:canvas.height - this.height -25
            }
        }



    }

    draw(){
      /*  c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,this.width,this.height);*/
        if(this.image){
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height)
        }
    }
}

const player = new Player();
player.draw()

function animate() {
    requestAnimationFrame(animate);
    c.fillRect(5,5,canvas.width,canvas.height)
    player.draw();
}
animate();

addEventListener("keydown", ({key}) =>{
   switch (key){

       case 'ArrowLeft':
           console.log(key);
           break;

       case 'ArrowRight':
           console.log(key);
           break;
       case 'Shift':
           console.log(key);
           break;


   }
});