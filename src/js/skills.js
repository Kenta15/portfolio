import './css/skills.css'
import './css/header.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import flagVertexShader from './shaders/test/flagVertex.glsl'
import flagFragmentShader from './shaders/test/flagFragment.glsl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as CANNON from 'cannon-es'
import CannonDegugger from 'cannon-es-debugger'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

const debugObject = {}

debugObject.createSphere = () =>{
    createSphere(Math.random() * 2, 
    {x:Math.random() * 5,y: Math.random() * 5, z: Math.random() * 5}
    )
}
gui.add(debugObject, 'createSphere')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
const flagTexture = textureLoader.load('/textures/JapaneseFlag.png')

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

// Light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff,0)
// directionalLight.position.set( 5, 5, 3.5 )
// scene.add(directionalLight)

// Cannon instanciation
const world = new CANNON.World()
world.gravity.set(0, -0.005, 0)

const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 1.0,
        restitution: 0.1
    }
)
world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial

// Floor
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
floorBody.mass = 0
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1,0,0),
    Math.PI / 2
)
floorBody.position.set(0,-20,0)
world.addBody(floorBody)

const floorShape2 = new CANNON.Plane()
const floorBody2 = new CANNON.Body()
floorBody2.mass = 0
floorBody2.addShape(floorShape2)
floorBody2.quaternion.setFromAxisAngle(
    new CANNON.Vec3(1,0,0),
    Math.PI / 2
)
floorBody2.position.set(0,20,0)
world.addBody(floorBody2)

// cannon debugger
// const cannonDebugger = new CannonDegugger(scene, world, {})

/**
 * Fonts
 */
const fontLoader = new FontLoader()
const text_array = ['JavaScript','Python','HTML','CSS','Django','JQuery','Three.js','Cannon.js', 
                    'Vue.js','Node.js','React','AWS','Heroku','Git','GitHub','Webpack','VS Code',
                    ]

// Text Group
const texts = new THREE.Group()
scene.add(texts)

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
// scene.add(flag)


// Copying physics to mesh
const objectsToUpdate = []

const createTexts = (width, height, depth, position, index) => {
    // THREE js mesh
    fontLoader.load(
        '/fonts/helvetiker_regular.typeface.json',
        (font) =>
        {
               const textGeometry = new TextGeometry(
                   text_array[index],
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
               const material = new THREE.MeshMatcapMaterial({
                                    matcap: matcapTexture,
                                    // transparent: true,
                                    // opacity: 0,
                                })

               const text = new THREE.Mesh(textGeometry,material)
               texts.add(text)

               const textFloatClock = new THREE.Clock()

                // const rotateText = () => {

                //     const textFloatTime = textFloatClock.getElapsedTime()
                //     text.position.y = text.position.y - Math.sin(textFloatTime) * 0.01
                //     text.rotation.z = text.rotation.z - Math.cos(textFloatTime) * 0.002

                //     window.requestAnimationFrame(rotateText)
                // }
                // rotateText()

                // CANNON js body
                const shape = new CANNON.Box(new CANNON.Vec3(width/2,height/2,depth/2))
                const body = new CANNON.Body({
                    mass:1,
                    position: new CANNON.Vec3(0,0,0),
                    shape,
                    material: defaultMaterial,
                })
                body.position.copy(position)
                world.addBody(body)

                // save in objects to update
                objectsToUpdate.push({
                    text,
                    body,
                })
       }
    )
}

// Create texts
for(let i=0;i<text_array.length;i++){
    createTexts(5,2,1,{x: (Math.random() - 0.5) * 70, y: Math.random() * 20 - 10, z:0 }, i)
}

// Create Sphere
const objectsUpdate = []

const geometry = new THREE.SphereBufferGeometry(1,20,20)

const material = new THREE.MeshStandardMaterial({
                    metalness: 0.3,
                    roughness: 0.4,
                    envMap:environmentMapTexture,
                })

const createSphere = (radius, position) => {
    // THREE js mesh
    const mesh = new THREE.Mesh(geometry, material)
    mesh.scale.set(radius,radius,radius)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    // CANNON js body
    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass:1,
        position: new CANNON.Vec3(0,3,0),
        shape,
        material: defaultMaterial,
    })
    body.position.copy(position)
    world.addBody(body)

    // save in objects to update
    objectsUpdate.push({
        mesh,
        body,
    })
}

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
camera.position.x = 0
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

        if(event.target.id != 'III'){
            $('.webgl').animate({'opacity': 0},200)

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

// image Loading
var img = document.createElement('img')
img.src = './imgs/mouse.png'
var element = document.getElementById('mouse')
element.appendChild(img)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
// window.addEventListener('mouseup',() => {
//     controls.reset()
// })

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Raycaster instantiation
let mousedown = new THREE.Vector2()
let mousemove = new THREE.Vector2()

const raycaster = new THREE.Raycaster()
let currIntersect = null
let isDragging = false

window.addEventListener('mousedown', (event) => {

    mousedown.x = event.clientX / sizes.width * 2 - 1
    mousedown.y = - (event.clientY / sizes.height) * 2 + 1

    raycaster.setFromCamera(mousedown, camera)
    const intersects = raycaster.intersectObjects(texts.children)

    if(intersects.length){
        currIntersect = intersects[0].object
        
        $('.webgl').css('cursor', 'grabbing')
    }

    requestAnimationFrame(() => {
        isDragging = true
    })
})

window.addEventListener('mousemove', event =>{
    if(isDragging == false){
        return
    }
    mousemove.x = event.clientX / sizes.width * 2 - 1
    mousemove.y = - (event.clientY / sizes.height) * 2 + 1
})

window.addEventListener('mouseup', () => {
    isDragging = false
    currIntersect = null

    $('.webgl').css('cursor', 'grab')
})


function dragObject(){
    raycaster.setFromCamera(mousemove, camera)
    const intersects = raycaster.intersectObjects(texts.children)

    if(currIntersect != null){
        for(let obj of intersects){
            // body copies text position
            currIntersect.position.x = obj.point.x
            currIntersect.position.y = obj.point.y

            for(const object of objectsToUpdate)
            {
                if(currIntersect == object.text){
                    object.body.position.copy(object.text.position)
                    object.body.quaternion.copy(object.text.quaternion)
                }
            }
        }
    }
}

/**
 * Animate
 */
const clock = new THREE.Clock()
let oldElapsedTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Flag Animation
    flag.material.uniforms.uTime.value = elapsedTime
    flag.material.uniforms.alpha.value = elapsedTime / 5

    // // Render
    renderer.render(scene, camera)

    // cannonDebugger.update()

    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime
    world.step(1 / 60, deltaTime, 3)

    dragObject()

    for(const object of objectsToUpdate)
    {
        /// console.log(objectsToUpdate[0].mesh)
        object.text.position.copy(object.body.position)
        object.text.quaternion.copy(object.body.quaternion)
    }
    for(const object of objectsUpdate){
        object.mesh.position.copy(object.body.position)
        object.mesh.quaternion.copy(object.body.quaternion)
    }
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()