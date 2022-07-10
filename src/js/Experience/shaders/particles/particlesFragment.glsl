varying vec2 vUv;
varying vec3 vColor;

uniform float alpha;
uniform sampler2D texture;

void main()
{
    // Light point
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);

    gl_FragColor = vec4(vec3(strength), alpha);
}