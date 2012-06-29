#pragma strict
var moveSpeed : int = 20;

var upKey : String = "w";
var downKey : String = "s";
var leftKey : String = "a";
var rightKey : String = "d";

var jumpKey : String = "space";
var jumpTimer : int = 5;

var playerAnimatedImage : AnimatedImage;

//------------------------------------------------------------------
//move states handled here, maybe pointless but couldn't 
//think of a better way to do this other than how I've been doing it
private var movingLeft = false;
private var movingRight = false;

var jumping;
var doubleJumpUsed;

var fallSpeed : int;
//------------------------------------------------------------------
function Start () {
}

function Update() {
	playerEventHandling();
}

function FixedUpdate () {
	runPlayerLogic();
}

function playerEventHandling() {
	//------left-------
	//if left key pressed and right key not held
	if(Input.GetKeyDown(leftKey) && !Input.GetKey(rightKey)) {
		if(!playerAnimatedImage.flipImage) {
			playerAnimatedImage.setFlipImage(true);
		}
		movingLeft = true;
	}
	//if left key pressed and right key held
	if(Input.GetKeyDown(leftKey) && Input.GetKey(rightKey)) {
		movingLeft = true;
	}
	//if left key held and right key released
	if(Input.GetKey(leftKey) && Input.GetKeyUp(rightKey)) {
		if(!playerAnimatedImage.flipImage) {
			playerAnimatedImage.setFlipImage(true);
		}
		movingLeft = true;
		movingRight = false;
	}
	//if left key released
	if(Input.GetKeyUp(leftKey)) {
		movingLeft = false;
	}
	
	//------right-------
	//right key pressed, left key not held
	if(Input.GetKeyDown(rightKey) && !Input.GetKey(leftKey)) {
		if(playerAnimatedImage.flipImage) {
			playerAnimatedImage.setFlipImage(false);
		}
		movingRight = true;
	}
	//right key press, left key held
	if(Input.GetKeyDown(rightKey) && Input.GetKey(leftKey)) {	
		movingRight = true;
	}
	//right key held, left key released
	if(Input.GetKey(rightKey) && Input.GetKeyUp(leftKey)) {	
		if(playerAnimatedImage.flipImage) {
			playerAnimatedImage.setFlipImage(false);
		}
		movingRight = true;
		movingLeft = false;
	}
	//right key released
	if(Input.GetKeyUp(rightKey)) {
		movingRight = false;		
	}
	//------------------
}

function runPlayerLogic() {
	var controller : CharacterController = GetComponent(CharacterController);
	var moveDirection = Vector3(0, 0, 0);
	
	if((movingLeft || movingRight) && !(movingLeft && movingRight)) {
		if(movingLeft) {
			//transform.Translate(new Vector3(-moveSpeed,0, 0) * Time.deltaTime);
			moveDirection.x -= moveSpeed;
		}
		if(movingRight) {
			//transform.Translate(new Vector3(moveSpeed, 0, 0) * Time.deltaTime);	
			moveDirection.x += moveSpeed;
		}
	}
	
	// Apply gravity
	moveDirection.y -= fallSpeed;

	// Move the controller
	controller.Move(moveDirection * Time.deltaTime);
}