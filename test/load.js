
const wt = require('..');

exports['load plane'] = function (test) {
    const plane = wt.loadPlane({ width: 10, height: 5 });
    
    test.ok(plane);
    test.equal(plane.width(), 10);
    test.equal(plane.height(), 5);
};

exports['load plane with tile'] = function (test) {
    const plane = wt.loadPlane({ 
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
    
    const result = plane.get(1, 2);
    
    test.ok(result);
    test.equal(result.east(), 0);
    test.equal(result.north(), 1);
    test.equal(result.west(), 2);
    test.equal(result.south(), 3);
};

exports['load plane with tile with colors'] = function (test) {
    const plane = wt.loadPlane({ 
        width: 10, 
        height: 5,
        positions: [
            {
                x: 1,
                y: 2,
                tile: ['yellow', 'red', 'blue', 'lime']
            }
        ]
    });
    
    test.ok(plane);
    test.equal(plane.width(), 10);
    test.equal(plane.height(), 5);
    
    test.equal(plane.get(0, 0), null);
    
    const result = plane.get(1, 2);
    
    test.ok(result);
    test.equal(result.east(), 'yellow');
    test.equal(result.north(), 'red');
    test.equal(result.west(), 'blue');
    test.equal(result.south(), 'lime');
};

exports['load plane with tile with colors'] = function (test) {
    const plane = wt.loadPlane({ 
        width: 10, 
        height: 5,
        positions: [
            {
                x: 1,
                y: 2,
                tile: ['yellow', 'red', 'blue', 'lime']
            }
        ]
    });
    
    test.ok(plane);
    test.equal(plane.width(), 10);
    test.equal(plane.height(), 5);
    
    test.equal(plane.get(0, 0), null);
    
    const result = plane.get(1, 2);
    
    test.ok(result);
    test.equal(result.east(), 'yellow');
    test.equal(result.north(), 'red');
    test.equal(result.west(), 'blue');
    test.equal(result.south(), 'lime');
};

exports['load plane with tile with definition'] = function (test) {
    const plane = wt.loadPlane({ 
        width: 10, 
        height: 5,
        tiles: {
            tile1: ['yellow', 'red', 'blue', 'lime']
        },
        positions: [
            {
                x: 1,
                y: 2,
                tile: 'tile1'
            }
        ]
    });
    
    test.ok(plane);
    test.equal(plane.width(), 10);
    test.equal(plane.height(), 5);
    
    test.equal(plane.get(0, 0), null);
    
    const result = plane.get(1, 2);
    
    test.ok(result);
    test.equal(result.east(), 'yellow');
    test.equal(result.north(), 'red');
    test.equal(result.west(), 'blue');
    test.equal(result.south(), 'lime');
};

