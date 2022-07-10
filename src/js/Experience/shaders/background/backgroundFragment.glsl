varying vec2 vUv;

uniform vec2 uSize;

#pragma glslify: perlin2d = require('../perlins/perlin2d.glsl')

void main(){

    vec2 backgroundUv = vUv * uSize * 0.05;

    float strength = sin(perlin2d(backgroundUv));

    gl_FragColor = vec4(strength,strength,strength,1.0);
}