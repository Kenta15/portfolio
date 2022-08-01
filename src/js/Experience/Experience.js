import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import Debug from './Utils/Debug.js'
import Stats from './Utils/Stats.js'
import sources from './sources.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import IndexWorld from './IndexWorld/IndexWorld'
import AboutWorld from './AboutWorld/AboutWorld'
import ProjectWorld from './ProjectWorld/ProjectWorld.js'
import SkillsWorld from './SkillsWorld/SkillsWorld.js'
import ContactWorld from './ContactWorld/ContactWorld.js'

import DeviceDetector from "device-detector-js"

let instance = null

export default class Experience{

    constructor(canvas){
        
        // Singleton
        if(instance){
            return instance
        }

        instance = this

        // const deviceDetector = new DeviceDetector()
        // const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36"
        // const device = deviceDetector.parse(userAgent)

        // if(device.device.type != 'desktop'){
        //     window.location.href = 'index.html'
        // }

        // console.log(device)

        this.canvas = canvas

        // Set up
        this.debug = new Debug(false)
        this.stats = new Stats(false)
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()

        const str = window.location.href.split('/')
        let target = str[str.length - 1]
        const targetSources = []

        if(target == '')
            target = 'index.html'
        
        for(const source of sources){
            if(target == source.location){
                targetSources.push(source)
            }
        }

        this.resources = new Resources(targetSources)
        this.camera = new Camera()
        this.renderer = new Renderer()

        if(target == 'index.html'){
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
        
        if(this.stats)
            this.stats.update()
        
        if(this.renderer)
            this.renderer.update()

        if(this.projectWorld)
            this.projectWorld.update()
        
        if(this.skillsWorld)
            this.skillsWorld.update()

    }
}