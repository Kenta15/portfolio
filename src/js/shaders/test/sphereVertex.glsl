varying vec2 vuv;

void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vuv = uv;
}