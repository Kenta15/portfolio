import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as CANNON from 'cannon-es'
import CannonDegugger from 'cannon-es-debugger'

import Experience from '../Experience.js'
import RayCaster from './RayCater'

let instance = null

export default class Texts{

    constructor(){

        if(instance){
            return instance
        }

        instance = this

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera

        this.texts = new THREE.Group()
        this.scene.add(this.texts)

        this.objectsToUpdate = []

        this.text_array = ['JavaScript','Python','HTML','CSS','Django','JQuery','Three.js','Cannon.js', 
                            'Vue.js','Node.js','React','AWS','Heroku','Git','GitHub','Webpack','VS Code',
                            'Kenta', 'Vercel', 'Express.js', 'Next.js', 'MongoDB', 'Mongoose', 'SQL', 'SQLite', 
                            'Angular.js', 'Rest', 'Atom', 'Anaconda', 'More'
                            ]

        this.rayCaster = new RayCaster()

        this.setPhysics()
        this.loadTexture()
        this.createTexts()
    }

    setPhysics(){
        this.world = new CANNON.World()
        this.world.gravity.set(0, 0, 0)

        this.defaultMaterial = new CANNON.Material('default')
        const defaultContactMaterial = new CANNON.ContactMaterial(
            this.defaultMaterial,
            this.defaultMaterial,
            {
                friction: 1.0,
                restitution: 0.1
            }
        )
        this.world.addContactMaterial(defaultContactMaterial)
        this.world.defaultContactMaterial = defaultContactMaterial

        // Floor
        const floorShape = new CANNON.Plane()
        const floorBody = new CANNON.Body()
        floorBody.mass = 0
        floorBody.addShape(floorShape)
        floorBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(-1,0,0),
            Math.PI / 2
        )
        floorBody.position.set(0,-20,0)
        this.world.addBody(floorBody)

        const floorShape2 = new CANNON.Plane()
        const floorBody2 = new CANNON.Body()
        floorBody2.mass = 0
        floorBody2.addShape(floorShape2)
        floorBody2.quaternion.setFromAxisAngle(
            new CANNON.Vec3(1,0,0),
            Math.PI / 2
        )
        floorBody2.position.set(0,20,0)
        this.world.addBody(floorBody2)

        // cannon debugger
        // const cannonDebugger = new CannonDegugger(scene, this.world, {})
    }

    loadTexture(){
        const textureLoader = new THREE.TextureLoader()
        this.matcapTexture = textureLoader.load('/textures/matcaps/4.png')
    }

    setTexts(width, height, depth, position, index){

        const fontLoader = new FontLoader()

        fontLoader.load(
            '/fonts/helvetiker_regular.typeface.json',
            (font) =>
            {
                   const textGeometry = new TextGeometry(
                       this.text_array[index],
                       {
                           font: font,
                           size: 2,
                           height: 1,
                           curveSegments:5,
                           bevelEnabled: true,
                           bevelThickness:0.03,
                           bevelSize:0.02,
                           bevelOffset:0,
                           bevelSegments:4,
       
                       }
                   )
                   textGeometry.center()
                   const material = new THREE.MeshMatcapMaterial({
                                        matcap: this.matcapTexture,
                                    })
    
                   const text = new THREE.Mesh(textGeometry,material)
                   text.name = this.text_array[index]
    
                   this.texts.add(text)
    
                    // CANNON js body
                    const shape = new CANNON.Box(new CANNON.Vec3(width/2,height/2,depth/2))
                    const body = new CANNON.Body({
                        mass:1,
                        position: new CANNON.Vec3(0,0,0),
                        shape,
                        material: this.defaultMaterial,
                    })
                    body.position.copy(position)
                    this.world.addBody(body)
    
                    // save in objects to update
                    this.objectsToUpdate.push({
                        text,
                        body,
                    })
           }
        )
    }

    createTexts(){
        var count = -1
        for(let i=0;i<this.text_array.length;i++){

            if(i%5 == 0){
                count++
            }

            this.setTexts(6,2,1,{x: ((i%5) - 2) * 15, y: 12 - (count * 6), z:0 }, i)
        }
    }

    update(){

        this.world.step(1 / 60, this.time.delta, 3)

        this.rayCaster.dragObject()

        for(const object of this.objectsToUpdate)
        {
            object.text.position.copy(object.body.position)
            object.text.quaternion.copy(object.body.quaternion)
        }
    }
}