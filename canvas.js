//****************FOLLOWER******************//
var follower = document.querySelector('#follower');
var updateFollower = function () {
    follower.style.backgroundColor = lineCol;
    follower.style.width = lineWid + "px";
    follower.style.height = lineWid + "px";};
var setEraserSettings = function () {
    if (document.getElementById("eraserRadio").checked) {
        follower.style.backgroundColor = "white";};};

//**************** LINE*********************//
//properties
var lineCol = "#808080";
var lineWid = 50;
var lineOpacity = 1;
var lineSoft = 20;

//line drawing
var mouseIsDown = false;
var mousePosition = { x: null, y: null};
var updateMousePosition = function (event) {
    mousePosition.x = event.offsetX;
    mousePosition.y = event.offsetY;};
var canvas = document.getElementById("canvas0");
var cover = document.querySelector('#canvasCover');
var ctx = canvas.getContext('2d');
// ctx.globalCompositeOperation = 'xor';

cover.addEventListener("mouseenter", function () {
    follower.classList.add("on");
    updateFollower();
    setEraserSettings();});
cover.addEventListener("mouseleave", function () {
    follower.classList.remove("on");});
cover.addEventListener('mousedown', function (event) {
    mouseIsDown = true;
    updateMousePosition(event);});
cover.addEventListener('mouseup', function (event) {
    mouseIsDown = false;});
var line = function (x1, y1, x2, y2, lineTemp, color) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(x1, y1);
    ctx.lineWidth = lineTemp;
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();};
cover.addEventListener('mousemove', function (event) {
    if (mouseIsDown) {
        var mpX = mousePosition.x;
        var mpY = mousePosition.y;
        var ex = event.offsetX;
        var ey = event.offsetY;

        var tempWid = lineWid;
        var omo = 0.0;
        if (document.getElementById("eraserRadio").checked) {
            ctx.globalCompositeOperation = "destination-out";
            follower.style.backgroundColor = "white";};
        if (lineSoft <= 0 || lineWid <= 3) {
            //              ctx.globalCompositeOperation = "source-over";
            ctx.globalAlpha = lineOpacity;
            line(mpX, mpY, ex, ey, lineWid, lineCol);
            tempWid = -1;}
        if (lineSoft > 30) {
            tempWid = tempWid * 1.4;
        } else if (lineSoft > 40) {
            tempWid = tempWid * 1.45;
        } else if (lineSoft > 50) {
            tempWid = tempWid * 1.5;
        } else if (lineSoft > 60) {
            tempWid = tempWid * 1.6;
        } else if (lineSoft > 70) {
            tempWid = tempWid * 1.7;
        } else if (lineSoft > 80) {
            tempWid = tempWid * 1.8;
        } else if (lineSoft > 90) {
            tempWid = tempWid * 1.9;
        }
        if (lineSoft > 100) {lineSoft = 100;}
        var opacityCutoff = tempWid - ((lineOpacity) * tempWid);
        while (tempWid > opacityCutoff) {
            ctx.globalAlpha = omo / 100.0;
            line(mpX, mpY, ex, ey, tempWid, lineCol);
            tempWid = tempWid - (lineSoft) / 20.0;
            omo = omo + (lineOpacity) * .8;}
        updateMousePosition(event);};
    follower.style.left = event.x - .5 * lineWid + "px";
    follower.style.top = event.y - .5 * lineWid + "px";
    ctx.globalCompositeOperation = "source-over";});

//***************SLIDERS**********************//
var widSlider = document.getElementById("lineWid");
var opacitySlider = document.getElementById("lineOpacity");
var softnessSlider = document.getElementById("lineSoftness");
opacitySlider.value = 100;
softnessSlider.value = 20;

widSlider.addEventListener("change", function () {
    lineWid = widSlider.value;
    var widthPercent = document.querySelector("#widthPercent");
    widthPercent.innerText = widSlider.value + "%";
    updateFollower();});
opacitySlider.addEventListener("change", function () {
    var opacityPercent = document.querySelector("#opacityPercent");
    opacityPercent.innerText = opacitySlider.value + "%";
    lineOpacity = opacitySlider.value / 100.0;
    updateFollower();});
softnessSlider.addEventListener("change", function () {
    var softnessPercent = document.querySelector("#softnessPercent");
    softnessPercent.innerText = softnessSlider.value + "%";
    lineSoft = softnessSlider.value;
    updateFollower();});

//*************COLOR WHEEL******************//
$('#colorpicker2').farbtastic({
      callback: function (color) {
          lineCol = color;
          var colorBox = document.getElementById("currentColorBox");
          colorBox.style.backgroundColor = color;
          updateFollower();}, width: 150});
jQuery.fn.single_double_click = function (single_click_callback, double_click_callback, timeout) {return this.each(function () {
          var clicks = 0, self = this;
          jQuery(this).click(function (event) {
              clicks++;
              if (clicks == 1) {
                  setTimeout(function () {
                      if (clicks == 1) { single_click_callback.call(self, event);} else {double_click_callback.call(self, event);}
                      clicks = 0;}, timeout || 300);}});});};
  $('#colorMem1').single_double_click(function () {
      var colorBox = document.getElementById("colorMem1");
      lineCol = colorBox.style.backgroundColor ? colorBox.style.backgroundColor: "white"; 
      updateFollower();
      var colorBox2 = document.getElementById("currentColorBox");
      colorBox2.style.backgroundColor = colorBox.style.backgroundColor ? lineCol : "white";
  }, function () {
      var colorBox = document.getElementById("colorMem1");
      colorBox.style.backgroundColor = lineCol;});
  $('#colorMem2').single_double_click(function () {
      var colorBox = document.getElementById("colorMem2");
      lineCol = colorBox.style.backgroundColor ? colorBox.style.backgroundColor: "white"; 
      updateFollower();
      var colorBox2 = document.getElementById("currentColorBox");
      colorBox2.style.backgroundColor = colorBox.style.backgroundColor ? lineCol : "white";
  }, function () {
      var colorBox = document.getElementById("colorMem2");
      colorBox.style.backgroundColor = lineCol;});
    $('#colorMem3').single_double_click(function () {
      var colorBox = document.getElementById("colorMem3");
      lineCol = colorBox.style.backgroundColor ? colorBox.style.backgroundColor: "white"; 
      updateFollower();
      var colorBox2 = document.getElementById("currentColorBox");
      colorBox2.style.backgroundColor = colorBox.style.backgroundColor ? lineCol : "white";
  }, function () {
      var colorBox = document.getElementById("colorMem3");
      colorBox.style.backgroundColor = lineCol;});
  $('#colorMem4').single_double_click(function () {
      var colorBox = document.getElementById("colorMem4");
      lineCol = colorBox.style.backgroundColor ? colorBox.style.backgroundColor: "white"; 
      updateFollower();
      var colorBox2 = document.getElementById("currentColorBox");
      colorBox2.style.backgroundColor = colorBox.style.backgroundColor ? lineCol : "white";
  }, function () {
      var colorBox = document.getElementById("colorMem4");
      colorBox.style.backgroundColor = lineCol;});
  $('#colorMem5').single_double_click(function () {
      var colorBox = document.getElementById("colorMem5");
      lineCol = colorBox.style.backgroundColor ? colorBox.style.backgroundColor: "white"; 
      updateFollower();
      var colorBox2 = document.getElementById("currentColorBox");
      colorBox2.style.backgroundColor = colorBox.style.backgroundColor ? lineCol : "white";
  }, function () {
      var colorBox = document.getElementById("colorMem5");
      colorBox.style.backgroundColor = lineCol;});

//*******************LAYERS*************************//
  var layerCounter = 1;
  var currentCanvas = "canvas0";
  var selectedLayer ="preview0";
  var layerZ = -999;
  $(".view-icon").click(function(){
    var n=$(this).parents(".preview").attr("id").slice($(this).parents(".preview").attr("id").length -1);
    $("#canvas" +  n).toggle();});
  var updateCanvas = function(){
   canvas = document.getElementById(currentCanvas);
   ctx= canvas.getContext('2d');};
//clear
  var clearButton = document.getElementById("clear");
  clearButton.addEventListener('click', function () {
      var canvas2width = canvas.width;
      var canvas2height = canvas.height;
      ctx.clearRect(0, 0, canvas2width, canvas2height);});
  //add
  var newLayerButton = document.getElementById("newLayerButton");
  newLayerButton.addEventListener('click', function () {
  var newC = document.createElement('canvas');
      newC.id = "canvas" + layerCounter;
      newC.classList.add("aCanvas");
      newC.dataset.name = "Layer " + layerCounter;
      newC.setAttribute("width", 850);
      newC.setAttribute("height", 400);
      newC.style.zIndex = layerZ;
      newC.style.position = "absolute";
      newC.style.left = "20%";
      newC.style.top = "30%";
      newC.style.border= "1px solid black";
      document.body.appendChild(newC);
      currentCanvas= "canvas" + layerCounter;
      updateCanvas();
      
      var preview = document.createElement('div');
      preview.setAttribute("id", "preview" + layerCounter);
      preview.classList.add("preview");
      
      var p = document.createElement('p');
      p.innerText= newC.dataset.name; 
      var viewIcon= document.createElement("i");
      viewIcon.classList.add("view-icon");
      viewIcon.addEventListener("click", function(){
         var n =$(this).parents(".preview").attr("id").slice($(this).parents(".preview").attr("id").length -1);
         $("#canvas" +  n).toggle();});
      p.appendChild(viewIcon);
      preview.appendChild(p);
      
      document.getElementById(selectedLayer).classList.remove("selectedLayer");
      preview.classList.add("selectedLayer");
      selectedLayer= preview.id;
      preview.addEventListener("click", function(){
         document.getElementById(selectedLayer).classList.remove("selectedLayer");
          var a = preview.id;
          var num = a[a.length-1];
          preview.classList.add("selectedLayer");
          currentCanvas= "canvas" + num;
          selectedLayer= a;
          updateCanvas();});
      var box = document.getElementById("previewBox");
      box.insertBefore(preview, box.firstChild);
      layerCounter++;
      layerZ++;});
//delete
$("#deleteLayerButton").click(function(){
    if (currentCanvas == "canvas0"){alert("You can't delete the background! Sorry :(");}
    else{
        var deleted = document.getElementById(currentCanvas);
        var n = currentCanvas.slice(currentCanvas.length -1);
        var deleted2 = document.getElementById("preview" + n );
        var a = 1;
        selectedLayer= "preview" + (n-a);
            var preview = document.getElementById(selectedLayer);
        while(preview == null){
            a++;
            selectedLayer= "preview" + (n-a);
            var preview = document.getElementById(selectedLayer);}
        var preview = document.getElementById(selectedLayer);
        preview.classList.add("selectedLayer");
        currentCanvas= "canvas" + (n-a);
        deleted.remove();
        deleted2.remove();
        updateCanvas();}});
//merge down
$("#mergeLayerButton").click(function(){
    if (currentCanvas == "canvas0"){alert("You can't merge down! There's nothing below! Sorry :(");}
    else{
        var deleted = document.getElementById(currentCanvas);
        var n = currentCanvas.slice(currentCanvas.length -1);
        var deleted2 = document.getElementById("preview" + n );
        var a = 1;
        selectedLayer= "preview" + (n-a);
            var preview = document.getElementById(selectedLayer);
        while(preview == null){
            a++;
            selectedLayer= "preview" + (n-a);
            var preview = document.getElementById(selectedLayer);}
        var preview = document.getElementById(selectedLayer);
        preview.classList.add("selectedLayer");
        currentCanvas= "canvas" + (n-a);
        var tempCtx = document.getElementById(currentCanvas).getContext('2d');
        var alphaa= tempCtx.globalAlpha;
        tempCtx.globalAlpha =1;
        tempCtx.drawImage(deleted, 0, 0);
        tempCtx.globalAlpha = alphaa;
        deleted.remove();
        deleted2.remove();
        updateCanvas();}});
//choose layer
  document.getElementById("preview0").addEventListener("click", function(){
   var preview =document.getElementById("preview0");
   document.getElementById(selectedLayer).classList.remove("selectedLayer");
   preview.classList.add("selectedLayer");      
          var a = preview.id;
          var num = a[a.length-1];
          currentCanvas= "canvas" + num;
          selectedLayer= a;
          updateCanvas();});

//******************DOWNLOAD*************************//
$("#download").click(function(){
   var canvasInfinity= document.createElement("canvas");
   canvasInfinity.setAttribute("width", 850);
   canvasInfinity.setAttribute("height", 400); 
    $(".aCanvas").each(function(){
    canvasInfinity.getContext("2d").drawImage(this, 0, 0);  
    });
var d=canvasInfinity.toDataURL("image/png");
var w=window.open('about:blank','image from canvas');
w.document.write("<img src='"+d+"' alt='from canvas'/>");});

//*******************FILE REF***********************//
var makeRefPopUp = function(){
    var refPopUp = document.getElementById("refPopUp");
    refPopUp.style.display= "block";}
$("#refUrl").keypress(function(e){  
   if(e.which == 13){
       var file = document.getElementById("fileRef");
       var refPopUp = document.getElementById("refPopUp");
       refPopUp.style.display= "none";
        var realUrl = true;         
       var image = new Image();
       image.id = "theimage";
       image.ondragstart = function() { return false; };
       image.onerror = function(){
           alert("that's not a valid url!! stop!!");
           realUrl = false;
           return;}
       var urll = document.getElementById("refUrl").value;
       image.setAttribute("src", urll);
       image.onload =  function(){
           if(realUrl){ 
       var iWid= image.width;
       var iHeight = image.height;
       var ratio= 1;
       if (iWid >= iHeight){
           image.width = 200;
           ratio = iHeight / (iWid + 0.0);
           image.height = Math.floor(200 * ratio);}
       else{
           image.height = 200;
           ratio = iWid/(iHeight + 0.0);
           image.width = Math.floor(200 * ratio);}    
       file.appendChild(image);  
       file.setAttribute("width", 250);
       file.style.display="block";}};
        return false;}});

$("#fileRefButton").click(function(){
     makeRefPopUp();});
document.getElementById("closeRef").addEventListener("click",function(){
       var file = document.getElementById("fileRef");
       var refPopUp = document.getElementById("refPopUp");
       refPopUp.style.display= "none";
       file.style.display="none";
       var a = document.getElementById("theimage");
        file.removeChild(a);});
//from jsfiddle online
var selected = null, x_pos = 0, y_pos = 0, x_elem = 0, y_elem = 0;
function _drag_init(elem) {selected = elem; x_elem = x_pos -selected.offsetLeft; y_elem = y_pos - selected.offsetTop;}
function _move_elem(e) {
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    if (selected !== null) {
        selected.style.left = (x_pos - x_elem) + 'px';
        selected.style.top = (y_pos - y_elem) + 'px';
    }}
function _destroy() {
    selected = null;}
document.getElementById('fileRef').onmousedown = function () {
    _drag_init(this);
    return false;};
document.onmousemove = _move_elem;
document.onmouseup = _destroy;