#pragma strict
var moveSpeed : int = 20;
var jumpSpeed : int = 40;

var upKey : String = "w";
var downKey : String = "s";
var leftKey : String = "a";
var rightKey : String = "d";

var jumpKey : String = "space";

var playerAnimatedImage : AnimatedImage;

//------------------------------------------------------------------
//move states handled here, maybe pointless but couldn't 
//think of a better way to do this other than how I've been doing it
private var movingLeft = false;
private var movingRight = false;

//jumping bs goes here
var isJumping : boolean = false;
var jumpUsed : boolean = false;
var doubleJumpUsed : boolean = false;
var jumpTimerMax : int = 20;
var jumpTimer : int = 0;
var doubleJumpTimer : int = 0;

//environment bs goes here
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

function OnControllerColliderHit (hit : ControllerColliderHit) {
	//checks for collision with the ground
	var groundCheck = hit.collider.GetComponent("Ground");
	if(groundCheck != null && jumpUsed) {
		resetJump();
		if(movingRight || movingLeft) {
			playerAnimatedImage.animateOver(19, 19, 28);
		}
		else {
			playerAnimatedImage.animateOver(0, 0, 4);
		}
	}
}

function playerEventHandling() {
	//------left-------
	//if left key pressed and right key not held
	if(Input.GetKeyDown(leftKey)) {
		if(!playerAnimatedImage.flipImage) {
			playerAnimatedImage.setFlipImage(true);
		}
		if(!(isJumping || jumpUsed)) {
			playerAnimatedImage.animateOver(19, 19, 28);
		}
		movingLeft = true;
		movingRight = false;
	}
	//if left key pressed and right key held
	if(Input.GetKeyDown(leftKey) && Input.GetKey(rightKey)) {
		if(!playerAnimatedImage.flipImage) {
			playerAnimatedImage.setFlipImage(true);
		}
		if(!(isJumping || jumpUsed)) {
			playerAnimatedImage.animateOver(19, 19, 28);
		}
		movingLeft = true;
		movingRight = false;
	}
	//if left key held and right key released
	if(Input.GetKey(leftKey) && Input.GetKeyUp(rightKey)) {
		if(!playerAnimatedImage.flipImage) {
			playerAnimatedImage.setFlipImage(true);
		}
		if(!(isJumping || jumpUsed)) {
			playerAnimatedImage.animateOver(19, 19, 28);
		}
		movingLeft = true;
		movingRight = false;
	}
	//if left key released
	if(Input.GetKeyUp(leftKey)) {
		movingLeft = false;
		if(isPlayerStanding()) { 
			playerAnimatedImage.animateOnceAndStopAtEnd(0, 0, 4);
		}
	}
	
	//------right-------
	//right key pressed, left key not held
	if(Input.GetKeyDown(rightKey) && !Input.GetKey(leftKey)) {
		if(playerAnimatedImage.flipImage) {
			playerAnimatedImage.setFlipImage(false);
		}
		if(!(isJumping || jumpUsed)) {
			playerAnimatedImage.animateOver(19, 19, 28);
		}
		movingRight = true;
		movingLeft =false;
	}
	//right key press, left key held
	if(Input.GetKeyDown(rightKey) && Input.GetKey(leftKey)) {	
		if(playerAnimatedImage.flipImage) {
			playerAnimatedImage.setFlipImage(false);
		}
		if(!(isJumping || jumpUsed)) {
			playerAnimatedImage.animateOver(19, 19, 28);
		}
		movingRight = true;
		movingLeft =false;
	}
	//right key held, left key released
	if(Input.GetKey(rightKey) && Input.GetKeyUp(leftKey)) {	
		if(playerAnimatedImage.flipImage) {
			playerAnimatedImage.setFlipImage(false);
		}
		if(!(isJumping || jumpUsed)) {
			playerAnimatedImage.animateOver(19, 19, 28);
		}
		movingRight = true;
		movingLeft = false;
	}
	//if right key released
	if(Input.GetKeyUp(rightKey)) {
		movingRight = false;
		if(isPlayerStanding()) { 
			playerAnimatedImage.animateOver(0, 0, 4); 
		}
	}
	
	//------jumping-------
	if(Input.GetKeyDown(jumpKey)) {
		if(!jumpUsed) {
			isJumping = true;
			jumpTimer = 0;
			playerAnimatedImage.animateOnceAndStopAtEnd(37, 37, 39);
		}
	}
	if(Input.GetKeyUp(jumpKey)) {
		if(isJumping) {
			isJumping = false;
			jumpUsed = true;
			playerAnimatedImage.animateOnceAndStopAtEnd(39, 39, 41);
		}
	}
	//------------------	
}

function runPlayerLogic() {
	var controller : CharacterController = GetComponent(CharacterController);
	var moveDirection = Vector3(0, 0, 0);
	
	if(isJumping && !jumpUsed) {
		if(doubleJumpUsed) {
			moveDirection.y += 150;
		}
		else {
			//Debug.Log("omg jumping");
			moveDirection.y += 150;
		}
		if(jumpTimer < jumpTimerMax) {
			jumpTimer++;
		}
		else {
			isJumping = false;
			jumpUsed = true;
			playerAnimatedImage.animateOnceAndStopAtEnd(39, 39, 41);
		}
	}
	
	if((movingLeft || movingRight) && !(movingLeft && movingRight)) {
		if(movingLeft) {
			moveDirection.x -= moveSpeed;
		}
		if(movingRight) {
			moveDirection.x += moveSpeed;
		}
	}
	
	// Apply gravity
	if(!isJumping) {
		moveDirection.y -= fallSpeed;
	}

	// Move the controller
	controller.Move(moveDirection * Time.deltaTime);
}

function resetJump() {
	jumpTimer = 0;
	isJumping = false;
	jumpUsed = false;
	doubleJumpTimer = 0;
	doubleJumpUsed = false;
}

function isPlayerStanding() {
	if(!movingLeft && !movingRight && !isJumping && !jumpUsed) {
		return true;
	}
	else {
		return false;
	}
}