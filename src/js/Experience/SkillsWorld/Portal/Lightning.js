import * as THREE from 'three'

import Experience from '../../Experience.js'

export default class Lightning{

    constructor(){

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.setGeometry()
        this.setMaterial()
        this.setLightning()
    }

    setGeometry(){
        this.geometry = new THREE.PlaneGeometry(1,1,1,1)
    }

    setMaterial(){
        this.material = new THREE.MeshBasicMaterial({
            map: this.resources.items.sparkTexture,
            depthWrite:false,
            transparent: true,
            blending:THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            opacity:1,
        })
    }

    setLightning(){

        this.lightnings = new THREE.Group()

        this.count = 50

        this.lightning_array = []

        for(let i = 0; i < this.count; i++){

            const item = {}

            item.progress = Math.random()
            item.floatSpeed = Math.random() * 0.5
            item.rotationSpeed = (Math.random() - 0.5) * 0.001 * Math.random()

            item.angle = Math.random() * Math.PI * 2

            item.mesh = new THREE.Mesh(this.geometry, this.material)

            item.mesh.position.x = Math.sin(item.angle) * 1.5
            item.mesh.position.y = Math.cos(item.angle) * 1.5

            item.scale = Math.random()

            item.mesh.scale.set(item.scale, item.scale, item.scale)
            item.mesh.position.z = 0.06

            this.lightnings.add(item.mesh)

            this.lightning_array.push(item)

        }
    }

    update(){
        
        for(let i = 0; i < this.count; i++){

            this.lightnings.children[i].rotation.z = this.time.elapsed * this.lightning_array[i].rotationSpeed
            
            this.lightning_array[i].progress += this.time.delta * 0.0005

            if(this.lightning_array[i].progress > 1)
                this.lightning_array[i].progress = 0
            
            
            this.lightnings.children[i].material.opacity = Math.min((1 - this.lightning_array[i].progress) * 10, this.lightning_array[i].progress * 400)
            this.lightnings.children[i].material.opacity = Math.min(this.lightnings.children[i].material.opacity, 0.04)

        }
    }
}