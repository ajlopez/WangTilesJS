
const wt = require('..');

exports['create empty plane'] = function (test) {
    const plane = wt.plane(10, 10);
    
    test.ok(plane);
    
    for (let x = 0; x < 10; x++)
        for (let y = 0; y < 10; y++)            
            test.equal(plane.get(x, y), null);
};

exports['plane with width and height'] = function (test) {
    const plane = wt.plane(10, 10);
    
    test.ok(plane);
    test.equal(plane.width(), 10);
    test.equal(plane.height(), 10);
};

exports['put and get tile'] = function (test) {
    const plane = wt.plane(10, 10);
    const tile = wt.tile([0,1,2,3]);
    
    plane.put(0, 0, tile);
    
    const result = plane.get(0, 0);
    
    test.ok(result);
    test.strictEqual(result, tile);
};

