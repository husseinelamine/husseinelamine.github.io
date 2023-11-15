
import * as THREE from 'three';
import SceneBase from './SceneBase.js';
import Stats from 'three/addons/libs/stats.module.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

class Heightmap extends SceneBase{
    constructor() {
        super(60, window.innerWidth / window.innerHeight, 1, 20000);
        //this.color = 0xbfd1e5 ;
        this.color = 0xdddddd;
        this.init();
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    
    init() {
        super.init();
        this.worldDepth = 32;
        this.worldWidth = 32;
        this.worldHalfWidth = this.worldWidth / 2;
        this.worldHalfDepth = this.worldDepth / 2;
        this.clock = new THREE.Clock();
        this.data = this.generateHeight( this.worldWidth, this.worldDepth );

        this.camera.position.y = this.getY( this.worldHalfWidth, this.worldHalfDepth ) * 100 + 100;
        this.scene.background = new THREE.Color( this.color );
        
        const matrix = new THREE.Matrix4();

        const pxGeometry = new THREE.PlaneGeometry( 100, 100 );
        pxGeometry.attributes.uv.array[ 1 ] = 0.5;
        pxGeometry.attributes.uv.array[ 3 ] = 0.5;
        pxGeometry.rotateY( Math.PI / 2 );
        pxGeometry.translate( 50, 0, 0 );

        const nxGeometry = new THREE.PlaneGeometry( 100, 100 );
        nxGeometry.attributes.uv.array[ 1 ] = 0.5;
        nxGeometry.attributes.uv.array[ 3 ] = 0.5;
        nxGeometry.rotateY( - Math.PI / 2 );
        nxGeometry.translate( - 50, 0, 0 );

        const pyGeometry = new THREE.PlaneGeometry( 100, 100 );
        pyGeometry.attributes.uv.array[ 5 ] = 0.5;
        pyGeometry.attributes.uv.array[ 7 ] = 0.5;
        pyGeometry.rotateX( - Math.PI / 2 );
        pyGeometry.translate( 0, 50, 0 );

        const pzGeometry = new THREE.PlaneGeometry( 100, 100 );
        pzGeometry.attributes.uv.array[ 1 ] = 0.5;
        pzGeometry.attributes.uv.array[ 3 ] = 0.5;
        pzGeometry.translate( 0, 0, 50 );

        const nzGeometry = new THREE.PlaneGeometry( 100, 100 );
        nzGeometry.attributes.uv.array[ 1 ] = 0.5;
        nzGeometry.attributes.uv.array[ 3 ] = 0.5;
        nzGeometry.rotateY( Math.PI );
        nzGeometry.translate( 0, 0, - 50 );

        //

        const geometries = [];

        for ( let z = 0; z < this.worldDepth; z ++ ) {

            for ( let x = 0; x < this.worldWidth; x ++ ) {

                const h = this.getY( x, z );

                matrix.makeTranslation(
                    x * 100 - this.worldHalfWidth * 100,
                    h * 100,
                    z * 100 - this.worldHalfDepth * 100
                );

                const px = this.getY( x + 1, z );
                const nx = this.getY( x - 1, z );
                const pz = this.getY( x, z + 1 );
                const nz = this.getY( x, z - 1 );

                geometries.push( pyGeometry.clone().applyMatrix4( matrix ) );

                if ( ( px !== h && px !== h + 1 ) || x === 0 ) {

                    geometries.push( pxGeometry.clone().applyMatrix4( matrix ) );

                }

                if ( ( nx !== h && nx !== h + 1 ) || x === this.worldWidth - 1 ) {

                    geometries.push( nxGeometry.clone().applyMatrix4( matrix ) );

                }

                if ( ( pz !== h && pz !== h + 1 ) || z === this.worldDepth - 1 ) {

                    geometries.push( pzGeometry.clone().applyMatrix4( matrix ) );

                }

                if ( ( nz !== h && nz !== h + 1 ) || z === 0 ) {

                    geometries.push( nzGeometry.clone().applyMatrix4( matrix ) );

                }

            }

        }

        const geometry = BufferGeometryUtils.mergeGeometries( geometries );
        geometry.computeBoundingSphere();

        const texture = new THREE.TextureLoader().load( 'assets/textures/minecraft/atlas.png' );
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;

        const mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide } ) );
        this.scene.add( mesh );

        const ambientLight = new THREE.AmbientLight( 0xeeeeee, 3 );
        this.scene.add( ambientLight );

        const directionalLight = new THREE.DirectionalLight( 0xffffff, 12 );
        directionalLight.position.set( 1, 1, 0.5 ).normalize();
        this.scene.add( directionalLight );

        // Add skybox1 
        const skyboxGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
        // Add texture arid_bk arid_dn arid_ft arid_lf arid_rt arid_up
        /*const arid_bk = new THREE.TextureLoader().load( 'assets/textures/skybox1/arid_bk.jpg' );
        const arid_dn = new THREE.TextureLoader().load( 'assets/textures/skybox1/arid_dn.jpg' );
        const arid_ft = new THREE.TextureLoader().load( 'assets/textures/skybox1/arid_ft.jpg' );
        const arid_lf = new THREE.TextureLoader().load( 'assets/textures/skybox1/arid_lf.jpg' );
        const arid_rt = new THREE.TextureLoader().load( 'assets/textures/skybox1/arid_rt.jpg' );
        const arid_up = new THREE.TextureLoader().load( 'assets/textures/skybox1/arid_up.jpg' );
        const materialArray = [
            new THREE.MeshBasicMaterial( { map: arid_ft, side: THREE.BackSide } ),
            new THREE.MeshBasicMaterial( { map: arid_bk, side: THREE.BackSide } ),
            new THREE.MeshBasicMaterial( { map: arid_up, side: THREE.BackSide } ),
            new THREE.MeshBasicMaterial( { map: arid_dn, side: THREE.BackSide } ),
            new THREE.MeshBasicMaterial( { map: arid_rt, side: THREE.BackSide } ),
            new THREE.MeshBasicMaterial( { map: arid_lf, side: THREE.BackSide } )
        ];
        
        const skybox = new THREE.Mesh( skyboxGeometry, materialArray );*/

        const materialSkybox = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
        const skybox = new THREE.Mesh( skyboxGeometry, materialSkybox );

        this.scene.add( skybox );

        this.renderer.setPixelRatio( window.devicePixelRatio );     
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.controls = new FirstPersonControls( this.camera, this.renderer.domElement );

        this.controls.movementSpeed = 1000;
        this.controls.lookSpeed = 0.125;
        this.controls.lookVertical = true;

        this.stats = new Stats();
        document.body.appendChild( this.stats.dom );

        //

        window.addEventListener( 'resize', this.onWindowResize );

			
    }
    
    generateHeight( width, height ) {

        const data = [], perlin = new ImprovedNoise(),
            size = width * height, z = Math.random() * 100;

        let quality = 2;

        for ( let j = 0; j < 4; j ++ ) {

            if ( j === 0 ) for ( let i = 0; i < size; i ++ ) data[ i ] = 0;

            for ( let i = 0; i < size; i ++ ) {

                const x = i % width, y = ( i / width ) | 0;
                data[ i ] += perlin.noise( x / quality, y / quality, z ) * quality;


            }

            quality *= 4;

        }

        return data;

    }
    
    animate() {
        // Animation loop
        this.animationRequestId = requestAnimationFrame(() => this.animate());
        
        // Update controls
        //this.orbitControls.update();
        
        this.controls.update( this.clock.getDelta() );

        // Render the scene
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
    }

    getY( x, z ) {

        return ( this.data[ x + z * this.worldWidth ] * 0.15 ) | 0;

    }

    destroy() {
        super.destroy();
        window.removeEventListener( 'resize', this.onWindowResize );
    }
    onWindowResize() {
        
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.controls.handleResize();

    }
}

export default Heightmap;
