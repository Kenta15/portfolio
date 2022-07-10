uniform float alpha;
uniform sampler2D uTexture;

void main()
{
    // vec4 textureColor = texture2D(uTexture, vuv);
    // textureColor.w = alpha;
    float strength = texture2D(uTexture, gl_PointCoord).r;
    gl_FragColor = vec4(1.0, 1.0, 1.0, strength * alpha);
}