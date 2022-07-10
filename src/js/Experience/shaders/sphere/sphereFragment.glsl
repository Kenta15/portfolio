varying vec2 vUv;

uniform float alpha;

#pragma glslify: perlin2d = require('../perlins/perlin2d.glsl')

void main(){

    float strength = sin(perlin2d(vUv * 20.0) * 50.0);

    gl_FragColor = vec4(strength,strength,strength,alpha);
}
