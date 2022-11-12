const canvas = document.querySelector('canvas');
const scoreDisplay = document.querySelector('#scoreDisplay');

console.log(scoreDisplay)

const c = canvas.getContext('2d');
let canvasCenter = canvas.height / 2;
let radGradient = c.createRadialGradient(canvasCenter, canvasCenter, 50, canvasCenter, canvasCenter, 300);

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
        this.opacity = 1

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
        c.globalAlpha =this.opacity
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


//================================================================================================== //
/**                                       PARTICLE CLASS                                          */
//================================================================================================== //
class Particle {
    constructor({position, velocity, radius, color,fades}) {
        this.position = position
        this.velocity = velocity
        // for size of Particles
        this.radius = radius
        this.color = color
        this.opacity = 1
        this.fades =fades
    }

    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.beginPath()
        c.arc(this.position.x, this.position.y,
            this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.fades){
            this.opacity -= 0.01
        }

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
        this.height = 12
    }

    draw() {
        c.fillStyle = 'yellow'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        /* c.beginPath()
         c.arc(this.position.x, this.position.y,
             this.radius, 0, Math.PI * 2)
         c.fillStyle = 'red'
         c.fill()
         c.closePath()*/
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

    shoot(invaderProjectiles) {
        invaderProjectiles.push(new InvaderProjectile({

            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 5
            }
        }));
    }
}



const player = new Player();
const projectiles = [];
const grids = [];
const invaderProjectiles = [];
const particles = [];

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
/** Create the star particles for the designs canvas with used many stars */
let frames = 0;
let randomInterval = Math.floor((Math.random() * 500) + 500);
let game = {
    over:false,
    active:true
}
let score = 0;


for (let i = 0; i <100; i++) {
    particles.push(new Particle({
        position:{
            x:Math.random() * canvas.width,
            y:Math.random() * canvas.height
        },
        velocity:{
            x:0,
            y:1
        },
        radius:Math.random()*3,
        color: 'white'
    }));
}

/** Create the particles After the invader blast (RE-USED FUNCTION) */
function createParticles({object , color,fades}) {

    for (let i = 0; i <18; i++) {
        particles.push(new Particle({
            position:{
                x:object.position.x + object.width / 2,
                y:object.position.y + object.height /2
            },
            velocity:{
                x:(Math.random()-0.5)*2,
                y:(Math.random()-0.5)*2
            },
            radius:Math.random()*6,
            color:color || 'deeppink',
            fades

        }));
    }
}
radGradient.addColorStop(0.5, "blue");
radGradient.addColorStop(0.2, "purple");
radGradient.addColorStop(0.6, "black");

/** Customized and animate every time game background */
function animate() {

    /** If game not active(boolean==false) Stop the game  */
    if(!game.active) return

    requestAnimationFrame(animate)
    c.fillStyle = radGradient
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()

    /** Update blast particles & clean the Unnecessary Particles after the blast */
    particles.forEach((particle,i) => {

        /** extend star particles infinity of canvas Logic (Not created new particles) **/
        if(particle.position.y-particle.radius >= canvas.height){
            particle.position.x = Math.random()*  canvas.width
            particle.position.y = -particle.radius
        }

        if(particle.opacity<= 0){

            setTimeout(()=>{
                particles.splice(i,1)
            },0);
        }else {
            particle.update();
        }
    });
   // console.log(particles)

    /** Update Invader Projectiles & clean the Unnecessary Invader Projectiles in InvaderProjectiles Array with condition */
    invaderProjectiles.forEach((invaderProjectile, index) => {
        if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
            setTimeout(() => {
                invaderProjectiles.splice(index, 1)
            }, 0)
        } else {
            invaderProjectile.update();
        }

        /** Define game end to Loos the player  As projectiles hit the player */
        if (invaderProjectile.position.y + invaderProjectile.height >=
            player.position.y && invaderProjectile.position.x +
            invaderProjectile.width >= player.position.x &&
            invaderProjectile.position.x <= player.position.x + player.width
        ) {
            /** ********************************************* */
            /** E N D   G A M E*/
            /** ********************************************* */
            //console.log('Your are loos buddy !!!!!')

            setTimeout(() => {

                /** close game logic of (boolean active) */
                game.active = false;

            }, 2000);

            setTimeout(() => {
                invaderProjectiles.splice(index, 1);
                /** Hide the Player in Canvas */
                player.opacity = 0;
                game.over = true;

            }, 0);

            /** call the createParticles function and pass the argument for the which object */
            createParticles({
                object:player,
                color:'gold',
                fades:true
            });
        }
    });
    //console.log(invaderProjectiles)

    projectiles.forEach((projectile, index) => {

        /** Update Projectiles & clean the Unnecessary projectiles in projectiles Array with condition */
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(function () {
                projectiles.splice(index, 1);
            }, 0)
        } else {
            projectile.update()
        }
    });
    //console.log(projectiles)

    /** iterate array and update invaders velocity */
    grids.forEach((grid, gridIndex) => {
        grid.update()

        /** Calling Shoot function to create spawn projectiles*/
        if (frames % 100 === 0 && grid.invaders.length > 0) {

            /** find a new random invader in every grid & call to shoot method on which invader */
            grid.invaders[
                Math.floor(Math.random() * grid.invaders.length)
                ].shoot(invaderProjectiles);
        }

        grid.invaders.forEach((invader, i) => {

            invader.update({velocity: grid.velocity});

            /** projectile hit enemy*/
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

                        if (invaderFound && projectileFound) {

                            /** The score increases as the invaders are destroyed */
                            score += 100;
                            scoreDisplay.innerHTML = score;

                            /** call the createParticles function and pass the argument for the which object */
                            createParticles({
                                object:invader,
                                fades: true
                            });

                            /** Remove invader and projectile */
                            grid.invaders.splice(i, 1)
                            projectiles.splice(p, 1)

                            if (grid.invaders.length > 0) {
                                const firstInvader = grid.invaders[0];
                                const lastInvader = grid.invaders[grid.invaders.length - 1];

                                grid.width =
                                    lastInvader.position.x - firstInvader.position.x + lastInvader.width

                                grid.position.x = firstInvader.position.x
                            }else {
                                grids.splice(gridIndex, 1);
                            }
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
    //console.log(frames)
    /** Define to Rebuild Random enemies grid*/
    if (frames % randomInterval === 0) {
        grids.push(new Invader_Grid())
        randomInterval = Math.floor((Math.random() * 500) + 500);

        /** reset to zero and reprocess frames count and enemies */
        frames = 0;
    }
    frames++
}

animate();


/** Player control keydown event Listener */
addEventListener("keydown", ({key}) => {

    if (game.over) return
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