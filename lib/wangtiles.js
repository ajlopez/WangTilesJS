
var PNG = require('node-png').PNG;

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

function createImage(plane, cellsize) {
    var image = new PNG();
    
    image.width = plane.width() * cellsize;
    image.height = plane.height() * cellsize;
    
    return image;
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

function getRgb(color) {
    return rgb[color];
}

module.exports = {
    tile: createTile,
    plane: createPlane,
    image: createImage,
    rgb: getRgb
}

