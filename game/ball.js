import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";


export class Ball {

    constructor(scene){

        this.mesh = new THREE.Mesh(

            new THREE.SphereGeometry(
                0.7,
                32,
                32
            ),

            new THREE.MeshStandardMaterial({
                color:0xffffff
            })

        );


        this.mesh.position.set(
            0,
            0.7,
            0
        );


        this.velocity = new THREE.Vector3();


        this.mesh.castShadow = true;


        scene.add(this.mesh);

    }



    kick(direction,power){

        this.velocity.copy(direction)
        .normalize()
        .multiplyScalar(power);

    }



    update(){

        this.mesh.position.add(
            this.velocity
        );


        this.velocity.multiplyScalar(
            0.96
        );


        if(this.mesh.position.y < 0.7){

            this.mesh.position.y=0.7;

        }

    }

}
