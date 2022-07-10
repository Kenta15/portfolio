uniform float alpha;
uniform sampler2D uTexture;

void main()
{

    float strength = texture2D(uTexture, gl_PointCoord).r;
    gl_FragColor = vec4(1.0, 1.0, 1.0, strength * alpha);
}