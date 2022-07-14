varying vec2 vUv;

uniform float uTime;
uniform float waveElevation;
uniform vec2 waveFrequency;
uniform float waveSpeed;

#pragma glslify: perlin3d = require('../perlins/perlin3d.glsl')

void main(){
    vUv = uv;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * waveFrequency.x + (uTime * waveSpeed)) 
                    * sin(modelPosition.z * waveFrequency.y + (uTime * waveSpeed)) 
                    * waveElevation;

    elevation += perlin3d(vec3(modelPosition.xz * 0.5, uTime * 0.1));

    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}