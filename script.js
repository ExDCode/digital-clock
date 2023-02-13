function init(canvas){
    //Make canvas size of window.body.width and window.body.height
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

}


function digitalClock(){
// digital clock 
document.getElementById("digital-clock").innerHTML
     = new Date().toTimeString().slice(0,8) ;
}

function arcAnimation(posX, posY, radius, startAngle, endAngle, lineWidth){
    //PotOpt linewidth(Potential Optimization)
   ctx.lineWidth =lineWidth;
   ctx.lineCap = 'round';

   endAngle -= offset;

   ctx.beginPath();
   ctx.arc(posX, posY, radius, startAngle, endAngle); 
   ctx.strokeStyle = gradient;
   ctx.stroke(); 
   ctx.closePath();
}

function clock_main(){
   // 2*PI / minutes (in an hour there is 60 minutes)
   // there are 12 hours (use % to get that out of 24hrs)
   // 2*PI / (12 (hr) * 60 [mins]) 
   // (getHours()%12)*60 [mins] + getMinutes() * {the PI/min formula above} [mins])
   let endAngle = ((new Date().getHours()%12)*60 + (new Date().getMinutes())) 
        * Math.PI / 360;
   arcAnimation(canvas.width/2, canvas.height/2, radius_main, startAngle, endAngle, 12); 
}

function clock_seconds(){
   // for seconds: we need a piece of circle per second 
   let endAngle = (new Date().getSeconds()) * Math.PI/30; 
   arcAnimation(canvas.width/2 - radius_main-20,canvas.height/2 -radius_main+15, radius_seconds, startAngle, endAngle, 8);
}

//----------------------------------------------------------------
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//PotOpt (variables)=> into class?
//Bigger clock
const radius_main = 170;
const offset = Math.PI / 2;
const startAngle = -offset;

const radius_seconds = 40; 

//const gradPos = [canvas.width/2 - radius_main, canvas.height/2 - radius_main, canvas.width/2 + radius_main, canvas.height/2 + radius_main]; 
const gradPos = [0 ,0, 1100, canvas.height];
const gradient = ctx.createLinearGradient(...gradPos);
gradient.addColorStop(0, '#2516A3');
gradient.addColorStop(1, '#f91f1f');
// gradient.addColorStop(1, '#f91f1f');

init(canvas);

setInterval(()=>{
    digitalClock();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clock_main();
    clock_seconds();
},1000);