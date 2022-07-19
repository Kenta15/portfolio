uniform float uTime;
uniform float uDistortionFreq;
uniform float uDistortionStrength;
uniform float uDisplacementFreq;
uniform float uDisplacementStrength;
uniform float uTimeFreq;
uniform vec2 uCursor;

varying vec3 vNormal;

#pragma glslify: perlin4d = require('../perlins/perlin4d.glsl')

void main(){


    vec3 displacementPosition = position;
    displacementPosition += perlin4d(vec4(displacementPosition * uDistortionFreq, uTime * uTimeFreq)) * uDistortionStrength;

    float perlinStrength = perlin4d(vec4(displacementPosition * uDisplacementFreq, uTime * uTimeFreq)) * uDisplacementStrength;

    vec3 newPosition = position;
    float vPerlinStrength;
    newPosition += normal * perlinStrength;

    vec4 viewPosition = viewMatrix * vec4(newPosition, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    float absCursor = abs(uCursor.x) + abs(uCursor.y);

    vNormal = normal - vec3(absCursor, absCursor, absCursor);
    vPerlinStrength = perlinStrength;
}