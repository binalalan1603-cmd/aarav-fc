import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

import { createStadium } from "./game/stadium.js";
import { Ball } from "./game/ball.js";
import { Team } from "./game/team.js";
import { AI } from "./game/ai.js";
import { BallController } from "./game/ballController.js";

// ====================
// Scene
// ====================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// ====================
// Camera
// ====================

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 25, 35);

// ====================
// Renderer
// ====================

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("gameCanvas"),
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// ====================
// Lights
// ====================

const sun = new THREE.DirectionalLight(0xffffff, 2);

sun.position.set(20, 40, 20);
sun.castShadow = true;

scene.add(sun);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// ====================
// Stadium
// ====================

createStadium(scene);

// ====================
// Ball
// ====================

const ball = new Ball(scene);
const ballController = new BallController(ball);

// ====================
// Teams
// ====================

const blueTeam = new Team(scene, "Blue FC", 0x0066ff);
blueTeam.createFormation();

const redTeam = new Team(scene, "Red FC", 0xff3333);
redTeam.createFormation();

// Flip Red Team

redTeam.players.forEach(player => {
    player.mesh.position.x *= -1;
});

// Save home positions

[...blueTeam.players, ...redTeam.players].forEach(player => {
    player.home = player.mesh.position.clone();
});

// ====================
// AI
// ====================

const blueAI = new AI(blueTeam, ball);
const redAI = new AI(redTeam, ball);

// ====================
// Controlled Player
// ====================

const controlledPlayer = blueTeam.players[10];

// ====================
// Keyboard
// ====================

const keys = {};

window.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});

// ====================
// Player Controls
// ====================

function updatePlayer() {

    const direction = new THREE.Vector3();

    if (keys["w"]) direction.z -= 1;
    if (keys["s"]) direction.z += 1;
    if (keys["a"]) direction.x -= 1;
    if (keys["d"]) direction.x += 1;

    if (direction.length() > 0) {
        direction.normalize();
        controlledPlayer.move(direction);
    }

    // PASS

    if (keys["e"]) {

        const teammate = blueTeam.players[7];

        ballController.pass(teammate);

        keys["e"] = false;
    }

    // SHOOT

    if (keys[" "]) {

        ballController.shoot(50);

        keys[" "] = false;
    }

    // Camera

    camera.position.x = controlledPlayer.mesh.position.x;
    camera.position.z = controlledPlayer.mesh.position.z + 25;

    camera.lookAt(controlledPlayer.mesh.position);
}

// ====================
// Game Loop
// ====================

function animate() {

    requestAnimationFrame(animate);

    updatePlayer();

    blueAI.update();
    redAI.update();

    blueTeam.update();
    redTeam.update();

    ballController.update([
        ...blueTeam.players,
        ...redTeam.players
    ]);

    ball.update();

    renderer.render(scene, camera);
}

animate();

// ====================
// Resize
// ====================

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

// ====================
// Loading Screen
// ====================

const loading = document.getElementById("loadingScreen");

if (loading) {

    setTimeout(() => {

        loading.style.display = "none";

    }, 1000);

}
