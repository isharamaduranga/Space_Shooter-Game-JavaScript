const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor() {

        /** player speed */
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0;


        /** Customized for player varieties */
        const image = new Image();
        image.src = './img/jet.png'
        image.onload = () => {
            const scale = 0.10
            this.image = image
            this.width = image.width * scale;
            this.height = image.height * scale;

            /** player Location and Adjust center of canvas */
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 10
            }
        }
    }

    draw() {
        /*  c.fillStyle = 'red'
          c.fillRect(this.position.x,this.position.y,this.width,this.height);*/

        c.save()

        c.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2)

            c.rotate(this.rotation)

        c.translate(
            -player.position.x - player.width / 2,
            -player.position.y - player.height / 2)

        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        c.restore();

    }

    /** Press (Arrow keys & Shift update player position ..) */
    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}

const player = new Player();
const keys = {
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    Shift: {
        pressed: false
    }

}

/** Customized and animate every time game background */
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()

    if (keys.ArrowLeft.pressed && player.position.x >= 0) {
        player.velocity.x = -7
        player.rotation =  -0.20
    } else if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7
        player.rotation =  0.20
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }

}

animate();


/** Player control keydown event Listener */
addEventListener("keydown", ({key}) => {
    switch (key) {

        case 'ArrowLeft':
            console.log('turn left');
            keys.ArrowLeft.pressed = true
            break;

        case 'ArrowRight':
            console.log('turn Right')
            keys.ArrowRight.pressed = true
            break;

        case 'Shift':
            console.log('Shoot the target');
            break;
    }
});

addEventListener("keyup", ({key}) => {
    switch (key) {

        case 'ArrowLeft':
            console.log('turn left');
            keys.ArrowLeft.pressed = false
            break;

        case 'ArrowRight':
            console.log('turn Right')
            keys.ArrowRight.pressed = false
            break;

        case 'Shift':
            console.log('Shoot the target');
            break;
    }
});