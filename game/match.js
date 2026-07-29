import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

export class Match {

    constructor(ball, blueTeam, redTeam) {

        this.ball = ball;

        this.blueTeam = blueTeam;
        this.redTeam = redTeam;

        this.homeScore = 0;
        this.awayScore = 0;

        this.state = "kickoff";

        this.matchLength = 90 * 60;
        this.time = 0;

        this.goalDelay = 0;

    }

    update(delta = 1) {

        if (this.state === "playing") {

            this.time += delta / 60;

            this.checkGoals();

        }

        if (this.state === "goal") {

            this.goalDelay--;

            if (this.goalDelay <= 0) {

                this.resetKickoff();

            }

        }

    }

    start() {

        this.state = "playing";

    }

    checkGoals() {

        const ball = this.ball.mesh.position;

        // Blue attacks right

        if (
            ball.x >= 50 &&
            Math.abs(ball.z) < 4
        ) {

            this.homeScore++;

            this.goal("Blue FC");

        }

        // Red attacks left

        if (
            ball.x <= -50 &&
            Math.abs(ball.z) < 4
        ) {

            this.awayScore++;

            this.goal("Red FC");

        }

    }

    goal(team) {

        console.log(team + " SCORES!");

        this.state = "goal";

        this.goalDelay = 180;

    }

    resetKickoff() {

        this.ball.reset();

        this.blueTeam.resetFormation();

        this.redTeam.resetFormation();

        this.state = "playing";

    }

    getTimeString() {

        const minutes = Math.floor(this.time);

        const seconds = Math.floor(
            (this.time - minutes) * 60
        );

        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0")
        );

    }

}
