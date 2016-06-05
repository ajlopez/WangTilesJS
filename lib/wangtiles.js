
"use strict";

var fs = require('fs');
var PNG = require('node-png').PNG;

var colors = [ 'yellow', 'red', 'blue', 'lime', 'cyan', 'magenta', 'white', 'black' ];

var rgb = {
    red: [255, 0, 0],
    lime: [0, 255, 0],
    blue: [0, 0, 255],
    
    yellow: [255, 255, 0],
    magenta: [255, 0, 255],
    cyan: [0, 255, 255],
    
    white: [255, 255, 255],
    black: [0, 0, 0]
}

function fillRectangle(data, width, offsetx, offsety, sizex, sizey, rgb) {
    for (var px = 0; px < sizex; px++)
        for (var py = 0; py < sizey; py++) {
            var x = offsetx + px;
            var y = offsety + py;
            var pos = (y * width + x) * 4;
            data[pos] = rgb[0];
            data[pos + 1] = rgb[1];
            data[pos + 2] = rgb[2];
            data[pos + 3] = 255;
        }
}

function Plane(width, height) {
    var cells = [];
    for (var x = 0; x < width; x++) {
        cells[x] = [];
        for (var y = 0; y < height; y++)
            cells[x][y] = null;
    }
        
    this.get = function (x, y) { return cells[x][y]; };
    this.put = function (x, y, tile) { cells[x][y] = tile; };
    this.width = function () { return width; };
    this.height = function () { return height; };
}

function Tile(colors) {
    this.east = function () { return colors[0]; };
    this.north = function () { return colors[1]; };
    this.west = function () { return colors[2]; };
    this.south = function () { return colors[3]; };
}

function Image(plane, cellsize) {
    var image = new PNG();
    
    image.width = plane.width() * cellsize;
    image.height = plane.height() * cellsize;
    
    var totalsize = image.width * image.height * 4;
    
    image.data = new Array(totalsize);
    
    for (var k = 0; k < totalsize; k += 4) {
        image.data[k] = 0;
        image.data[k + 1] = 0;
        image.data[k + 2] = 0;
        image.data[k + 3] = 255;
    }

    this.width = function () { return image.width; };
    this.height = function () { return image.height; };
    this.size = function () { return image.data.length; };
    
    this.save = function (filename) {
        image.pack().pipe(fs.createWriteStream(filename));        
    };
    
    this.image = function () { return image; };
    
    this.fill = function (color) {
        fillRectangle(image.data, image.width, 0, 0, image.width, image.height, getColor(color));
    }
}

function createImage(plane, cellsize) {
    return new Image(plane, cellsize);
}

function createTile(colors) {
    if (typeof colors === 'string') {
        var cols = [];
        var zero = "0".charCodeAt(0);
        
        for (var k = 0; k < 4; k++)
            cols[k] = colors.charCodeAt(k) - zero;
            
        return new Tile(cols);
    }
    
    return new Tile(colors);
}

function createPlane(width, height) {
    return new Plane(width, height);
}

function getRgb(color) {
    return rgb[color];
}

function getColor(color) {
    if (typeof color === 'string')
        return getRgb(color);
    if (typeof color === 'number')
        return getRgb(colors[color]);
    if (Array.isArray(color))
        return color;
    
    return null;
}

module.exports = {
    tile: createTile,
    plane: createPlane,
    image: createImage,
    rgb: getRgb,
    color: getColor
}

