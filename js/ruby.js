import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let ruby;

export function createRuby(scene) {
    const loader = new GLTFLoader();

    loader.load('/assets/gem1.glb', (gltf) => {
        ruby = gltf.scene;
        ruby.scale.set(1, 1, 1);
        ruby.position.set(0, 0, 0);

        // Enable shadows & reflections
        ruby.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
                node.material.envMapIntensity = 0.5; // Subtle reflection
            }
        });

        scene.add(ruby);
        console.log("✅ Ruby Model Loaded!");
    }, 
    undefined, 
    function (error) {
        console.error("❌ Error loading Ruby model:", error);
    });

    return ruby;
}

// 🏃 Animation Loop
export function animateRuby() {
    if (!ruby) return;
    
    ruby.rotation.y += 0.002; // Slow rotation
    ruby.position.y = 1 + Math.sin(Date.now() * 0.001) * 0.1; // Floating effect
    ruby.rotation.z += 0.002; // Slow rotation
    ruby.position.z = 1 + Math.sin(Date.now() * 0.001) * 0.1; // Floating effect

    // ✨ Dynamic Glow Effect
    ruby.traverse((node) => {
        if (node.isMesh) {
            node.material.transmission = 0.96 + Math.sin(Date.now() * 0.02) * 0.02; 
            node.material.specularIntensity = 2 + Math.sin(Date.now() * 0.05) * 0.5; 
            node.material.envMapIntensity = 3 + Math.sin(Date.now() * 0.03) * 0.2; 
        }
    });
}
