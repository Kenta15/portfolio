uniform float uTime;
uniform vec2 uFreq;
uniform vec2 uAmp;

varying vec2 vUv;
varying float vWave;

void main(){

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    float wave = sin(modelPosition.x * uFreq.x - uTime * 0.5) * uAmp.x;
    wave += sin(modelPosition.y * uFreq.y - uTime * 0.5) * uAmp.y;
    modelPosition.z += wave; 

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vWave = wave;
}