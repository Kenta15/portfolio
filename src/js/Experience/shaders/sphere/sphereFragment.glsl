varying vec2 vUv;

uniform float alpha;
// uniform sampler2D uTexture;

#pragma glslify: perlin2d = require('../perlins/perlin2d.glsl')

void main(){

    // float strength = texture2D(uTexture, gl_PointCoord).r;
    // gl_FragColor = vec4(1.0, 1.0, 1.0, strength * alpha);

    float strength = sin(perlin2d(vUv * 20.0) * 50.0);

    gl_FragColor = vec4(strength,strength,strength,alpha);
}
