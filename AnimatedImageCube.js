var columnSize : int;
var rowSize : int;

var currentFrame : int;
var startFrame : int;
var endFrame : int;

var lastUpdateTime;
var framesPerSecond : float;

var spriteTexture : Material;

//tells to animate or not
var isAnimating : boolean;

var renderPlane;
var playerCube;

//These handle the scaling for the cube behind the plane that's meant to handle physics
//they are based off of the plane so you don't have to worry about it not being proportional to it
var cubeScaleX;
var cubeScaleY;
var cubeScaleZ;

function Start() {
	lastUpdateTime = 0;
	isAnimating = true;
	configureShapes();
	alignShapesToObject();
	UpdateAnimation();
}

function Update () {
	alignShapesToObject();
	//updates animation
	if(isAnimating) {
		UpdateAnimation();
	}
}

function UpdateAnimation() {
	//something something helps with fps?? Maybe?? seems to work
	if((Time.time - lastUpdateTime) > 1/framesPerSecond) {
		lastUpdateTime = Time.time;
		currentFrame++;
	    if(currentFrame > endFrame) {
	    	currentFrame = startFrame;
    	}
	}    
    
    var size = Vector2 (1.0 / columnSize, 1.0 / rowSize);
   
    // split into horizontal and vertical index
    var uIndex = currentFrame % columnSize;
    var vIndex = currentFrame / columnSize;

    // build offset
    // v coordinate is the bottom of the image in opengl so we need to invert.
    var offset = Vector2 (uIndex * size.x, 1.0 - size.y - vIndex * size.y);
   
    renderPlane.renderer.material.SetTextureOffset ("_MainTex", offset);
    renderPlane.renderer.material.SetTextureScale ("_MainTex", size);
}

function configureShapes() {
	cubeScaleX = 10;
	cubeScaleY = 10;
	cubeScaleZ = 1;
	
	playerCube = GameObject.CreatePrimitive(PrimitiveType.Cube);
	playerCube.name = "SpriteCube";
	playerCube.renderer.enabled = true;
	playerCube.transform.Translate(0, 0, 6);
	//TO DO remove the vector3 hard coded values and replaces with Scale by variables later if needed
	playerCube.transform.localScale = (new Vector3(transform.localScale.x * cubeScaleX, transform.localScale.y * cubeScaleY,transform.localScale.z * cubeScaleZ));

	renderPlane = GameObject.CreatePrimitive(PrimitiveType.Plane);
	renderPlane.name = "SpritePlane";
	renderPlane.transform.Rotate(90, -180, 0);
	renderPlane.transform.localScale = transform.localScale;
	renderPlane.renderer.material = spriteTexture;
}
function alignShapesToObject() {
	playerCube.transform.position = transform.position + new Vector3(0, 0, 6);
	renderPlane.transform.position = transform.position;
}

function setAnimationFrames(cFrame, sFrame, eFrame) {
	currentFrame = cFrame;
	startFrame = sFrame;
	endFrame = eFrame;
}