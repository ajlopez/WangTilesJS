
const wt = require('..');

exports['get name colors as rgb array'] = function (test) {
    test.deepEqual(wt.rgb('red'), [255, 0, 0]);
    test.deepEqual(wt.rgb('lime'), [0, 255, 0]);
    test.deepEqual(wt.rgb('blue'), [0, 0, 255]);

    test.deepEqual(wt.rgb('yellow'), [255, 255, 0]);
    test.deepEqual(wt.rgb('magenta'), [255, 0, 255]);
    test.deepEqual(wt.rgb('cyan'), [0, 255, 255]);

    test.deepEqual(wt.rgb('white'), [255, 255, 255]);
    test.deepEqual(wt.rgb('black'), [0, 0, 0]);
};

