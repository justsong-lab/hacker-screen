'use strict';
main();

function main() {
    const canvas = document.getElementById('canvas');
    canvas.width = window.screen.width;
    canvas.height = window.screen.height;
    const screen = canvas.getContext('2d');
    let array = Array(256).join('1').split('');
    setInterval(function () {
        screen.fillStyle = 'rgba(0,0,0,0.05)';
        screen.fillRect(0, 0, canvas.width, canvas.height);
        screen.fillStyle = 'rgba(0,255,0,1)';
        array = array.map(function (value, index) {
            let temp = Math.random();
            screen.fillText(String.fromCharCode(Math.floor(2720 + temp * 33)), index * 10, value);
            value += 10;
            return value > 768 + temp * 1e4 ? 0 : value;
        });
    }, 33);
}
