varying vec2 vUv;

uniform float alpha;

#pragma glslify: perlin2d = require('../perlins/perlin2d.glsl')

void main(){

    float strength = step(0.9, sin(perlin2d(vUv * 10.0) * 5.0));

    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);

    gl_FragColor = vec4(mixedColor, alpha);
}