import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Smoke{

    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.setGeometry()
        this.setMaterial()
        this.setSmoke()
    }

    setGeometry(){
        this.geometry = new THREE.PlaneGeometry(2,2,1,1)
    }

    setMaterial(){
        this.material = new THREE.MeshBasicMaterial({
            map: this.resources.items.smokeTexture,
            color:'#ffffff',
            depthWrite:false,
            // transparent: true,
            blending:THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            opacity:0.15,
        })
    }

    setSmoke(){

        this.smokes = new THREE.Group()
        this.scene.add(this.smokes)

        this.count = 200

        this.smoke_array = []
        this.y_position_array = []

        for(let i = 0; i < this.count; i++){

            const item = {}

            item.floatSpeed = Math.random() * 0.0005
            item.rotationSpeed = (Math.random() - 0.5) * 0.0005 * Math.random()

            item.mesh = new THREE.Mesh(this.geometry, this.material)
            item.mesh.position.x = (Math.random() - 0.5) * 40

            item.mesh.position.y = (Math.random() - 0.5) * 25
            this.y_position_array.push(item.mesh.position.y)

            item.mesh.position.z = - 5 // -9

            const scale = Math.random() * 5 + 2

            item.mesh.scale.set(scale, scale, scale)

            this.smokes.add(item.mesh)

            this.smoke_array.push(item)
        }
        this.smokes.rotation.y = - Math.PI / 3
        this.smokes.position.set(2,-5,-5) // -3 -10 -10

        this.debugFolder = this.debug.pane.addInput(this.smokes.position, 'x', {min:-100, max:100, step:1})
        this.debugFolder = this.debug.pane.addInput(this.smokes.position, 'y', {min:-100, max:100, step:1})
        this.debugFolder = this.debug.pane.addInput(this.smokes.position, 'z', {min:-100, max:100, step:1})
    }

    update(){
        
        for(let i = 0; i < this.count; i++){
            this.smokes.children[i].rotation.z = this.time.elapsed * this.smoke_array[i].rotationSpeed
            this.smokes.children[i].position.y = this.y_position_array[i] + Math.sin(this.time.elapsed * this.smoke_array[i].floatSpeed)
        }
    }
}