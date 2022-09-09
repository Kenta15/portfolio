export default function explain(name){

    const exp = document.getElementById('explanations')

    if(name == 'JavaScript'){
        exp.innerHTML = `<h1 class="title">JavaScript</h1>
                         <p>JavaScript is a programming language for the Web. 
                         Most of websites use JavaScript on the client side for the web page behavior along with HTML and CSS.
                         It has a lot of libraries and frameworks to make nearly anything possible.
                         <br>
                         Proficiency: ★★★★★
                         </p>
                        `
    }
    else if(name == 'Python'){
        exp.innerHTML = `<h1 class="title">Python</h1>
                         <p>Python is one of the most popular backend languages in the world.
                         It is known for the simple beginner friendly syntax and widely used in ML, AI, and many more.
                         <br>
                         Proficiency: ★★★★★
                         </p>
                        `
    }
    else if(name == 'HTML'){
        exp.innerHTML = `<h1 class="title">HTML</h1>
                         <p>HTML is a markup language to display contents on web pages.
                         It is usually used with CSS to style contents properly.
                         One of the essential languages for web development.
                         <br>
                         Proficiency: ★★★★★
                         </p>
                        `
    }
    else if(name == 'CSS'){
        exp.innerHTML = `<h1 class="title">CSS</h1>
                         <p>CSS is a style sheet language used for styling of a document written in a markup language.
                         It can be used to add colors, align things, and change the font of texts.
                         Not only static representaion of a document, it can also be used to animate things such as slide and fade animations.
                         <br>
                         Proficiency: ★★★★★
                         </p>
                        `
    }
    else if(name == 'Django'){
        exp.innerHTML = `<h1 class="title">Django</h1>
                         <p>Django is one of the main python web frameworks.
                         Django takes care of the difficulities, so you can focus on building website without doing unnessesary things.
                         <br>
                         Proficiency: ★★★★☆
                         </p>
                        `
    }
    else if(name == 'jQuery'){
        exp.innerHTML = `<h1 class="title">JQuery</h1>
                         <p> jQuery is a JavaScript library. It is very simple to learn and comes handy when you want to make changes to CSS styles dynamically.
                         <br>
                         Proficiency: ★★★★☆
                         </p>
                        `
    }
    else if(name == 'Three.js'){
        exp.innerHTML = `<h1 class="title">Three.js</h1>
                         <p> Three.js is a JavaScript framework that provides many features for introducing 3D elements into the browser.
                         This framework is what I used for this project. It gives user completely new experiences, and doesn't even look like "website".
                         You can also make games with it.
                         <br>
                         Proficiency: ★★★☆☆
                         </p>
                        `
    }
    else if(name == 'Cannon.js'){
        exp.innerHTML = `<h1 class="title">Cannon.js</h1>
                         <p> Cannon.js is 3D physics engine for the web. I incorporated this since I want users to interact with texts that have physics on it to collide each other.
                         <br>
                         Proficiency: ★★☆☆☆
                         </p>
                        `
    }
    else if(name == 'Heroku'){
        exp.innerHTML = `<h1 class="title">Heroku</h1>
                         <p> Heroku is an application cloud platform. It is useful when you want to deploy your projects and let people play with it.
                         <br>
                         Proficiency: ★★★★★
                         </p>
                        `
    }
    else if(name == 'Vercel'){
        exp.innerHTML = `<h1 class="title">Vercel</h1>
                         <p> Vercel is is an application cloud platform. 
                         It is restricted to frontend, so if you want to deploy projects that include backend, then you want to use a platform such as Heroku.
                         <br>
                         Proficiency: ★★★☆☆
                         </p>
                        `
    }
    else if(name == 'Git'){
        exp.innerHTML = `<h1 class="title">Git</h1>
                         <p> Git is a version control system that lets you keep track of the source code history.
                         Most of software engineers use Git.
                         <br>
                         Proficiency: ★★★★☆
                         </p>
                        `
    }
    else if(name == 'GitHub'){
        exp.innerHTML = `<h1 class="title">GitHub</h1>
                         <p> Along with Git, you can manage your source code on Github.
                         You can push your project files on your local machine by typing a couple of commands on command line or terminal.
                         It especially essential when you are working in a group.
                         <br>
                         Proficiency: ★★★★☆
                         </p>
                        `
    }
    else if(name == 'VSCode'){
        exp.innerHTML = `<h1 class="title">VS Code</h1>
                         <p> Visual Studio Code is a source code editor that a lot of developers like.
                         It supports a wide variety of programming languages and has many extensions that make development a lot less stressful.
                         You can go wrong with it.
                         <br>
                         Proficiency: ★★★★★
                         </p>
                        `
    } 
    else if(name == 'Blender'){
        exp.innerHTML = `<h1 class="title">Blender</h1>
                         <p> Blender is a free open-source 3D creation platform. You can make 3d models and animations however you want.
                         I used Blender to make some models to export and import it into the website.
                         <br>
                         Proficiency: ★★☆☆☆
                         </p>
                        `
    }
    else if(name == 'Bootstrap'){
        exp.innerHTML = `<h1 class="title">Bootstrap</h1>
                         <p> Bootstrap is the most popular CSS framework for developing responsive website.
                         It can generate nice and neat styled element with just one or two words.
                         You can just put Bootstrap classes into HTML tags, and no need to write CSS.
                         <br>
                         Proficiency: ★★☆☆☆
                         </p>
                        `
    }
    else if(name == 'GLSL'){
        exp.innerHTML = `<h1 class="title">GLSL</h1>
                         <p> GLSL is OpenGL Shading Language which is specific for writng shaders.
                         A Shader is a computer program that calculates lights, darkness, and colors on each vertex.
                         With a shader, you can animate complicated movements and create your custom objects.
                         <br>
                         Proficiency: ★☆☆☆☆
                         </p>
                        `
    }
    else if(name == 'SQLite'){
        exp.innerHTML = `<h1 class="title">SQLite</h1>
                         <p> SQLite is a database that I used to make ecommerce website.
                         It is a default database for Django and easy to use for the simple personal projects.
                         <br>
                         Proficiency: ★★☆☆☆
                         </p>
                        `
    }
    else if(name == 'illustrator'){
        exp.innerHTML = `<h1 class="title">illustrator</h1>
                         <p> Adobe Illustrator is a vector graphics editor.
                         It is useful when you want to make your logo, background, and design for anything.
                         I used it to make the welcome page background image.
                         <br>
                         Proficiency: ★☆☆☆☆
                         </p>
                        `
    }
    else if(name == 'Pytorch'){
        exp.innerHTML = `<h1 class="title">Pytorch</h1>
                         <p> Pytorch is a open source machine learning framework.
                         <br> I used Pytorch for a chatbot to train our mmodel with a neural network.
                         <br> Proficiency: ★★☆☆☆
                         </p>
                        `
    }
    else if(name == 'AWS'){
        exp.innerHTML = `<h1 class="title">AWS</h1>
                         <p>
                         <br>
                         </p>
                         `
    }       
    else if(name == 'Node.js'){
        exp.innerHTML = `<h1 class="title">Node.js</h1>
                         <p>
                         <br>
                         </p>
                        `
    }
    else if(name == 'React'){
        exp.innerHTML = `<h1 class="title">React</h1>
                         <p>
                         <br>
                         </p>
                        `
    }
    else if(name == 'MongoDB'){
        exp.innerHTML = `<h1 class="title">MongoDB</h1>
                         <p>
                         <br>
                         </p>
                        `
    }
    else if(name == 'Mongoose'){
        exp.innerHTML = `<h1 class="title">Mongoose</h1>
                         <p>
                         <br>
                         </p>
                        `
    }
    else if(name == 'SQL'){
        exp.innerHTML = `<h1 class="title">SQL</h1>
                         <p>
                         <br>
                         </p>
                        `
    }
    else if(name == 'Express.js'){
        exp.innerHTML = `<h1 class="title">Express.js</h1>
                         <p>
                         <br>
                         </p>
                        `
    }
    else if(name == 'Rest'){
        exp.innerHTML = `<h1 class="title">Rest</h1>
                         <p>
                         <br>
                         </p>
                        `
    }
}