
// Copyright 2011 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var canvas;
var context;
var tailleShadow;
var objet;
var images = {};
var positionX = {};
var positionY = {};
var nomDossier;
var totalResources = 8;
var numResourcesLoaded = 0;
var fps = 30;
var x = 0;
var y = 100;
var breathInc = 0.1;
var breathDir = 1;
var breathAmt = 0;
var breathMax = 2;
var breathInterval = setInterval(updateBreath, 1000 / fps);
var maxEyeHeight = 14;
var curEyeHeight = maxEyeHeight;
var eyeOpenTime = 0;
var timeBtwBlinks = 4000;
var blinkUpdateTime = 200;                    
var blinkTimer = setInterval(updateBlink, blinkUpdateTime);
var fpsInterval = setInterval(updateFPS, 1000);
var numFramesDrawn = 0;
var curFPS = 0;
var saut = false;
var hauteurSaut = 45;
var loadObjetmain = {};
var maxPos = 500;
var ii = 0;
var mouvement = false;
var unique = false;

loadObjetmain['sabre']=0;




function updateFPS() {
	
	curFPS = numFramesDrawn;
	numFramesDrawn = 0;
}

function prepareCanvas(canvasDiv, canvasWidth, canvasHeight, folderName)
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	
        x = 0;
        y = 100;
        
        nomDossier = folderName;
	if(typeof G_vmlCanvasManager !== 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
        loadImage("leftArm", folderName);
	loadImage("leg", folderName);
	loadImage("torso", folderName);
	loadImage("rightArm", folderName);
	loadImage("head", folderName);
	loadImage("hair", folderName);
        loadImage('leg-saut', "Pirate");
        loadImage('sabre-pirate','Objets');
        loadImage('parchemin-pirate','Objets');

        
        redraw();
}

// Fait apparaitre l'objet dans la main du hero
function loadObjet(name){
    objet = name;
}

// Fait apparaitre les images du corps du hero
function loadImage(name, folderName) {
  
  images[name] = new Image();
  images[name].onload = function() { 
	  resourceLoaded(name, folderName);
  };
  if (folderName === "Objets"){
      images[name].src = "Media_Visuel/"+ folderName +"/"+ name + ".png";
  }else {
    images[name].src = "Media_Visuel/Personnage/" + folderName + "/" + name + ".png";
  }
}

function resourceLoaded(name, folderName) {

  
  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {
       if(folderName === "Pirate"){
            positionX["rightArm"] = 260;
            positionY["rightArm"] = 235;
            positionX["leftArm"] = 135;
            positionY["leftArm"] = 235;
            positionX["hair"] = 70;
            positionY["hair"] = 0;
            positionX["head"] = 180;
            positionY["head"] = 105;
            positionX["torso"] = 190;
            positionY["torso"] = 230;
            positionX["leg"] = 180;
            positionY["leg"] = 370;
            positionX["leg-saut"] = 135;
            positionX["shadow"] = 250;
            positionY["shadow"] = 475;
            positionX["eyeLeft"] = 265;
            positionY["eyeLeft"] = 180;
            positionX["eyeRight"] = 265;
            positionY["eyeRight"] = 180;
            
       } else 
           if(folderName ==="Dinosaure"){
            positionX["rightArm"] = 320;
            positionY["rightArm"] = 290;
            positionX["leftArm"] = 300;
            positionY["leftArm"] = 300;
            positionX["hair"] = 10;
            positionY["hair"] = 235;
            positionX["head"] = 290;
            positionY["head"] = 135;
            positionX["torso"] = 200;
            positionY["torso"] = 230;
            positionX["leg"] = 230;
            positionY["leg"] = 330;
            positionX["legLeft"] = 210;
            positionY["legLeft"] = 330;
            positionX["eyeLeft"] = 420;
            positionY["eyeLeft"] = 215;
            positionX["eyeRight"] = 400;
            positionY["eyeRight"] = 215;
            positionX["shadow"] = 250;
            positionY["shadow"] = 445;
            
       }
	setInterval(redraw, 1000 / fps);
  }
        if(folderName === "Objets"){
            if(name === "sabre-pirate"){
               positionX["sabre"] = 360;
               positionY["sabre"] = 70;
           }
            if(name === "parchemin-pirate"){
               positionX["parchemin"] = 370;
               positionY["parchemin"] = 220;
           }
       }

}

function redraw() {
	
    if (mouvement){
        if (ii < maxPos){
        ii = ii + 10;
        x = x + 10;
        }
    } else {
        if (!unique){
            setTimeout(bouge, 2000);
        }
    }
    y = 100;                   
    canvas.width = canvas.width; // clears the canvas
  
    if (nomDossier === "Pirate"){
                        // Taille de l'ombre
        tailleShadow = 300;
        // Ombres de saut et au sol
        if (saut){
            tailleShadow -= 80;
            drawEllipse(x + positionX["shadow"], y + positionY["shadow"], tailleShadow - breathAmt, 6);
        } else {
            drawEllipse(x + positionX["shadow"], y + positionY["shadow"], tailleShadow - breathAmt, 6);
        }
        // Déplacement du personnage en hauteur
        if (saut){
            y -= hauteurSaut;
        }
        // Affichage des jambes de saut et au sol
        if (saut){
            context.drawImage(images["leg-saut"], x + positionX["leg-saut"] , y + positionY["leg"]);
        } else {
            context.drawImage(images["leg"], x + positionX["leg"] , y + positionY["leg"]);
        }
        
        // Affichage du corp
        context.drawImage(images["rightArm"], x + positionX["rightArm"], y + positionY["rightArm"] - breathAmt);
        context.drawImage(images["leftArm"], x + positionX["leftArm"] , y + positionY["leftArm"] - breathAmt);
        context.drawImage(images["torso"], x + positionX["torso"] , y + positionY["torso"]);
        context.drawImage(images["head"], x + positionX["head"] , y + positionY["head"]  - breathAmt);
        context.drawImage(images["hair"], x + positionX["hair"] , y + positionY["hair"]  - breathAmt); 
  
        drawEllipse(x + positionX["eyeLeft"], y + positionY["eyeLeft"] - breathAmt, 17, curEyeHeight); // Left Eye
        drawEllipse(x + positionX["eyeRight"], y + positionY["eyeRight"] - breathAmt, 17, curEyeHeight); // Right Eye
 
    } else 
    if (nomDossier === "Dinosaure") {
        // Taille de l'ombre
        tailleShadow = 570;
        // ombre
        drawEllipse(x + positionX["shadow"], y + positionY["shadow"], tailleShadow - breathAmt, 6); // Shadow

        context.drawImage(images["hair"], x + positionX["hair"] , y + positionY["hair"]  - breathAmt); 
        context.drawImage(images["leftArm"], x + positionX["leftArm"] , y + positionY["leftArm"] - breathAmt);
        context.drawImage(images["torso"], x + positionX["torso"] , y + positionY["torso"] - breathAmt);
        context.drawImage(images["head"], x + positionX["head"] , y + positionY["head"]  - breathAmt);
        context.drawImage(images["rightArm"], x + positionX["rightArm"], y + positionY["rightArm"] - breathAmt);
        context.drawImage(images["leg"], x + positionX["leg"] , y + positionY["leg"] - breathAmt);
  

        drawEllipse(x + positionX["eyeLeft"], y + positionY["eyeLeft"] - breathAmt, 17, curEyeHeight); // Left Eye
        drawEllipse(x + positionX["eyeRight"], y + positionY["eyeRight"] - breathAmt, 17, curEyeHeight); // Right Eye
  }
    if(objet === "sabre-pirate"){
        context.drawImage(images[objet], x + positionX["sabre"] , y + positionY["sabre"]- breathAmt);
    }
    if(objet === "parchemin-pirate"){
        context.drawImage(images[objet], x + positionX["parchemin"] , y + positionY["parchemin"]- breathAmt);
        
    }
  context.font = "bold 12px sans-serif";
  context.fillText("fps: " + curFPS + "/" + fps + " (" + numFramesDrawn + ")", 10, 600);
  ++numFramesDrawn;
}
function drawEllipse(centerX, centerY, width, height) {

  context.beginPath();
  
  context.moveTo(centerX, centerY - height/2);
  
  context.bezierCurveTo(
	centerX + width/2, centerY - height/2,
	centerX + width/2, centerY + height/2,
	centerX, centerY + height/2);

  context.bezierCurveTo(
	centerX - width/2, centerY + height/2,
	centerX - width/2, centerY - height/2,
	centerX, centerY - height/2);
 
  context.fillStyle = "black";
  context.fill();
  context.closePath();	
}

function updateBreath() { 
				
  if (breathDir === 1) {  // breath in
	breathAmt -= breathInc;
	if (breathAmt < -breathMax) {
	  breathDir = -1;
	}
  } else {  // breath out
	breathAmt += breathInc;
	if(breathAmt > breathMax) {
	  breathDir = 1;
	}
  }
}
function updateBlink() { 
				
  eyeOpenTime += blinkUpdateTime;
	
  if(eyeOpenTime >= timeBtwBlinks){
	blink();
  }
}
function blink() {

  curEyeHeight -= 1;
  if (curEyeHeight <= 0) {
	eyeOpenTime = 0;
	curEyeHeight = maxEyeHeight;
  } else {
	setTimeout(blink, 10);
  }
}
function sauter() {
                        
  if (!saut) {
    saut = true;
    setTimeout(atterrir, 400);
  }
}
function atterrir() {           
  saut = false;
}

function bouge(){
    mouvement = true;
}
