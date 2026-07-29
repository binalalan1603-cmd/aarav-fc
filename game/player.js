import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

export class Player {

    constructor(scene, name = "Player", color = 0x0066ff) {

        this.scene = scene;
        this.name = name;

        this.radius = 0.45;
        this.height = 1.8;

        this.speed = 0.14;
        this.sprintSpeed = 0.22;
        this.currentSpeed = this.speed;

        this.stamina = 100;
        this.maxStamina = 100;

        this.hasBall = false;
        this.team = null;
        this.number = 0;

        this.home = new THREE.Vector3();

        this.velocity = new THREE.Vector3();

        this.direction = new THREE.Vector3();

        this.mesh = new THREE.Group();

        // Body

        const body = new THREE.Mesh(
            new THREE.CapsuleGeometry(0.45, 1.0, 8, 16),
            new THREE.MeshStandardMaterial({
                color: color,
                roughness: 0.7,
                metalness: 0.1
            })
        );

        body.castShadow = true;

        this.mesh.add(body);

        // Head

        const head = new THREE.Mesh(
            new THREE.SphereGeometry(0.28, 24, 24),
            new THREE.MeshStandardMaterial({
                color: 0xffd2b1
            })
        );

        head.position.y = 1.05;

        head.castShadow = true;

        this.mesh.add(head);

        scene.add(this.mesh);
    }

    setPosition(x, y, z) {

        this.mesh.position.set(x, y, z);

        this.home.set(x, y, z);

    }
separate(other){

    const distance =
        this.mesh.position.distanceTo(
            other.mesh.position
        );

    if(distance<0.9){

        const push =
            new THREE.Vector3()

        push.subVectors(
            this.mesh.position,
            other.mesh.position
        )

        push.normalize()

        push.multiplyScalar(
            (0.9-distance)/2
        )

        this.mesh.position.add(push)

        other.mesh.position.sub(push)

    }

}
    move(direction) {

        if (direction.lengthSq() === 0) return;

        direction.normalize();

        this.direction.copy(direction);

        this.mesh.position.x += direction.x * this.currentSpeed;
        this.mesh.position.z += direction.z * this.currentSpeed;

        // Rotate player toward movement

        const angle = Math.atan2(direction.x, direction.z);

        this.mesh.rotation.y = angle;

        this.keepInsidePitch();

    }

    sprint(enabled) {

        if (enabled && this.stamina > 0) {

            this.currentSpeed = this.sprintSpeed;

            this.stamina -= 0.3;

        } else {

            this.currentSpeed = this.speed;

            this.stamina += 0.15;

        }

        this.stamina = THREE.MathUtils.clamp(
            this.stamina,
            0,
            this.maxStamina
        );

    }

    keepInsidePitch() {

        this.mesh.position.x =
            THREE.MathUtils.clamp(
                this.mesh.position.x,
                -49,
                49
            );

        this.mesh.position.z =
            THREE.MathUtils.clamp(
                this.mesh.position.z,
                -30,
                30
            );

    }

    distanceTo(object) {

        return this.mesh.position.distanceTo(
            object.mesh.position
        );

    }

    lookAt(target) {

        this.mesh.lookAt(
            target.x,
            this.mesh.position.y,
            target.z
        );

    }

    update(delta = 1) {

        this.keepInsidePitch();

        if (this.currentSpeed === this.speed) {

            this.stamina += 0.08 * delta;

        }

        this.stamina = THREE.MathUtils.clamp(
            this.stamina,
            0,
            this.maxStamina
        );

    }

}
