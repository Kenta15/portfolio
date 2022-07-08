import '../css/skills.css'
import '../css/header.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import Animations from './animationExport.js'
import Experience from './Experience/Experience.js'

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

class Skills{

    constructor(){

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setCamera()
        // this.setLights()
    }

    setCamera(){
        this.camera.instance.position.set(0,0,30)
    }

    setLights(){
        const directionalLight = new THREE.DirectionalLight(0xffffff,1.5)
        directionalLight.position.set( 5, 5, 3.5 )
        this.scene.add(directionalLight)
    }

}
const skills = new Skills()

// HTML Animations

class SkillsAnimations extends Animations{
    
    constructor(index){
        
        super(index)

        this.experience = new Experience(document.querySelector('canvas.webgl'))
        this.camera = this.experience.camera

        this.introAnimation()
    }

    introAnimation(){
        setTimeout(function(){
            $('.container').animate({'opacity':1}, 3000);
            $('.webgl').animate({'opacity':1}, 3000);
        }, 1);
    }

    customAnimation(index, key){

        setTimeout(function(){
            $('#' + key).animate({'opacity': 0.5}, 3000);
            $("#" + index).stop().animate({'opacity': 1}, 3000);
        }, 1);

    }

    customClickAnimation(){
        setTimeout(function(){
            $('body').animate({'opacity': 0},1000)
        }, 1);
    }

    threeTransition(clickTime){
        this.camera.instance.position.y = 0 - clickTime * 150
    }
}

const animations = new SkillsAnimations("III")

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

/**
 * Textures
 */
// const textureLoader = new THREE.TextureLoader()
// const cubeTextureLoader = new THREE.CubeTextureLoader()

// const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
// const flagTexture = textureLoader.load('/textures/JapaneseFlag.png')

// Light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff,0)
// directionalLight.position.set( 5, 5, 3.5 )
// scene.add(directionalLight)

// Cannon instanciation
// const world = new CANNON.World()
// world.gravity.set(0, 0, 0)

// const defaultMaterial = new CANNON.Material('default')
// const defaultContactMaterial = new CANNON.ContactMaterial(
//     defaultMaterial,
//     defaultMaterial,
//     {
//         friction: 1.0,
//         restitution: 0.1
//     }
// )
// world.addContactMaterial(defaultContactMaterial)
// world.defaultContactMaterial = defaultContactMaterial

// // Floor
// const floorShape = new CANNON.Plane()
// const floorBody = new CANNON.Body()
// floorBody.mass = 0
// floorBody.addShape(floorShape)
// floorBody.quaternion.setFromAxisAngle(
//     new CANNON.Vec3(-1,0,0),
//     Math.PI / 2
// )
// floorBody.position.set(0,-20,0)
// world.addBody(floorBody)

// const floorShape2 = new CANNON.Plane()
// const floorBody2 = new CANNON.Body()
// floorBody2.mass = 0
// floorBody2.addShape(floorShape2)
// floorBody2.quaternion.setFromAxisAngle(
//     new CANNON.Vec3(1,0,0),
//     Math.PI / 2
// )
// floorBody2.position.set(0,20,0)
// world.addBody(floorBody2)

// // cannon debugger
// // const cannonDebugger = new CannonDegugger(scene, world, {})

// /**
//  * Fonts
//  */
// const fontLoader = new FontLoader()
// const text_array = ['JavaScript','Python','HTML','CSS','Django','JQuery','Three.js','Cannon.js', 
//                     'Vue.js','Node.js','React','AWS','Heroku','Git','GitHub','Webpack','VS Code',
//                     'Kenta', 'Vercel', 'Express.js', 'Next.js', 'MongoDB', 'Mongoose', 'SQL', 'SQLite', 
//                     'Angular.js', 'Rest', 'Atom', 'Anaconda', 'More'
//                     ]

// // Text Group
// const texts = new THREE.Group()
// scene.add(texts)

// Flag
// const flagTexture = textureLoader.load('/textures/JapaneseFlag.png')

// const flag = new THREE.Mesh(
//     new THREE.PlaneGeometry(1, 1, 32, 32),
//     new THREE.ShaderMaterial({
//         vertexShader: flagVertexShader,
//         fragmentShader: flagFragmentShader,
//         blending:THREE.AdditiveBlending,
//         side:THREE.DoubleSide,
//         uniforms:{
//             uTime:{value:0},
//             uFrequency:{value:new THREE.Vector2(4.5,3.5)},
//             uAmp:{value:new THREE.Vector2(0.15,0.05)},
//             uRandom:{value:Math.random()},
//             uTexture:{value:flagTexture},
//             alpha:{value:0},
//         }
//     })
// )
// flag.scale.set(1.5,1,1.5)
// scene.add(flag)


// // Copying physics to mesh
// const objectsToUpdate = []

// const createTexts = (width, height, depth, position, index) => {
//     // THREE js mesh
//     fontLoader.load(
//         '/fonts/helvetiker_regular.typeface.json',
//         (font) =>
//         {
//                const textGeometry = new TextGeometry(
//                    text_array[index],
//                    {
//                        font: font,
//                        size: 2,
//                        height: 1,
//                        curveSegments:5,
//                        bevelEnabled: true,
//                        bevelThickness:0.03,
//                        bevelSize:0.02,
//                        bevelOffset:0,
//                        bevelSegments:4,
   
//                    }
//                )
//                textGeometry.center()
//                const material = new THREE.MeshMatcapMaterial({
//                                     matcap: matcapTexture,
//                                 })

//                const text = new THREE.Mesh(textGeometry,material)
//                text.name = text_array[index]

//                texts.add(text)

//                 // CANNON js body
//                 const shape = new CANNON.Box(new CANNON.Vec3(width/2,height/2,depth/2))
//                 const body = new CANNON.Body({
//                     mass:1,
//                     position: new CANNON.Vec3(0,0,0),
//                     shape,
//                     material: defaultMaterial,
//                 })
//                 body.position.copy(position)
//                 world.addBody(body)

//                 // save in objects to update
//                 objectsToUpdate.push({
//                     text,
//                     body,
//                 })
//        }
//     )
// }

// // Create texts
// var count = -1
// for(let i=0;i<text_array.length;i++){

//     if(i%5 == 0){
//         count++
//     }

//     createTexts(6,2,1,{x: ((i%5) - 2) * 15, y: 12 - (count * 6), z:0 }, i)
// }

/**
 * Sizes
 */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

/**
 * Camera
 */
// Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 0
// camera.position.y = 0
// camera.position.z = 30
// scene.add(camera)


// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
// window.addEventListener('mouseup',() => {
//     controls.reset()
// })

/**
 * Renderer
 */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Raycaster instantiation
// let mousedown = new THREE.Vector2()
// let mousemove = new THREE.Vector2()

// const raycaster = new THREE.Raycaster()
// let currIntersect = null
// let isDragging = false

// window.addEventListener('mousedown', (event) => {

//     mousedown.x = event.clientX / sizes.width * 2 - 1
//     mousedown.y = - (event.clientY / sizes.height) * 2 + 1

//     raycaster.setFromCamera(mousedown, camera)
//     const intersects = raycaster.intersectObjects(texts.children)

//     if(intersects.length){
//         currIntersect = intersects[0].object
        
//         $('body').css('cursor', 'grabbing')

//         // Pop up the explanation
//         explain(currIntersect.id)
//         $('#explanations').stop().animate({'opacity':0.9},500)
//         $('.block').stop().animate({'opacity':0.5},800)
//     }

//     requestAnimationFrame(() => {
//         isDragging = true
//     })
// })

// window.addEventListener('mousemove', event =>{
//     if(isDragging == false){
//         return
//     }
//     mousemove.x = event.clientX / sizes.width * 2 - 1
//     mousemove.y = - (event.clientY / sizes.height) * 2 + 1

//     // if(currIntersect){
//     //     $('body').css('cursor', 'pointer')
//     // }
// })

// window.addEventListener('mouseup', () => {
//     isDragging = false
//     currIntersect = null

//     $('body').css('cursor', 'grab')

//     // Remove the explanation
//     $('#explanations').stop().animate({'opacity':0},1000)
//     $('.block').stop().animate({'opacity':0},500)
// })

// window.addEventListener('mouseout', () => {   

//     if(!currIntersect){
//         $('body').css('cursor', 'default')
//     }
// })


// function dragObject(){
//     raycaster.setFromCamera(mousemove, camera)
//     const intersects = raycaster.intersectObjects(texts.children)

//     if(currIntersect != null){
//         for(let obj of intersects){
//             // body copies text position
//             currIntersect.position.x = obj.point.x
//             currIntersect.position.y = obj.point.y

//             for(const object of objectsToUpdate)
//             {
//                 if(currIntersect == object.text){
//                     object.body.position.copy(object.text.position)
//                     object.body.quaternion.copy(object.text.quaternion)
//                 }
//             }
//         }
//     }
// }

/**
 * Animate
 */
// const clock = new THREE.Clock()
// let oldElapsedTime = 0

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     // Flag Animation
//     flag.material.uniforms.uTime.value = elapsedTime
//     flag.material.uniforms.alpha.value = elapsedTime / 5

//     // // Render
//     renderer.render(scene, camera)

//     // cannonDebugger.update()

//     const deltaTime = elapsedTime - oldElapsedTime
//     oldElapsedTime = elapsedTime
//     world.step(1 / 60, deltaTime, 3)

//     dragObject()

//     for(const object of objectsToUpdate)
//     {
//         object.text.position.copy(object.body.position)
//         object.text.quaternion.copy(object.body.quaternion)
//     }
    
//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()