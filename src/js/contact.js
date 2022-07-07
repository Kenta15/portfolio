import '../css/contact.css'
import '../css/header.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import flagVertexShader from './shaders/test/flagVertex.glsl'
import flagFragmentShader from './shaders/test/flagFragment.glsl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', event =>{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
const flagTexture = textureLoader.load('/textures/JapaneseFlag.png')

// Light
const earthLight = new THREE.PointLight('white',-1,20)
earthLight.position.set(-6.5,10,-5)
scene.add(earthLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff,1.5)
directionalLight.position.set( 5, 5, 3.5 )
scene.add(directionalLight)

/**
 * Fonts
 */
const fontLoader = new FontLoader()
const text_array = ['JavaScript','Python','HTML','CSS','Django','Jquery','ThreeJS','VueJS','NodeJS','React','AWS','Heroku']

// Text Group
const texts = new THREE.Group()
scene.add(texts)

 fontLoader.load(
     '/fonts/helvetiker_regular.typeface.json',
     (font) =>
     {
        for(let i=0;i<text_array.length;i++){
            const textGeometry = new TextGeometry(
                text_array[i],
                {
                    font: font,
                    size: 2,
                    height: 1,
                    curveSegments:5,
                    bevelEnabled: true,
                    bevelThickness:0.03,
                    bevelSize:0.02,
                    bevelOffset:0,
                    bevelSegments:4,

                }
            )
            textGeometry.center()
            const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
            const text = new THREE.Mesh(textGeometry,material)

            text.position.x = 15 * Math.sin(i * (Math.PI/4))
            text.position.y = i * (Math.PI / 2) + 15
            text.position.z = 15 * Math.cos(i * (Math.PI/4))

            text.rotation.z = Math.random() - 0.5
            texts.add(text)

            const textFloatClock = new THREE.Clock()

            const rotateText = () => {

                const textFloatTime = textFloatClock.getElapsedTime()
                text.position.y = text.position.y - Math.sin(textFloatTime) * 0.01
                text.rotation.z = text.rotation.z - Math.cos(textFloatTime) * 0.002
                
                if(texts.children[0].position.y > -6){
                    text.position.y -= textFloatTime * 2
                    // console.log(textFloatTime)
                }

                window.requestAnimationFrame(rotateText)
            }
            rotateText()
        }
    }
 )

// Flag
const flag = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 32, 32),
    new THREE.ShaderMaterial({
        vertexShader: flagVertexShader,
        fragmentShader: flagFragmentShader,
        blending:THREE.AdditiveBlending,
        side:THREE.DoubleSide,
        uniforms:{
            uTime:{value:0},
            uFrequency:{value:new THREE.Vector2(4.5,3.5)},
            uAmp:{value:new THREE.Vector2(0.15,0.05)},
            uRandom:{value:Math.random()},
            uTexture:{value:flagTexture},
            alpha:{value:0},
        }
    })
)
flag.scale.set(1.5,1,1.5)
scene.add(flag)

// gui.add(flag.material.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.1).name('freqX')
// gui.add(flag.material.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.1).name('freqY')
// gui.add(flag.material.uniforms.uAmp.value, 'x').min(0).max(1).step(0.01).name('ampX')
// gui.add(flag.material.uniforms.uAmp.value, 'y').min(0).max(1).step(0.01).name('ampY')


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
camera.position.x = -4
camera.position.y = 0
camera.position.z = 30
scene.add(camera)

gui.add(camera.rotation, 'x').min(-10).max(100).step(0.1).name('cameraX')
gui.add(camera.position, 'y').min(-10).max(100).step(0.1).name('cameraY')
gui.add(camera.rotation, 'z').min(-10).max(100).step(0.1).name('cameraZ')

// Transition
const clickClock = new THREE.Clock()

const icons = document.querySelectorAll('a')

const dict = {
    "0": "index",
    "I": "about",
    "II": "projects",
    "III": "skills",
    "IV": "education",
    "V": "contact",
}

icons.forEach(icon =>{ 
    icon.addEventListener('click', (event) => {

        if(event.target.id != 'V'){
            // $('#V').animate({'opacity': 0.5},1000)
            $('.webgl').animate({'opacity': 0},100)

            const clickFunction = () => {
                const clickTime = clickClock.getElapsedTime()

                camera.position.y = 0 - clickTime * 150
            
                window.requestAnimationFrame(clickFunction)
            }
            clickFunction()

            Object.entries(dict).forEach(([key,value]) =>{

                $('#' + key).animate({'opacity': 0},1000)
                $('#' + value).animate({'opacity': 0},1000)

                setTimeout(function(){
                    $('#' + key).css({"display": "none"})
                    $('#' + value).css({"display": "none"})
                },1000)
                
                $('#' + event.target.id).animate({'opacity': 0},1000)

                if(event.target.id == key){
                    setTimeout(myURL, 3000)
                    function myURL(){
                        window.location.href = value + '.html'
                    }
                }
            })
        }
    })
})

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

    // Flag Animation
    flag.material.uniforms.uTime.value = elapsedTime
    flag.material.uniforms.alpha.value = elapsedTime / 5

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()