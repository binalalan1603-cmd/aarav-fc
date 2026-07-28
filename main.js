import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";


import { createStadium } from "./game/stadium.js";
import { Ball } from "./game/ball.js";
import { Player } from "./game/player.js";


// =====================
// SCENE
// =====================

const scene = new THREE.Scene();

scene.background = new THREE.Color(
    0x87ceeb
);


// =====================
// CAMERA
// =====================

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(
    0,
    25,
    35
);


// =====================
// RENDERER
// =====================

const canvas =
document.getElementById("gameCanvas");


const renderer =
new THREE.WebGLRenderer({

    canvas: canvas,
    antialias:true

});


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.shadowMap.enabled=true;



// =====================
// LIGHTS
// =====================

const sun =
new THREE.DirectionalLight(
    0xffffff,
    2
);


sun.position.set(
    20,
    40,
    20
);


sun.castShadow=true;


scene.add(sun);



scene.add(
    new THREE.AmbientLight(
        0xffffff,
        0.5
    )
);



// =====================
// STADIUM
// =====================

createStadium(scene);



// =====================
// BALL
// =====================

const ball =
new Ball(scene);



// =====================
// PLAYER
// =====================

const player =
new Player(
    scene,
    "Captain",
    0x0055ff
);


player.setPosition(
    -15,
    1,
    0
);



// =====================
// CONTROLS
// =====================

const keys={};


window.addEventListener(
"keydown",
(event)=>{

keys[
event.key.toLowerCase()
]=true;

});


window.addEventListener(
"keyup",
(event)=>{

keys[
event.key.toLowerCase()
]=false;

});



// =====================
// PLAYER MOVEMENT
// =====================

function updatePlayer(){


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

        player.move(
            direction
        );

    }



    // Camera follows player

    camera.position.x =
    player.mesh.position.x;


    camera.position.z =
    player.mesh.position.z+25;


    camera.lookAt(
        player.mesh.position
    );


}




// =====================
// GAME LOOP
// =====================

function animate(){


    requestAnimationFrame(
        animate
    );


    updatePlayer();


    player.update();


    ball.update();


    renderer.render(
        scene,
        camera
    );

}


animate();




// =====================
// RESIZE
// =====================

window.addEventListener(
"resize",
()=>{


camera.aspect =
window.innerWidth /
window.innerHeight;


camera.updateProjectionMatrix();


renderer.setSize(
window.innerWidth,
window.innerHeight
);


});



// =====================
// LOADING SCREEN
// =====================

setTimeout(()=>{


const loading =
document.getElementById(
"loadingScreen"
);


if(loading){

loading.style.display="none";

}


},1500);
