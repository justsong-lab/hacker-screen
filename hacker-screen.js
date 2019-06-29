'use strict';
let gain = 10; // All characters move down gain pixels each time
let offset = 1; // All characters move right offset pixels each time
let color = true;
main();

function main() {
    const canvas = document.getElementById('canvas');
    // If we use "window.screen.width" here, there will be scroll bars when the browser is not full Screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const screen = canvas.getContext('2d'); // Get the canvas context
    let array = Array(256);
    for (let i = 0; i < array.length; i++) {
        array[i] = { // Coordinate
            x: i * 10,
            y: 0
        }
    }
    let count = 0;
    let currentColor = 'rgba(0,255,0,1)';

    function tick() { // Notice this function calls itself
        screen.fillStyle = 'rgba(0,0,0,0.05)';
        screen.fillRect(0, 0, canvas.width, canvas.height);
        if (color) {
            count += 1;
            if (count >= 60) {
                count = 0;
                currentColor = randomColor();
            }
            screen.fillStyle = currentColor;
        } else {
            screen.fillStyle = 'rgba(0,255,0,1)';
        }
        array = array.map(function (coordinate) { // Apply this function to every value of array every time
            let random = Math.random();
            // According to the ASCII Table, the chars from 32 to 126 are printable
            // Each time we just randomly select one from this range
            screen.fillText(String.fromCharCode(32 + Math.round((126 - 32) * random)), coordinate.x, coordinate.y);
            coordinate.x = (coordinate.x + offset) % canvas.width;
            coordinate.y += gain;
            return {
                x: coordinate.x,
                y: coordinate.y > 500 + random * 10000 ? 0 : coordinate.y
            }
                ; // Make the distribution of characters like a waterfall
        });
        requestAnimationFrame(tick); // Use function 'requestAnimationFrame' to improve performance
    }

    tick();
}

function randomColor() {
    return "rgba(" + Math.round(255 * Math.random()).toString() + ","
        + Math.round(255 * Math.random()).toString() + ","
        + Math.round(255 * Math.random()).toString() + ",1)";
}

document.onkeydown = function (e) {
    switch (e.code) {
        case "ArrowUp":
            gain += 2;
            break;
        case "ArrowDown":
            gain -= 2;
            break;
        case "ArrowLeft":
            offset -= 1;
            break;
        case "ArrowRight":
            offset += 1;
            break;
        case "F11":
            location.reload();
            break;
        case "KeyR":
            location.reload();
            break;
        case "KeyC":
            color = !color;
            break;
        default:
            break;
    }
};
