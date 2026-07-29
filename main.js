import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

import { createStadium } from "./game/stadium.js";
import { Ball } from "./game/ball.js";
import { Team } from "./game/team.js";
import { AI } from "./game/ai.js";
import { BallController } from "./game/ballController.js";
import { GameCamera } from "./game/camera.js";
import { InputManager } from "./game/input.js";
import { Match } from "./game/match.js";
import { Scoreboard } from "./game/scoreboard.js";

// ==========================
// Scene
// ==========================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// ==========================
// Camera
// ==========================

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 25, 30);

// ==========================
// Renderer
// ==========================

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("gameCanvas"),
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// ==========================
// Lights
// ==========================

const sun = new THREE.DirectionalLight(0xffffff, 2);

sun.position.set(40, 60, 20);
sun.castShadow = true;

scene.add(sun);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));

// ==========================
// Stadium
// ==========================

createStadium(scene);

// ==========================
// Ball
// ==========================

const ball = new Ball(scene);

const ballController =
    new BallController(ball);

// ==========================
// Teams
// ==========================

const blueTeam =
    new Team(scene, "Blue FC", 0x0066ff);

blueTeam.createFormation("left");

const redTeam =
    new Team(scene, "Red FC", 0xff3333);

redTeam.createFormation("right");

// ==========================
// AI
// ==========================

const blueAI =
    new AI(blueTeam, ball);

const redAI =
    new AI(redTeam, ball);

// ==========================
// Controlled Player
// ==========================

let controlledPlayer =
    blueTeam.players[10];

controlledPlayer.isControlled = true;

// ==========================
// Camera Controller
// ==========================

const gameCamera =
    new GameCamera(camera);

// ==========================
// Input
// ==========================

const input =
    new InputManager();

// ==========================
// Match
// ==========================

const match =
    new Match(
        ball,
        blueTeam,
        redTeam
    );

match.start();

// ==========================
// Scoreboard
// ==========================

const scoreboard =
    new Scoreboard(match);

// ==========================
// Animation Loop
// ==========================

const clock =
    new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    const delta =
        clock.getDelta() * 60;

    input.update(
        controlledPlayer
    );

    blueAI.update(delta);

    redAI.update(delta);

    blueTeam.update(delta);

    redTeam.update(delta);

    ballController.update([
        ...blueTeam.players,
        ...redTeam.players
    ]);

    ball.update();

    match.update(delta);

    scoreboard.update();

    gameCamera.update(
        controlledPlayer,
        ball
    );

    renderer.render(
        scene,
        camera
    );

}

animate();

// ==========================
// Resize
// ==========================

window.addEventListener(
    "resize",
    () => {

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
