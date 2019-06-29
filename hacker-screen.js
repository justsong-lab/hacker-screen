'use strict';
let gain = 10; // All characters move down gain pixels each time
let offset = 0; // All characters move right offset pixels each time
main();

function main() {
    const canvas = document.getElementById('canvas');
    // If we use "window.screen.width" here, there will be scroll bars when the browser is not full Screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const screen = canvas.getContext('2d'); // Get the canvas context
    // Create an array with 256 elements with values of '0'
    // Why we use "0" here? Because this is the initial y coordinate of the characters
    let array = Array(256).join('0').split('');

    function tick() { // Notice this function calls itself
        screen.fillStyle = 'rgba(0,0,0,0.05)';
        screen.fillRect(0, 0, canvas.width, canvas.height);
        screen.fillStyle = 'rgba(0,255,0,1)';
        array = array.map(function (value, index) { // Apply this function to every value of array every time
            let random = Math.random();
            // According to the ASCII Table, the chars from 32 to 126 are printable
            // Each time we just randomly select one from this range
            screen.fillText(String.fromCharCode(32 + Math.round((126 - 32) * random)), index * 10 + offset, value);
            value += gain;
            return value > 500 + random * 10000 ? 0 : value; // Make the distribution of characters like a waterfall
        });
        requestAnimationFrame(tick); // Use function 'requestAnimationFrame' to improve performance
    }

    tick();
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
            offset -= 5;
            break;
        case "ArrowRight":
            offset += 5;
            break;
        case "F11":
            location.reload();
            break;
        case "r":
            location.reload();
            break;
        default:
            break;
    }
};
