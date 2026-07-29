import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

export function createStadium(scene) {

    // ======================================================
    // GRASS
    // ======================================================

    const grass = new THREE.Mesh(

        new THREE.PlaneGeometry(110, 72),

        new THREE.MeshStandardMaterial({

            color: 0x2f9d3f,

            roughness: 1

        })

    );

    grass.rotation.x = -Math.PI / 2;

    grass.receiveShadow = true;

    scene.add(grass);



    // ======================================================
    // PITCH
    // ======================================================

    const lineMaterial =
        new THREE.LineBasicMaterial({
            color: 0xffffff
        });

    function drawRectangle(width, height) {

        const points = [

            new THREE.Vector3(-width / 2, 0.02, -height / 2),
            new THREE.Vector3(width / 2, 0.02, -height / 2),
            new THREE.Vector3(width / 2, 0.02, height / 2),
            new THREE.Vector3(-width / 2, 0.02, height / 2),
            new THREE.Vector3(-width / 2, 0.02, -height / 2)

        ];

        const geometry =
            new THREE.BufferGeometry().setFromPoints(points);

        scene.add(
            new THREE.Line(
                geometry,
                lineMaterial
            )
        );

    }

    drawRectangle(100, 64);



    // ======================================================
    // HALF LINE
    // ======================================================

    const halfGeometry =
        new THREE.BufferGeometry().setFromPoints([

            new THREE.Vector3(0, 0.02, -32),

            new THREE.Vector3(0, 0.02, 32)

        ]);

    scene.add(
        new THREE.Line(
            halfGeometry,
            lineMaterial
        )
    );



    // ======================================================
    // CENTRE CIRCLE
    // ======================================================

    const circle =
        new THREE.Line(

            new THREE.BufferGeometry().setFromPoints(

                new THREE.Path()
                    .absarc(
                        0,
                        0,
                        9,
                        0,
                        Math.PI * 2
                    )
                    .getPoints(64)
                    .map(p =>
                        new THREE.Vector3(
                            p.x,
                            0.02,
                            p.y
                        )
                    )

            ),

            lineMaterial

        );

    scene.add(circle);



    // ======================================================
    // GOALS
    // ======================================================

    createGoal(scene, -50);

    createGoal(scene, 50);



    // ======================================================
    // CORNER FLAGS
    // ======================================================

    addFlag(scene, -50, -32);

    addFlag(scene, -50, 32);

    addFlag(scene, 50, -32);

    addFlag(scene, 50, 32);



    // ======================================================
    // STANDS
    // ======================================================

    createStand(scene, 0, 5, -45, 100, 8, 12);

    createStand(scene, 0, 5, 45, 100, 8, 12);

    createStand(scene, -60, 5, 0, 12, 8, 70);

    createStand(scene, 60, 5, 0, 12, 8, 70);



    // ======================================================
    // FLOODLIGHTS
    // ======================================================

    addLight(scene, -60, 18, -40);

    addLight(scene, 60, 18, -40);

    addLight(scene, -60, 18, 40);

    addLight(scene, 60, 18, 40);

}



function createGoal(scene, x) {

    const material =
        new THREE.MeshStandardMaterial({
            color: 0xffffff
        });

    const left =
        new THREE.Mesh(
            new THREE.CylinderGeometry(0.1, 0.1, 3),
            material
        );

    left.position.set(x, 1.5, -4);

    scene.add(left);

    const right = left.clone();

    right.position.z = 4;

    scene.add(right);

    const top =
        new THREE.Mesh(
            new THREE.CylinderGeometry(0.1, 0.1, 8),
            material
        );

    top.rotation.z = Math.PI / 2;

    top.position.set(x, 3, 0);

    scene.add(top);

}



function createStand(scene, x, y, z, w, h, d) {

    const stand =
        new THREE.Mesh(

            new THREE.BoxGeometry(w, h, d),

            new THREE.MeshStandardMaterial({

                color: 0x666666

            })

        );

    stand.position.set(x, y, z);

    stand.receiveShadow = true;

    stand.castShadow = true;

    scene.add(stand);

}



function addFlag(scene, x, z) {

    const pole =
        new THREE.Mesh(

            new THREE.CylinderGeometry(0.05, 0.05, 2),

            new THREE.MeshStandardMaterial({

                color: 0xffffff

            })

        );

    pole.position.set(x, 1, z);

    scene.add(pole);

    const flag =
        new THREE.Mesh(

            new THREE.PlaneGeometry(0.6, 0.35),

            new THREE.MeshStandardMaterial({

                color: 0xffcc00,

                side: THREE.DoubleSide

            })

        );

    flag.position.set(x + 0.3, 1.7, z);

    scene.add(flag);

}



function addLight(scene, x, y, z) {

    const pole =
        new THREE.Mesh(

            new THREE.CylinderGeometry(0.25, 0.25, y),

            new THREE.MeshStandardMaterial({

                color: 0x555555

            })

        );

    pole.position.set(x, y / 2, z);

    scene.add(pole);

    const light =
        new THREE.PointLight(
            0xffffff,
            2,
            90
        );

    light.position.set(x, y, z);

    scene.add(light);

}
