import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";


export class AI {


    constructor(team, ball){

        this.team = team;

        this.ball = ball;

    }



    update(){


        this.team.players.forEach(
        (player,index)=>{


            // Skip goalkeeper

            if(index===0)
            return;



            let target =
            new THREE.Vector3();



            const distance =
            player.mesh.position.distanceTo(
                this.ball.mesh.position
            );



            // Chase ball if close

            if(distance < 15){

                target.copy(
                    this.ball.mesh.position
                );


            }

            else{


                // Return to formation

                if(player.home){

                    target.copy(
                        player.home
                    );

                }

                else{

                    target.copy(
                        player.mesh.position
                    );

                }

            }



            player.mesh.position.lerp(
                target,
                0.02
            );


        });


    }


}
