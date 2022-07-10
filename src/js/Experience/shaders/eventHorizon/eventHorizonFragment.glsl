#define M_PI 3.14159265359

uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;

#pragma glslify: perlin3d = require('../perlins/perlin3d.glsl')

void main(){
    vec2 centerUv = vUv - 0.5;
    float distanceToCenter = length(centerUv);
    float angle = atan(centerUv.x, centerUv.y) / (M_PI * 2.0) + 0.5;
    vec2 smokeUv = vec2(distanceToCenter, angle);

    float hole = smoothstep(0.0, 1.0, 1.0 - abs(distanceToCenter - 0.35) * 20.0);

    float smoke = perlin3d(vec3(smokeUv * vec2(50.0, 15.0), uTime * 0.001));
    smoke *= hole;

    vec3 color = mix(uColorStart, uColorEnd, smoke);

    gl_FragColor = vec4(color, smoke);
}