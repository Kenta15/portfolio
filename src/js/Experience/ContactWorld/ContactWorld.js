import Experience from '../Experience.js'
import Contacts from './Contacts.js'
import Raycaster from './Raycaster'

export default class ContactWorld{

    constructor(){

        this.experience = new Experience()
        this.resources = this.experience.resources

        this.resources.on('ready', () => {

            this.raycaster = new Raycaster()
            this.contacts = new Contacts()
        })


    }

    update(){

        if(this.raycaster)
            this.raycaster.update()

        if(this.contacts)
            this.contacts.update()
    }
}