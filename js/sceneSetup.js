import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.150.0/examples/jsm/loaders/RGBELoader.js';

export function setupScene() {
    const scene = new THREE.Scene();

    // 🌌 Dark Background (Updated for better visibility)
    scene.background = new THREE.Color(0x333333);

    // 🌎 Load HDR Environment for realistic ambient lighting
    new RGBELoader()
        .setPath('assets/') // Adjust path to your HDRI file
        .load('nb.hdr', function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;
        });

    return scene;
}

export function setupCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // 🎥 Keeping the original position & rotation
    camera.position.set(0, -2, 0);
    camera.lookAt(0, 8, 0);

    return camera;
}

export function setupRenderer() {
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('threejs-canvas'),
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8; // Adjusted for brightness
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(renderer.domElement);

    return renderer;
}
