var fs = require('fs');
var PNG = require('node-png').PNG;

var png = new PNG();

var size = 100;

png.width = size;
png.height = size;

var totalsize = size * size * 4;

var data = new Array(totalsize);

for (var k = 0; k < totalsize; k += 4) {
    data[k] = 0;
    data[k+1] = 0;
    data[k+2] = 0;
    data[k+3] = 255;
}

// north: yellow
for (var y = 1; y <= size - 1; y++)
    for (var x = y; x < size - y; x++) {
        var k = (y * size + x) * 4;
        
        data[k] = 255;
        data[k+1] = 255;
        data[k+2] = 0;
        data[k+3] = 255;
    }

// west: red
for (var y = 1; y <= size - 1; y++)
    for (var x = 1; x < y; x++) {
        var k = (y * size + x) * 4;
        
        data[k] = 255;
        data[k+1] = 0;
        data[k+2] = 0;
        data[k+3] = 255;
    }

// east: blue
for (var y = 1; y <= size - 1; y++)
    for (var x = 1; x < y; x++) {
        var k = (y * size + size - 1 - x) * 4;
        
        data[k] = 0;
        data[k+1] = 0;
        data[k+2] = 255;
        data[k+3] = 255;
    }

// south: lime
for (var y = 1; y <= size - 1; y++)
    for (var x = y; x < size - y; x++) {
        var k = ((size - y) * size + x) * 4;
        
        data[k] = 0;
        data[k+1] = 255;
        data[k+2] = 0;
        data[k+3] = 255;
    }

png.data = data;

png.pack().pipe(fs.createWriteStream('out.png'));

