import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";


export class Player {


    constructor(
        scene,
        name="Player",
        color=0x0055ff
    ){


        this.name=name;


        // Create player body

        this.mesh = new THREE.Mesh(

            new THREE.CapsuleGeometry(
                0.45,
                1.2,
                6,
                12
            ),

            new THREE.MeshStandardMaterial({

                color:color

            })

        );


        this.mesh.castShadow=true;


        this.speed=0.15;


        this.stamina=100;


        this.position=
        this.mesh.position;


        scene.add(this.mesh);

    }



    move(direction){


        this.mesh.position.x +=
        direction.x*this.speed;


        this.mesh.position.z +=
        direction.z*this.speed;


    }



    setPosition(x,y,z){

        this.mesh.position.set(
            x,
            y,
            z
        );

    }



    update(){

        // Future:
        // stamina
        // animations
        // AI movement

    }


}
