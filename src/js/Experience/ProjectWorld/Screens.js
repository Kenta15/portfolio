import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import Experience from '../Experience.js'
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
        this.renderer = this.experience.renderer
        this.resources = this.experience.resources

        this.earth = new Earth()
        this.projects = this.earth.projects

        // Adding Screen to the Screens
        this.screens = new THREE.Group()

        this.projectsList = ['ecommerce', 'movie', 'portfolio', 'none']

        this.resources.on('ready', ()=>{
            this.setScreens()
        })
        
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

                gltf.scene.position.x = 2.1 * Math.sin(i * (Math.PI/2))
                gltf.scene.position.y = - 1.0
                gltf.scene.position.z = 2.1 * Math.cos(i * (Math.PI/2))

                gltf.scene.rotation.y = i * (Math.PI / 2) - Math.PI / 2
                gltf.scene.rotation.z = - Math.PI / 10

                this.screens.add(gltf.scene)
            }
        )
    }

    this.screens.scale.set(1.3,1.3,1.3)
    this.projects.scale.set(1.5,1.5,1.5)
    this.projects.add(this.screens)
    }
    
    update(){

    }
}