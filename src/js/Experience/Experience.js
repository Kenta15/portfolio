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
import ContactWorld from './ContactWorld/ContactWorld.js'

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

        const str = window.location.href.split("/")
        const target = str[str.length - 1]
        const targetSources = []
        
        for(const source of sources){
            if(target == source.location){
                targetSources.push(source)
            }
        }

        this.resources = new Resources(targetSources)
        this.camera = new Camera()
        this.renderer = new Renderer()

        if(target == '' || target == 'index.html'){
            this.indexWorld = new IndexWorld()
        }
        if(target == 'about.html'){
            this.aboutWorld = new AboutWorld()
        }
        if(target == 'projects.html'){
            this.projectWorld = new ProjectWorld()
        }
        if(target == 'skills.html'){
            this.skillsWorld = new SkillsWorld()
        }
        if(target == 'contact.html'){
            this.contactWorld = new ContactWorld()
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

        if(this.contactWorld)
            this.contactWorld.update()
        
        if(this.renderer)
            this.renderer.update()

        if(this.projectWorld)
            this.projectWorld.update()
        
        if(this.skillsWorld)
            this.skillsWorld.update()

    }
}