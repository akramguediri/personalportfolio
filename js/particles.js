import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

// 🌟 Particle Variables
let totalParticles = 1500;
let particles;
let particleGroup;
let sceneRef;

// ✅ Function to Create All Particles at Once
export function createParticles(scene) {
    sceneRef = scene;
    particleGroup = new THREE.Group();

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/assets/particle1.png', (particleTexture) => {
        const particleMaterial = new THREE.PointsMaterial({
            map: particleTexture,
            size: 0.5, // ✅ Slightly increased for visibility
            transparent: true,
            depthTest: false, // ✅ Ensures transparency works correctly
            blending: THREE.AdditiveBlending,
            color: 0x4444ff, // Red glow effect
        });

        // ✅ Generate All Particles at Once
        particles = generateParticles(totalParticles, particleMaterial);
        particleGroup.add(particles);
        scene.add(particleGroup);

        console.log("✅ Particles Loaded Successfully!");
    });

    // ✅ Track Scene Scroll Movement
    window.addEventListener('scroll', updateParticlePosition);
    return particleGroup;
}

// ✅ Generate All Particles with More Below
function generateParticles(count, material) {
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 30;  // ✅ Less spread for better visibility
        positions[i * 3 + 1] = (Math.random() - 0.5) * 80; // ✅ More particles above and below
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.attributes.position.needsUpdate = true; // ✅ Ensures updates in render loop
    return new THREE.Points(particleGeometry, material);
}

// ✅ Adjust Particles Based on Scene Movement
function updateParticlePosition() {
    if (particleGroup) {
        particleGroup.position.y = -window.scrollY * 0.01; // Moves with the scene
    }
}

// ✅ Function to Animate Particles
export function animateParticles() {
    function animate() {
        requestAnimationFrame(animate);

        if (particleGroup) {
            particleGroup.children.forEach((particleSystem) => {
                particleSystem.position.y += Math.sin(Date.now() * 0.0005 + particleSystem.position.x) * 0.005;
                particleSystem.position.x += Math.sin(Date.now() * 0.0003 + particleSystem.position.y) * 0.002;
            });

            updateParticlePosition();
        }
    }
    animate();
}
