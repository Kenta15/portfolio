import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

import Experience from '../Experience.js'

export default class Screens{

    constructor(){
        
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.renderer = this.experience.renderer
        this.resources = this.experience.resources

        // Adding Screen to the Screens
        this.screens = new THREE.Group()

        this.projectsList = ['ecommerce', 'movie', 'portfolio', 'none']

        this.setScreens()
    }

    setScreens(){

        for(let i = 0;i < this.projectsList.length; i++){

            // for(const [key, value] of Object.entries(this.resources.items)){

            //     if(key == this.projectsList[i]){
            //         console.log(value)

            //         this.screen = value.scene.children[0].children[1]
            //         this.screen.name = this.projectsList[i]

            //         value.scene.position.x = 2.1 * Math.sin(i * (Math.PI/2))
            //         value.scene.position.y = - 1.0
            //         value.scene.position.z = 2.1 * Math.cos(i * (Math.PI/2))

            //         value.scene.rotation.y = i * (Math.PI / 2) - Math.PI / 2
            //         value.scene.rotation.z = - Math.PI / 10

            //         this.screens.add(value.scene)
            //     }
            // }

        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
            '/models/' + 'movie' + '.glb', // this.projectsList[i]
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
    }
    
    update(){

    }
}