import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

export function setupLighting(scene) {
    // ☀️ Main Directional Light (Simulating Sunlight)
    const mainLight = new THREE.DirectionalLight(0xffffff, 4); // Increased brightness
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;

    // 🔆 High-Quality Shadows
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -5;
    mainLight.shadow.camera.right = 5;
    mainLight.shadow.camera.top = 5;
    mainLight.shadow.camera.bottom = -5;

    scene.add(mainLight);

    // 🌎 Hemisphere Light (Simulates Sky & Ground Light)
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
    scene.add(hemisphereLight);

    // 🔥 Rim Light (For depth & highlights)
    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(-5, 10, -5);
    scene.add(backLight);

    // ✨ Point Light (Boosts scene brightness)
    const pointLight = new THREE.PointLight(0xffffff, 2, 10);
    pointLight.position.set(0, 3, 0);
    scene.add(pointLight);

    console.log("✅ Optimized Lighting Applied");
}
