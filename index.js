const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// ================================================================================================== //
/**                                          PLAYER CLASS                                             */
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
            const scale = 0.13
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

//================================================================================================== //
/**                                       PROJECTILES CLASS                                          */
//================================================================================================== //
class projectile {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        // for size of bullet
        this.radius = 4
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
/**                               INVADER PROJECTILES CLASS                                           */
// ================================================================================================== //
class InvaderProjectile {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        // for size of bullet
        this.width = 4
        this.height =10
    }

    draw() {

    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

// ================================================================================================== //
/**                                         INVADER CLASS                                             */
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
            const scale = 0.065
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

class Invader_Grid {
    constructor() {

        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 3,
            y: 0
        }
        this.invaders = []

        /** Randomly changed grid columns  & rows , count and position */
        const column = Math.floor(Math.random() * 10 + 5);
        const rows = Math.floor(Math.random() * 5 + 2);

        this.width = column * 35
        /** Randomly Defined grid columns  & rows in canvas */
        for (let x = 0; x < column; x++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(new Invader({
                    position: {
                        x: x * 35,
                        y: y * 35
                    }
                }))
            }
        }
        console.log(this.invaders)
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.y = 0

        if (this.position.x + this.width >= canvas.width ||
            this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y = 30
        }
    }
}

const player = new Player()
const projectiles = []
const grids = []

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

let frames = 0;
let randomInterval = Math.floor((Math.random() * 500) + 500);
console.log(randomInterval)

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

    /** iterate array and update invaders velocity */
    grids.forEach((grid, gridIndex) => {
        grid.update()
        grid.invaders.forEach((invader, i) => {

            invader.update({velocity: grid.velocity});

            projectiles.forEach((projectile, p) => {
                if (
                    projectile.position.y - projectile.radius <=
                    invader.position.y + invader.height &&
                    projectile.position.x + projectile.radius >=
                    invader.position.x && projectile.position.x -
                    projectile.radius <= invader.position.x + invader.width &&
                    projectile.position.y + projectile.radius >= invader.position.y

                ) {

                    setTimeout(function () {
                        const invaderFound = grid.invaders.find(invader2 => {
                            return invader2 === invader
                        });

                        const projectileFound = projectiles.find(projectile2 => {
                            return projectile2 === projectile
                        })

                        /** Remove invader and projectile */
                        if (invaderFound && projectileFound) {
                            grid.invaders.splice(i, 1)
                            projectiles.splice(p, 1)


                            if (grid.invaders.length > 0) {
                                const firstInvader = grid.invaders[0];
                                const lastInvader = grid.invaders[grid.invaders.length - 1];

                                grid.width =
                                    lastInvader.position.x - firstInvader.position.x + lastInvader.width

                                grid.position.x = firstInvader.position.x
                            }
                        } else {
                            grid.splice(gridIndex, 1);
                        }
                    }, 0)
                }

            })

        })
    })


    if (keys.ArrowLeft.pressed && player.position.x >= 0) {
        player.velocity.x = -10
        player.rotation = -0.20
    } else if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 10
        player.rotation = 0.20
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }
    console.log(frames)
    /** Define Random enemies grid*/
    if (frames % randomInterval === 0) {
        grids.push(new Invader_Grid())

        /** reset to zero and reprocess frames count and enemies */
        frames = 0;
    }
    frames++
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