varying vec2 vuv;
varying vec3 vColor;

uniform float alpha;
uniform sampler2D texture;

// vec2 rotate(vec2 uv, float rotation, vec2 mid)
// {
//     return vec2(
//     cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
//     cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
//     );
// }

// void main(){
    
//     gl_FragColor = texture2D(texture, gl_PointCoord);
// }

void main()
{
    // Light point
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);

    // float strength = 1.0 - step(0.01, abs(distance(vuv, vec2(0.5)) - 0.25));

    gl_FragColor = vec4(vec3(strength), alpha);
}