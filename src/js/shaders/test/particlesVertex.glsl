varying vec2 vuv;
varying vec3 vColor;

uniform float uTime;
uniform float uSize;

void main(){
    vuv = uv;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // float angle = atan(modelPosition.x, modelPosition.z);

    // modelPosition.x = cos(angle);
    // modelPosition.z = sin(angle);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = uSize;
    
    // size based on distance
    gl_PointSize *= (1.0 / - viewPosition.z);

    vColor = color;
}