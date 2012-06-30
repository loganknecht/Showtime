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

function playerEventHandling() {
	//------left-------
	//if left key pressed and right key not held
	if(Input.GetKeyDown(leftKey)) {
		if(!playerAnimatedImage.flipImage) {
			playerAnimatedImage.setFlipImage(true);
		}
		movingLeft = true;
		movingRight = false;
	}
	//if left key pressed and right key held
	if(Input.GetKeyDown(leftKey) && Input.GetKey(rightKey)) {
		if(!playerAnimatedImage.flipImage) {
			playerAnimatedImage.setFlipImage(true);
		}
		movingLeft = true;
		movingRight = false;
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
		movingLeft =false;
	}
	//right key press, left key held
	if(Input.GetKeyDown(rightKey) && Input.GetKey(leftKey)) {	
		if(playerAnimatedImage.flipImage) {
			playerAnimatedImage.setFlipImage(false);
		}
		movingRight = true;
		movingLeft =false;
	}
	//right key held, left key released
	if(Input.GetKey(rightKey) && Input.GetKeyUp(leftKey)) {	
		if(playerAnimatedImage.flipImage) {
			playerAnimatedImage.setFlipImage(false);
		}
		movingRight = true;
		movingLeft = false;
	}
	//if left key released
	if(Input.GetKeyUp(rightKey)) {
		movingRight = false;
	}
	
	//------jumping-------
	if(Input.GetKeyDown(jumpKey)) {
		isJumping = true;
		jumpTimer = 0;
	}
	if(Input.GetKeyUp(jumpKey)) {
		if(isJumping) {
			isJumping = false;
			jumpUsed = true;
		}
	}
	//------------------	
}

function runPlayerLogic() {
	var controller : CharacterController = GetComponent(CharacterController);
	var moveDirection = Vector3(0, 0, 0);
	
	if(isJumping) {
		if(doubleJumpUsed) {
			moveDirection.y += 125;
		}
		else {
			//Debug.Log("omg jumping");
			moveDirection.y += 75;
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
	else {
		jumpTimer++;
		if(jumpTimer < jumpTimerMax) {
			
		}
		else {
			isJumping = false;
			jumpUsed = true;
		}
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