#pragma strict

var titleScreenState : int = 0;
var flashTimer : int = 0;
var flashTimerMax : int = 10;
var displayFlashingText : boolean = true;

var menuSelectionHighlighted : int = 0;
var menuSelectionMax : int = 3;

var gameTitle : GUIText;
var pressStartText : GUIText;

var menuStateOneFirstText : GUIText;
var menuStateOneSeconedText : GUIText;
var menuStateOneThirdText : GUIText;
var menuStateOneFourthText : GUIText;

var gameStateObject : GameObject;
var gameStateManager : GameDataStateManager;

function Start () {
	gameStateObject = GameObject.Find("GameDataStateManager");
	gameStateManager = gameStateObject.GetComponent(typeof(GameDataStateManager));
}

function Update () {
	processKeyboardInput();
	manageTitleScreenText();
}

function processKeyboardInput() {
	//select button
	if(Input.GetKeyDown("return")) {
		switch(titleScreenState) {
			case(0):
				titleScreenState = 1;
				displayFlashingText = true;
				flashTimer = 0;
				menuSelectionHighlighted = 0;
			break;
			case(1):
				switch(menuSelectionHighlighted){
					case(0):
						gameStateManager.gameModeSelected = 1;
						Application.LoadLevel("TestGameLoadDataScene");
						//go to new game
					break;
					case(1):
						//go to load game screen for the story
						gameStateManager.gameModeSelected = 1;
						Application.LoadLevel("TestGameLoadDataScene");
					break;
					case(2):
						//go to the load game screen for free play
						gameStateManager.gameModeSelected = 2;
						Application.LoadLevel("TestGameLoadDataScene");
					break;
					case(3):
						//go to the options screen
					break;
				}
			break;
		}
	}
	//back/cancel player
	if(Input.GetKeyDown("escape")) {
		switch(titleScreenState) {
			case(0):
			break;
			case(1):
				titleScreenState = 0;
				displayFlashingText = true;
				flashTimer = 0;
				menuSelectionHighlighted = 0;
			break;
		}
	}
	//up keypress
	if(Input.GetKeyDown(KeyCode.UpArrow) || Input.GetKeyDown(KeyCode.W)) {
		switch(titleScreenState) {
			case(0):
			break;
			case(1):
				menuSelectionHighlighted--;
			break;
		}
	}
	//down keypress
	if(Input.GetKeyDown(KeyCode.DownArrow) || Input.GetKeyDown(KeyCode.S)) {
		switch(titleScreenState) {
			case(0):
			break;
			case(1):
				menuSelectionHighlighted++;
			break;
		}
	}
	//left keypress
	if(Input.GetKeyDown(KeyCode.LeftArrow) || Input.GetKeyDown(KeyCode.D)) {
		switch(titleScreenState) {
			case(0):
			break;
			case(1):
				menuSelectionHighlighted++;
			break;
		}
	}
	//right keypress
	if(Input.GetKeyDown(KeyCode.RightArrow) || Input.GetKeyDown(KeyCode.A)) {
		switch(titleScreenState) {
			case(0):
			break;
			case(1):
				menuSelectionHighlighted--;
			break;
		}
	}
	
	//rolls around the selection on the menu if it's less than the first one
	if(menuSelectionHighlighted < 0) {
		menuSelectionHighlighted = menuSelectionMax;
	}
	if(menuSelectionHighlighted > menuSelectionMax) {
		menuSelectionHighlighted = 0;
	}
}

function manageTitleScreenText() {
	flashTimer++;
	if(flashTimer > flashTimerMax) {
		flashTimer = 0;
		if(displayFlashingText) {
			displayFlashingText = false;
		}
		else {
			displayFlashingText = true;
		}
	}
	
	switch(titleScreenState) {
		case(0):
			pressStartText.text =  "Press Start";
			menuStateOneFirstText.text = "";
			menuStateOneSeconedText.text = "";
			menuStateOneThirdText.text = "";
			menuStateOneFourthText.text = "";

			if(displayFlashingText) {
				pressStartText.text =  "";
			}
			else {
				pressStartText.text = "Press Start";
			}
		break;
		case(1):
			switch(menuSelectionHighlighted) {
				case(0):
					if(displayFlashingText) {
						menuStateOneFirstText.text = "New Game";
					}
					else {
						menuStateOneFirstText.text = "";
					}
					menuStateOneSeconedText.text = "Load Game";
					menuStateOneThirdText.text = "Free Play";
					menuStateOneFourthText.text = "Options";
				break;
				case(1):
					if(displayFlashingText) {
						menuStateOneSeconedText.text = "Load Game";
					}
					else {
						menuStateOneSeconedText.text = "";
					}
					menuStateOneFirstText.text = "New Game";
					menuStateOneThirdText.text = "Free Play";
					menuStateOneFourthText.text = "Options";
				break;
				case(2):
					if(displayFlashingText) {
						menuStateOneThirdText.text = "Free Play";
					}
					else {
						menuStateOneThirdText.text = "";
					}
					menuStateOneFirstText.text = "New Game";
					menuStateOneSeconedText.text = "Load Game";
					menuStateOneFourthText.text = "Options";
				break;
				case(3):
					if(displayFlashingText) {
						menuStateOneFourthText.text = "Options";
					}
					else {
						menuStateOneFourthText.text = "";
					}
					menuStateOneFirstText.text = "New Game";
					menuStateOneSeconedText.text = "Load Game";
					menuStateOneThirdText.text = "Free Play";
				break;
			}
			pressStartText.text = "";
		break;
	}
}