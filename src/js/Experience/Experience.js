import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Background from './IndexWorld/Background.js'
import Wave from './AboutWorld/Wave.js'
import ProjectWorld from './ProjectWorld/ProjectWorld.js'
import SkillsWorld from './SkillsWorld/SkillsWorld.js'

let instance = null

export default class Experience{

    constructor(canvas){
        
        // Singleton
        if(instance){
            return instance
        }

        instance = this

        this.canvas = canvas

        // Set up
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()

        if(window.location.href == 'http://10.10.43.59:8080/' || window.location.href == 'http://10.10.43.59:8080/index.html'){
            this.background = new Background()
        }
        if(window.location.href == 'http://10.10.43.59:8080/about.html'){
            this.wave = new Wave()
        }
        if(window.location.href == 'http://10.10.43.59:8080/projects.html'){
            this.projectWorld = new ProjectWorld()
        }
        if(window.location.href == 'http://10.10.43.59:8080/skills.html'){
            this.skillsWorld = new SkillsWorld()
        }

        console.log(this.skillsWorld)
        
        // Resize Event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time tick Event
        this.time.on('tick', () => {
            this.update()
        })
    }

    resize(){
       this.camera.resize()
       this.renderer.resize()
    }

    update(){
        if(this.background)
            this.background.update()
        
        if(this.wave)
            this.wave.update()
        
        if(this.skillsWorld)
            this.skillsWorld.update()
        
        this.renderer.update()
        
        if(this.projectWorld)
            this.projectWorld.update()

    }
}