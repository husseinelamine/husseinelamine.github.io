import * as THREE from 'three';

// Scene1.js
import SceneBase from './SceneBase.js';


class Scene1 extends SceneBase {
    constructor() {
        super();
        this.color = 0x00ff00;
    }

    init() {
        super.init();

        // Create cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color:  0x00ff00});
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
    }

    animate() {
        // Animation loop
        console.log("animate : id: " + this.animationRequestId)

        this.animationRequestId = requestAnimationFrame(() => this.animate());

        console.log("Scene1 animate");
        if(this.scene.children.length > 0) {
            // Rotate cube
            this.scene.children[0].rotation.x += 0.01;
            this.scene.children[0].rotation.y += 0.01;
        }
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        super.destroy();
        console.log("Scene1 destroy");
    }
}

export default Scene1;
