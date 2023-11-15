import * as THREE from 'three';

// Scene2.js
import SceneBase from './SceneBase.js';

class Scene2 extends SceneBase {
    constructor() {
        super();
        this.color = 0xff0000;
        this.init();
    }

    init() {
        super.init();

        // Create sphere
        const geometry = new THREE.TetrahedronGeometry(1, 2);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const sphere = new THREE.Mesh(geometry, material);
        this.scene.add(sphere);
    }

    animate() {
        // Animation loop
        this.animationRequestId = requestAnimationFrame(() => this.animate());

        if(this.scene.children.length > 0) {
        // Rotate sphere
            this.scene.children[0].rotation.x += 0.01;
            this.scene.children[0].rotation.y += 0.01;
        }

        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        super.destroy();
    }
    
}

export default Scene2;
