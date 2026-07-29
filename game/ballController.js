import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

export class BallController {

    constructor(ball) {

        this.ball = ball;

        this.controlDistance = 0.75;

        this.passPower = 0.9;

        this.shootPower = 1.4;

    }

    update(players) {

        // Skip if ball already controlled

        if (this.ball.owner) {

            return;

        }

        let nearest = null;

        let nearestDistance = Infinity;

        players.forEach(player => {

            const distance =
                player.mesh.position.distanceTo(
                    this.ball.mesh.position
                );

            if (distance < nearestDistance) {

                nearestDistance = distance;

                nearest = player;

            }

        });

        if (
            nearest &&
            nearestDistance < this.controlDistance
        ) {

            this.ball.owner = nearest;

            nearest.hasBall = true;

        }

    }

    releaseBall() {

        if (this.ball.owner) {

            this.ball.owner.hasBall = false;

            this.ball.owner = null;

        }

    }

    pass(targetPlayer) {

        if (!this.ball.owner) return;

        const direction = new THREE.Vector3();

        direction.subVectors(
            targetPlayer.mesh.position,
            this.ball.mesh.position
        );

        this.releaseBall();

        this.ball.kick(
            direction,
            this.passPower
        );

    }

    shoot(direction) {

        if (!this.ball.owner) return;

        this.releaseBall();

        this.ball.kick(
            direction,
            this.shootPower
        );

    }

    dribble(player) {

        if (this.ball.owner !== player)
            return;

        const forward = player.direction.clone();

        if (forward.lengthSq() === 0) {

            forward.set(0, 0, 1);

        }

        forward.normalize();

        this.ball.mesh.position.copy(
            player.mesh.position
        );

        this.ball.mesh.position.x +=
            forward.x * 0.7;

        this.ball.mesh.position.z +=
            forward.z * 0.7;

        this.ball.mesh.position.y =
            this.ball.radius;

    }

    nearestTeammate(team, player) {

        let nearest = null;

        let distance = Infinity;

        team.players.forEach(p => {

            if (p === player)
                return;

            const d =
                p.mesh.position.distanceTo(
                    player.mesh.position
                );

            if (d < distance) {

                distance = d;

                nearest = p;

            }

        });

        return nearest;

    }

}
