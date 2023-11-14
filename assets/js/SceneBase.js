// SceneBase.js
import * as THREE from 'three';

class SceneBase {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.init();
        this.start();
    }

    init() {
        // Base scene setup
        this.camera.position.z = 5;
    }

    start() {
        // Start animation
        this.animate();
    }

    destroy() {
        // Stop the animation loop
        console.log("destroy : id: " + this.animationRequestId)

        cancelAnimationFrame(this.animationRequestId);

        // Clean up resources or perform any necessary cleanup
        console.log('destroy');

        // Clear the scene
        this.scene.children.forEach(child => this.scene.remove(child));

        this.scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();
                child.material.dispose();
            }
        });
    }

    animate() {
        // Animation loop
        this.animationRequestId = requestAnimationFrame(() => this.animate());
        console.log("animate : id: " + this.animationRequestId)

        this.renderer.render(this.scene, this.camera);
    }
}

export default SceneBase;
