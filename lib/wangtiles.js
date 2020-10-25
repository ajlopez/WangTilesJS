
"use strict";

const fs = require('fs');
const PNG = require('node-png').PNG;

const colors = [ 'yellow', 'red', 'blue', 'lime', 'cyan', 'magenta', 'white', 'black' ];

const rgb = {
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
    for (let px = 0; px < sizex; px++)
        for (let py = 0; py < sizey; py++) {
            const x = offsetx + px;
            const y = offsety + py;
            const pos = (y * width + x) * 4;
            
            data[pos] = rgb[0];
            data[pos + 1] = rgb[1];
            data[pos + 2] = rgb[2];
            data[pos + 3] = 255;
        }
}

function fillEast(data, width, offsetx, offsety, size, color) {
    for (let x = 1; x <= size / 2 - 1; x++)
        for (let y = x; y < size - x; y++) {
            const k = ((y + offsety) * width + size - 1 - x + offsetx) * 4;
            
            data[k] = color[0];
            data[k+1] = color[1];
            data[k+2] = color[2];
            data[k+3] = 255;
        }
}

function fillNorth(data, width, offsetx, offsety, size, color) {
    for (let y = 1; y <= size / 2 - 1; y++)
        for (let x = y; x < size - y; x++) {
            const k = ((y + offsety) * width + x + offsetx) * 4;
            
            data[k] = color[0];
            data[k+1] = color[1];
            data[k+2] = color[2];
            data[k+3] = 255;
        }
}

function fillWest(data, width, offsetx, offsety, size, color) {
    for (let x = 1; x <= size / 2 - 1; x++)
        for (let y = x; y < size - x; y++) {
            const k = ((y + offsety) * width + x + offsetx) * 4;
            
            data[k] = color[0];
            data[k+1] = color[1];
            data[k+2] = color[2];
            data[k+3] = 255;
        }
}

function fillSouth(data, width, offsetx, offsety, size, color) {
    for (let y = 2; y <= size / 2 - 1; y++)
        for (let x = y; x < size - y; x++) {
            const k = ((size - y + offsety) * width + x + offsetx) * 4;
            
            data[k] = color[0];
            data[k+1] = color[1];
            data[k+2] = color[2];
            data[k+3] = 255;
        }
}

function Plane(width, height) {
    const cells = [];
    for (let x = 0; x < width; x++) {
        cells[x] = [];
        for (let y = 0; y < height; y++)
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
    const image = new PNG();
    
    image.width = plane.width() * cellsize;
    image.height = plane.height() * cellsize;
    
    const totalsize = image.width * image.height * 4;
    
    image.data = new Array(totalsize);
    
    for (let k = 0; k < totalsize; k += 4) {
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
    
    this.drawTiles = function () {
        const width = plane.width();
        const height = plane.height();
        
        for (let x = 0; x < width; x++)
            for (let y = 0; y < height; y++) {
                const tile = plane.get(x, y);
                
                if (!tile)
                    continue;
                
                const offsetx = x * cellsize;
                const offsety = (height - y - 1) * cellsize;
                
                fillEast(image.data, image.width, offsetx, offsety, cellsize, getColor(tile.east()));
                fillNorth(image.data, image.width, offsetx, offsety, cellsize, getColor(tile.north()));
                fillWest(image.data, image.width, offsetx, offsety, cellsize, getColor(tile.west()));
                fillSouth(image.data, image.width, offsetx, offsety, cellsize, getColor(tile.south()));
            }
    }
}

function createImage(plane, cellsize) {
    return new Image(plane, cellsize);
}

function createTile(colors) {
    if (typeof colors === 'string') {
        const cols = [];
        const zero = "0".charCodeAt(0);
        
        for (let k = 0; k < 4; k++)
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

function loadPlane(options) {
    const plane = createPlane(options.width, options.height);
    
    if (options.tiles)
        for (let n in options.tiles)
            options.tiles[n] = createTile(options.tiles[n]);
    
    if (options.positions)
        for (let n in options.positions) {
            const position = options.positions[n];
            let tile;
            
            if (typeof position.tile === 'string')
                tile = options.tiles[position.tile];
            else
                tile = createTile(position.tile);
            
            plane.put(position.x, position.y, tile);
        }
        
    return plane;
}

module.exports = {
    tile: createTile,
    plane: createPlane,
    image: createImage,
    rgb: getRgb,
    color: getColor,
    loadPlane: loadPlane
}

