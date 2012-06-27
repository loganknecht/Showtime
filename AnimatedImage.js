var columnSize : int;
var rowSize : int;

var currentFrame : int;
var startFrame : int;
var endFrame : int;

var lastUpdateTime : float = 0;
var framesPerSecond : float;

var spriteTexture : Material;

//tells to animate or not
var isAnimating : boolean = true;
var flipImage : boolean = false;

var renderPlane : GameObject;

function Start() {
	configureSprite();
	UpdateAnimation();
}

function Update () {
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
	configureShapes();
}

//configures the basic shapes being used
function configureShapes() {
	renderPlane.renderer.material = spriteTexture;
}

//offsets the cube to the plane being used so all I have to do is call this and each
//on is reset around the actual game object being tethered to
function alignShapesToObject() {
	renderPlane.transform.position = transform.position;
}

//sets animation sequence with current, start, and end frame
function setAnimationFrames(cFrame, sFrame, eFrame) {
	currentFrame = cFrame;
	startFrame = sFrame;
	endFrame = eFrame;
}

//pass in true or false in order to set this
function setFlipImage(bool) {
	flipImage = bool;
	if(flipImage) {
		//renderPlane.transform.eulerAngles.y = 0;
		//renderPlane.renderer.transform.localScale.x *= -1;
	}
	else {
		//renderPlane.transform.eulerAngles.y = 180;
		//renderPlane.renderer.transform.localScale.x *= -1;
	}
}