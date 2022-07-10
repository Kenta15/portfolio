import Texts from './Texts.js'
import RayCaster from './RayCater.js'
import Background from './Background.js'
import Portal from './Portal.js'

export default class SkillsWorld{

    constructor(){

        // this.texts = new Texts()
        // this.background = new Background()
        this.portal = new Portal()

    }

    update(){

        if(this.texts)
            this.texts.update()
        if(this.portal)
            this.portal.update()

        
    }
}