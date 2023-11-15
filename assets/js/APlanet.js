import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import SceneBase from './SceneBase.js';

class APlanet extends SceneBase{
    constructor() {
        super(55, window.innerWidth / window.innerHeight, 45, 30000);
        this.init();
        this.color = 0xff0000;
    }

    init() {
        super.init();
        this.camera.position.set(-900, -200, -900);

        let metrialArray = [];
        let texture_ft = new THREE.TextureLoader().load( 'assets/textures/skybox1/arid_ft.jpg');
        let texture_bk = new THREE.TextureLoader().load( 'assets/textures/skybox1/arid_bk.jpg');
        let texture_up = new THREE.TextureLoader().load( 'assets/textures/skybox1/arid_up.jpg');
        let texture_dn = new THREE.TextureLoader().load( 'assets/textures/skybox1/arid_dn.jpg');
        let texture_rt = new THREE.TextureLoader().load( 'assets/textures/skybox1/arid_rt.jpg');
        let texture_lf = new THREE.TextureLoader().load( 'assets/textures/skybox1/arid_lf.jpg');
        
        metrialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft, side: THREE.BackSide}));
        metrialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk, side: THREE.BackSide}));
        metrialArray.push(new THREE.MeshBasicMaterial( { map: texture_up, side: THREE.BackSide}));
        metrialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn, side: THREE.BackSide }));
        metrialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt, side: THREE.BackSide }));
        metrialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf, side: THREE.BackSide }));

        let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
        let skybox = new THREE.Mesh( skyboxGeo, metrialArray );
        this.scene.add( skybox );

        // Set up lighting
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1).normalize();
        this.scene.add(directionalLight);

        // Create OrbitControls for looking around
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.minDistance = 100;
        this.orbitControls.maxDistance = 5000;

        // Set up camera position


        // Animation loop
    }

    wnimate() {
        // Animation loop
        this.animationRequestId = requestAnimationFrame(() => this.animate());

        // Update controls
        //this.orbitControls.update();

        // Render the scene
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        super.destroy();
    }
}

export default APlanet;
