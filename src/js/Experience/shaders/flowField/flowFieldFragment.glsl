varying vec2 vuv;

uniform sampler2D uBaseTexture;
uniform sampler2D uTexture;

void main(){

    vec4 baseColor = texture2D(uBaseTexture, vuv);
    gl_FragColor = baseColor;
}