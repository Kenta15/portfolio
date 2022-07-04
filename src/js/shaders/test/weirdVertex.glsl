varying vec2 vuv;

uniform float uTime;
uniform float random;

void main(){
    vuv = uv;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x + (uTime * random)) * sin(modelPosition.z + (uTime * random));

    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}