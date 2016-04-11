
var wt = require('..');

exports['create tile with colors'] = function (test) {
    var tile = wt.tile([0, 1, 2, 3]);
    
    test.ok(tile);
    test.equal(tile.east(), 0);
    test.equal(tile.north(), 1);
    test.equal(tile.west(), 2);
    test.equal(tile.south(), 3);
};