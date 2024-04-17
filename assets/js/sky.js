import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';




let element, scene, camera, renderer;
let starsPos = [], materialShader, sphereGeo;
let animationRequestId, controls, phongmaterial;
start();
function init() {
    element = $("#main-canvas");
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(110, element.width() / element.height(), 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(element.width(), element.height(), false);
    element.append(renderer.domElement);
    scene.background = new THREE.Color(0x010e1b); // Set background color
    const ambientLight = new THREE.AmbientLight(0x404040, 100);
    scene.add(ambientLight);
    controls = new OrbitControls(camera, renderer.domElement);
    // stars
    starsPos = [];
    sphereGeo = new THREE.BoxGeometry(1, 1, 1);
    phongmaterial = new THREE.MeshBasicMaterial({
        color: 0x01fe1b,
        reflectivity: 1,
        refractionRatio: 0.5,
    });
    let min = -25;
    let max = 25;

    for (let i = 0; i < 20; i++) {
        let x = THREE.MathUtils.randFloat(min, max);
        let y = THREE.MathUtils.randFloat(min, max);
        let z = THREE.MathUtils.randFloat(min, max);

        const pos = new THREE.Vector3(
            x, y, -Math.abs(z)
        );
        
        const matrix = new THREE.Matrix4();
        matrix.makeTranslation(pos.x, pos.y, pos.z);
        const g = sphereGeo.clone().applyMatrix4(matrix);
        console.log(g);
        starsPos.push(
            g
        );
        
    }
    let starsGeom = BufferGeometryUtils.mergeBufferGeometries(starsPos);
    let stars = new THREE.Mesh(starsGeom, phongmaterial);
    scene.add(stars);


    document.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
    //camera.aspect = element.width() / element.height();
    //camera.updateProjectionMatrix();
    renderer.setSize(element.width(), element.height(), false);
}
function start() {
    init();
    animate();
}
function animate() {
    const time = performance.now() * 0.001;
    // Update uniforms
    if(materialShader){
        materialShader.uniforms.time.value = time;
    }

    // Animation loop
    animationRequestId = requestAnimationFrame(() => animate());

    // Add any custom animations or interactions here

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