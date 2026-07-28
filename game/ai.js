import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

export class AI {

    constructor(team, ball) {
        this.team = team;
        this.ball = ball;
    }

    update() {

        this.team.players.forEach((player, index) => {

            // Don't move the goalkeeper for now
            if (index === 0) return;

            let target;

            // Chase the ball if nearby
            if (
                player.mesh.position.distanceTo(this.ball.mesh.position) < 12
            ) {
                target = this.ball.mesh.position;
            } else {
                target = player.home || player.mesh.position;
            }

            const direction = new THREE.Vector3()
                .subVectors(target, player.mesh.position);

            if (direction.length() > 0.1) {
                direction.normalize();
                player.move(direction);
            }

        });

    }

}
