import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Debug from './Utils/Debug.js'
import IndexWorld from './IndexWorld/IndexWorld'
import AboutWorld from './AboutWorld/AboutWorld'
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
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()

        this.targetSources = []
        for(const source of sources){
            if(window.location.href == source.location){
                this.targetSources.push(source)
            }
        }

        this.resources = new Resources(this.targetSources)
        this.camera = new Camera()
        this.renderer = new Renderer()

        if(window.location.href == 'http://10.10.43.59:8080/' || window.location.href == 'http://10.10.43.59:8080/index.html'){
            this.indexWorld = new IndexWorld()
        }
        if(window.location.href == 'http://10.10.43.59:8080/about.html'){
            this.aboutWorld = new AboutWorld()
        }
        if(window.location.href == 'http://10.10.43.59:8080/projects.html'){
            this.projectWorld = new ProjectWorld()
        }
        if(window.location.href == 'http://10.10.43.59:8080/skills.html'){
            this.skillsWorld = new SkillsWorld()
        }
        
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

        if(this.indexWorld)
            this.indexWorld.resize()
        
        if(this.camera)
            this.camera.resize()

       if(this.renderer)
            this.renderer.resize()

    }

    update(){

        if(this.indexWorld)
            this.indexWorld.update()
        
        if(this.aboutWorld)
            this.aboutWorld.update()
        
        if(this.skillsWorld)
            this.skillsWorld.update()
        
        if(this.renderer)
            this.renderer.update()
        
        if(this.projectWorld)
            this.projectWorld.update()

    }
}