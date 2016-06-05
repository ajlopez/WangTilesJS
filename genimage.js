
var wt = require('./lib/wangtiles');

var plane = wt.plane(10, 10);
var image = wt.image(plane, 100);

var tile = wt.tile([0, 1, 2, 3]);
plane.put(1, 1, tile);

console.log('width', image.width());
console.log('height', image.height());
console.log('size', image.size());

image.fill('white');
image.drawTiles();

console.log('save');
image.save('plane.png');