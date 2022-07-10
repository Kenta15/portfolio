import Texts from './Texts.js'
import RayCaster from './RayCater.js'
import Portal from './Portal.js'

export default class SkillsWorld{

    constructor(){

        // this.texts = new Texts()
        this.portal = new Portal()

    }

    update(){

        if(this.texts)
            this.texts.update()
        if(this.portal)
            this.portal.update()

        
    }
}