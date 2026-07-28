import { Player } from "./player.js";


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
