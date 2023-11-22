import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // Import FBXLoader module
import SceneBase from './SceneBase.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // Import OrbitControls module


class Scene3 extends SceneBase {
    constructor() {
        super();
        this.init();
    }

    init() {
        super.init();

        // Set up Three.js scene#010e1b
        this.scene.background = new THREE.Color(0x010e1b); // Set background color
        //this.scene.background = new THREE.Color(0xdddddd); // Set background color
        // Set up camera
        //this.camera.position.set(0, 0, 0); // Adjust the position based on your scene scale
        //this.camera.lookAt(this.scene.position); // Look at the center of the scene


        // Load the FBX object
        const loader = new GLTFLoader();
        loader.load('assets/gltf/sphere/sphere.gltf', (obj) => {
            // Adjust the position, scale, or any other properties of the loaded FBX object if needed
            let spear = obj.scene.children[0];
            spear.position.set(0, 0, 10); // Adjust the position
            let scale = 0.01;
            spear.scale.set(scale, scale, scale); // Adjust the scale
            this.scene.add(spear);
            this.controls.target.copy(spear.position);

        });


        const ambientLight = new THREE.AmbientLight(0x404040, 100);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
        directionalLight.position.set(1, 1, 1).normalize();
        this.scene.add(directionalLight);


        // Set up camera controls
        // Set up camera controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25; // Adjust the damping factor if needed
        this.controls.screenSpacePanning = false; // Disable screen space panning for better behavior
        this.controls.maxPolarAngle = Math.PI;
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
    }
}

export default Scene3;
