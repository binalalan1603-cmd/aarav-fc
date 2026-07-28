import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

import { createStadium } from "./game/stadium.js";
import { Ball } from "./game/ball.js";
import { Team } from "./game/team.js";
import { AI } from "./game/ai.js";


// SCENE

const scene = new THREE.Scene();

scene.background =
new THREE.Color(0x87ceeb);



// CAMERA

const camera =
new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.set(
0,
25,
35
);



// RENDERER

const canvas =
document.getElementById(
"gameCanvas"
);


const renderer =
new THREE.WebGLRenderer({

canvas,
antialias:true

});


renderer.setSize(
window.innerWidth,
window.innerHeight
);


renderer.shadowMap.enabled=true;



// LIGHT

const light =
new THREE.DirectionalLight(
0xffffff,
2
);


light.position.set(
20,
40,
20
);


scene.add(light);


scene.add(
new THREE.AmbientLight(
0xffffff,
0.5
)
);



// STADIUM

createStadium(scene);



// BALL

const ball =
new Ball(scene);



// TEAMS

const blueTeam =
new Team(
scene,
"Blue FC",
0x0055ff
);


blueTeam.createFormation();



const redTeam =
new Team(
scene,
"Red FC",
0xff2222
);


redTeam.createFormation();



redTeam.players.forEach(
player=>{

player.mesh.position.x *= -1;

});



// SAVE HOME POSITIONS

blueTeam.players.forEach(
p=>{

p.home =
p.mesh.position.clone();

});


redTeam.players.forEach(
p=>{

p.home =
p.mesh.position.clone();

});



// AI

const blueAI =
new AI(
blueTeam,
ball
);


const redAI =
new AI(
redTeam,
ball
);



// CONTROL PLAYER

const controlledPlayer =
blueTeam.players[10];



// CONTROLS

const keys={};


window.addEventListener(
"keydown",
e=>{

keys[e.key.toLowerCase()]=true;

});


window.addEventListener(
"keyup",
e=>{

keys[e.key.toLowerCase()]=false;

});



// PLAYER CONTROL

function controlPlayer(){

let direction =
new THREE.Vector3();


if(keys["w"])
direction.z-=1;


if(keys["s"])
direction.z+=1;


if(keys["a"])
direction.x-=1;


if(keys["d"])
direction.x+=1;



if(direction.length()>0){

direction.normalize();

controlledPlayer.move(
direction
);

}



camera.position.x =
controlledPlayer.mesh.position.x;


camera.position.z =
controlledPlayer.mesh.position.z+25;


camera.lookAt(
controlledPlayer.mesh.position
);


}



// GAME LOOP

function animate(){


requestAnimationFrame(
animate
);



controlPlayer();


blueAI.update();

redAI.update();


blueTeam.update();

redTeam.update();


ball.update();



renderer.render(
scene,
camera
);


}


animate();



// RESIZE

window.addEventListener(
"resize",
()=>{


camera.aspect =
window.innerWidth/
window.innerHeight;


camera.updateProjectionMatrix();


renderer.setSize(
window.innerWidth,
window.innerHeight
);


});



// LOADING SCREEN

setTimeout(()=>{


const loading =
document.getElementById(
"loadingScreen"
);


if(loading)
loading.style.display="none";


},1500);
