uniform sampler2D uTexture;
uniform float alpha;

varying vec2 vUv;
varying float vWave;

void main()
{
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vWave * 1.0 + 0.5;
    textureColor.w = alpha;
    gl_FragColor = textureColor;
}