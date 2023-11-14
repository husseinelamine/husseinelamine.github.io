import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'; // Import FBXLoader module
import SceneBase from './SceneBase.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // Import OrbitControls module


class Scene3 extends SceneBase {
    constructor() {
        super();
        this.init();
    }

    init() {
        super.init();

        // Set up Three.js scene
        this.scene.background = new THREE.Color(0xf0f0f0); // Set background color

        // Set up camera
        this.camera.position.set(0, 0, 10); // Adjust the position based on your scene scale
        this.camera.lookAt(0, 0, 0); // Look at the center of the scene


        // Load the FBX object
        const loader = new FBXLoader();
        console.log("before load call")
        loader.load('assets/fbx/clio.FBX', (fbx) => {
            console.log("inside load call")
            // Adjust the position, scale, or any other properties of the loaded FBX object if needed
            fbx.position.set(0, 0, 0); // Adjust the position
            fbx.scale.set(0.01, 0.01, 0.01); // Adjust the scale
            fbx.traverse((child) => {
                if (child.isMesh) {
                    console.log(child.material);
                }
            });
            this.scene.add(fbx);
        });

        console.log("after load call")

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
        directionalLight.position.set(1, 1, 1).normalize();
        this.scene.add(directionalLight);


        // Set up camera controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.45;
        this.controls.screenSpacePanning = true;
        this.controls.maxPolarAngle = Math.PI / 2;

        // Start the animation loop
        this.animate();
    }

    animate() {
        // Animation loop
        this.animationRequestId = requestAnimationFrame(() => this.animate());

        // Add any custom animations or interactions here

        this.controls.update();

        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        super.destroy();
        console.log("Scene3 destroy");
    }
}

export default Scene3;
