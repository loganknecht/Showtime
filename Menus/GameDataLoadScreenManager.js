#pragma strict
var gameModeObject : GameObject;
var gameModeOutline : GameObject;
var gameModeText : GUIText;

var copyDataObject : GameObject;
var copyDataOutline : GameObject;
var copyDataText : GUIText;

var deleteDataObject : GameObject;
var deleteDataOutline : GameObject;
var deleteDataText : GUIText;

var saveDataOneObject : GameObject;
var saveDataOneOutline : GameObject;
var saveDataOneActText : GUIText;
var saveDataOnePlayerName : GUIText;
var saveDataOneConfirmOutline : GameObject;
var saveDataOneConfirmText : GUIText;
var saveDataOneConfirmYesTextOutline : GameObject;
var saveDataOneConfirmYesText : GUIText;
var saveDataOneConfirmNoTextOutline : GameObject;
var saveDataOneConfirmNoText : GUIText;

var saveDataTwoObject : GameObject;
var saveDataTwoOutline : GameObject;
var saveDataTwoActText : GUIText;
var saveDataTwoPlayerName : GUIText;
var saveDataTwoConfirmOutline : GameObject;
var saveDataTwoConfirmText : GUIText;
var saveDataTwoConfirmYesTextOutline : GameObject;
var saveDataTwoConfirmYesText : GUIText;
var saveDataTwoConfirmNoTextOutline : GameObject;
var saveDataTwoConfirmNoText : GUIText;


var selectionHighlighted : int = 0;
var selectionMax : int = 3;

var saveDataOneConfirmYesHighlighted : boolean = false;
var saveDataOneConfirmNoHighlighted : boolean = false;

var saveDataTwoConfirmYesHighlighted : boolean = false;
var saveDataTwoConfirmNoHighlighted : boolean = false;


var gameStateObject : GameObject;
var gameStateManager : GameDataStateManager;

//load screen state selection
// 0 - regular highlighter, 
// 1 - are you sure you want to load this?

// 2 - select what to copy
// 3 - select where to copy too

// 4 - selecting  which to delete
// 5 - are you sure you want to delete
var loadScreenState : int = 0;

var flashTimer : int = 0;
var flashTimerMax : int = 10;
var flashShowing : boolean = false;

function Start() {
	gameStateObject = GameObject.Find("GameDataStateManager");
	gameStateManager = gameStateObject.GetComponent(typeof(GameDataStateManager));
}

function Update() {
	manageKeyboardInput();
	drawLoadScreen();
}

function manageKeyboardInput() {
	//select button
	if(Input.GetKeyDown("return")) {
		switch(loadScreenState) {
			case(0):
				switch(selectionHighlighted) {
					case(0):
						loadScreenState = 1;
						saveDataOneConfirmYesHighlighted = false;
						saveDataOneConfirmNoHighlighted = true;
						break;
					case(1):
						loadScreenState = 1;
						saveDataTwoConfirmYesHighlighted = false;
						saveDataTwoConfirmNoHighlighted = true;
					break;
					case(2):
						loadScreenState = 2;
					break;
					case(3):
						loadScreenState = 4;
					break;
				}
			break;
			case(1):
				if(selectionHighlighted == 0) {
					if(saveDataOneConfirmYesHighlighted){
						Application.LoadLevel("AltPhysicsScene");
					}
					else if(saveDataOneConfirmNoHighlighted){
						loadScreenState = 0;
						setDataOneConfirmVisible(false);
					}
				}
				else if(selectionHighlighted == 1) {
					if(saveDataTwoConfirmYesHighlighted){
						Application.LoadLevel("AltPhysicsScene");
					}
					else if(saveDataTwoConfirmNoHighlighted){
						loadScreenState = 0;
						setDataTwoConfirmVisible(false);
					}
				}
			break;
			case(2):
			break;
			case(3):
			break;
			case(4):
			break;
			case(5):
			break;
		}
	}
	//back/cancel player
	if(Input.GetKeyDown("escape")) {
		switch(loadScreenState) {
			case(0):
				Application.LoadLevel("TestGameTitleScene");
			break;
			case(1):
				loadScreenState = 0;
			break;
			case(2):
				loadScreenState = 0;
			break;
			case(3):
			break;
			case(4):
				loadScreenState = 0;
			break;
			case(5):
			break;
		}
	}
	//up keypress
	if(Input.GetKeyDown(KeyCode.UpArrow) || Input.GetKeyDown(KeyCode.W)) {
		switch(loadScreenState) {
			case(0):
				selectionHighlighted--;
			break;
			case(1):
				if(selectionHighlighted == 0) {
					if(saveDataOneConfirmYesHighlighted) {
						saveDataOneConfirmYesHighlighted = false;
						saveDataOneConfirmNoHighlighted = true;
					}
					else if(saveDataOneConfirmNoHighlighted) {
						saveDataOneConfirmYesHighlighted = true;
						saveDataOneConfirmNoHighlighted = false;
					}
				}
				else if(selectionHighlighted == 1) {
					if(saveDataTwoConfirmYesHighlighted) {
						saveDataTwoConfirmYesHighlighted = false;
						saveDataTwoConfirmNoHighlighted = true;
					}
					else if(saveDataTwoConfirmNoHighlighted) {
						saveDataTwoConfirmYesHighlighted = true;
						saveDataTwoConfirmNoHighlighted = false;
					}
				}
			break;
			case(2):
				selectionHighlighted--;
			break;
			case(3):
			break;
			case(4):
				selectionHighlighted--;
			break;
			case(5):
			break;
		}
	}
	//down keypress
	if(Input.GetKeyDown(KeyCode.DownArrow) || Input.GetKeyDown(KeyCode.S)) {
		switch(loadScreenState) {
			case(0):
				selectionHighlighted++;
			break;
			case(1):
				if(selectionHighlighted == 0) {
					if(saveDataOneConfirmYesHighlighted) {
						saveDataOneConfirmYesHighlighted = false;
						saveDataOneConfirmNoHighlighted = true;
					}
					else if(saveDataOneConfirmNoHighlighted) {
						saveDataOneConfirmYesHighlighted = true;
						saveDataOneConfirmNoHighlighted = false;
					}
				}
				else if(selectionHighlighted == 1) {
					if(saveDataTwoConfirmYesHighlighted) {
						saveDataTwoConfirmYesHighlighted = false;
						saveDataTwoConfirmNoHighlighted = true;
					}
					else if(saveDataTwoConfirmNoHighlighted) {
						saveDataTwoConfirmYesHighlighted = true;
						saveDataTwoConfirmNoHighlighted = false;
					}
				}
			break;
			case(2):
				selectionHighlighted++;
			break;
			case(3):
			break;
			case(4):
				selectionHighlighted++;
			break;
			case(5):
			break;
		}
	}
	//left keypress
	if(Input.GetKeyDown(KeyCode.LeftArrow) || Input.GetKeyDown(KeyCode.A)) {
		switch(loadScreenState) {
			case(0):
				selectionHighlighted--;
			break;
			case(1):
				if(selectionHighlighted == 0) {
					if(saveDataOneConfirmYesHighlighted) {
						saveDataOneConfirmYesHighlighted = false;
						saveDataOneConfirmNoHighlighted = true;
					}
					else if(saveDataOneConfirmNoHighlighted) {
						saveDataOneConfirmYesHighlighted = true;
						saveDataOneConfirmNoHighlighted = false;
					}
				}
				else if(selectionHighlighted == 1) {
					if(saveDataTwoConfirmYesHighlighted) {
						saveDataTwoConfirmYesHighlighted = false;
						saveDataTwoConfirmNoHighlighted = true;
					}
					else if(saveDataTwoConfirmNoHighlighted) {
						saveDataTwoConfirmYesHighlighted = true;
						saveDataTwoConfirmNoHighlighted = false;
					}
				}
			break;
			case(2):
				selectionHighlighted--;
			break;
			case(3):
			break;
			case(4):
				selectionHighlighted--;
			break;
			case(5):
			break;
		}
	}
	//right keypress
	if(Input.GetKeyDown(KeyCode.RightArrow) || Input.GetKeyDown(KeyCode.D)) {
		switch(loadScreenState) {
			case(0):
				selectionHighlighted++;
			break;
			case(1):
				if(selectionHighlighted == 0) {
					if(saveDataOneConfirmYesHighlighted) {
						saveDataOneConfirmYesHighlighted = false;
						saveDataOneConfirmNoHighlighted = true;
					}
					else if(saveDataOneConfirmNoHighlighted) {
						saveDataOneConfirmYesHighlighted = true;
						saveDataOneConfirmNoHighlighted = false;
					}
				}
				else if(selectionHighlighted == 1) {
					if(saveDataTwoConfirmYesHighlighted) {
						saveDataTwoConfirmYesHighlighted = false;
						saveDataTwoConfirmNoHighlighted = true;
					}
					else if(saveDataTwoConfirmNoHighlighted) {
						saveDataTwoConfirmYesHighlighted = true;
						saveDataTwoConfirmNoHighlighted = false;
					}
				}
			break;
			case(2):
				selectionHighlighted++;
			break;
			case(3):
			break;
			case(4):
				selectionHighlighted++;
			break;
			case(5):
			break;
		}
	}
	
	//rolls around the selection on the menu if it's less than the first one
	if(selectionHighlighted < 0) {
		selectionHighlighted = selectionMax;
	}
	if(selectionHighlighted > selectionMax) {
		selectionHighlighted = 0;
	}
	
	flashTimer++;
	if(flashTimer > flashTimerMax) {
		if(flashShowing) {
			flashShowing = false;	
		}
		else {
			flashShowing = true;	
		}
		flashTimer = 0;
	}
}

function drawLoadScreen() {
	switch(loadScreenState) {
		case(0):
			switch(selectionHighlighted) {
				case(0):
					if(flashShowing) {
						saveDataOneOutline.renderer.enabled = true;
					}
					else {
						saveDataOneOutline.renderer.enabled = false;
					}
					saveDataTwoOutline.renderer.enabled = true;
					copyDataOutline.renderer.enabled = true;
					deleteDataOutline.renderer.enabled = true;
				break;
				case(1):
					saveDataOneOutline.renderer.enabled = true;
					if(flashShowing) {
						saveDataTwoOutline.renderer.enabled = true;
					}
					else {
						saveDataTwoOutline.renderer.enabled = false;
					}
					copyDataOutline.renderer.enabled = true;
					deleteDataOutline.renderer.enabled = true;
				break;
				case(2):
					saveDataOneOutline.renderer.enabled = true;
					saveDataTwoOutline.renderer.enabled = true;
					if(flashShowing) {
						copyDataOutline.renderer.enabled = true;
					}
					else {
						copyDataOutline.renderer.enabled = false;
					}
					deleteDataOutline.renderer.enabled = true;
				break;
				case(3):
					saveDataOneOutline.renderer.enabled = true;
					saveDataTwoOutline.renderer.enabled = true;
					copyDataOutline.renderer.enabled = true;
					if(flashShowing) {
						deleteDataOutline.renderer.enabled = true;
					}
					else {
						deleteDataOutline.renderer.enabled = false;
					}
				break;
			}
			
			saveDataOneActText.text = "Act: ";
			saveDataOnePlayerName.text = "Player Name: ";
			saveDataTwoActText.text = "Act: ";
			saveDataTwoPlayerName.text = "Player Name: ";
			
			copyDataText.text = "Copy Save";
			deleteDataText.text = "Delete Save";
			
			setDataOneConfirmVisible(false);
			setDataTwoConfirmVisible(false);
		break;
		case(1):
			if(selectionHighlighted == 0) {
				setDataOneConfirmVisible(true);
				if(saveDataOneConfirmYesHighlighted) {
					if(flashShowing) {
						saveDataOneConfirmYesTextOutline.renderer.enabled = true;
					}
					else {
						saveDataOneConfirmYesTextOutline.renderer.enabled = false;
					}
					saveDataOneConfirmNoTextOutline.renderer.enabled = true;
				}
				if(saveDataOneConfirmNoHighlighted) {
					if(flashShowing) {
						saveDataOneConfirmNoTextOutline.renderer.enabled = true;
					}
					else {
						saveDataOneConfirmNoTextOutline.renderer.enabled = false;
					}
					saveDataOneConfirmYesTextOutline.renderer.enabled = true;			
				}
				setDataTwoConfirmVisible(false);
			}
			else if(selectionHighlighted == 1) {
				setDataTwoConfirmVisible(true);
				if(saveDataTwoConfirmYesHighlighted) {
					if(flashShowing) {
						saveDataTwoConfirmYesTextOutline.renderer.enabled = true;
					}
					else {
						saveDataTwoConfirmYesTextOutline.renderer.enabled = false;
					}
					saveDataTwoConfirmNoTextOutline.renderer.enabled = true;
				}
				if(saveDataTwoConfirmNoHighlighted) {
					if(flashShowing) {
						saveDataTwoConfirmNoTextOutline.renderer.enabled = true;
					}
					else {
						saveDataTwoConfirmNoTextOutline.renderer.enabled = false;
					}
					saveDataTwoConfirmYesTextOutline.renderer.enabled = true;			
				}
				setDataOneConfirmVisible(false);
			}
			saveDataOneOutline.renderer.enabled = true;
			saveDataTwoOutline.renderer.enabled = true;
		break;
		case(2):
		break;
		case(3):
		break;
		case(4):
		break;
		case(5):
		break;
	}
	
	switch(gameStateManager.gameModeSelected) {
		case(0):
			gameModeText.text = "Game Mode";
		break;
		case(1):
			gameModeText.text = "Story Mode";
		break;
		case(2):
			gameModeText.text = "Free Play";
		break;
	}
}

function setDataOneConfirmVisible(isVisible) {
	if(isVisible) {
		saveDataOneConfirmOutline.renderer.enabled = true;
		saveDataOneConfirmYesTextOutline.renderer.enabled = true;
		saveDataOneConfirmNoTextOutline.renderer.enabled = true;
		saveDataOneConfirmText.enabled = true;
		saveDataOneConfirmYesText.enabled = true;
		saveDataOneConfirmNoText.enabled = true;
	}
	else {
		saveDataOneConfirmOutline.renderer.enabled = false;
		saveDataOneConfirmYesTextOutline.renderer.enabled = false;
		saveDataOneConfirmNoTextOutline.renderer.enabled = false;
		saveDataOneConfirmText.enabled = false;
		saveDataOneConfirmYesText.enabled = false;
		saveDataOneConfirmNoText.enabled = false;
		saveDataOneConfirmYesHighlighted = false;
		saveDataOneConfirmNoHighlighted = false;
	}
}

function setDataTwoConfirmVisible(isVisible) {
	if(isVisible) {
		saveDataTwoConfirmOutline.renderer.enabled = true;
		saveDataTwoConfirmYesTextOutline.renderer.enabled = true;
		saveDataTwoConfirmNoTextOutline.renderer.enabled = true;
		saveDataTwoConfirmText.enabled = true;
		saveDataTwoConfirmYesText.enabled = true;
		saveDataTwoConfirmNoText.enabled = true;
	}
	else {
		saveDataTwoConfirmOutline.renderer.enabled = false;
		saveDataTwoConfirmYesTextOutline.renderer.enabled = false;
		saveDataTwoConfirmNoTextOutline.renderer.enabled = false;
		saveDataTwoConfirmText.enabled = false;
		saveDataTwoConfirmYesText.enabled = false;
		saveDataTwoConfirmNoText.enabled = false;
		saveDataTwoConfirmYesHighlighted = false;
		saveDataTwoConfirmNoHighlighted = false;
	}
}