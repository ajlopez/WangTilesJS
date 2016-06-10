
var wt = require('..');

exports['load plane'] = function (test) {
    var plane = wt.loadPlane({ width: 10, height: 5 });
    
    test.ok(plane);
    test.equal(plane.width(), 10);
    test.equal(plane.height(), 5);
};

exports['load plane with tile'] = function (test) {
    var plane = wt.loadPlane({ 
        width: 10, 
        height: 5,
        positions: [
            {
                x: 1,
                y: 2,
                tile: [0, 1, 2, 3]
            }
        ]
    });
    
    test.ok(plane);
    test.equal(plane.width(), 10);
    test.equal(plane.height(), 5);
    
    test.equal(plane.get(0, 0), null);
    
    var result = plane.get(1, 2);
    
    test.ok(result);
    test.equal(result.east(), 0);
    test.equal(result.north(), 1);
    test.equal(result.west(), 2);
    test.equal(result.south(), 3);
};

