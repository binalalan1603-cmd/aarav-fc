import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

export class InputManager {

    constructor() {

        this.keys = {};

        this.direction = new THREE.Vector3();

        window.addEventListener("keydown", (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });

        window.addEventListener("keyup", (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

    }

    update(player) {

        this.direction.set(0, 0, 0);

        if (this.keys["w"])
            this.direction.z -= 1;

        if (this.keys["s"])
            this.direction.z += 1;

        if (this.keys["a"])
            this.direction.x -= 1;

        if (this.keys["d"])
            this.direction.x += 1;

        if (this.direction.lengthSq() > 0) {

            this.direction.normalize();

            player.move(this.direction);

        }

        player.sprint(
            this.keys["shift"]
        );

    }

    passPressed() {

        return this.consume("e");

    }

    shootPressed() {

        return this.consume(" ");

    }

    switchPressed() {

        return this.consume("q");

    }

    tacklePressed() {

        return this.consume("f");

    }

    consume(key) {

        if (this.keys[key]) {

            this.keys[key] = false;

            return true;

        }

        return false;

    }

}
