// Global variables
let http = require('http');
let express = require('express');
let io = require('socket.io');
let five = require('johnny-five');
let temporal = require('temporal');
let colors = require('colors');

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

    temporal.queue([
        {
            delay: 5000,
            task: function(){
                console.log("MOVING FORWARDS".green);
                left_wheel.cw();
                right_wheel.ccw();
            }
        }, {
            delay: 3000,
            task: function(){
                console.log("STOPPING".red);
                left_wheel.stop();
                right_wheel.stop();
            }
        }, {
            delay: 3000,
            task: function(){
                console.log("MOVING BACKWARDS".green);
                left_wheel.ccw();
                right_wheel.cw();
            }
        }, {
            delay: 3000,
            task: function(){
                console.log("STOPPING".red);
                left_wheel.stop();
                right_wheel.stop();
            }
        }, {
            delay: 1500,
            task: function(){
                console.log("TEST COMPLETE. QUITTING APP!".blue);
            }
        }
    ]);
}); // End of board.on function