import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';




let element;
let scene;
let camera;
let renderer;
let starsPos = [];
let materialShader;
let sphereGeo;
let animationRequestId;

let controls;
let phongmaterial;
let spheres;
let sphere;
let spheresGroup;
let rotx;
let rotz;
let positions = [
    { x: 0.5, y: 0.15, z: -1.8 },
    { x: -1.5, y: 0.35, z: -1.7 },
    { x: -1.0, y: -0.45, z: -3.0 },

];
start();
function init() {

    element = $("#main-canvas");
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, element.width() / element.height(), 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(element.width(), element.height(), false);
    element.append(renderer.domElement);
    scene.background = new THREE.Color(0x010e1b); // Set background color
    const ambientLight = new THREE.AmbientLight(0x404040, 100);
    scene.add(ambientLight);
    controls = new OrbitControls(camera, renderer.domElement);
    spheres = [];
    // Load the FBX object
    const loader = new GLTFLoader();
    loader.load('assets/gltf/office/office_sphere.glb', (obj) => {
        // Adjust the position, scale, or any other properties of the loaded FBX object if needed
        sphere = obj.scene.children[0];
        sphere.position.set(4.5, -5, -7); // Adjust the position
        let scale = 0.1;
        sphere.scale.set(scale, scale, scale); // Adjust the scale
        scene.add(sphere);
        rotx = sphere.rotation.x;
        rotz = sphere.rotation.z;
//        sphere.rotation.x += 0.28;
  //      sphere.rotation.z -= 0.48;

        console.log(sphere.rotation);
    });

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
}

function start() {
    init();
    animate();
}
let rot=  0;
function animate() {
    const time = performance.now() * 0.001;

    // Animation loop
    animationRequestId = requestAnimationFrame(() => animate());

    // Animate spheres (Rotate and move them)
    if (sphere) {
        let z = sphere.position.z;
        let x = sphere.position.x;
        let y = sphere.position.y;
        //sphere.position.set(0, -0.5, -3); // Adjust the position
        
        if(x>0){
            sphere.position.x -= 0.02;
        }
        if(y<-0.5){
            sphere.position.y += 0.02;
        }
        if(z<-3){
            sphere.position.z += 0.02;
        }

        if(x == 0 && y == -0.5 && z == -3){
            if(sphere.rotation.x < rotx + 0.28)
               sphere.rotation.x += 0.01;
            if(sphere.rotation.z > rotz - 0.48)
                sphere.rotation.z -= 0.01;
            //sphere.rotation.x += 0.28;
            //sphere.rotation.z -= 0.48;
            //rot = 1;
        }

        //if (z < -5) {
        //    sphere.position.z += 0.15;
        //}
        //sphere.rotation.z -= 0.01;
        //sphere.rotation.x -= 0.01;

    }
    //sphere.rotation.x = time * 0.1;
    //sphere.rotation.y = time * 0.1;




    controls.update();

    renderer.render(scene, camera);
}

function destroy() {
    cancelAnimationFrame(animationRequestId);
    scene.children.forEach(child => scene.remove(child));

    scene.traverse(child => {
        if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            child.material.dispose();
        }
    });
}