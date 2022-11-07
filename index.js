const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// ================================================================================================== //
/** PLAYER CLASS */
// ================================================================================================== //
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
                y: canvas.height - this.height - 20
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

class projectile {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.radius = 3
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y,
            this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

// ================================================================================================== //
/** INVADER CLASS */
// ================================================================================================== //
class Invader {
    constructor({position}) {

        /** player speed */
        this.velocity = {
            x: 0,
            y: 0
        }
        /** Customized for invader varieties */
        const image = new Image();
        image.src = './img/invader.png'
        image.onload = () => {
            const scale = 0.07
            this.image = image
            this.width = image.width * scale;
            this.height = image.height * scale;

            /** invader Location and Adjust center of canvas */
            this.position = {
                x: position.x,
                y: position.y
            }
        }
    }

    draw() {
        /*  c.fillStyle = 'red'
          c.fillRect(this.position.x,this.position.y,this.width,this.height);*/

        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    /** Press (Arrow keys & Shift update invader position ..) */
    update({velocity}) {
        if (this.image) {
            this.draw()
            this.position.x += velocity.x
            this.position.y += velocity.y
        }
    }
}



const player = new Player()
const projectiles = []


const keys = {
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    space: {
        pressed: false
    }

}

/** Customized and animate every time game background */
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()


    projectiles.forEach((projectile, index) => {

        /** clean the Unnecessary projectiles in projectiles Array with condition */
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(function () {
                projectiles.splice(index, 1);
            }, 0)
        } else {
            projectile.update()
        }

    });




    if (keys.ArrowLeft.pressed && player.position.x >= 0) {
        player.velocity.x = -7
        player.rotation = -0.20
    } else if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7
        player.rotation = 0.20
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
            // console.log('turn left');
            keys.ArrowLeft.pressed = true
            break;

        case 'ArrowRight':
            // console.log('turn Right')
            keys.ArrowRight.pressed = true
            break;

        case ' ':
            // console.log('Shoot the target');
            projectiles.push(
                new projectile({
                    position: {
                        x: player.position.x + player.width / 2,
                        y: player.position.y + player.height / 4
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    }
                }));
            break;
    }
});

addEventListener("keyup", ({key}) => {
    switch (key) {

        case 'ArrowLeft':
            //console.log('turn left');
            keys.ArrowLeft.pressed = false
            break;

        case 'ArrowRight':
            //console.log('turn Right')
            keys.ArrowRight.pressed = false
            break;

        case ' ':
            //console.log('Shoot the target');
            break;
    }
});