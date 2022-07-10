import * as THREE from 'three'

import Experience from '../../Experience.js'

export default class Smoke{

    constructor(){

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.setColor()
        this.setGeometry()
        this.setMaterial()
        this.setSmoke()
    }

    setColor(){

        // this.colors = {}

        // this.colors = {}
        // this.colors.value = '#586d99'
        // this.colors.instance = new THREE.Color(this.colors.value)

        // for(const color in this.colors){
        //     const col = this.colors[color]
        //     this.debug.pane.addInput(col, 'value').on('change', () => {
        //         col.instance.set(col.value)
        //     })
        // }
    }

    setGeometry(){
        this.geometry = new THREE.PlaneGeometry(1,1,1,1)
    }

    setMaterial(){
        this.material = new THREE.MeshBasicMaterial({
            map: this.resources.items.smokeTexture,
            color:'#586d99',
            depthWrite:false,
            transparent: true,
            blending:THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            opacity:0.1,
        })
    }

    setSmoke(){

        this.smokes = new THREE.Group()
        // this.scene.add(this.smokes)

        this.count = 60

        this.smoke_array = []

        for(let i = 0; i < this.count; i++){

            const item = {}

            item.progress = Math.random()
            item.floatSpeed = Math.random() * 0.5
            item.rotationSpeed = (Math.random() - 0.5) * 0.001 * Math.random()

            item.angle = Math.random() * Math.PI * 2

            item.mesh = new THREE.Mesh(this.geometry, this.material)

            item.mesh.position.x = Math.sin(item.angle) * 1.5
            item.mesh.position.y = Math.cos(item.angle) * 1.5

            item.scale = Math.random() * 3

            item.mesh.scale.set(item.scale, item.scale, item.scale)
            item.mesh.position.z = 0.05

            this.smokes.add(item.mesh)

            this.smoke_array.push(item)

        }
    }

    update(){
        
        for(let i = 0; i < this.count; i++){

            this.smokes.children[i].rotation.z = this.time.elapsed * this.smoke_array[i].rotationSpeed
            
            this.smoke_array[i].progress += this.time.delta * 0.0001

            if(this.smoke_array[i].progress > 1)
                this.smoke_array[i].progress = 0

            // Scale
            let scaleProgress = Math.min(this.smoke_array[i].progress * 4, 1)
            scaleProgress = 1 - Math.pow(1 - scaleProgress, 4)
            const scale = scaleProgress * this.smoke_array[i].scale

            this.smokes.children[i].scale.set(scale, scale, scale)

        }
    }
}