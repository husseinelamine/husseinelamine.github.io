import * as THREE from 'three';

let scene, camera, renderer, cube;
let animationRequestId;

function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

function convertHexToDecimal(hexColor) {
    // Remove '#' if present
    hexColor = hexColor.replace(/^#/, '');

    // Convert hexadecimal to decimal
    let decimalColor = parseInt(hexColor, 16);

    return decimalColor;
}

function init(color_ = 0x00ff00) {
	if(isString(color_)) {
		color_ = convertHexToDecimal(color_);
	}
	console.log(color_);
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Create renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: color_ });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set camera position
    camera.position.z = 5;
}

function start() {
    // Start animation
    animate();
}

function destroy() {
	if(!scene) return;
    // Stop the animation loop
    cancelAnimationFrame(animationRequestId);

    // Clean up resources or perform any necessary cleanup
    console.log('destroy');

    // Clear the scene
    scene.remove(cube);
    // Optionally, dispose of geometry and materials to free up memory
    cube.geometry.dispose();
    cube.material.dispose();
}

function animate() {
    // Animation loop
    animationRequestId = requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

export { init, start, destroy };
