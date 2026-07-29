aimport * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";
import { Player } from "./player.js";

export class Team {

    constructor(scene, name, color) {

        this.scene = scene;
        this.name = name;
        this.color = color;

        this.players = [];

        this.formation = [
            [-45, 0],     // Goalkeeper

            [-30, -18],   // Left Back
            [-33, -6],    // Center Back
            [-33, 6],     // Center Back
            [-30, 18],    // Right Back

            [-15, -12],   // Left Mid
            [-18, 0],     // Center Mid
            [-15, 12],    // Right Mid

            [5, -14],     // Left Wing
            [8, 0],       // Striker
            [5, 14]       // Right Wing
        ];

    }

    createFormation(side = "left") {

        this.players = [];

        this.formation.forEach((position, index) => {

            const player = new Player(
                this.scene,
                `${this.name} ${index + 1}`,
                this.color
            );

            let x = position[0];
            let z = position[1];

            if (side === "right") {

                x *= -1;
                z *= -1;

            }

            player.setPosition(
                x,
                1,
                z
            );

            player.team = this;

            player.number = index + 1;

            player.isGoalkeeper = index === 0;

            this.players.push(player);

        });

    }

    resetFormation() {

        this.players.forEach((player, index) => {

            const pos = this.formation[index];

            if (!pos) return;

            let x = pos[0];
            let z = pos[1];

            if (this.name.toLowerCase().includes("red")) {

                x *= -1;
                z *= -1;

            }

            player.mesh.position.set(
                x,
                1,
                z
            );

            player.home.set(
                x,
                1,
                z
            );

        });

    }

    nearestPlayer(position) {

        let nearest = null;

        let distance = Infinity;

        this.players.forEach(player => {

            const d =
                player.mesh.position.distanceTo(position);

            if (d < distance) {

                distance = d;
                nearest = player;

            }

        });

        return nearest;

    }

    update(delta = 1) {

        this.players.forEach(player => {

            player.update(delta);

        });

    }

}import { Player } from "./player.js";


export class Team {


    constructor(
        scene,
        name,
        color
    ){

        this.scene = scene;

        this.name = name;

        this.color = color;

        this.players = [];

    }



    createFormation(){

        const positions = [

            // Goalkeeper
            [-45,0,0],

            // Defenders
            [-32,0,-18],
            [-35,0,-6],
            [-35,0,6],
            [-32,0,18],


            // Midfielders
            [-15,0,-12],
            [-18,0,0],
            [-15,0,12],


            // Attackers
            [5,0,-14],
            [8,0,0],
            [5,0,14]

        ];


        positions.forEach(
        (pos,index)=>{


            const player =
            new Player(

                this.scene,

                this.name +
                " Player " +
                (index+1),

                this.color

            );


            player.setPosition(

                pos[0],
                1,
                pos[2]

            );


            player.team=this;


            player.number=index+1;


            this.players.push(
                player
            );


        });


    }



    update(){

        this.players.forEach(
            player=>{

                player.update();

            }
        );

    }


}
