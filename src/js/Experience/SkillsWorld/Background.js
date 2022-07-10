import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Background{

    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene

        this.textureLoader = new THREE.TextureLoader()
        this.backgroundTexture = this.textureLoader.load('/textures/mario.webp')

        this.setGeometry()
        this.setMaterial()
        this.setBackground()

    }
    
    setGeometry(){

        this.geometry = new THREE.PlaneGeometry(90,64,2,2)
    }

    setMaterial(){

        this.material = new THREE.MeshBasicMaterial({
            map:this.backgroundTexture,
        })
    }
    
    setBackground(){

        this.background = new THREE.Mesh(this.geometry, this.material)

        this.background.position.z = - 50
        
        this.scene.add(this.background)
    }
}