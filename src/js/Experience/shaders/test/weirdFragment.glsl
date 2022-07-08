varying vec2 vuv;

// wave shape
void main(){

    vec2 wavedUv = vec2(
        vuv.x * 0.8 + 0.1 + sin(vuv.y * 40.0) * 0.1,
        vuv.y * 1.5 + sin(vuv.x * 40.0) * 0.1
    );

    float strength = 1.0 - step(0.02,abs(distance(wavedUv, vec2(0.5))- 0.25));
    gl_FragColor = vec4(strength,strength,strength,1.0);
}