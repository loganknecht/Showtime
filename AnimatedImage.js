var columnSize : int;
var rowSize : int;

var currentFrame : int;
var startFrame : int;
var endFrame : int;

var lastUpdateTime;
var framesPerSecond : float;

var spriteTexture : Material;

//tells to animate or not
var isAnimating : boolean = true;
var flipImage : boolean = false;

var renderPlane : GameObject;
//var playerCube : GameObject;

//These handle the scaling for the cube behind the plane that's meant to handle physics
//they are based off of the plane so you don't have to worry about it not being proportional to it
//var cubeScaleX;
//var cubeScaleY;
//var cubeScaleZ;

function Start() {
	configureSprite();
	UpdateAnimation();
}

function Update () {
	//alignShapesToObject();
	//updates animation
	if(isAnimating) {
		UpdateAnimation();
	}
}

//update the animation
function UpdateAnimation() {
	//something something helps with fps?? Maybe?? seems to work
	if((Time.time - lastUpdateTime) > 1/framesPerSecond) {
		lastUpdateTime = Time.time;
		currentFrame++;
	    if(currentFrame > endFrame) {
	    	currentFrame = startFrame;
    	}
	}    
    
    //checks if sprite should be flipped
    if(flipImage) {
    	if(renderPlane.transform.eulerAngles.y != 0) {
    		renderPlane.transform.eulerAngles.y = 0;
    	}
    }
    else {
    	if(renderPlane.transform.eulerAngles.y != 180) {
    		renderPlane.transform.eulerAngles.y = 180;
    	}
    }
    //---------
    
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

//configures the plane texture
function configureSprite() {
	lastUpdateTime = 0;
	isAnimating = true;

	configureShapes();
}

//configures the basic shapes being used
function configureShapes() {
	//cubeScaleX = 10;
	//cubeScaleY = 10;
	//cubeScaleZ = 1;
	
	//playerCube = GameObject.CreatePrimitive(PrimitiveType.Cube);
	//playerCube.name = "SpriteCube";
	//playerCube.renderer.enabled = false;
	//playerCube.transform.Translate(0, 0, 6);
	//TO DO remove the vector3 hard coded values and replaces with Scale by variables later if needed
	//playerCube.transform.localScale = (new Vector3(transform.localScale.x * cubeScaleX, transform.localScale.y * cubeScaleY,transform.localScale.z * cubeScaleZ));

	//renderPlane = GameObject.CreatePrimitive(PrimitiveType.Plane);
	//renderPlane.name = "SpritePlane";
	//renderPlane.transform.Rotate(90, 0, 0);
	//renderPlane.transform.localScale = transform.localScale;
	renderPlane.renderer.material = spriteTexture;
	//alignShapesToObject();
}

//offsets the cube to the plane being used so all I have to do is call this and each
//on is reset around the actual game object being tethered to
function alignShapesToObject() {
	//playerCube.transform.position = transform.position + new Vector3(0, 0, 1);
	renderPlane.transform.position = transform.position;
}

//sets animation sequence with current, start, and end frame
function setAnimationFrames(cFrame, sFrame, eFrame) {
	currentFrame = cFrame;
	startFrame = sFrame;
	endFrame = eFrame;
}

//pass in true or false in order to set this
function setFlipImage(currentState) {
	flipImage = currentState;
		
	if(flipImage) {
		//renderPlane.transform.rotation = Quaternion.identity;
		//renderPlane.transform.rotation = Quaternion.AngleAxis(180, Vector3.right);
		renderPlane.transform.eulerAngles.y = 0;
	}
	else {
		//renderPlane.transform.rotation = Quaternion.identity;
		renderPlane.transform.eulerAngles.y = 180;
	}
}