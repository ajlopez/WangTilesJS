
var wt = require('./lib/wangtiles');

var plane = wt.plane(10, 10);
var image = wt.image(plane, 100);

for (var x = 0; x < 10; x++)
    for (var y = 0; y < 10; y++) {
        var tile = wt.tile([Math.floor(Math.random() * 6), Math.floor(Math.random() * 6), Math.floor(Math.random() * 6), Math.floor(Math.random() * 6)]);
        plane.put(x, y, tile);
    }

console.log('width', image.width());
console.log('height', image.height());
console.log('size', image.size());

image.fill('white');
image.drawTiles();

console.log('save');
image.save('plane.png');