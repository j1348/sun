var suncalc = require('suncalc');
var d = new Date();
var longitude = 48.866667;
var latitude = 2.333333;

console.log(suncalc.getTimes(d, longitude, latitude));

var position = suncalc.getPosition(d, longitude, latitude);
console.log(position);

var moonPos = suncalc.getMoonPosition(d, longitude, latitude);
console.log(moonPos);

