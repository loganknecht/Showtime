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
var animateOnce : boolean = false;


var renderPlane : GameObject;

function Start() {
	//this is only here so that I can fix issues with the flipping on initialization because of camera annoyances
	renderPlane.renderer.transform.localScale.x *= -1;
	//------
	
	configureSprite();
	UpdateAnimation();
}

function Update () {
	//updates animation
	if(isAnimating || animateOnceAndStopAtEnd) {
		UpdateAnimation();
	}
}

//update the animation
function UpdateAnimation() {
	//something something helps with fps?? Maybe?? seems to work
	if((Time.time - lastUpdateTime) > 1/framesPerSecond) {
		lastUpdateTime = Time.time;
		if(currentFrame < endFrame) {
			currentFrame++;
		}
	    if(currentFrame >= endFrame && (!animateOnceAndStopAtEnd || isAnimating) ) {
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
function setAnimationFrames(cFrame : int, sFrame : int, eFrame : int) {
	currentFrame = cFrame;
	startFrame = sFrame;
	endFrame = eFrame;
}

//pass in true or false in order to set this
function setFlipImage(bool) {
	flipImage = bool;
	if(flipImage) {
		if(renderPlane.transform.localScale.x < 0) {
			renderPlane.renderer.transform.localScale.x *= -1;
		}
	}
	else {
		if(renderPlane.transform.localScale.x > 0) {
			renderPlane.renderer.transform.localScale.x *= -1;
		}
	}
}

function animateOnceAndStopAtEnd(cFrame : int, sFrame : int, eFrame : int) {
	animateOnce = true;
	isAnimating = false;
	setAnimationFrames(cFrame, sFrame, eFrame);
}

function animateOver(cFrame : int, sFrame : int, eFrame : int) {
	animateOnce = false;
	isAnimating = true;
	setAnimationFrames(cFrame, sFrame, eFrame);
}