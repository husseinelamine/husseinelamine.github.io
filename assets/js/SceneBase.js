// SceneBase.js
import * as THREE from 'three';

class SceneBase {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000);
        //this.camera.rotation.y = 45/180*Math.PI;
        //this.camera.position.x = 800;
        //this.camera.position.y = 100;
        //this.camera.position.z = 1000;
        this.renderer = new THREE.WebGLRenderer({antialias:true});
        this.renderer.setSize(window.innerWidth, window.innerHeight, false);
        document.body.appendChild(this.renderer.domElement);
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
        cancelAnimationFrame(this.animationRequestId);
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
    }
}

export default SceneBase;
