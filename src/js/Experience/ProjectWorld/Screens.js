import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import Experience from '../Experience.js'
import Sphere from './Sphere.js'
import Earth from './Earth/Earth.js'

let instance = null

export default class Screens{

    constructor(){

        if(instance){
            return instance
        }
        instance = this
        
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera

        // this.sphere = new Sphere()
        // this.projects = this.sphere.projects

        this.earth = new Earth()
        this.projects = this.earth.projects

        // Adding Screen to the Screens
        this.screens = new THREE.Group()

        this.projectsList = ['ecommerce', 'movie', 'portfolio', 'animated']

        // this.setVideos()
        this.setScreens()
        
    }

    setVideos(){

        const tag = document.createElement('div')
        document.body.appendChild(tag)
        tag.innerHTML = `<video id="video" autoplay loop style= "position: absolute; width:50%;height:50%;" muted = "muted">
                        <source src="/textures/video.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
	                    </video>
                        `
        this.video = document.getElementById('video')
        this.VideoTexture = new THREE.VideoTexture(this.video)
        this.VideoTexture.minFilter = THREE.LinearFilter;
        this.VideoTexture.magFilter = THREE.LinearFilter;
        this.VideoTexture.format = THREE.RGBAFormat;
        this.VideoTexture.generateMipmaps = false;
    }

    setScreens(){

        for(let i = 0;i < this.projectsList.length; i++){

        const gltfLoader = new GLTFLoader()
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath( '/examples/js/libs/draco/' )
        gltfLoader.setDRACOLoader( dracoLoader )

        gltfLoader.load(
            '/models/' + this.projectsList[i] + '.glb',
            (gltf) =>
            {
                this.screen = gltf.scene.children[0].children[1]
                this.screen.name = this.projectsList[i]
                
                // this.screen.material = new THREE.MeshBasicMaterial({
                //     map: this.VideoTexture,
                //     // alphaMap:this.VideoTexture,
                //     side: THREE.FrontSide,
                // })
                // console.log(gltf.scene)

                gltf.scene.position.x = 2.1 * Math.sin(i * (Math.PI/2))
                gltf.scene.position.y = - 1.0
                gltf.scene.position.z = 2.1 * Math.cos(i * (Math.PI/2))

                gltf.scene.rotation.y = i * (Math.PI / 2) - Math.PI / 2
                gltf.scene.rotation.z = - Math.PI / 10

                // gltf.scene.visible = false

                this.screens.add(gltf.scene)
            }
        )
    }

    this.screens.scale.set(1.3,1.3,1.3)
    this.projects.scale.set(1.5,1.5,1.5)
    this.projects.add(this.screens)
    console.log(this.projects)
    }
    update(){

        // if((this.time.elapsed * 0.001) > 6.0 && (this.time.elapsed * 0.001) < 6.01){
        //     for(let i = 0; i < this.projectsList.length; i++){
        //         this.screens.children[i].visible = true
        //     }
        // }
        // if(this.VideoTexture)
        //     this.VideoTexture.needsUpdate = true
    }
}