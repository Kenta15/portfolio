import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import Experience from '../Experience.js'
import Sphere from './Sphere.js'

let instance = null

export default class Screens{

    constructor(){

        if(instance){
            return instance
        }
        instance = this
        
        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera

        this.sphere = new Sphere()
        this.projects = this.sphere.projects

        // Adding Screen to the Screens
        this.screens = new THREE.Group()

        this.projectsList = ['ecommerce', 'movie', 'portfolio', 'animated']

        this.setScreens()
        
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
                gltf.scene.position.x = 2.1 * Math.sin(i * (Math.PI/2))
                gltf.scene.position.y = - 1.0
                gltf.scene.position.z = 2.1 * Math.cos(i * (Math.PI/2))

                gltf.scene.rotation.y = i * (Math.PI / 2) - Math.PI / 2
                gltf.scene.rotation.z = - Math.PI / 10

                gltf.scene.visible = false

                gltf.scene.name = this.projectsList[i]

                this.screens.add(gltf.scene)
            }
        )
    }

    this.screens.scale.set(1.3,1.3,1.3)
    this.projects.scale.set(1.5,1.5,1.5)
    this.projects.add(this.screens)
    }
    update(){

        this.projects.rotateOnAxis(new THREE.Vector3(0,1,0), -0.001)
        
        // Screens.js
        if((this.time.elapsed * 0.001) > 6.0 && (this.time.elapsed * 0.001) < 6.01){
            for(let i = 0; i < this.projectsList.length; i++){
                this.screens.children[i].visible = true
            }
        }
    }
}