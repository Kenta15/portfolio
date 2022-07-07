import '../css/about.css'
import '../css/header.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import waveVertexShader from './shaders/test/waveVertex.glsl'
import waveFragmentShader from './shaders/test/waveFragment.glsl'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'
import Animations from './animationExport.js'

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()


// Light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff,1.5)
// directionalLight.position.set( 5, 5, 3.5 )
// scene.add(directionalLight)

// plane
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 128, 128),
    new THREE.ShaderMaterial({
        vertexShader: waveVertexShader,
        fragmentShader: waveFragmentShader,
        blending:THREE.AdditiveBlending,
        side:THREE.DoubleSide,
        uniforms:{
            uTime:{value:0},
            waveElevation:{value:0.5},
            waveFrequency:{value: new THREE.Vector2(2,1.5)},
            waveSpeed:{value:0},
            alpha:{value:0},
        }
    })
)
plane.rotation.x = - Math.PI * 0.5
plane.rotation.z = Math.PI

plane.position.set(0,2,0)
plane.scale.set(10,10,10)
scene.add(plane)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 2
camera.position.y = 3
camera.position.z = 9
scene.add(camera)

// HTML Animations

class AboutAnimations extends Animations{
    
    constructor(index){

        super(index)
    }

    customAnimation(index,key){
        setTimeout(function(){
            $("#" + index).stop().animate({'opacity': 1}, 3000);
            $('#' + key).animate({'opacity': 0.5}, 3000);
        }, 1);
    }

    threeTransition(clickTime){
        camera.position.z = 10 - Math.pow(10,clickTime)
    }
}

const animations = new AboutAnimations("I")


// Controls
const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
window.addEventListener('mouseup',() => {
    controls.reset()
})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate wave
    plane.material.uniforms.uTime.value = elapsedTime
    plane.rotateOnAxis(new THREE.Vector3(0,0,1), 0.001)

    // Change opacity
    // if(plane.material.uniforms.alpha.value < 0.5){
    //     plane.material.uniforms.alpha.value = elapsedTime / 10
    // }
    plane.material.uniforms.alpha.value = elapsedTime / 10

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()