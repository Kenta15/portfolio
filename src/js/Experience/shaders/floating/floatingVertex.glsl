uniform float uTime;
uniform float uSize;

attribute float aProgress;
attribute float aSize;

#pragma glslify: perlin3d = require('../perlins/perlin3d.glsl')

void main(){

    float progress = mod(aProgress + uTime * 0.00003, 1.0);
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += progress * 30.0;
    modelPosition.x += perlin3d(modelPosition.xyz * 0.1) * 30.0;

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    gl_PointSize = uSize * aSize;
    gl_PointSize *= (1.0 / - viewPosition.z );
}