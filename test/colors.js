
const wt = require('..');

const names = [ 'yellow', 'red', 'blue', 'lime', 'cyan', 'magenta', 'white', 'black' ];

exports['get rgb colors'] = function (test) {
    for (let n in names) {
        const name = names[n];
        
        test.deepEqual(wt.color(name), wt.rgb(name));
    }
}

exports['get colors by number'] = function (test) {
    for (let n in names) {
        const name = names[n];
        
        test.deepEqual(wt.color(parseInt(n)), wt.rgb(name));
    }
}

exports['get colors by rgb'] = function (test) {
    test.deepEqual(wt.color([1, 2, 3]), [1, 2, 3]);
}

