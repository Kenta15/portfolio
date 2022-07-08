uniform float uTime;
uniform vec2 uFrequency;
uniform vec2 uAmp;
uniform float uRandom;

varying vec2 vuv;
varying float vWave;

void main(){

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    float wave = sin(modelPosition.x * uFrequency.x - uTime) * uAmp.x;
    wave += sin(modelPosition.y * uFrequency.y - uTime) * uAmp.y;
    modelPosition.z += wave; 

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vuv = uv;
    vWave = wave;
}

// void main()
// {
//     vec4 modelPosition = modelMatrix * vec4(position, 1.0);

//     float wave = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
//     wave += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

//     modelPosition.z += wave;

//     vec4 viewPosition = viewMatrix * modelPosition;
//     vec4 projectedPosition = projectionMatrix * viewPosition;

//     gl_Position = projectedPosition;

//     vuv = uv;
//     vWave = wave;
// }