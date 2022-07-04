varying vec3 vertexNormal;

void main(){
    float intensity = pow(0.65 - dot(vertexNormal,vec3(0.3,0.2,1.0)),2.0);
    gl_FragColor = vec4(0.5,0.8,1.0,1.0) * intensity;
}