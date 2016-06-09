
var wt = require('..');

exports['load plane'] = function (test) {
    var plane = wt.loadPlane({ width: 10, height: 5 });
    
    test.ok(plane);
    test.equal(plane.width(), 10);
    test.equal(plane.height(), 5);
};