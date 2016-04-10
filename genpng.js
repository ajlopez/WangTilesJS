var fs = require('fs');
var PNG = require('node-png').PNG;

var png = new PNG();

png.width = 100;
png.height = 100;

var data = new Array(100 * 100 * 4);

for (var k = 0; k < 40000; k += 4) {
    data[k] = 0;
    data[k+1] = 0;
    data[k+2] = 0;
    data[k+3] = 255;
}

for (var y = 1; y < 99; y++)
    for (var x = y; x < 100 - y; x++) {
        var k = (y * 100 + x) * 4;
        
        data[k] = 255;
        data[k+1] = 255;
        data[k+2] = 0;
        data[k+3] = 255;
    }

for (var y = 1; y < 99; y++)
    for (var x = 1; x < y; x++) {
        var k = (y * 100 + x) * 4;
        
        data[k] = 255;
        data[k+1] = 0;
        data[k+2] = 0;
        data[k+3] = 255;
    }

for (var y = 1; y < 99; y++)
    for (var x = 1; x < y; x++) {
        var k = (y * 100 + 99 - x) * 4;
        
        data[k] = 0;
        data[k+1] = 0;
        data[k+2] = 255;
        data[k+3] = 255;
    }

for (var y = 1; y < 99; y++)
    for (var x = y; x < 100 - y; x++) {
        var k = ((100 - y) * 100 + x) * 4;
        
        data[k] = 0;
        data[k+1] = 255;
        data[k+2] = 0;
        data[k+3] = 255;
    }

png.data = data;

png.pack().pipe(fs.createWriteStream('out.png'));

