#pragma strict
//0 - no game mode selected or game reset
//1 - story mode new game/load game doesn't matter
//2 - free play
var gameModeSelected : int = 0;

function Awake () {
	DontDestroyOnLoad (this);
	Application.LoadLevel("TestGameTitleScene");
}

function Start () {
}

function Update () {

}

function resetState() {
	gameModeSelected = 0;
}