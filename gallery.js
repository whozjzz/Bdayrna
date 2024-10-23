let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1])
})

let scaleFactorX = 1;
let scaleFactorY = 1;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Adjust scale factor based on both width and height to handle different screen sizes
    const minDimension = Math.min(canvas.width, canvas.height);
    scaleFactor = minDimension / 800; // 800 is the original canvas design size for scaling

    // Clear the canvas when resizing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", resizeCanvas, false);