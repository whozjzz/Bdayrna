const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let scaleFactor = 1; // Initial scale factor

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    scaleFactor = Math.min(canvas.width, canvas.height) / 800; // Adjust the scale based on canvas size
}

window.addEventListener("resize", resizeCanvas, false);

// Butterfly constellation star coordinates (relative to center)
const butterflyStars = [
// Body
{ x: 0, y: 0, size: 4, opacity: 1, color: "rgba(255, 255, 255, 1)" }, // Center body
{ x: 0, y: -30, size: 5, opacity: 1, color: "rgba(255, 255, 255, 1)" }, // Upper body
{ x: 0, y: 40, size: 4, opacity: 1, color: "rgba(255, 255, 255, 1)" }, // Lower body

// Left wing (top)
{ x: -60, y: -50, size: 3, opacity: 1, color: "rgba(255, 255, 255, 1)" },
{ x: -100, y: -60, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: -120, y: -40, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: -130, y: -20, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: -110, y: 0, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: -80, y: 20, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },

// Right wing (top)
{ x: 60, y: -50, size: 3, opacity: 1, color: "rgba(255, 255, 255, 1)" },
{ x: 100, y: -60, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: 120, y: -40, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: 130, y: -20, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: 110, y: 0, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: 80, y: 20, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },

// Left wing (bottom)
{ x: -60, y: 90, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: -90, y: 120, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: -110, y: 150, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: -70, y: 180, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: -30, y: 150, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },

// Right wing (bottom)
{ x: 60, y: 90, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: 90, y: 120, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: 110, y: 150, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: 70, y: 180, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },
{ x: 30, y: 150, size: 3, opacity: 0.9, color: "rgba(255, 255, 255, 1)" },

// Antennas
{ x: -10, y: -50, size: 2.5, opacity: 1, color: "rgba(255, 255, 255, 1)" }, // Left antenna base
{ x: -20, y: -70, size: 2, opacity: 0.9, color: "rgba(255, 255, 255, 1)" }, // Left antenna tip
{ x: 10, y: -50, size: 2.5, opacity: 1, color: "rgba(255, 255, 255, 1)" }, // Right antenna base
{ x: 20, y: -70, size: 2, opacity: 0.9, color: "rgba(255, 255, 255, 1)" }, // Right antenna tip
]

// Function to generate background stars
// Function to generate background stars
const backgroundStars = Array.from({ length: 100 }, () => {
    let x, y;

    // Ensure the stars are placed away from the butterfly constellation area and the top center area
    do {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
    } while (
        // Adjust distance to avoid the butterfly constellation area
        (Math.abs(x - (canvas.width / 2)) < 150 && Math.abs(y - (canvas.height / 2) + 50) < 150) || // Above butterfly
        (Math.abs(x - (canvas.width / 2)) < 150 && Math.abs(y - (canvas.height / 2) - 50) < 150) || // Below butterfly
        (y < canvas.height / 4) || // Exclude the top quarter of the canvas
        (Math.abs(x - (canvas.width / 2)) < 150 && Math.abs(y - (canvas.height / 2)) < 150) // Avoid entire butterfly area
    );

    return {
        x,
        y,
        size: Math.random() * 2 + 1, // Smaller size between 1 and 3
        opacity: Math.random() * 0.4 + 0.1, // Random opacity between 0.1 and 0.5
    };
});


function drawDiamondWithShine(x, y, size, opacity) {
    const glowSize = size * 1.5; // Reduced glow size

    // Draw the glowing effect
    ctx.fillStyle = `rgba(255, 255, 255, 0.2 * ${opacity})`; // Adjust glow effect opacity
    ctx.beginPath();
    ctx.moveTo(x, y - glowSize / 2);
    ctx.lineTo(x + glowSize / 2, y); // Right point of the glow
    ctx.lineTo(x, y + glowSize / 2);
    ctx.lineTo(x - glowSize / 2, y); // Left point
    ctx.closePath();
    ctx.fill();

    // Draw the diamond star
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.beginPath();
    ctx.moveTo(x, y - size); // Top point
    ctx.lineTo(x + size / 2, y); // Right point
    ctx.lineTo(x, y + size); // Bottom point
    ctx.lineTo(x - size / 2, y); // Left point
    ctx.closePath();
    ctx.fill();
}

function drawBackgroundStars() {
    backgroundStars.forEach((star) => {
        drawDiamondWithShine(star.x, star.y, star.size, star.opacity);
    });
}


function drawButterflyConstellation() {
    butterflyStars.forEach((star) => {
        const x = canvas.width / 2 + star.x * scaleFactor;
        const y = canvas.height / 2 + star.y * scaleFactor - 50; // Adjusting y to move it up by 50 pixels

        // Color fading logic
        const fadeTime = Math.random() * 3000 + 1000; // Random time between 1s to 4s
        star.opacity = Math.abs(Math.sin((Date.now() % fadeTime) / fadeTime * Math.PI)); // Fade out and back in

        // Calculate color based on opacity
        const color = `rgba(255, 105, 180, ${star.opacity})`; // Pink color

        // Draw the star
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y - star.size); // Top point
        ctx.lineTo(x + star.size / 2, y); // Right point
        ctx.lineTo(x, y + star.size); // Bottom point
        ctx.lineTo(x - star.size / 2, y); // Left point
        ctx.closePath();
        ctx.fill();
    });
}

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.sx = (Math.random() * 2 - 1) * 2;
        this.sy = (Math.random() * -6 - 6);
        this.size = Math.random() * 3 + 3;
        this.shouldExplode = false;

        const colorVal = Math.round(0xffffff * Math.random());
        this.r = colorVal >> 16;
        this.g = (colorVal >> 8) & 255;
        this.b = colorVal & 255;
    }

    update() {
        if (this.sy >= -2 || this.y <= 50 || this.x <= 0 || this.x >= canvas.width) {
            this.shouldExplode = true;
        } else {
            this.sy += 0.1;
        }
        this.x += this.sx;
        this.y += this.sy;
    }

    draw() {
        ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Particle {
    constructor(x, y, r, g, b) {
        this.x = x;
        this.y = y;
        this.sx = (Math.random() - 0.5) * 6;
        this.sy = (Math.random() - 0.5) * 6;
        this.size = Math.random() * 3 + 1;
        this.life = 100;
        this.r = r;
        this.g = g;
        this.b = b;
    }

    update() {
        this.x += this.sx;
        this.y += this.sy;
        this.life -= 2;
    }

    draw() {
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.life / 100})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class ShootingStar {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height / 2);
        this.length = Math.random() * 80 + 20; // Length of the shooting star tail
        this.opacity = 1;
        this.speed = Math.random() * 3 + 2; // Speed of the shooting star
        this.angle = Math.random() * Math.PI / 4 - Math.PI / 8; // Random angle for the shooting star
    }

    update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        if (this.x > canvas.width || this.y > canvas.height) {
            this.opacity = 0; // Mark for removal
        }
    }

    draw() {
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length * Math.cos(this.angle), this.y - this.length * Math.sin(this.angle));
        ctx.stroke();
    }

    isDead() {
        return this.opacity === 0;
    }
}

const fireworks = [];
const particles = [];
const shootingStars = [];

// Create fireworks at random intervals
function createFireworks() {
    fireworks.push(new Firework());
}

// Create shooting stars at random intervals
function createShootingStar() {
    shootingStars.push(new ShootingStar());
}

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBackgroundStars(); // Draw background stars
    drawButterflyConstellation();

    if (Math.random() < 0.05) {
        createFireworks();
    }

    if (Math.random() < 0.01) {
        createShootingStar();
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw();

        if (fireworks[i].shouldExplode) {
            for (let j = 0; j < 100; j++) {
                particles.push(
                    new Particle(
                        fireworks[i].x,
                        fireworks[i].y,
                        fireworks[i].r,
                        fireworks[i].g,
                        fireworks[i].b
                    )
                );
            }
            fireworks.splice(i, 1);
        }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }

    // Shooting stars logic
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        shootingStars[i].update();
        shootingStars[i].draw();

        if (shootingStars[i].isDead()) {
            shootingStars.splice(i, 1);
        }
    }

    // Twinkling effect for stars (if you want to keep it)
    butterflyStars.forEach((star) => {
        if (Math.random() < 0.05) {
            star.opacity = Math.random() * 0.5 + 0.5; // Increased brightness for twinkling effect
        }
    });

    // Restore original opacity after a delay
    setTimeout(() => {
        butterflyStars.forEach((star) => {
            star.opacity = Math.min(star.opacity, 1);
        });
    }, 1000);

    requestAnimationFrame(animate);
}

resizeCanvas();
animate();
