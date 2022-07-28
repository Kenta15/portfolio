import * as THREE from 'three'

import Experience from '../Experience.js'
import Screens from './Screens.js'
import Effects from './Effects.js'
import Floating from './Floating.js'
import Smoke from './Smoke.js'
import Earth from './Earth/Earth.js'
import Bloom from './Bloom.js'

export default class ProjectWorld{

    constructor(){

        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes

        this.resources.on('ready', () => {

            this.smoke = new Smoke()
            this.earth = new Earth()
            this.screens = new Screens()
            this.setGroups()
            this.effects = new Effects()
            this.floating = new Floating()
            this.bloom = new Bloom()
            
            this.scene.background = this.resources.items.backgroundTexture
        })
    }

    setGroups(){

        this.projects = new THREE.Group()
        this.scene.add(this.projects)

        this.projects.add(this.earth.earth)

        this.projects.scale.set(1.5,1.5,1.5)
        this.projects.add(this.screens.screens)
    }

    update(){
        
        if(this.earth)
            this.earth.update()
        if(this.screens)
            this.screens.update()
        if(this.effects)
            this.effects.update()
        if(this.floating)
            this.floating.update() 
        if(this.smoke)
            this.smoke.update()
        if(this.bloom)
            this.bloom.update()

        if(this.sizes.height < 750)
            $('#descriptions').css('margin-top','48vh')
        else
            $('#descriptions').css('margin-top','55vh')
        
    }
}