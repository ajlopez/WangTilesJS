
const wt = require('..');

exports['create tile with colors'] = function (test) {
    const tile = wt.tile([0, 1, 2, 3]);
    
    test.ok(tile);
    test.equal(tile.east(), 0);
    test.equal(tile.north(), 1);
    test.equal(tile.west(), 2);
    test.equal(tile.south(), 3);
};

exports['create tile using string'] = function (test) {
    const tile = wt.tile("0123");
    
    test.ok(tile);
    test.equal(tile.east(), 0);
    test.equal(tile.north(), 1);
    test.equal(tile.west(), 2);
    test.equal(tile.south(), 3);
};

