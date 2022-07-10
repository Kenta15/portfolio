#define M_PI 3.14159265359

uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;

#pragma glslify: perlin3d = require('../perlins/perlin3d.glsl')

void main(){

    vec2 centerUv = vUv - 0.5;
    float distanceToCenter = length(centerUv);

    float colorMix = pow(distanceToCenter * 3.0, 4.0);
    vec3 color = mix(uColorStart, uColorEnd, colorMix);

    float alpha = (distanceToCenter - 0.3) * 20.0;
    alpha = 1.0 - alpha;
    alpha = smoothstep(0.0, 1.0, alpha);

    gl_FragColor = vec4(color, alpha);
}