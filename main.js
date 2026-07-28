import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

import { createStadium } from "./game/stadium.js";
import { Ball } from "./game/ball.js";


// --------------------
// Scene
// --------------------

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);


// --------------------
// Camera
// --------------------

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0,25,35);


// --------------------
// Renderer
// --------------------

const canvas =
document.getElementById("gameCanvas");


const renderer =
new THREE.WebGLRenderer({

    canvas:canvas,
    antialias:true

});


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.shadowMap.enabled=true;


// --------------------
// Lighting
// --------------------

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


light.castShadow=true;


scene.add(light);


scene.add(
    new THREE.AmbientLight(
        0xffffff,
        0.5
    )
);



// --------------------
// Stadium
// --------------------

createStadium(scene);



// --------------------
// Player
// --------------------

const player =
new THREE.Mesh(

    new THREE.CapsuleGeometry(
        0.45,
        1.2,
        6,
        12
    ),

    new THREE.MeshStandardMaterial({

        color:0x0055ff

    })

);


player.position.set(
    -15,
    1,
    0
);


player.castShadow=true;


scene.add(player);



// --------------------
// Ball
// --------------------

const ball =
new Ball(scene);



// --------------------
// Controls
// --------------------

const keys={};


window.addEventListener(
"keydown",
(e)=>{

keys[e.key.toLowerCase()]=true;

});


window.addEventListener(
"keyup",
(e)=>{

keys[e.key.toLowerCase()]=false;

});



function updatePlayer(){

    let speed=0.25;


    if(keys["w"])
        player.position.z-=speed;


    if(keys["s"])
        player.position.z+=speed;


    if(keys["a"])
        player.position.x-=speed;


    if(keys["d"])
        player.position.x+=speed;



    camera.position.x =
    player.position.x;


    camera.position.z =
    player.position.z+25;


    camera.lookAt(
        player.position
    );

}




// --------------------
// Game Loop
// --------------------

function animate(){


    requestAnimationFrame(
        animate
    );


    updatePlayer();


    ball.update();


    renderer.render(
        scene,
        camera
    );

}


animate();




// --------------------
// Resize
// --------------------

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



// --------------------
// Loading Screen
// --------------------

setTimeout(()=>{

const load =
document.getElementById(
"loadingScreen"
);


if(load)
load.style.display="none";


},1500);
