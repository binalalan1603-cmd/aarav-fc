import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

export class Ball {

    constructor(scene) {

        this.scene = scene;

        this.radius = 0.22;

        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(this.radius, 32, 32),
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.6,
                metalness: 0.1
            })
        );

        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.mesh.position.set(0, this.radius, 0);

        scene.add(this.mesh);

        this.velocity = new THREE.Vector3();

        this.friction = 0.97;

        this.maxSpeed = 1.4;

        this.owner = null;

    }

    update() {

        // Follow player if possessed

        if (this.owner) {

            const dir = this.owner.direction.clone();

            if (dir.lengthSq() === 0)
                dir.set(0, 0, 1);

            dir.normalize();

            this.mesh.position.copy(this.owner.mesh.position);

            this.mesh.position.x += dir.x * 0.75;

            this.mesh.position.z += dir.z * 0.75;

            this.mesh.position.y = this.radius;

            return;

        }

        // Ball Physics

        this.mesh.position.add(this.velocity);

        this.velocity.multiplyScalar(this.friction);

        if (this.velocity.length() < 0.002) {

            this.velocity.set(0, 0, 0);

        }

        // Pitch boundaries

        if (this.mesh.position.x > 50) {

            this.mesh.position.x = 50;

            this.velocity.x *= -0.4;

        }

        if (this.mesh.position.x < -50) {

            this.mesh.position.x = -50;

            this.velocity.x *= -0.4;

        }

        if (this.mesh.position.z > 31) {

            this.mesh.position.z = 31;

            this.velocity.z *= -0.4;

        }

        if (this.mesh.position.z < -31) {

            this.mesh.position.z = -31;

            this.velocity.z *= -0.4;

        }

        this.mesh.rotation.x += this.velocity.length() * 2;

    }

    kick(direction, power = 1) {

        this.owner = null;

        direction = direction.clone().normalize();

        this.velocity.copy(direction);

        this.velocity.multiplyScalar(
            Math.min(power, this.maxSpeed)
        );

    }

    reset() {

        this.owner = null;

        this.velocity.set(0, 0, 0);

        this.mesh.position.set(
            0,
            this.radius,
            0
        );

    }

}
