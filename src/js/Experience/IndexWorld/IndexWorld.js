import Background from './Background.js'

import Experience from '../Experience.js'

export default class IndexWorld{

    constructor(){

        this.experience = new Experience()
        this.time = this.experience.time

        this.background = new Background()
    }

    resize(){

        if(this.background)
            this.background.resize()

    }

    update(){

        if(this.background)
            this.background.update()
    }
}