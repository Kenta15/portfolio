import '../css/style.css'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from './Experience/Experience.js'

class Script{

    constructor(){
        
        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.camera = this.experience.camera
        this.canvas = this.experience.canvas

        this.setOrbitControls()
        this.animations()
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.camera.instance, this.canvas)
        this.controls.enablePan = false
        this.controls.enableZoom = false
    }

    animations(){
            
            $(function(){
                $('body').stop().animate({'opacity': 1}, 2000)
            })
            
            document.getElementById('start').addEventListener('click', () => {

                $('body').stop().animate({'opacity':0}, 2500)

                setTimeout(myURL, 2500)
                function myURL(){
                    window.location.href = 'about.html'
                }
            })
        }
}
const script = new Script()
