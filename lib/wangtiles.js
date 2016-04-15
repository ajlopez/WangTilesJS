
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
    return new Tile(colors);
}

function createPlane(width, height) {
    return new Plane(width, height);
}

module.exports = {
    tile: createTile,
    plane: createPlane,
    image: createImage
}

