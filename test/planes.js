
var wt = require('..');

exports['create empty plane'] = function (test) {
    var plane = wt.plane(10, 10);
    
    test.ok(plane);
    
    for (var x = 0; x < 10; x++)
        for (var y = 0; y < 10; y++)            
            test.equal(plane.get(x, y), null);
};