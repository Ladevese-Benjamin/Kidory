var imgFond = new Image();
imgFond.src = 'Media_Visuel/decors/decors_grotte.jpg';
var CanvasXSize = 1000;
var CanvasYSize = 600;
var speed = 70; //lower is faster
var scale = 0.40;
var imgY = 0; //vertical offset
var dx = 0.75;
var imgW;
var imgH;
var imgX = 0;
var clearX;
var clearY;
var ctx;


imgFond.onload = function() {
    imgW = imgFond.width * scale;
    imgH = imgFond.height * scale;
     // image larger than canvas WIDTH
    if (imgW > CanvasXSize) {
        imgX = 0; 
        clearX = imgW; 
    } else { 
        clearX = CanvasXSize;
    }
    // image larger than canvas  HEIGHT
    if (imgH > CanvasYSize) { 
        clearY = imgH; 
    } else { 
        clearY = CanvasYSize; 
    }
    //Get Canvas Element
    ctx = document.getElementById('canvas').getContext('2d');
    //Set Refresh Rate
    setInterval(draw, speed);
}

function draw() {
    //Clear Canvas
    ctx.clearRect(0, 0, clearX, clearY);
    
      
    //If image is <= Canvas Size
    if (imgW <= CanvasXSize) {
        //reset, start from beginning
        if (imgX > (CanvasXSize)) { imgX = 0; }
        //draw aditional image
        if (imgX > (CanvasXSize - imgW)) { ctx.drawImage(imgFond, imgX + CanvasXSize + 1, imgY, imgW, imgH); }
    }
    //If image is > Canvas Size
    else {
        //reset, start from beginning
        
        
        // CanvasXSize => point de départ 0 de l'image
        if (imgX > (CanvasXSize)) { imgX = CanvasXSize - imgW; }
        //draw aditional image
        if (imgX > (CanvasXSize + imgW)) { ctx.drawImage(imgFond, imgX + imgW + 1, imgY, imgW, imgH); }
    }
    //draw image
    ctx.drawImage(imgFond, imgX, imgY,imgW, imgH);
    //amount to move
    if (imgX > -680){
        imgX -= dx;
    }
    
}
