
var wt = require('..');

var names = [ 'red', 'blue', 'lime', 'yellow', 'cyan', 'magenta', 'white', 'black' ];

exports['get rgb colors'] = function (test) {
    for (var n in names) {
        var name = names[n];
        test.deepEqual(wt.color(name), wt.rgb(name));
    }
}