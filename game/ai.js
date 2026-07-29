import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

export class AI {

    constructor(team, ball) {

        this.team = team;
        this.ball = ball;

        this.chaseDistance = 8;
        this.returnSpeed = 0.035;
        this.chaseSpeed = 0.06;
    }

    update(delta = 1) {

        this.team.players.forEach(player => {

            // Controlled player is updated by main.js
            if (player.isControlled) return;

            const ballPos = this.ball.mesh.position;
            const playerPos = player.mesh.position;

            const distance = playerPos.distanceTo(ballPos);

            let target = new THREE.Vector3();

            // Goalkeeper behaviour
            if (player.isGoalkeeper) {

                target.copy(player.home);

                target.z += THREE.MathUtils.clamp(
                    ballPos.z - player.home.z,
                    -6,
                    6
                );

                this.movePlayer(player, target, this.returnSpeed);

                return;
            }

            // Chase the ball if close
            if (distance < this.chaseDistance) {

                target.copy(ballPos);

                this.movePlayer(player, target, this.chaseSpeed);

            } else {

                // Return to home position
                target.copy(player.home);

                this.movePlayer(player, target, this.returnSpeed);

            }

        });

    }

    movePlayer(player, target, speed) {

        const direction = new THREE.Vector3();

        direction.subVectors(
            target,
            player.mesh.position
        );

        direction.y = 0;

        if (direction.lengthSq() < 0.05)
            return;

        direction.normalize();

        player.mesh.position.addScaledVector(
            direction,
            speed
        );

        // Rotate player

        player.mesh.rotation.y =
            Math.atan2(
                direction.x,
                direction.z
            );

        // Keep inside field

        player.mesh.position.x =
            THREE.MathUtils.clamp(
                player.mesh.position.x,
                -49,
                49
            );

        player.mesh.position.z =
            THREE.MathUtils.clamp(
                player.mesh.position.z,
                -30,
                30
            );

    }

}
