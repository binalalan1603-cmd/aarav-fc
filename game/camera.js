import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

export class GameCamera {

    constructor(camera) {

        this.camera = camera;

        this.height = 30;
        this.distance = 36;

        this.target = new THREE.Vector3();
        this.current = new THREE.Vector3();

        this.offset = new THREE.Vector3(
            0,
            this.height,
            this.distance
        );

        this.lookAhead = 6;

        this.smoothness = 0.08;

    }

    update(player, ball) {

        const ballPos = ball.mesh.position;
        const playerPos = player.mesh.position;

        this.target.set(

            (playerPos.x + ballPos.x) / 2,

            0,

            (playerPos.z + ballPos.z) / 2

        );

        this.current.lerp(
            this.target,
            this.smoothness
        );

        const desired = new THREE.Vector3(
            this.current.x,
            this.height,
            this.current.z + this.distance
        );

        this.camera.position.lerp(
            desired,
            this.smoothness
        );

        this.camera.lookAt(

            this.current.x,

            0,

            this.current.z

        );

    }

    kickOffView() {

        this.camera.position.set(
            0,
            32,
            36
        );

        this.camera.lookAt(
            0,
            0,
            0
        );

    }

    goalView(ball) {

        this.camera.lookAt(
            ball.mesh.position
        );

    }

}
