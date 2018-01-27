// Global variables
let http = require('http');
let express = require('express');
let io = require('socket.io');
let five = require('johnny-five');
let temporal = require('temporal');
let colors = require('colors');
let keypress = require('keypress');

// Create the board instance
let board = new five.Board({ port: "COM3" });

// Create the app instance
let app = new express();

// Set the port number
let port = 3000;

// Set the app instance to read the public directory (index.html)
app.use(express.static(__dirname + '/public'));

// Board.on function
board.on("ready", function(){
    let left_wheel = new five.Servo.Continuous(9).stop();
    let right_wheel = new five.Servo.Continuous(10).stop();

    // // Intial test code (used to calibrate the cr servo)
    // this.repl.inject({
    //     on: function(){
    //         left_wheel.cw();
    //         right_wheel.ccw();
    //     },
    //     off: function(){
    //         left_wheel.stop();
    //         right_wheel.stop();
    //     }
    // });

    // // Temporal.queue will allow automated movement for 2nd testing
    // temporal.queue([
    //     {
    //         delay: 5000,
    //         task: function(){
    //             console.log("MOVING FORWARDS".green);
    //             left_wheel.cw();
    //             right_wheel.ccw();
    //         }
    //     }, {
    //         delay: 3000,
    //         task: function(){
    //             console.log("STOPPING".red);
    //             left_wheel.stop();
    //             right_wheel.stop();
    //         }
    //     }, {
    //         delay: 3000,
    //         task: function(){
    //             console.log("MOVING BACKWARDS".green);
    //             left_wheel.ccw();
    //             right_wheel.cw();
    //         }
    //     }, {
    //         delay: 3000,
    //         task: function(){
    //             console.log("STOPPING".red);
    //             left_wheel.stop();
    //             right_wheel.stop();
    //         }
    //     }, {
    //         delay: 1500,
    //         task: function(){
    //             console.log("TEST COMPLETE. QUITTING APP!".blue);
    //         }
    //     }
    // ]);

    // Keyboard movement
    // Make PROCESS.STDIN begin emiitting KEYPRESS events
    keypress(process.stdin);

    // Listen for the KEYPRESS event
    process.stdin.on('keypress', function(ch, key){
        console.log('"KEYPRESS" RECIEVED'.green, key);
        if(key && key.ctrl && key.name == 'd'){
            console.log('PAUSING'.green);
            process.stdin.pause();
        } else if(key && key.name == 'up'){
            console.log('FORWARD'.green);
            left_wheel.cw();
            right_wheel.ccw();
        } else if(key && key.name == "space"){
            console.log('STOP'.green);
            left_wheel.stop();
            right_wheel.stop();
        } else if(key && key.name == 'left'){
            console.log('LEFT'.green);
            left_wheel.ccw();
            right_wheel.ccw();
        } else if(key && key.name == 'right'){
            console.log('RIGHT'.green);
            left_wheel.cw();
            right_wheel.cw();
        } else if(key && key.name == 'down'){
            console.log('BACKWARD'.green);
            left_wheel.cw();
            right_wheel.ccw();
        }
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();

}); // End of board.on function