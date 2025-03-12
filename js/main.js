import { setupScene, setupRenderer, setupCamera } from './js/sceneSetup.js';
import { setupLighting} from './js/lighting.js';
import { setupPostProcessing } from './js/postProcessing.js';
import { handleInteractions } from './js/interactions.js';
import { initializeSections, handleScroll } from './js/sections.js';
import { createParticles, animateParticles } from './js/particles.js';
import { createRuby, animateRuby } from './js/ruby.js';
import { loadGLBModel } from './js/GLBLoader.js';
// Global variables
let scene, camera, renderer, composer, particles, ruby;

// 🎬 Start Experience
export function startExperience() {
    document.querySelector(".overlay").style.display = "none";

    // ✅ Setup scene
    scene = setupScene();
    camera = setupCamera();
    renderer = setupRenderer();

    // ✅ Add lighting
    setupLighting(scene);

    // ✅ Apply post-processing
    composer = setupPostProcessing(scene, camera, renderer);

    // ✅ Initialize sections
    initializeSections(scene, camera);

    // ✅ Handle interactions
    handleInteractions(scene, camera, renderer, composer);

    // ✅ Create and animate particles
    particles = createParticles(scene);
    animateParticles(particles);

    // ✅ Load the Ruby Model
    ruby = createRuby(scene);
    // ✅ List of GLB models to load
    loadGLBModel(scene, "/assets/code.glb", 2, -3);
    loadGLBModel(scene, "/assets/computer.glb", -2, -7);
    loadGLBModel(scene, "/assets/lock.glb", 1.5, -12);
    loadGLBModel(scene, "/assets/scale1.glb", -2, -16);
    loadGLBModel(scene, "/assets/gamezone.glb", 2, -22);
    loadGLBModel(scene, "/assets/42.glb", 2, -31);


    // 🏃 Animation loop
    function animate() {
        requestAnimationFrame(animate);
        animateRuby(); // ✅ Animate Ruby Model
        composer.render();
    }
    animate();

    // Scroll listener for sections
    window.addEventListener("wheel", (event) => handleScroll(event, camera), { passive: false });

    // Resize listener
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
    });
}
