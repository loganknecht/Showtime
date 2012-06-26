#pragma strict
var moveSpeed : int;

function Start () {

}

function Update () {
	if(Input.GetKey("a")) {
		transform.Translate(new Vector3(-moveSpeed,0, 0) * Time.deltaTime);
	}
	if(Input.GetKey("d")) {
		transform.Translate(new Vector3(moveSpeed, 0, 0) * Time.deltaTime);
	}
	if(Input.GetKey("w")) {
		transform.Translate(new Vector3(0, moveSpeed, 0) * Time.deltaTime);
	}
	if(Input.GetKey("s")) {
		transform.Translate(new Vector3(0, -moveSpeed, 0) * Time.deltaTime);
	}
}