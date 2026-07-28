import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";


export function createStadium(scene){


    // Grass

    const grass = new THREE.Mesh(

        new THREE.PlaneGeometry(
            100,
            65
        ),

        new THREE.MeshStandardMaterial({
            color:0x2b8c3b
        })

    );


    grass.rotation.x=-Math.PI/2;

    grass.receiveShadow=true;

    scene.add(grass);



    // Stadium seats

    for(let i=0;i<2;i++){

        const stand =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                110,
                5,
                10
            ),

            new THREE.MeshStandardMaterial({
                color:0x555555
            })

        );


        stand.position.set(
            0,
            2.5,
            i===0?45:-45
        );


        scene.add(stand);

    }



    // Goals

    createGoal(
        scene,
        50
    );

    createGoal(
        scene,
        -50
    );


}



function createGoal(scene,x){


    const postMaterial =
    new THREE.MeshStandardMaterial({
        color:0xffffff
    });



    const left =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            0.2,
            3,
            7
        ),

        postMaterial

    );


    left.position.set(
        x,
        1.5,
        -3.5
    );



    const right =
    left.clone();


    right.position.z=3.5;



    const top =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            0.2,
            0.2,
            7
        ),

        postMaterial

    );


    top.position.set(
        x,
        3,
        0
    );


    scene.add(left);
    scene.add(right);
    scene.add(top);

}
