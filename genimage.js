
var wt = require('./lib/wangtiles');

var plane = wt.plane(10, 10);
var image = wt.image(plane, 100);

console.log('width', image.width());
console.log('height', image.height());
console.log('size', image.size());

console.log('save');
image.save('plane.png');