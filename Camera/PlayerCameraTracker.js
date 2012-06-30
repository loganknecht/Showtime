#pragma strict
var playerReference : GameObject;

function Start () {

}

function Update () {
	var newPosition : Vector3 = new Vector3(playerReference.transform.position.x, playerReference.transform.position.y, playerReference.transform.position.z - 20);
	transform.position = newPosition;
}

