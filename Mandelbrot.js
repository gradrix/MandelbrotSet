var MandelbrotDrawer = function(canvasContext, maxIterations) {
  this.height = canvasContext.canvas.height;
  this.width = canvasContext.canvas.width;
  this.canvascContext = canvasContext;
  this.max = maxIterations;
  this.colors = [];

  var initialZoomValue = 5;
  var initialCoordinates = 2;
  this.zoomVal = initialZoomValue;
  this.cameraPosX = initialCoordinates;
  this.cameraPosY = initialCoordinates;

  // 0 -> rgb(0,0,0)
  // 50331647 -> rgb(255,255,255)
  this.getRgb = function(num) {
    num >>>= 0;
    var b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16;
    return "rgb(" + [r, g, b].join(",") + ")";
  };

  this.getColors = function() {
    for(var i = 0; i < this.max; i++) {
      this.colors[i] = (50331647/ this.max ) * i
    }
  };

  this.drawPixel = function (x, y, color) {
    this.canvascContext.fillStyle = color; //"rgb(200,0,0)"
    this.canvascContext.fillRect(x, y, 1, 1);
  };

  this.drawMandelbrot = function() {
    for (var row = 0; row < this.height; row++) {
      for (var col = 0; col < this.width; col++) {
        cRe = (col - this.width / this.cameraPosX) * this.zoomVal/this.width;
        cIm = (row - this.height / this.cameraPosY) * this.zoomVal/this.width;
        x = 0;
        y = 0;
        iteration = 0;
        while(x*x + y*y <= 4 && iteration < this.max) {
          xNew = x*x - y*y + cRe;
          y = 2*x*y + cIm;
          x = xNew;
          iteration++;
        }
        if (iteration < this.max) {
          this.drawPixel(col, row, this.getRgb(this.colors[iteration]));
        } else {
          this.drawPixel(col, row, this.getRgb(0));
        }
      }
    }
  };

  this.zoom = function(value) {
    this.zoomVal += value;
    this.drawMandelbrot();
  }

/*  this.move = function(x, y) {
    this.cameraPosX += x;
    this.cameraPosY += y;
    this.drawMandelbrot();
  } */
  this.getColors();
}

window.onload = function() {
  var canvas = document.getElementById("mandelbrot");
  var context = canvas.getContext("2d");
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;

  mandelbrot = new MandelbrotDrawer(context, 500);
  mandelbrot.drawMandelbrot();
}
