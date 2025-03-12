import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.150.0/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
let sceneRef;
const loadedModels = new Map(); // Cache for loaded models
const modelSpacing = 10; // Distance between models

/**
 * ✅ Load a GLB model dynamically, position it, and animate it.
 * @param {THREE.Scene} scene - The Three.js scene.
 * @param {string} modelPath - Path to the GLB file.
 * @param {number} x - X position for the model.
 * @param {number} y - Y position for the model.
 */
export function loadGLBModel(scene, modelPath, x, y) {
    sceneRef = scene;

    if (loadedModels.has(modelPath)) {
        console.warn(`⚠️ Model already loaded: ${modelPath}`);
        return;
    }

    const loader = new GLTFLoader();
    loader.load(
        modelPath,
        (gltf) => {
            const model = gltf.scene;
            model.scale.set(1.5, 1.5, 1.5); // Adjust model size
            model.position.set(x, y, 0); // Custom position
            sceneRef.add(model);
            loadedModels.set(modelPath, model);

            // ✅ Add rotation animation
            animateRotation(model);

            // ✅ Add Red Spotlight
            addRedSpotlight(scene, model.position);
        },
        undefined,
        (error) => console.error("❌ Model loading failed:", error)
    );
}

/**
 * ✅ Rotate the model continuously along all axes.
 * @param {THREE.Object3D} model - The loaded GLB model.
 */
function animateRotation(model) {
    let time = 0;
    function rotate() {
        requestAnimationFrame(rotate);
        
        time += 0.01; // Controls the speed of the fluctuation

        model.rotation.x += 0.003 * Math.sin(time * 0.8); // Varies over time
        model.rotation.y += 0.006 + 0.002 * Math.cos(time * 0.5); // Adds slight variation
        model.rotation.z += 0.004 + 0.003 * Math.sin(time * 0.7); // Smooth oscillation
    }
    rotate();
}

/**
 * ✅ Add a Red Spotlight near each model.
 * @param {THREE.Scene} scene - The Three.js scene.
 * @param {THREE.Vector3} position - The position of the model.
 */
function addRedSpotlight(scene, position) {
    const spotlight = new THREE.SpotLight(0xff0000, 100, 15, Math.PI / 6, 0.5, 1);
    spotlight.position.set(position.x + 2, position.y + 3, position.z + 3); // Positioned near model
    spotlight.castShadow = true;

    // ✅ Create a target for the light to aim at
    const lightTarget = new THREE.Object3D();
    lightTarget.position.set(position.x, position.y, position.z);
    scene.add(lightTarget);
    spotlight.target = lightTarget;

    scene.add(spotlight);
}
