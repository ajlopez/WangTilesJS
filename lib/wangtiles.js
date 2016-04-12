
function Plane(width, height) {
    this.get = function (x, y) { return null; };
}

function Tile(colors) {
    this.east = function () { return colors[0]; };
    this.north = function () { return colors[1]; };
    this.west = function () { return colors[2]; };
    this.south = function () { return colors[3]; };
}

function createTile(colors) {
    return new Tile(colors);
}

function createPlane(width, height) {
    return new Plane(width, height);
}

module.exports = {
    tile: createTile,
    plane: createPlane
}

