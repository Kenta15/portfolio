import * as THREE from 'three'
import * as dat from 'lil-gui'

import Experience from '../Experience.js'
import { AdditiveBlending } from 'three'

export default class Smoke{

    constructor(){

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera

        this.textureLoader = new THREE.TextureLoader()
        this.smokeTexture = this.textureLoader.load('/textures/particles/smoke.png')

        this.setGeometry()
        this.setMaterial()
        this.setSmoke()
        this.setDebug()
    }

    setGeometry(){
        this.geometry = new THREE.PlaneGeometry(2,2,1,1)
    }

    setMaterial(){
        this.material = new THREE.MeshBasicMaterial({
            map: this.smokeTexture,
            color:'#90D4EE',
            depthWrite:false,
            transparent: true,
            blending:AdditiveBlending,
            side: THREE.DoubleSide,
            opacity:0,
        })
    }

    setSmoke(){

        this.smokes = new THREE.Group()
        this.scene.add(this.smokes)

        this.count = 150

        this.smoke_array = []
        this.y_position_array = []

        for(let i = 0; i < this.count; i++){

            const item = {}

            item.floatSpeed = Math.random() * 0.0005
            item.rotationSpeed = (Math.random() - 0.5) * 0.0005 * Math.random()

            item.mesh = new THREE.Mesh(this.geometry, this.material)
            item.mesh.position.x = (Math.random() - 0.5) * 25

            item.mesh.position.y = (Math.random() - 0.5) * 25
            this.y_position_array.push(item.mesh.position.y)

            item.mesh.position.z = - 5 // -9

            const scale = Math.random() * 5 + 2

            item.mesh.scale.set(scale, scale, scale)

            this.smokes.add(item.mesh)

            this.smoke_array.push(item)
        }
        this.smokes.rotation.y = - Math.PI / 3
        this.smokes.position.x = -2 // 1.6
        this.smokes.position.z = 1.6 // -3.2 close
    }

    setDebug(){
        const gui = new dat.GUI()

        gui.add(this.smokes.position, 'x').min(- 100).max(100).step(0.001)
        gui.add(this.smokes.position, 'y').min(- 100).max(100).step(0.001)
        gui.add(this.smokes.position, 'z').min(- 100).max(100).step(0.001)
    }

    update(){
        
        for(let i = 0; i < this.count; i++){
            this.smokes.children[i].rotation.z = this.time.elapsed * this.smoke_array[i].rotationSpeed
            this.smokes.children[i].position.y = this.y_position_array[i] + Math.sin(this.time.elapsed * this.smoke_array[i].floatSpeed)
        }
        if((this.time.elapsed * 0.001) > 6.0 && (this.time.elapsed * 0.001) < 6.01){
            this.material.opacity = 0.05 + Math.random() * 0.1
        }
    }
}