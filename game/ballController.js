import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";


export class BallController {


    constructor(ball){

        this.ball = ball;

        this.owner = null;

        this.speed = 0.5;

    }



    update(players){


        // Check possession

        players.forEach(player=>{


            const distance =
            player.mesh.position.distanceTo(
                this.ball.mesh.position
            );


            if(distance < 1.5){

                this.owner = player;

            }


        });



        // Follow player

        if(this.owner){


            this.ball.mesh.position.x =
            this.owner.mesh.position.x + 1;


            this.ball.mesh.position.z =
            this.owner.mesh.position.z;


            this.ball.mesh.position.y =
            0.7;


        }


    }



    pass(target){


        if(!this.owner)
        return;


        const direction =
        new THREE.Vector3();


        direction.subVectors(

            target.mesh.position,

            this.ball.mesh.position

        );


        this.owner = null;


        this.ball.velocity =
        direction
        .normalize()
        .multiplyScalar(1);



    }




    shoot(goalX){


        if(!this.owner)
        return;


        const direction =
        new THREE.Vector3(

            goalX -
            this.ball.mesh.position.x,

            0,

            -this.ball.mesh.position.z

        );


        this.owner=null;


        this.ball.velocity =
        direction
        .normalize()
        .multiplyScalar(2);


    }


}
