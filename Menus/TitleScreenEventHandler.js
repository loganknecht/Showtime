#pragma strict

var titleScreenState : int = 0;
var flashTimer : int = 0;
var flashTimerMax : int = 10;
var displayFlashingText : boolean = true;

var gameTitle : GUIText;
var flashingPressStartText : GUIText;

function Start () {
}

function Update () {
	processPlayerKeyInput();
	manageTitleScreenText();
}

function processPlayerKeyInput() {
	if(Input.GetKeyDown("return")) {
		switch(titleScreenState) {
			case(0):
				titleScreenState = 1;
				//Application.LoadLevel("Sandbox");
			break;
		}
		Application.LoadLevel("TestGameLevelOne");
	}
	if(Input.GetKeyDown("escape")) {
		switch(titleScreenState) {
			case(0):
			break;
			case(1):
				titleScreenState = 0;
			break;
		}
	}
}

function manageTitleScreenText() {
	switch(titleScreenState) {
		case(0):
			//gameTitle.text = gameTitleString;
			flashTimer++;
			if(flashTimer > flashTimerMax) {
				flashTimer = 0;
				if(displayFlashingText) {
					displayFlashingText = false;
					flashingPressStartText.text = "";
				}
				else {
					displayFlashingText = true;
					flashingPressStartText.text =  "Press Start to Play";
				}
			}
		break;
		case(1):
		break;
	}
}