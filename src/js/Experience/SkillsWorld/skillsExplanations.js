export default function explain(name){

    const exp = document.getElementById('explanations')

    if(name == 'JavaScript'){
        exp.innerHTML = `<h1 class="title">JavaScript</h1>
                         <p>JavaScript is a programming language for the Web. 
                         Most of websites use JavaScript on the client side for the web page behavior along with HTML and CSS.
                         It has a lot of libraries and frameworks to make nearly anything possible.
                         </p>
                        `
    }
    else if(name == 'Python'){
        exp.innerHTML = `<h1 class="title">Python</h1>
                         <p>Python is one of the most popular backend languages in the world.
                         It is known for the simple beginner friendly syntax and widely used for ML, AI, and many more.
                         </p>
                        `
    }
    else if(name == 'HTML'){
        exp.innerHTML = `<h1 class="title">HTML</h1>
                         <p>HTML is a markup language to display contents on web pages.
                         It is usually used with CSS to style contents properly.
                         One of the essential languages for web development.
                         </p>
                        `
    }
    else if(name == 'CSS'){
        exp.innerHTML = `<h1 class="title">CSS</h1>
                         <p>CSS is a style sheet language used for styling of a document written in a markup language.
                         It can be used to add colors, align things, and change the font of texts.
                         Not only static representaion of a document, it can also be used to animate things such as slide and fade animations.
                         </p>
                        `
    }
    else if(name == 'Django'){
        exp.innerHTML = `<h1 class="title">Django</h1>
                         <p>Django is one of the main python web frameworks.
                         Django takes care of the difficulities, so you can focus on building website without doing unnessesary things.

                         </p>
                        `
    }
    else if(name == 'jQuery'){
        exp.innerHTML = `<h1 class="title">JQuery</h1>
                         <p></p>
                        `
    }
    else if(name == 'Three.js'){
        exp.innerHTML = `<h1 class="title">Three.js</h1>
                         <p></p>
                        `
    }
    else if(name == 'Cannon.js'){
        exp.innerHTML = `<h1 class="title">Cannon.js</h1>
                         <p></p>
                        `
    }
    else if(name == 'Node.js'){
        exp.innerHTML = `<h1 class="title">Node.js</h1>
                         <p></p>
                        `
    }
    else if(name == 'React'){
        exp.innerHTML = `<h1 class="title">React</h1>
                         <p></p>
                        `
    }
    else if(name == 'Heroku'){
        exp.innerHTML = `<h1 class="title">Heroku</h1>
                         <p></p>
                        `
    }
    else if(name == 'Vercel'){
        exp.innerHTML = `<h1 class="title">Vercel</h1>
                         <p></p>
                        `
    }
    else if(name == 'Git'){
        exp.innerHTML = `<h1 class="title">Git</h1>
                         <p></p>
                        `
    }
    else if(name == 'Github'){
        exp.innerHTML = `<h1 class="title">GitHub</h1>
                         <p></p>
                        `
    }
    else if(name == 'Webpack'){
        exp.innerHTML = `<h1 class="title">Webpack</h1>
                         <p></p>
                        `
    }
    else if(name == 'VSCode'){
        exp.innerHTML = `<h1 class="title">VS Code</h1>
                         <p></p>
                        `
    } 
    else if(name == 'Blender'){
        exp.innerHTML = `<h1 class="title">Blender</h1>
                         <p></p>
                        `
    }
    else if(name == 'AWS'){
        exp.innerHTML = `<h1 class="title">AWS</h1>
                         <p></p>
                        `
    }               
}