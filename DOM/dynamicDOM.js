// Michael Wilson
// This is the javascript that does all of the work

// array of colors that can be used
var colors = ["blue", "yellow", "orange", "green", "purple", "red", "black", "white", "lightgreen"];

// boolean that will see if we are adding to a div or not
var inDiv = false;

// keeps count of the divs made, used to id purposes
var divCount = 0;

window.onload = function() {	
	setUp();
	linkButtons();
}

// function that deals with the set up of the program
function setUp() {
	// make a table of colors
	var table = document.createElement("table");
	for(var i = 0; i < colors.length; i+=3) {
		var row = document.createElement("tr");
		
		for(var j = 0; j < 3; j++) {
			var data = document.createElement("td");		
			data.style.backgroundColor = colors[i + j];	
			//add a click event
			data.onclick = function() {
				document.getElementById("phrase").style.color = this.style.backgroundColor;
			}

			row.appendChild(data);
		}		
		table.appendChild(row);
	}
	document.getElementById("color-selector").appendChild(table);	
}


// This is a function that will link button clicking events to buttons
// @param - The id of the button
// @param - The element to be created
function linkButtons() {	
	document.getElementById("add-text-element").onclick = function() {
		var element = document.getElementById("text-options").value;
		makeElement(element);
	}

	document.getElementById("add-background-element").onclick = function() {
		document.getElementById("webPage").style.backgroundColor = document.getElementById("background-color-options").value;
	}

	// loop through each DOM under webpage and apply light border
	document.getElementById("show-divide").onchange = function() {
		var children = document.getElementById("webPage").children;
		for(var i = 0; i < children.length; i++) {			
			if(document.getElementById("show-divide").checked) {
				children[i].style.border = "1px dashed black";
			} else {
				children[i].style.border = "none";
			}			 
		}
	}

	document.getElementById("add-div").onchange = function() {
		if(document.getElementById("add-div").checked) {
			alert("WARNING!\nAdding a div so every element will be nested in div until div is unchecked");
			// create the div
			var div = document.createElement("div");
			divCount++;
			div.id = "div" + divCount;
			document.getElementById("webPage").appendChild(div);			
			inDiv = true;
		} else {
			inDiv = false;
		}		
	}

	document.getElementById("clear").onclick = function() {
		var node = document.getElementById("webPage");
		while(node.firstChild) {
			node.removeChild(node.firstChild);
		}
	}
}


function makeElement(element){
	// grab the phrase that pays
	var src = document.getElementById("phrase")
	var text = src.value;		
	var toCreate = document.createElement(element);	

	// applies all styles to element
	toCreate.style.cssText = src.style.cssText;
	toCreate.innerHTML = text;
	if(!inDiv) {
		var tag = document.getElementById("webPage");
		tag.appendChild(toCreate);
	} else {		
		var id = "div" + divCount;
		var tag = document.getElementById(id);
		tag.appendChild(toCreate);
	}
}

function italic() {
	if(document.getElementById("italic").checked) {
		document.getElementById("phrase").style.fontStyle = "italic";
	} else {
		document.getElementById("phrase").style.fontStyle = "normal";
	}	
}

function bold() {
	if(document.getElementById("bold").checked) {
		document.getElementById("phrase").style.fontWeight = "bold";
	} else {
		document.getElementById("phrase").style.fontWeight = "normal";
	}
}
