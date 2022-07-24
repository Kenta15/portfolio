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

            if(window.getComputedStyle(document.body).getPropertyValue('cursor') == 'default'){
                this.isDraggingPosition = true
            }
            else{
                this.isDraggingResize = true
            }

            this.pivot.x = event.clientX
            this.pivot.y = event.clientY

            this.terminalPosition = this.terminal.getBoundingClientRect()
        })

        window.addEventListener('mouseup', () => {
            this.isDraggingPosition = false
            this.isDraggingResize = false
        })

        window.addEventListener('mousemove', (event) => {

            this.setResize(event.clientX, event.clientY)

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
            document.getElementById('screen').innerHTML += `<br> <p class='texts'>The default interacitive shell is now zsh. <br>
                                                            For more details about my projects, please visit <a href="https://github.com/Kenta15" target="_blank">https://github.com/Kenta15</a>.<br>
                                                            <br></p>
                                                            <p class="texts" id="response"> (base) Welcome to about, please type your name$ <input id="input"> </p>
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

                    for(let i = 0; i < 101; i++){
                        setTimeout(() => {
                            document.getElementById('loading').innerHTML = `<br> Loading... ` + i + `%`
                        }, i * Math.exp(3,i))
                    }

                    setTimeout(() => {
                        this.secondPage(this.enterCount)
                    }, 100 * Math.exp(3.3,100))
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
                return
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
                                                                  <br><br><p style="display:inline; color:#58CE31;">[Title]</p> Web Developer
                                                                  <br><br><p style="display:inline; color:#58CE31;">[School]</p> University of California - Davis
                                                                  <br><br><br> Press Enter to see my messages
                                                                 `
                this.enterCount = 2
                this.disable = false
            }, 300)
        }
        else if(enterCount == 2){
            console.log('enter2')
        }
    }

    setResize(clientX, clientY){

        this.terminalPositionResize = this.terminal.getBoundingClientRect()

        this.deltaN = Math.abs(this.terminalPositionResize.top - clientY)
        this.deltaE = Math.abs(this.terminalPositionResize.right - clientX)
        this.deltaS = Math.abs(this.terminalPositionResize.bottom - clientY)
        this.deltaW = Math.abs(this.terminalPositionResize.left - clientX)

        this.menu = document.getElementById('menu')
        this.menuPositionResize = this.menu.getBoundingClientRect()
        this.screen = document.getElementById('screen')
        this.screenPositionResize = this.screen.getBoundingClientRect()

        if(this.deltaN + this.deltaW < 5){
            $('body').css('cursor', 'nw-resize')
            if(this.isDraggingResize == true){
                this.menu.style.width = ((this.menuPositionResize.width + (this.pivot.x - clientX)) * 100) / window.innerWidth + 'vw'

                this.screen.style.height = ((this.screenPositionResize.height + (this.pivot.y - clientY)) * 100) / window.innerHeight + 'vh'
                this.screen.style.width = ((this.screenPositionResize.width + (this.pivot.x - clientX)) * 100) / window.innerWidth + 'vw'
            }
        }
        else if(this.deltaN + this.deltaE < 5){
            $('body').css('cursor', 'ne-resize')
        }
        else if(this.deltaS + this.deltaW < 5){
            $('body').css('cursor', 'sw-resize')
        }
        else if(this.deltaS + this.deltaE < 5){
            $('body').css('cursor', 'se-resize')
        }
        else if(this.deltaN < 5){
            $('body').css('cursor', 'n-resize')
        }
        else if(this.deltaE < 5){
            $('body').css('cursor', 'e-resize')
        }
        else if(this.deltaS < 5){
            $('body').css('cursor', 's-resize')
        }
        else if(this.deltaW < 5){
            $('body').css('cursor', 'w-resize')
        }
        else{
            $('body').css('cursor', 'default')
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