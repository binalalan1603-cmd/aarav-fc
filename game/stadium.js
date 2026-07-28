import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";


export function createStadium(scene){

    // --------------------
    // Pitch Lines
    // --------------------

    const lineMaterial = new THREE.LineBasicMaterial({
        color:0xffffff
    });


    function
