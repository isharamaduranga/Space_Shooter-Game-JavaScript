const canvas= document.querySelector('canvas');
const  c= canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player{
    constructor() {
        //player Location
        this.position={
            x: 200,
            y:200
        }
        //player speed
        this.velocity ={

        }

        // for player image
        this.width =100
        this.height = 100
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}

const player = new Player();
player.draw();