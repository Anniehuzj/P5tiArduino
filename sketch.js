var serial; 

function setup() {
  createCanvas(400, 400);

  let latestData = "waiting for data";
  
  
  serial = new p5.SerialPort();

  
   serial.list();

   serial.open('/dev/tty.usbmodem144101'); //check port number,every time
  
   serial.on('connected', serverConnected);
  
   serial.on('list', gotList);
  
   serial.on('data', gotData);
  
   serial.on('error', gotError);
  
   serial.on('open', gotOpen);
  
   serial.on('close', gotClose);
   osc = new p5.Oscillator(300);
  
}

testSubmit.onclick = doArduinoStuff;


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
    //console.log(currentString);
    latestData = currentString;
    data = Number(latestData);
     console.log(latestData);
    return data;
   }



function draw() {
  background(220);
  ellipse(width/2, height/2, 30, 30);
  serial.write('H');
}


  function doArduinoStuff() {
 
  console.log("button was clicked")



  setTimeout(function(){
    console.log("it's been 5 seconds since button was clicked")
    //serial.write('L');

  }, 5000) 
}


