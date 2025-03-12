import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass.js';
import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import gsap from 'gsap';

export function setupPostProcessing(scene, camera, renderer) {
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    // ✅ Bloom Effect
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.75, 0.4, 0.9);
    composer.addPass(bloomPass);

    // ✅ Gaussian Blur Shader (Smooth & Flickering Effect)
    const gaussianBlurPass = new ShaderPass({
        uniforms: {
            tDiffuse: { value: null },
            blurSize: { value: 0.01 }, // ✅ Initial blur intensity (stronger at first)
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform float blurSize;
            varying vec2 vUv;

            void main() {
                vec4 color = vec4(0.0);
                float total = 0.0;

                // Gaussian Weights
                float weight[5];
                weight[0] = 0.227027;
                weight[1] = 0.1945946;
                weight[2] = 0.1216216;
                weight[3] = 0.054054;
                weight[4] = 0.016216;

                // Apply Gaussian Blur in Horizontal & Vertical Directions
                for (int i = -4; i <= 4; i++) {
                    for (int j = -4; j <= 4; j++) {
                        vec2 offset = vec2(float(i), float(j)) * blurSize;
                        color += texture2D(tDiffuse, vUv + offset) * weight[abs(i)];
                        total += weight[abs(i)];
                    }
                }

                gl_FragColor = color / total; // Normalize the color
            }
        `
    });
    composer.addPass(gaussianBlurPass);

    // ✅ Glitch Effect (Disabled by default)
    const glitchPass = new GlitchPass();
    glitchPass.enabled = false;
    composer.addPass(glitchPass);

    // ✅ LUT Color Grading
    const lutLoader = new LUTCubeLoader();
    lutLoader.load('/assets/vintage.cube', (lut) => {
        const lutPass = new LUTPass();
        lutPass.lut = lut.texture;
        composer.addPass(lutPass);
    }, undefined, () => console.error("❌ LUT Loading Failed"));

    // ✅ Flickering Effect in First 3 Seconds
    function flickerBlur() {
        gsap.to(gaussianBlurPass.uniforms.blurSize, {
            value: 0.02, // ✅ Slightly stronger blur
            duration: 0.1,
            repeat: 10, // ✅ Flicker effect over 3 seconds
            yoyo: true,
            ease: "power1.inOut",
        });
    }

    flickerBlur(); // ✅ Start flickering effect

    // ✅ Fade Out Gaussian Blur After 3 Seconds
    setTimeout(() => {
        gsap.to(gaussianBlurPass.uniforms.blurSize, { value: 0.0, duration: 2, ease: "power2.out", onComplete: () => {
            composer.removePass(gaussianBlurPass); // ✅ Remove for performance
        }});
    }, 3000);

    return composer;
}
