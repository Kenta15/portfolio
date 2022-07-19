import Sphere from './Sphere.js'
import Raycaster from './Raycaster.js'
import Flag from './Flag.js'

import Experience from '../Experience.js'

export default class IndexWorld{

    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources

        this.resources.on('ready', () => {
            this.scene.background = this.resources.items.gradientTexture
            this.raycaster = new Raycaster()
            this.sphere = new Sphere()
            this.flag = new Flag()
        })
    }

    update(){

        if(this.raycaster)
            this.raycaster.update()

        if(this.sphere)
            this.sphere.update()
        
        if(this.flag)
            this.flag.update()
    }
}