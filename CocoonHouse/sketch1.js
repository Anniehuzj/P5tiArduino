let serial;
let latestData = "waiting for data";
let button;
let buttonState = false;


function setup() {

 button = createButton('Transformation');
  button.position(600, 554);
  button.mousePressed(turnon);
  button.mouseReleased(turnoff);

 serial = new p5.SerialPort();

 serial.list();
 serial.open('/dev/tty.usbmodem141101'); //check port number

 serial.on('connected', serverConnected);

 serial.on('list', gotList);

 serial.on('data', gotData);

 serial.on('error', gotError);

 serial.on('open', gotOpen);

 serial.on('close', gotClose);
}

function serverConnected() {
 print("Connected to Server");
}

function gotList(thelist) {
 print("List of Serial Ports:");

 for (let i = 0; i < thelist.length; i++) {
  print(i + " " + thelist[i]);
 }
}

function gotOpen() {
 print("Serial Port is Open");
}

function gotClose(){
 print("Serial Port is Closed");
 latestData = "Serial Port is Closed";
}

function gotError(theerror) {
 print(theerror);
}

function gotData() {
 let currentString = serial.readLine();
  trim(currentString);
 if (!currentString) return;
 console.log(currentString);
 latestData = currentString;
}

function draw() {
  if(buttonState == true) {
    serial.write('H');
    console.log("on");
  } else {
    serial.write('L');
    console.log("off");
  }
}

function turnoff() {
  buttonState = false;
   
}


function turnon() {
  buttonState = true;
 //background(23, 124, 193);
 // fill(0);
 //text(latestData, 10, 10);

 // if(button.mousePressed) {

//  } else {

 // }
 // Polling method
 /*
 if (serial.available() > 0) {
  let data = serial.read();
  ellipse(50,50,data,data);
 }
 */
}