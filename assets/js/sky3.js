import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { SDFGeometryGenerator } from 'three/addons/geometries/SDFGeometryGenerator.js';

import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

THREE.Cache.enabled = true;
const settings = {
    res: 4,
    bounds: 1,
    autoRotate: false,
    wireframe: true,
    material: 'depth',
    vertexCount: '0'
};


// Example SDF from https://www.shadertoy.com/view/MdXSWn -->
const uniforms = {  
    iTime: { value: 0 },
};

const shader = /* glsl */`
                uniform float iTime;
                float dist(vec3 p) {
                    const bool phase_shift_on = false;
					p.xyz = p.xzy;
					p *= 1.2;
					vec3 z = p;
					vec3 dz=vec3(0.0);
					float power = 8.0;
					float r, theta, phi;
					float dr = 1.0;
					
					float t0 = 1.0;
					for(int i = 0; i < 7; ++i) {
						r = length(z);
						if(r > 2.0) continue;
						theta = atan(z.y / z.x);
						if(phase_shift_on)
    						phi = asin(z.z / r) * iTime * 0.1 ;
						else
						    phi = asin(z.z / r);
						
						dr = pow(r, power - 1.0) * dr * power + 1.0;
					
						r = pow(r, power);
						theta = theta * power;
						phi = phi * power;
						
						z = r * vec3(cos(theta)*cos(phi), sin(theta)*cos(phi), sin(phi)) + p;
						
						t0 = min(t0, r);
					}
                    
					return 0.5 * log(r) * r / dr;
				}
                `;




let element;
let scene;
let camera;
let renderer;
let animationRequestId;

let controls;

let meshFromSDF;

let running = true;
let geometry;
let offset = 1;
let mat;
let w, h;
start();
function compile() {

    const generator = new SDFGeometryGenerator(renderer);
    geometry = generator.generate(Math.pow(2, settings.res + 2), shader, settings.bounds);
    geometry.computeVertexNormals();

    if (meshFromSDF) { // updates mesh

        meshFromSDF.geometry.dispose();
        meshFromSDF.geometry = geometry;

    } else { // inits meshFromSDF : THREE.Mesh

        meshFromSDF = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());

        scene.add(meshFromSDF);

        const scale = Math.min(w, h) / 2 * 0.66;
        meshFromSDF.scale.set(scale, scale, scale);

        setMaterial();

    }

    settings.vertexCount = geometry.attributes.position.count;

}

function setMaterial() {

    meshFromSDF.material.dispose();

    if (settings.material == 'depth') {

        meshFromSDF.material = new THREE.MeshDepthMaterial();

    } else if (settings.material == 'normal') {

        meshFromSDF.material = new THREE.MeshNormalMaterial();

    }
    meshFromSDF.material.uniforms = uniforms;

    meshFromSDF.material.wireframe = settings.wireframe;

}
function init() {

    element = $("#main-canvas");
    w = element.width();
    h = element.height();
    $(document).on('keypress', function (e) {
        // if space is pressed
        if (e.keyCode == 32) {
            // if animation is running
            running = !running;
        }
    });

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, element.width() / element.height(), 0.1, 1000);
    // set camera position and rotation
    camera.position.set(0, -400, -800);
    camera.rotation.set(0, 0, 0);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(element.width(), element.height(), false);
    element.append(renderer.domElement);
    scene.background = new THREE.Color(0x010e1b); // Set background color
    const ambientLight = new THREE.AmbientLight(0x404040, 100);
    scene.add(ambientLight);
    controls = new OrbitControls(camera, renderer.domElement);

    /*const loader = new GLTFLoader();
    loader.load('assets/gltf/office/office_sphere.glb', (obj) => {
        sphere = obj.scene.children[0];
        sphere.position.set(0, 0, 0); // Adjust the position
        let scale = 0.1;
        sphere.scale.set(scale, scale, scale); // Adjust the scale
        scene.add(sphere);

        camera.lookAt(sphere.position);

        controls.target = sphere.position;
        controls.update();

        //      sphere.rotation.z -= 0.48;

    });*/



    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    compile();
    window.addEventListener('resize', onWindowResize, false);

}

function start() {
    init();
    animate();
}
function onWindowResize() {

    camera.aspect = element.width() / element.height();
    camera.updateProjectionMatrix();

    renderer.setSize(element.width(), element.height(), false);

}
function animate() {
    const time = performance.now() * 0.001;

    // Animation loop
    animationRequestId = requestAnimationFrame(() => animate());

    if (meshFromSDF) {

        uniforms.iTime.value = time;

        if (camera.position.y < -50 && camera.position.z < -50) {
            
            meshFromSDF.rotation.y = time * 0.01;
            camera.position.set(camera.position.x, camera.position.y + offset, camera.position.z + 2 * offset);
            camera.lookAt(meshFromSDF.position);
        }
        else{
           meshFromSDF.rotation.y = time * 0.01;
           camera.lookAt(meshFromSDF.position);
        }
    }
    controls.update();


    renderer.render(scene, camera);
}

