import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { StereoEffect } from 'three/addons/effects/StereoEffect.js';


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
        let textCube = new THREE.CubeTextureLoader()
        .setPath( 'assets/textures/skybox1/' )
        .load( [ 'arid_ft.jpg', 'arid_bk.jpg', 'arid_up.jpg', 'arid_dn.jpg', 'arid_rt.jpg', 'arid_lf.jpg' ] );
        let skybox = new THREE.Mesh( skyboxGeo, metrialArray );
        this.scene.add( skybox );

        const SphereGeo = new THREE.SphereGeometry( 100, 32, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffffff, envMap:textCube, refractionRatio:0.95} );
        this.spheres = [];
        for(let i = 0; i < 500; i++) {
            const mesh = new THREE.Mesh( SphereGeo, material );
            mesh.position.x = Math.random() * 10000 - 5000;
            mesh.position.y = Math.random() * 10000 - 5000;
            mesh.position.z = Math.random() * 10000 - 5000;
            mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
            this.spheres.push(mesh);
            this.scene.add( mesh );
        }

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

        //const effect = new StereoEffect( this.renderer );
        //effect.setSize( window.innerWidth, window.innerHeight );
        // Animation loop
    }

    animate() {
        // Animation loop
        this.animationRequestId = requestAnimationFrame(() => this.animate());

        // Update controls
        this.orbitControls.update();

        this.render();

        // Render the scene
    }
    render(){
        const timer = 0.0001 * Date.now();

        for ( let i = 0, il = this.spheres.length; i < il; i ++ ) {

            const sphere = this.spheres[ i ];

            sphere.position.x = 5000 * Math.cos( timer + i );
            sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );

        }

        this.renderer.render(this.scene, this.camera);

    }

    destroy() {
        super.destroy();
    }
}

export default APlanet;
