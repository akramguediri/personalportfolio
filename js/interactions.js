import gsap from "gsap";
import * as THREE from 'three';

export function handleInteractions(scene, camera, renderer, composer) {
    let mouseX = 0, mouseY = 0;
    let cameraBaseY = camera.position.y; // ✅ Stores correct base Y position from scroll

    // ✅ Slight Mouse Movement Effect (Does NOT Reset `y`)
    document.addEventListener("mousemove", (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        gsap.to(camera.position, {
            x: mouseX * 0.2, // ✅ Small horizontal effect
            y: camera.position.y + mouseY * 0.1, // ✅ Uses `camera.position.y` (NOT `cameraBaseY`)
            duration: 0.5,
            ease: "power2.out"
        });
    });

    // ✅ Scroll Moves Camera Without Resetting Y
    window.addEventListener("scroll", () => {
        cameraBaseY += 1; // ✅ Keeps adding, never resetting
        gsap.to(camera.position, {
            y: cameraBaseY, // ✅ Uses continuously updated `cameraBaseY`
            duration: 1.5,
            ease: "power2.inOut",
        });
    });

    // ✅ Click Interaction (Moves Camera Without Resetting Scroll)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener("click", (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            console.log("✨ Ruby Clicked! Moving Camera...");
            cameraBaseY += 3; // ✅ Ensures click moves camera smoothly down
            gsap.to(camera.position, { y: cameraBaseY, duration: 2, ease: "power2.inOut" });
        }
    });

    console.log("✅ Fixed: Mouse No Longer Resets Scroll Position");
}
