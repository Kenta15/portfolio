export default class Terminal{

    constructor(){

        this.terminal = document.getElementById('terminal')
        this.menu = document.getElementById('menu')
        this.isDraggingPosition = false
        this.isDraggingResize = false
        this.pivot = {
            x: 0,
            y: 0
        }
        this.terminalPosition = null

        this.enterCount = 0
        this.disable = false

        this.setDrag()
        this.firstPage()
        this.animation()
    }

    setDrag(){

        this.menu.addEventListener('mousedown', (event) => {

            this.isDraggingPosition = true

            this.pivot.x = event.clientX
            this.pivot.y = event.clientY

            this.terminalPosition = this.terminal.getBoundingClientRect()
        })

        window.addEventListener('mouseup', () => {
            this.isDraggingPosition = false
            this.isDraggingResize = false
        })

        window.addEventListener('mousemove', (event) => {

            if(this.isDraggingPosition == true){
                let left = ((this.terminalPosition.left + (event.clientX - this.pivot.x)) * 100) / window.innerWidth
                let top = ((this.terminalPosition.top + (event.clientY - this.pivot.y)) * 100 ) / window.innerHeight
                this.terminal.style.left = left + 'vw'
                this.terminal.style.top = top + 'vh'
            }
            
        })
        
    }

    firstPage(){

        setTimeout(() => {
            document.getElementById('screen').innerHTML += `<br> <p class='texts'>The default interactive shell is now zsh. <br>
                                                            For more details about my projects, please visit <a href="https://github.com/Kenta15" target="_blank">https://github.com/Kenta15</a>.<br>
                                                            <br></p>
                                                            <p class="texts" id="response"> (base) Welcome to about, please type your name$ <input id="input"></p>
                                                            <p class="texts" id="loading"></p>
                                                            `
        },1000)

        window.addEventListener('keypress', (event) => {

            if(this.disable == true)
                return

            this.response = document.getElementById('response')
            this.input = document.getElementById('input')
            if(this.input)
                this.input.focus()
            
            if(event.key == 'Enter' && this.enterCount == 0) {

              if(this.input.value != ''){
                this.input.remove()
                this.response.innerHTML += this.input.value
                this.response.innerHTML += `<br> Initialized username as ` + this.input.value
              }
              else{
                this.input.remove()
                this.response.innerHTML += `<br> Initialized username as null`
              }

              setTimeout(() => {
                this.response.innerHTML += `<br> About resources are successfully loaded from /Users/About/resources/`
              },100)
              setTimeout(() => {
                this.response.innerHTML += `<br> Serving pages from local directory: /Users/` + this.input.value
              },200)
              setTimeout(() => {
                this.response.innerHTML += `<br> AboutPage 11.29.05 is running at: `
              },300)
              setTimeout(() => {
                this.response.innerHTML += `<br> http://localhost:8888/?token=+213c9f19d874314ae5090861a15c5d`
              },400)
              setTimeout(() => {
                this.response.innerHTML += `<br><br> Do you want to continue [Y/n]? <input type="text" id="input">`
              },1000)

              this.enterCount = 1

              return
            }
            else if(event.key == 'Enter' && this.enterCount == 1) {
                if(this.input.value == 'Y' || this.input.value == 'y'){

                    this.disable = true
                    this.input.remove()
                    this.response.innerHTML += this.input.value

                    for(let i = 0; i < 101; i++){
                        setTimeout(() => {
                            document.getElementById('loading').innerHTML = `<br> Writing Objects: ` + i + `%, done.`
                        }, i * Math.exp(3))
                    }

                    setTimeout(() => {
                        document.getElementById('loading').innerHTML += `<br><br>installed 110675 node_modules/jquery/src/var/isRandom.js
                        <br>installed 110675 node_modules/jquery/src/var/stack.js
                        <br>installed 110675 node_modules/jquery/src/var/toString.js
                        <br>installed 110675 node_modules/jquery/src/var/support.js
                        <br>installed 110675 node_modules/jquery/src/var/isAnything.js
                        <br>installed 110675 src/js/about.js<br>installed 110675 src/js/projects.js<br>installed 110675 src/js/skills.js<br>installed 110675 src/js/contacts.js<br>
                        <br>found <p style="display:inline; color:#13A312;">0</p> vulnerabilities.
                        `
                    },100 * Math.exp(3.2))

                    setTimeout(() => {
                        document.getElementById('loading').innerHTML += `<br><br>-------------------------------------------<br>
                        Project running at: <br>
                        <p style="display:inline; color:#0A4BBC; margin-left:10px;"> - http://10.10.43.59:8080</p>
                        <br> compiled <p style="display:inline; color:#13A312;">successfully.</p>`
                    },100 * Math.exp(3.4))

                    setTimeout(() => {
                        this.secondPage(this.enterCount)
                    }, 100 * Math.exp(3.8))
                }
                else if(this.input.value == 'N' || this.input.value == 'n'){
                    window.location.href = 'index.html'
                }
                else{
                    this.input.remove()
                    this.response.innerHTML += this.input.value
                    this.response.innerHTML += `<br> -bash:` + this.input.value + `: command not found <br>
                                                Do you want to continue [Y/n]? <input type="text" id="input">
                                                `
                }
                return
            }
            else if(event.key == 'Enter' && this.enterCount == 2) {
                this.secondPage(this.enterCount)
                this.enterCount = 3
                if(this.isFinished == true)
                    this.disable = false
                return
            }
            else if(event.key == 'Enter' && this.enterCount == 3){

                $('#terminal').css('opacity', 0)
                setTimeout(() => {
                    $(".curtainLeft").stop().animate({'left': '0'}, 400)
                    $(".curtainRight").stop().animate({'left': '50vw'}, 400)
                },500)
                setTimeout(() => {
                    window.location.href = 'projects.html'
                }, 1200)
            }
        })
    }

    secondPage(enterCount){

        if(enterCount == 1){
            document.getElementById('screen').innerHTML = `<br><p class="texts" id="aboutMe">About Me</p>
                                                           <p class="texts" id="response"></p>
                                                          `

            setTimeout(() => {
                document.getElementById('response').innerHTML += `<br><p style="display:inline; color:#58CE31;">[Name]</p> Kenta Tanaka
                                                                  <br><br><p style="display:inline; color:#58CE31;">[Where From]</p> Japan
                                                                  <br><br><p style="display:inline; color:#58CE31;">[Title]</p> Web Developer
                                                                  <br><br><p style="display:inline; color:#58CE31;">[School]</p> University of California - Davis
                                                                  <br><br><p class="texts" id="message0" style="display:inline;"></p>
                                                                 `
                document.getElementById('message0').innerHTML = `Press "<p class="blink">Enter</p>"`

                this.enterCount = 2
                this.disable = false
            }, 300)
        }
        else if(enterCount == 2){

            this.disable = true
            
            var messageArray = ["Hi, I'm Kenta.", "I am a Japansese Web Developer in the U.S.", "Currently commuting to UC Davis as a CS student.",
                                "I like to build anything unique and stylish.", "Looking forward to exploring more Web Development and Design.",
                                "Nice to meet you!"
                               ]
            var textPosition = 0
            var speed = 100
            var index = 0
            var isFinished = false

            const typewriter = () => {

                document.getElementById('message' + index).innerHTML = messageArray[index].substring(0,textPosition) + `<span id="bar">|</span>`

                if(textPosition++ != messageArray[index].length){
                    setTimeout(typewriter, speed)
                }
                else{
                    document.getElementById('bar').remove()
                    textPosition = 0
                    index++
                    this.response.innerHTML += `<p class="texts" id="message` + index + `"></p>` 

                    if(index < messageArray.length)
                        setTimeout(typewriter, 500)
                    else
                        isFinished = true
                }

                if(isFinished == true){
                    setTimeout(() =>{
                        this.response.innerHTML += `<br>Press "<p class="blink">Enter</p>" to go to the projects page
                                                    <br>(or use the menu on the top)
                                                    `
                        this.disable = false
                    },500)
                }
            }
            typewriter()
        }
    }

    animation(){
        $('.buttons').hover(() => {
            $('.emoji').css('opacity', 1)
        }, () => {
            $('.emoji').css('opacity', 0)
        })
    }

    update(){

    }

}