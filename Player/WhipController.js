#pragma strict
/*
WhipController Notes

This is a script made to be attached to an empty game object

Once attached to an empty game object the attackKey triggers the change for this script. 
Upong pressing the attack key the state is changed on the basis of what keys are pressed 
on the keyboard as well as the direction that the player is pointing towards.

whip - this is the container for the whip sphere parts
whipLength - sets the amount of spheres to have in the whip
whipScale -  this manages the whip's scale
whipHeldTimer - tracks how long to hold the whip in the initial whip position that is set upon pressing the attack key
whipHeldTimerMax - this is the maximum amount of time to hold the whip in its initial position for

playerReference - this is the reference to the player object that the whip should be attached to
playerReferenceControls - this is the script that is used for the player controller;

attackKey - this is the key that needs to be pressed in order to attack
isAttacking - tracks the player's attacking state
*/
var whip : GameObject[];
var whipLength : int = 6;
var whipScale : Vector3 = new Vector3(1, 1, 1);
var whipHeldTimer : int = 0;
var whipHeldTracker : int = 0;
var whipHeldTimerMax : int = 20;

var playerReference : GameObject;
var playerReferenceControls : PlayerControls;

var attackKey : String = "g";
var isAttacking = false;

function Start () {
	//initializes the whip to contain the spheres specified
	whip = new GameObject[whipLength];
	//grabs the reference to the player's controls
	playerReferenceControls = playerReference.GetComponent(PlayerControls);
}

function FixedUpdate() {
}

function Update () {
	//handles key presses from the player
	performKeyPressEventHandling();
	//if the player is attacking run the logic of the whip
	if(isAttacking) {
		runWhipLogic();
	}
}

//handles key press reaction
function performKeyPressEventHandling() {
	//--------attacking-----------
	if(Input.GetKeyDown(attackKey)) {
		//resets these so whip will drop right
		whipHeldTracker = 0;
		whipHeldTimer = 0;
		//creates whip
		generateWhip();
		
		isAttacking = true;
	}
	if(Input.GetKeyUp(attackKey)) {
		//kills whip components
		destroyWhip();
		
		isAttacking = false;
	}
	//----------------------------
}

/*
This runs the logic of the whip. It runs a few things in it

The first few lines runs a check to see if it should enable gravity for the whip components

The second set reorients the whip to be in the location that the player is pointing towards.

The third fixes each whip component to be only so far away from its previous whip component
*/
function runWhipLogic() {
	//this resets the player rotation and stores its rotation in a variable, then after all this code is run it resets the rotations
	var playerRotation : Quaternion = playerReference.transform.rotation;
	playerReference.transform.rotation = Quaternion.identity;
	
	//this resets the player rotation and stores its rotation in a variable, then after all this code is run it resets the rotations
	var i : int = 0;

	//---------- handles timing to check to see if whip should fall ---------------
	//sets the delay before enabling fall, this allows for subtle reimbursment to the player, maybe in the form of some screen shake
	whipHeldTimer++;
	if(whipHeldTimer > whipHeldTimerMax) {
		if(whipHeldTracker < whipLength) {
			whip[whipHeldTracker].rigidbody.useGravity = true;
			whipHeldTracker++;
			whipHeldTimer = 0;
		}
	}
	//--------------------------
	
	//-------------- handles re-orienting the whip in the right location around the player, based on key presses -------------------
	//if pressing up
	if(playerReferenceControls.pressingUp) {
		//up and left
		if(playerReferenceControls.movingLeft && !playerReferenceControls.movingRight) {
			whip[0].transform.position = new Vector3(playerReference.transform.position.x - whipScale.x/2 - playerReference.transform.collider.bounds.size.x/2,
												  playerReference.transform.position.y + whipScale.y/2 + playerReference.transform.collider.bounds.size.y/2,
												  playerReference.transform.position.z);
		}
		//up and right
		else if(playerReferenceControls.movingRight && !playerReferenceControls.movingLeft) {
			whip[0].transform.position = new Vector3(playerReference.transform.position.x + whipScale.x/2 + playerReference.transform.collider.bounds.size.x/2,
											  playerReference.transform.position.y + whipScale.y/2 + playerReference.transform.collider.bounds.size.y/2,
											  playerReference.transform.position.z);
		}
		//just pointing straight up
		else {
			whip[0].transform.position = new Vector3(playerReference.transform.position.x,
											  playerReference.transform.position.y + whipScale.y/2 + playerReference.transform.collider.bounds.size.y/2,
											  playerReference.transform.position.z);
		}
	}
	//if pressing down
	else if(playerReferenceControls.pressingDown) {
		//down and left
		if(playerReferenceControls.movingLeft && !playerReferenceControls.movingRight) {
			whip[0].transform.position = new Vector3(playerReference.transform.position.x - whipScale.x/2 - playerReference.transform.collider.bounds.size.x/2,
												  	 playerReference.transform.position.y,
												  	 playerReference.transform.position.z);
		}
		//down and right
		else if(playerReferenceControls.movingRight && !playerReferenceControls.movingLeft) {
			whip[0].transform.position = new Vector3(playerReference.transform.position.x + whipScale.x/2 + playerReference.transform.collider.bounds.size.x/2,
											  		 playerReference.transform.position.y,
											  		 playerReference.transform.position.z);
		}
		//just pointing straight down
		else {
			if(!playerReferenceControls.movingLeft && !playerReferenceControls.movingRight && (playerReferenceControls.jumpUsed || playerReferenceControls.isJumping)) {
				whip[0].transform.position = new Vector3(playerReference.transform.position.x,
												  		 playerReference.transform.position.y - whipScale.y/2 - playerReference.transform.collider.bounds.size.y/2,
												  		 playerReference.transform.position.z);
			}
			else {
				//facing left
				if(playerReferenceControls.playerAnimatedImage.transform.localScale.x > 0) {
					whip[0].transform.position = new Vector3(playerReference.transform.position.x - whipScale.x/2 - playerReference.transform.collider.bounds.size.x/2,
													  		 playerReference.transform.position.y,
													  		 playerReference.transform.position.z);
				}
				//facing right
				else {
					whip[0].transform.position = new Vector3(playerReference.transform.position.x + whipScale.x/2 + playerReference.transform.collider.bounds.size.x/2,
													  		 playerReference.transform.position.y,
													  		 playerReference.transform.position.z);
				}
			}
		}
	}
	//if not pressing up or down
	else {
		//if facing left
		if(playerReferenceControls.playerAnimatedImage.transform.localScale.x > 0) {
			whip[0].transform.position = new Vector3(playerReference.transform.position.x - whipScale.x/2 - playerReference.transform.collider.bounds.size.x/2,
								  					playerReference.transform.position.y,
								  					playerReference.transform.position.z);
		}
		//facing right
		else {
			whip[0].transform.position = new Vector3(playerReference.transform.position.x + whipScale.x/2 + playerReference.transform.collider.bounds.size.x/2,
								  					playerReference.transform.position.y,
								  					playerReference.transform.position.z);
		}
	}
	//--------------------------
	
	//resets rotation because only the first portion of the whip needs to be reset with the player
	playerReference.transform.rotation = playerRotation;
	
	//--------- fixes the whip components to only be so far away from the component before it in the whip chain ---------------
	//fixes whip offsets
	var xModifier : float = .5;
	var xResetPoint : float = .5;
	i = 0;
	while(i < whipLength) {
		if(i > 0) {
			//fixes left bounding
			if(whip[i].transform.position.x < whip[i - 1].transform.position.x - whip[i - 1].collider.bounds.size.x) {
				whip[i].transform.position.x = whip[i - 1].transform.position.x - whip[i - 1].collider.bounds.size.x;
			}
			//fixes right bounding
			if(whip[i].transform.position.x > whip[i - 1].transform.position.x + whip[i - 1].collider.bounds.size.x) {
				whip[i].transform.position.x = whip[i - 1].transform.position.x + whip[i - 1].collider.bounds.size.x;
			}
			//fixes top bounding
			if(whip[i].transform.position.y > whip[i - 1].transform.position.y + whip[i - 1].collider.bounds.size.y) {
				whip[i].transform.position.y = whip[i - 1].transform.position.y + whip[i - 1].collider.bounds.size.y;
			}
			//fixes bottom bounding
			if(whip[i].transform.position.y <= whip[i - 1].transform.position.y - whip[i - 1].collider.bounds.size.y) {
				whip[i].transform.position.y = whip[i - 1].transform.position.y - whip[i - 1].collider.bounds.size.y;
				
				//---- fixes drop point movement ----
				if(whip[i].transform.position.x < whip[i - 1].transform.position.x && (whip[i - 1].transform.position.x - whip[i].transform.position.x) > xResetPoint) {
					whip[i].transform.position.x += (whip[i-1].transform.position.x - whip[i].transform.position.x)/2;
				}
				else {
					whip[i].transform.position.x = whip[i-1].transform.position.x;
				}
				if(whip[i].transform.position.x > whip[i - 1].transform.position.x && (whip[i].transform.position.x - whip[i - 1].transform.position.x) > xResetPoint) {
					whip[i].transform.position.x -= (whip[i].transform.position.x - whip[i-1].transform.position.x)/2;
				}
				else {
					whip[i].transform.position.x = whip[i-1].transform.position.x;
				}
			}
		}
		i++;
	}
	//--------------------------
}

function generateWhip() {

	//attaches the whip in world space to the player
	transform.parent = playerReference.transform;
	transform.localPosition=Vector3.zero;
	transform.localRotation=Quaternion.identity;
	
	var i : int = 0;
	var whipPartNewPosition : Vector3;

	var playerRotation : Quaternion = playerReference.transform.rotation;
	playerReference.transform.rotation = Quaternion.identity;
	
	while(i < whipLength) {		 
		whipPartNewPosition = Vector3.zero;
		//if pressing up
		if(playerReferenceControls.pressingUp) {
			//up and left
			if(playerReferenceControls.movingLeft && !playerReferenceControls.movingRight) {
				whipPartNewPosition = new Vector3(playerReference.transform.position.x - whipScale.x/2 - (whipScale.x * i) - playerReference.transform.collider.bounds.size.x/2,
													  playerReference.transform.position.y + whipScale.y/2 + (whipScale.y * i) + playerReference.transform.collider.bounds.size.y/2,
													  playerReference.transform.position.z);
			}
			//up and right
			else if(playerReferenceControls.movingRight && !playerReferenceControls.movingLeft) {
				whipPartNewPosition = new Vector3(playerReference.transform.position.x + whipScale.x/2 + (whipScale.x * i) + playerReference.transform.collider.bounds.size.x/2,
												  playerReference.transform.position.y + whipScale.y/2 + (whipScale.y * i) + playerReference.transform.collider.bounds.size.y/2,
												  playerReference.transform.position.z);
			}
			//just pointing straight up
			else {
				whipPartNewPosition = new Vector3(playerReference.transform.position.x,
												  playerReference.transform.position.y + whipScale.y/2 + (whipScale.y * i) + playerReference.transform.collider.bounds.size.y/2,
												  playerReference.transform.position.z);
			}
		}
		//if pressing down
		else if(playerReferenceControls.pressingDown) {			
			//if(playerReferenceControls.pressingDown && !playerReferenceControls.movingLeft && !playerReferenceControls.movingLeft) {
			//straight down
			if(playerReferenceControls.pressingDown && 
			   !playerReferenceControls.movingLeft && 
			   !playerReferenceControls.movingRight &&
			   (playerReferenceControls.jumpUsed || playerReferenceControls.isJumping)) {
//			   if(playerReferenceControls.jumpUsed) {
		   		whipPartNewPosition = new Vector3(playerReference.transform.position.x,
												  playerReference.transform.position.y - whipScale.y/2 - (whipScale.y * i) - playerReference.transform.collider.bounds.size.y/2,
						  						  playerReference.transform.position.z);	
//			   }
//			   else {
//				   //left down
//				   if(playerReferenceControls.playerAnimatedImage.transform.localScale.x > 0) {
//				   		
//				   }
//				   //right down
//				   else {
//				   		
//				   }
//			   }
			}
			else {
				var downWhipRayHit : RaycastHit;
				//left down
				if(playerReferenceControls.playerAnimatedImage.transform.localScale.x > 0) {
					if (Physics.Raycast(playerReference.transform.position, -Vector3.up, downWhipRayHit)) {
						if(downWhipRayHit.distance < whipScale.y*whip.Length) {
							whipPartNewPosition = new Vector3(playerReference.transform.position.x - whipScale.x/2 - (whipScale.x * i) - playerReference.transform.collider.bounds.size.x/2,
															  playerReference.transform.position.y - (parseFloat(downWhipRayHit.distance/whipLength) * i),
															  playerReference.transform.position.z);
						}
						else {
							//down and left
							whipPartNewPosition = new Vector3(playerReference.transform.position.x - whipScale.x/2 - (whipScale.x * i) - playerReference.transform.collider.bounds.size.x/2,
															  playerReference.transform.position.y - (whipScale.y * i),
															  playerReference.transform.position.z);	
						}
					}
				}
				//right down
				else {
					if (Physics.Raycast(playerReference.transform.position, -Vector3.up, downWhipRayHit)) {
						if(downWhipRayHit.distance < whipScale.y*whip.Length) {
							//fix the collision to be a certain size for each whip vector
							whipPartNewPosition = new Vector3(playerReference.transform.position.x + whipScale.x/2 + (whipScale.x * i) + playerReference.transform.collider.bounds.size.x/2,
															  playerReference.transform.position.y - (parseFloat(downWhipRayHit.distance/whipLength) * i),
															  playerReference.transform.position.z);
						}
						else {
							//down and right
							whipPartNewPosition = new Vector3(playerReference.transform.position.x + whipScale.x/2 + (whipScale.x * i) + playerReference.transform.collider.bounds.size.x/2,
															  playerReference.transform.position.y - (whipScale.y * i),
															  playerReference.transform.position.z);
						}
					}
				}
			}
		}
		//if not pressing down or up
		else {
			if(playerReferenceControls.playerAnimatedImageGameObject.transform.localScale.x > 0) {
				whipPartNewPosition = new Vector3(playerReference.transform.position.x - whipScale.x/2 - (whipScale.x * i) - playerReference.transform.collider.bounds.size.x/2,
													  playerReference.transform.position.y,
													  playerReference.transform.position.z);
			}
			else {
				whipPartNewPosition = new Vector3(playerReference.transform.position.x + whipScale.x/2 + (whipScale.x * i) + playerReference.transform.collider.bounds.size.x/2,
												  playerReference.transform.position.y,
												  playerReference.transform.position.z);
			}
		}
		
		//instantiates sphere
		whip[i] = GameObject.CreatePrimitive(PrimitiveType.Sphere);
		
		//attaches whip point to the whip in world space
		whip[i].transform.parent = transform;
		whip[i].transform.localPosition=Vector3.zero;
		whip[i].transform.localRotation=Quaternion.identity;
		
		//adds the rigid body to the sphere
		whip[i].AddComponent(Rigidbody);
		whip[i].GetComponent(Rigidbody).useGravity = false;
		whip[i].GetComponent(Rigidbody).constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationY | RigidbodyConstraints.FreezeRotationZ | RigidbodyConstraints.FreezePositionZ;
		
		//names the sphere
		whip[i].name = "WhipPart";
						  					
		//sets the position of the sphere
		whip[i].transform.position = whipPartNewPosition;
		Physics.IgnoreCollision(whip[i].collider, playerReference.collider);
		i++;
	}
	
	playerReference.transform.rotation = playerRotation;
}

function destroyWhip() {
	var i : int = 0;
	while(i < whipLength) {
		Destroy(whip[i]);
		whip[i] = null;	
		i++;
	}
}

function changeWhipLength() {
	//TODO: Change whip length
}
