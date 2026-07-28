import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";


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
camera.lookAt(0,0,0);


// --------------------
// Renderer
// --------------------

const canvas = document.getElementById("gameCanvas");

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias:true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.shadowMap.enabled = true;


// --------------------
// Lights
// --------------------

const sunlight = new THREE.DirectionalLight(
    0xffffff,
    2
);

sunlight.position.set(
    20,
    40,
    20
);

sunlight.castShadow = true;

scene.add(sunlight);


scene.add(
    new THREE.AmbientLight(
        0xffffff,
        0.5
    )
);


// --------------------
// Football Pitch
// --------------------

const pitch = new THREE.Mesh(

    new THREE.PlaneGeometry(
        100,
        65
    ),

    new THREE.MeshStandardMaterial({

        color:0x269b45

    })

);


pitch.rotation.x = -Math.PI/2;

pitch.receiveShadow = true;

scene.add(pitch);


// --------------------
// Centre Circle
// --------------------

const circle = new THREE.Mesh(

    new THREE.RingGeometry(
        8,
        8.2,
        64
    ),

    new THREE.MeshBasicMaterial({

        color:0xffffff

    })

);


circle.rotation.x=-Math.PI/2;

circle.position.y=0.02;

scene.add(circle);


// --------------------
// Ball
// --------------------

const ball = new THREE.Mesh(

    new THREE.SphereGeometry(
        0.7,
        32,
        32
    ),

    new THREE.MeshStandardMaterial({

        color:0xffffff

    })

);


ball.position.y=0.7;

ball.castShadow=true;

scene.add(ball);


// --------------------
// Player
// --------------------

const player = new THREE.Mesh(

    new THREE.BoxGeometry(
        1,
        3,
        1
    ),

    new THREE.MeshStandardMaterial({

        color:0x0066ff

    })

);


player.position.set(
    -15,
    1.5,
    0
);

player.castShadow=true;

scene.add(player);


// --------------------
// Controls
// --------------------

const keys={};


window.addEventListener(
    "keydown",
    e=>{
        keys[e.key.toLowerCase()]=true;
    }
);


window.addEventListener(
    "keyup",
    e=>{
        keys[e.key.toLowerCase()]=false;
    }
);



function controls(){

    if(keys["w"])
        player.position.z-=0.2;


    if(keys["s"])
        player.position.z+=0.2;


    if(keys["a"])
        player.position.x-=0.2;


    if(keys["d"])
        player.position.x+=0.2;



    // Camera follow

    camera.position.x =
        player.position.x;

    camera.position.z =
        player.position.z+25;


    camera.lookAt(
        player.position
    );

}



// --------------------
// Animation Loop
// --------------------

function animate(){

    requestAnimationFrame(
        animate
    );


    controls();


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

    }
);


// Remove loading screen

setTimeout(()=>{

    document.getElementById(
        "loadingScreen"
    ).style.display="none";

},1500);
